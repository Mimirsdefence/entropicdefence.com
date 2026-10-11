/**
 * Delad Stripe-klient for agenterna — rena fetch-anrop mot Stripes REST-API.
 *
 * Ingen SDK med flit: det har ar bootstrap-/adminverktyg som ska kunna koras
 * utan att lagga till ett beroende i agentpaketet. Allt vi behover ar form-body,
 * en JSON-svarstolk och en idempotensnyckel.
 *
 * Nycklar: STRIPE_SECRET_KEY i agents/.env. En sk_live_-nyckel vagras om inte
 * --yes-live skickas med, sa att ett misstag inte ror skarpa pengar.
 */
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { envValue } from '../core/env.js'

export const stripeDir = fileURLToPath(new URL('.', import.meta.url))
export const mapFilePath = resolve(stripeDir, '.stripe-map.json')

const API_BASE = 'https://api.stripe.com/v1'

export type ParamValue = string | number | boolean

export type StripeMode = 'TEST' | 'LIVE'

export interface StripeList<T> {
  data: T[]
  has_more: boolean
}

export interface StripeAccount {
  id: string
  country: string
  default_currency?: string
  business_profile?: { name?: string | null }
}

export interface StripeCustomer {
  id: string
  email?: string | null
  name?: string | null
  metadata?: Record<string, string>
}

export interface StripeInvoice {
  id: string
  status?: string
  total?: number
  amount_due?: number
  hosted_invoice_url?: string | null
  metadata?: Record<string, string>
}

/** Kartan som `npm run stripe:apply` skriver: ed_key -> Stripe-id. */
export interface StripeMap {
  generatedAt: string
  mode: StripeMode
  products: Record<string, string>
  prices: Record<string, string>
  taxRates: Record<string, string>
  paymentLinks: Record<string, string>
}

/** Öre -> "24 900 kr" (svensk tusentalsavgränsning). */
export function formatKr(amountOre: number): string {
  return `${(amountOre / 100).toLocaleString('sv-SE')} kr`
}

/** Kronor -> "24 900 kr" (samma sokvag som sajten raknar i). */
export function formatKrFromKronor(amount: number): string {
  return `${amount.toLocaleString('sv-SE')} kr`
}

/** Bygger form-body: nycklar far redan innehalla klamrar, t.ex. `recurring[interval]`. */
export function formBody(params: Record<string, ParamValue>): string {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) body.append(key, String(value))
  return body.toString()
}

export async function stripeRequest<T>(
  secretKey: string,
  method: 'GET' | 'POST',
  path: string,
  params: Record<string, ParamValue> = {},
  idempotencyKey?: string,
): Promise<T> {
  const query = method === 'GET' && Object.keys(params).length > 0 ? `?${formBody(params)}` : ''
  const headers: Record<string, string> = { Authorization: `Bearer ${secretKey}` }
  if (method === 'POST') headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey

  const response = await fetch(`${API_BASE}${path}${query}`, {
    method,
    headers,
    body: method === 'POST' ? formBody(params) : undefined,
  })

  const text = await response.text()
  const parsed: unknown = text ? JSON.parse(text) : {}
  if (!response.ok) {
    const body = parsed as { error?: { message?: string; code?: string; param?: string } }
    const message = body.error?.message ?? `HTTP ${response.status}`
    throw new Error(`Stripe ${method} ${path}: ${message}`)
  }
  return parsed as T
}

/** Hämtar alla sidor (max 20 x 100) så en find-or-create aldrig missar ett objekt. */
export async function listAll<T>(
  secretKey: string,
  path: string,
  params: Record<string, ParamValue> = {},
): Promise<T[]> {
  const collected: T[] = []
  let startingAfter: string | undefined
  for (let page = 0; page < 20; page += 1) {
    const query = { ...params, limit: 100, ...(startingAfter ? { starting_after: startingAfter } : {}) }
    const pageData = await stripeRequest<StripeList<T>>(secretKey, 'GET', path, query)
    collected.push(...pageData.data)
    if (!pageData.has_more) break
    const last = pageData.data.at(-1) as { id?: string } | undefined
    if (!last?.id) break
    startingAfter = last.id
  }
  return collected
}

/** Hittar ett objekt via var stabila nyckel i metadata (idempotens). */
export function byKey<T extends { metadata?: Record<string, string> }>(
  items: T[],
  key: string,
): T | undefined {
  return items.find((item) => item.metadata?.ed_key === key)
}

/** Laser .stripe-map.json fran `npm run stripe:apply`. */
export function readMap(): StripeMap | undefined {
  if (!existsSync(mapFilePath)) return undefined
  try {
    return JSON.parse(readFileSync(mapFilePath, 'utf8')) as StripeMap
  } catch {
    return undefined
  }
}

export function keyMode(secretKey: string): StripeMode {
  return secretKey.startsWith('sk_live_') ? 'LIVE' : 'TEST'
}

/**
 * Hämtar nyckeln ur agents/.env och stoppar en live-nyckel om inte
 * --yes-live skickats med. Alla skript som ror Stripe gar genom denna.
 */
export function requireSecretKey(liveFlag = '--yes-live'): string {
  const secretKey = envValue('STRIPE_SECRET_KEY')
  if (!secretKey) {
    throw new Error(
      'STRIPE_SECRET_KEY saknas i agents/.env — lagg in testnyckeln (sk_test_...) och kor igen.',
    )
  }
  if (secretKey.startsWith('sk_live_') && !process.argv.includes(liveFlag)) {
    throw new Error(
      'Nyckeln ar en LIVE-nyckel. Kor i testlage forst, eller lagg till --yes-live om du menar allvar.',
    )
  }
  return secretKey
}

/** Lankar till ratt vy i Stripe-panelen (test- eller live-lage). */
export function dashboardUrl(mode: StripeMode, path: string): string {
  return `https://dashboard.stripe.com/${mode === 'TEST' ? 'test/' : ''}${path}`
}
