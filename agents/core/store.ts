/**
 * Minne. Samma nyckelformat som n8n-workflowet:
 *   abuse:<adress>     — abuse-poäng per avsändare
 *   summary:<adress>   — sammanfattning av ärendet så här långt
 *
 * Två backends, samma gränssnitt:
 *   - lokal JSON-fil (standard, bra för test och för en maskin med disk)
 *   - Redis via Upstash REST (om UPSTASH_REDIS_REST_URL finns — krävs om
 *     processen ska kunna startas om utan att tappa räknaren)
 */

import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { loadEnv } from './env.js'

export interface KvStore {
  get(key: string): Promise<string | null>
  set(key: string, value: string): Promise<void>
}

// .env maste vara last innan vi valjer backend (UPSTASH_*/AGENT_STATE_FILE).
loadEnv()

const agentsRoot = fileURLToPath(new URL('..', import.meta.url))
const defaultStateFile = resolve(agentsRoot, '.state.json')
const auditFile = resolve(agentsRoot, '.audit.log')

function createFileStore(file: string): KvStore {
  const readAll = (): Record<string, string> => {
    if (!existsSync(file)) return {}
    try {
      return JSON.parse(readFileSync(file, 'utf8')) as Record<string, string>
    } catch {
      return {}
    }
  }

  return {
    async get(key) {
      return readAll()[key] ?? null
    },
    async set(key, value) {
      const all = readAll()
      all[key] = value
      mkdirSync(dirname(file), { recursive: true })
      writeFileSync(file, `${JSON.stringify(all, null, 2)}\n`, 'utf8')
    },
  }
}

function createUpstashStore(url: string, token: string): KvStore {
  const base = url.trim().replace(/\/+$/, '')
  const call = async (path: string): Promise<unknown> => {
    const response = await fetch(`${base}/${path}`, {
      headers: { authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) throw new Error(`Redis svarade ${response.status}`)
    const data = (await response.json()) as { result?: unknown }
    return data.result ?? null
  }

  return {
    async get(key) {
      const value = await call(`get/${encodeURIComponent(key)}`)
      return typeof value === 'string' ? value : null
    },
    async set(key, value) {
      await call(`set/${encodeURIComponent(key)}/${encodeURIComponent(value)}`)
    },
  }
}

function pickStore(): KvStore {
  const url = (process.env.UPSTASH_REDIS_REST_URL ?? '').trim()
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN ?? '').trim()
  if (url && token) return createUpstashStore(url, token)
  return createFileStore(process.env.AGENT_STATE_FILE?.trim() || defaultStateFile)
}

export const kv: KvStore = pickStore()

export function usingRedis(): boolean {
  return Boolean((process.env.UPSTASH_REDIS_REST_URL ?? '').trim())
}

// ── Abuse-räknare ────────────────────────────────────────────────────────

export async function getAbuseCount(id: string): Promise<number> {
  const value = await kv.get(`abuse:${id}`)
  const parsed = Number.parseInt(value ?? '0', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

export async function setAbuseCount(id: string, count: number): Promise<void> {
  await kv.set(`abuse:${id}`, String(count))
}

// ── Sammanfattning ───────────────────────────────────────────────────────

export async function getSummary(id: string): Promise<string> {
  return (await kv.get(`summary:${id}`)) ?? ''
}

export async function setSummary(id: string, summary: string): Promise<void> {
  if (summary) await kv.set(`summary:${id}`, summary)
}

// ── Läsposition och deduplicering ────────────────────────────────────────

export async function getLastUid(mailbox: string): Promise<number | null> {
  const value = await kv.get(`uid:${mailbox}`)
  if (value === null) return null
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : null
}

export async function setLastUid(mailbox: string, uid: number): Promise<void> {
  await kv.set(`uid:${mailbox}`, String(uid))
}

export async function isProcessed(mailbox: string, uid: number): Promise<boolean> {
  return (await kv.get(`done:${mailbox}:${uid}`)) === '1'
}

export async function markProcessed(mailbox: string, uid: number): Promise<void> {
  await kv.set(`done:${mailbox}:${uid}`, '1')
}

// ── Dagsgräns per avsändare ──────────────────────────────────────────────

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function getRepliesToday(sender: string): Promise<number> {
  const value = await kv.get(`replies:${sender}:${today()}`)
  const parsed = Number.parseInt(value ?? '0', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

export async function countReply(sender: string): Promise<number> {
  const next = (await getRepliesToday(sender)) + 1
  await kv.set(`replies:${sender}:${today()}`, String(next))
  return next
}

// ── Köp-/offerttrådar (undantagna från dygnstaket) ──────────────────────────

export async function isPurchaseThread(sender: string): Promise<boolean> {
  return (await kv.get(`purchase:${sender}`)) === '1'
}

export async function setPurchaseThread(sender: string): Promise<void> {
  await kv.set(`purchase:${sender}`, '1')
}

// ── Granskningsspår (lokal fil, committas aldrig) ────────────────────────

export function audit(entry: Record<string, unknown>): void {
  const line = JSON.stringify({ at: new Date().toISOString(), ...entry })
  try {
    appendFileSync(auditFile, `${line}\n`, 'utf8')
  } catch {
    // Granskningsloggen får aldrig stoppa ett svar.
  }
  console.log(`[agent] ${line}`)
}
