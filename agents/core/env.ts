/**
 * Installation och inloggningsuppgifter.
 *
 * Lasaren .env fran agents/ (samma fil som .env.example beskriver). Filen
 * committas aldrig — den innehaller app-losenord och API-nycklar.
 */
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { MailboxCredentials, PersonaId } from './types.js'

const agentsRoot = fileURLToPath(new URL('..', import.meta.url))
export const envFilePath = resolve(agentsRoot, '.env')

let loaded = false

/** Laddar agents/.env en gang per process. Saknas filen fortsatter vi pa miljovariabler. */
export function loadEnv(): void {
  if (loaded) return
  loaded = true
  if (!existsSync(envFilePath)) {
    console.warn('[env] hittar ingen agents/.env — kopiera .env.example och fyll i vardena.')
    return
  }
  process.loadEnvFile(envFilePath)
}

export function envValue(key: string): string {
  return (process.env[key] ?? '').trim()
}

export function envFlag(key: string, fallback: boolean): boolean {
  const value = envValue(key).toLowerCase()
  if (!value) return fallback
  return value === 'true' || value === '1' || value === 'yes' || value === 'ja'
}

/** T.ex. `IMAP_USER_SUPPORT` / `IMAP_PASS_SUPPORT` — samma som i .env.example. */
export function envKeysFor(id: PersonaId): { user: string; pass: string } {
  const upper = id.toUpperCase()
  return { user: `IMAP_USER_${upper}`, pass: `IMAP_PASS_${upper}` }
}

/** Inloggningsuppgifter for en brevlada, eller null om de inte ar ifyllda an. */
export function credentialsFor(id: PersonaId): MailboxCredentials | null {
  const keys = envKeysFor(id)
  const user = envValue(keys.user)
  const pass = envValue(keys.pass)
  if (!user || !pass) return null
  return { user, pass }
}

/** Samma som ovan, men kastar ett begripligt fel i stallet. */
export function requireCredentials(id: PersonaId): MailboxCredentials {
  const credentials = credentialsFor(id)
  if (!credentials) {
    const keys = envKeysFor(id)
    throw new Error(`Inloggningsuppgifter saknas for ${id}: fyll i ${keys.user} och ${keys.pass} i agents/.env.`)
  }
  return credentials
}

/** Adressen dit eskaleringar och tysta flaggor skickas. */
export function ownerEmail(): string {
  return envValue('OWNER_EMAIL')
}

/** Markera hanterade mejl som lasta? (false = de ligger kvar olasta.) */
export function markAsSeen(): boolean {
  return envFlag('MARK_AS_SEEN', true)
}

/** Ska allt som redan ligger i brevlådan hanteras vid forsta korningen? */
export function processBacklog(): boolean {
  return envFlag('PROCESS_BACKLOG', false)
}
