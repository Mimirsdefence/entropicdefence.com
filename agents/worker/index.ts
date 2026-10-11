/**
 * Entropic Defence — arbetaren.
 *
 * En langkorande process som oppnar en IMAP-anslutning per brevlåda (support,
 * security, consultant), lagger ett las pa INBOX och later servern knuffa in
 * nya mejl via IMAP IDLE. Nar ett mejl kommer in kor samma slinga som CLI:t:
 * skydd -> modellen -> svar.
 *
 *   npm run worker                 torrkorning (standard) — svar skrivs ut har
 *   npm run worker -- --send       skickar pa riktigt
 *   npm run worker -- --send support   bara en brevlåda
 *
 * Anslutningen tappas ibland (natverk, serveromstart). Da backar vi av med
 * vaxande vantan och kopplar upp igen — processen dor inte av ett avbrott.
 */
import { credentialsFor, envKeysFor, loadEnv, markAsSeen, processBacklog } from './../core/env.js'
import { createImapClient } from './../core/mail.js'
import { processMailbox } from './../core/agent.js'
import { acquireWorkerLock } from './../core/lock.js'
import { allPersonas, isPersonaId, personas } from './../personas/index.js'
import type { ExistsEvent, ImapFlow, MailboxLockObject } from 'imapflow'
import type { MailboxCredentials, Persona } from './../core/types.js'

/** Hur ofta vi kollar laget aven om IDLE tiger (skyddsnat om IDLE tystnat). */
const POLL_MS = 60_000
const FIRST_BACKOFF_MS = 2_000
const MAX_BACKOFF_MS = 120_000
const MAILBOX = 'INBOX'

const HELP = `Entropic Defence — arbetaren (IMAP IDLE)

  npm run worker                    torrkorning: lyssnar och skriver svaren har
  npm run worker -- --send          skickar pa riktigt
  npm run worker -- --send support  bara support@entropicdefence.com
  npm run worker -- --backlog       rakna aven med mejl som redan ligger dar

  Stoppas med Ctrl+C. Torrkorning ar standard.`

class MailboxWorker {
  private readonly persona: Persona
  private readonly credentials: MailboxCredentials
  private readonly dryRun: boolean

  private client: ImapFlow | null = null
  private lock: MailboxLockObject | null = null
  private poll: NodeJS.Timeout | null = null
  private reconnect: NodeJS.Timeout | null = null

  private running = false
  private pending = false
  private stopped = false
  private backoff = FIRST_BACKOFF_MS

  constructor(persona: Persona, credentials: MailboxCredentials, dryRun: boolean) {
    this.persona = persona
    this.credentials = credentials
    this.dryRun = dryRun
  }

  start(): void {
    this.stopped = false
    void this.connect()
  }

  async stop(): Promise<void> {
    this.stopped = true
    this.clearTimers()
    this.lock?.release()
    this.lock = null
    const client = this.client
    this.client = null
    if (client) await client.logout().catch(() => undefined)
    console.log(`[${this.persona.id}] stoppad.`)
  }

  // -------------------------------------------------------------------------
  // Anslutning
  // -------------------------------------------------------------------------

  private async connect(): Promise<void> {
    if (this.stopped) return

    const client = createImapClient(this.credentials)
    this.client = client

    client.on('error', (error: Error) => {
      console.error(`[${this.persona.id}] IMAP-fel: ${error.message}`)
    })

    client.on('close', () => {
      if (this.stopped) return
      console.warn(`[${this.persona.id}] anslutningen stangdes.`)
      this.scheduleReconnect()
    })

    client.on('exists', (event: ExistsEvent) => {
      if (event.path !== MAILBOX) return
      console.log(`[${this.persona.id}] nytt mejl i ${MAILBOX} (${event.count} totalt).`)
      this.requestRound()
    })

    try {
      await client.connect()
      // Laset ar det som satter brevlådan i SELECTED och gor att IDLE far
      // skicka "exists". Det behalls sa lange anslutningen lever.
      this.lock = await client.getMailboxLock(MAILBOX)
    } catch (error) {
      console.error(
        `[${this.persona.id}] kunde inte ansluta: ${error instanceof Error ? error.message : error}`,
      )
      await client.logout().catch(() => undefined)
      this.client = null
      this.scheduleReconnect()
      return
    }

    this.backoff = FIRST_BACKOFF_MS
    console.log(
      `[${this.persona.id}] lyssnar pa ${MAILBOX} som ${this.persona.address}` +
        `${this.dryRun ? ' (torrkorning)' : ''}`,
    )

    // En forsta omgang sa vi inte missar nagot som kom in medan vi var nere.
    this.requestRound()

    if (this.poll) clearInterval(this.poll)
    this.poll = setInterval(() => this.heartbeat(), POLL_MS)
    if (typeof this.poll.unref === 'function') this.poll.unref()
  }

  private scheduleReconnect(): void {
    if (this.stopped || this.reconnect) return

    this.clearTimers()
    this.lock?.release()
    this.lock = null

    const client = this.client
    this.client = null
    if (client) void client.logout().catch(() => undefined)

    const wait = this.backoff
    this.backoff = Math.min(this.backoff * 2, MAX_BACKOFF_MS)
    console.log(`[${this.persona.id}] forsoker igen om ${Math.round(wait / 1000)} s.`)

    this.reconnect = setTimeout(() => {
      this.reconnect = null
      void this.connect()
    }, wait)
    if (typeof this.reconnect.unref === 'function') this.reconnect.unref()
  }

  private clearTimers(): void {
    if (this.poll) clearInterval(this.poll)
    if (this.reconnect) clearTimeout(this.reconnect)
    this.poll = null
    this.reconnect = null
  }

  /** Varje minut: ar anslutningen frisk? Och finns det olast vi missat? */
  private heartbeat(): void {
    if (this.stopped) return
    const client = this.client
    if (!client || !client.usable || !this.lock) {
      console.warn(`[${this.persona.id}] anslutningen ar inte anvandbar — kopplar upp igen.`)
      this.scheduleReconnect()
      return
    }
    this.requestRound()
  }

  // -------------------------------------------------------------------------
  // En omgang
  // -------------------------------------------------------------------------

  private requestRound(): void {
    if (this.stopped) return
    if (this.running) {
      this.pending = true
      return
    }
    void this.runRound()
  }

  private async runRound(): Promise<void> {
    const client = this.client
    if (!client || !this.lock) return

    this.running = true
    try {
      do {
        this.pending = false
        // lock: false — laset halls redan av den har klassen. Att ta ett till
        // pa samma brevlåda skulle vanta pa sig sjalvt for evigt.
        const round = await processMailbox(client, this.credentials, this.persona, {
          dryRun: this.dryRun,
          lock: false,
        })

        if (round.handled) {
          const tally = round.results.map(({ result }) => result.action).join(', ')
          console.log(`[${this.persona.id}] ${round.handled} mejl: ${tally}`)
        }
        if (round.stopped) {
          console.warn(`[${this.persona.id}] sandning misslyckades — provar igen om en stund.`)
          this.pending = true
          break
        }
      } while (this.pending)
    } catch (error) {
      console.error(
        `[${this.persona.id}] omgangen misslyckades: ${error instanceof Error ? error.message : error}`,
      )
    } finally {
      this.running = false
    }
  }
}

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  loadEnv()
  const argv = process.argv.slice(2)

  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(HELP)
    return
  }

  const dryRun = !(argv.includes('--send') || argv.includes('--yes'))
  if (argv.includes('--backlog')) process.env.PROCESS_BACKLOG = 'true'

  const named = argv.find((value) => !value.startsWith('-')) ?? null
  if (named !== null && !isPersonaId(named)) {
    throw new Error(`Okand brevlåda "${named}". Valj: ${allPersonas.map((p) => p.id).join(', ')}.`)
  }
  const targets = named !== null && isPersonaId(named) ? [personas[named]] : allPersonas

  const workers: MailboxWorker[] = []
  for (const persona of targets) {
    const credentials = credentialsFor(persona.id)
    if (!credentials) {
      const keys = envKeysFor(persona.id)
      console.warn(`[${persona.id}] hoppar over — ${keys.user} / ${keys.pass} saknas i agents/.env`)
      continue
    }
    workers.push(new MailboxWorker(persona, credentials, dryRun))
  }

  if (workers.length === 0) {
    throw new Error('Inga brevlådor att lyssna pa. Fyll i agents/.env (se .env.example).')
  }

  // Envakt: vi vagrar starta om en levande arbetare redan kor. Tva samtidiga
  // processer skulle kunna svara tva ganger pa samma kundmejl.
  acquireWorkerLock()

  console.log(
    `\nEntropic Defence — arbetaren startar ${workers.length} lyssnare.\n` +
      `  Lage:        ${dryRun ? 'TORRKORNING (ingenting skickas)' : 'SKARPT (svar skickas)'}\n` +
      `  Backlåda:    ${processBacklog() ? 'ja' : 'nej'}\n` +
      `  Lasta:       ${markAsSeen() ? 'ja' : 'nej'}\n` +
      `  Envakt:      logs/worker.pid (bara en arbetare i taget)\n` +
      `  Stoppa med:  Ctrl+C\n`,
  )

  let shuttingDown = false
  const shutdown = async (signal: string): Promise<void> => {
    if (shuttingDown) return
    shuttingDown = true
    console.log(`\n${signal} — stanger ner...`)
    await Promise.all(workers.map((worker) => worker.stop()))
    process.exit(0)
  }

  process.on('SIGINT', () => void shutdown('SIGINT'))
  process.on('SIGTERM', () => void shutdown('SIGTERM'))

  for (const worker of workers) worker.start()
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
