/**
 * Entropic Defence — mejlagenter, lokal testklient.
 *
 * Det har ar kommandot du kor sjalv for att se att allt fungerar. Standardlage
 * ar torrkorning: agenten laser, tanker och skriver svaret i terminalen, men
 * ingenting skickas och inga rakneverk flyttas.
 *
 *   npm run check                     logga in pa IMAP + SMTP, lista mappar
 *   npm run guardrails                sjalvtest av skyddsreglerna (ingen server)
 *   npm run once                      en omgang, torrkorning (inget skickas)
 *   npm run once -- --send            samma omgang, men skickar pa riktigt
 *   npm run once -- --send support    bara support@
 *   npm run once -- --backlog         rakna aven med mejl som redan ligger dar
 *   npm run once -- --send --force    aven om arbetaren kor (kan ge dubbelt svar)
 *
 * Kraschar en sandning lamnas mejlet kvar och provas igen nasta omgang.
 *
 * Kor arbetaren (`npm run worker`) samtidigt vagrar vi skicka en skarp omgang:
 * samma mejl skulle kunna besvaras tva ganger. Torrkorning ar alltid tillaten.
 */
import { credentialsFor, envKeysFor, loadEnv, ownerEmail, processBacklog } from './core/env.js'
import { processMailbox } from './core/agent.js'
import {
  ABUSE_STOP_THRESHOLD,
  MAX_REPLIES_PER_SENDER_PER_DAY,
  MAX_REFUSAL_RETRIES,
  isRefusal,
  isSilenced,
  nextAbuseCount,
  toneFor,
} from './core/guardrails.js'
import { createImapClient, isNoReplyAddress, listMailboxes, verifyImap, verifySmtp } from './core/mail.js'
import { runningWorker } from './core/lock.js'
import { usingRedis } from './core/store.js'
import { allPersonas, isPersonaId, personas } from './personas/index.js'
import type { Persona } from './core/types.js'

const HELP = `Entropic Defence — mejlagenter (lokal testklient)

  npm run check                 logga in pa IMAP + SMTP, lista mappar (skickar inget)
  npm run guardrails            sjalvtest av skyddsreglerna (ingen server kravs)
  npm run once                  en omgang, torrkorning — svaren skrivs ut har
  npm run once -- --send        skickar pa riktigt (endast mot testkonto!)
  npm run once -- --send support    bara support@entropicdefence.com
  npm run once -- --backlog     hantera aven mejl som redan ligger i brevlådan
  npm run once -- --send --force    aven om arbetaren kor (kan ge dubbelt svar)

  Torrkorning ar standard. Ingenting lamnar huset utan --send.`

// ---------------------------------------------------------------------------
// Argument
// ---------------------------------------------------------------------------

interface Args {
  command: string
  send: boolean
  backlog: boolean
  force: boolean
  only: Persona | null
}

function parseArgs(argv: string[]): Args {
  const [command = 'help', ...rest] = argv
  const flags = new Set(rest.filter((value) => value.startsWith('-')))

  let only: Persona | null = null
  for (const value of rest) {
    if (value.startsWith('-')) continue
    if (!isPersonaId(value)) {
      throw new Error(`Okand brevlåda "${value}". Valj: ${allPersonas.map((p) => p.id).join(', ')}.`)
    }
    if (only !== null) throw new Error('Bara en brevlåda i taget.')
    only = personas[value]
  }

  return {
    command,
    send: flags.has('--send') || flags.has('--yes'),
    backlog: flags.has('--backlog'),
    force: flags.has('--force'),
    only,
  }
}

/** Miljovariabeln PROCESS_BACKLOG styr normalt; --backlog tvingar for en korning. */
function backlogFor(args: Args): boolean {
  if (args.backlog) process.env.PROCESS_BACKLOG = 'true'
  return processBacklog()
}

function targets(only: Persona | null): Persona[] {
  return only ? [only] : allPersonas
}

async function forEachTarget(only: Persona | null, run: (persona: Persona) => Promise<void>): Promise<void> {
  for (const persona of targets(only)) {
    if (!credentialsFor(persona.id)) {
      const keys = envKeysFor(persona.id)
      console.warn(`[${persona.id}] hoppar over — ${keys.user} / ${keys.pass} saknas i agents/.env`)
      continue
    }
    try {
      await run(persona)
    } catch (error) {
      console.error(`[${persona.id}] fel:`, error instanceof Error ? error.message : error)
    }
  }
}

// ---------------------------------------------------------------------------
// check — fungerar inloggningarna?
// ---------------------------------------------------------------------------

async function runCheck(only: Persona | null): Promise<void> {
  await forEachTarget(only, async (persona) => {
    const credentials = credentialsFor(persona.id)!
    console.log(`\n=== ${persona.address} (${persona.role}) ===`)

    const imap = await verifyImap(credentials)
    console.log(`  IMAP  OK — ${imap.mailboxes.length} mappar`)
    console.log(`  Mappar: ${imap.mailboxes.map((box) => box.path).join(', ')}`)
    console.log(`  Skickat-mapp: ${imap.sentFolder ?? 'HITTADES INTE (svaren sparas inte i Sent)'}`)

    const smtp = await verifySmtp(credentials)
    console.log(`  SMTP  ${smtp ? 'OK' : 'FEL'}`)
  })
}

// ---------------------------------------------------------------------------
// once — en omgang mot brevlådorna
// ---------------------------------------------------------------------------

async function runOnce(args: Args): Promise<void> {
  const dryRun = !args.send

  // Kor arbetaren redan? En skarp omgang samtidigt kan svara pa samma mejl
  // tva ganger — kunden far dubbelt svar. Torrkorning ar daremot ofarlig.
  const worker = runningWorker()
  if (worker !== null && !dryRun && !args.force) {
    throw new Error(
      `Arbetaren kor redan (pid ${worker}). Stoppa den forst — annars kan samma mejl besvaras tva ganger. ` +
        'Kor med --force bara om du ar saker.',
    )
  }

  console.log(
    dryRun
      ? '\nTORRKORNING — ingenting skickas, svaren skrivs ut nedan.\n'
      : '\nSKARPT LAGE — svar skickas pa riktigt och sparas i Sent.\n',
  )
  if (worker !== null) {
    console.log(`  OBS: arbetaren kor samtidigt (pid ${worker}) — samma mejl kan visas har ocksa.`)
  }
  console.log(`  Lagringsplats: ${usingRedis() ? 'Redis (Upstash)' : 'lokal fil'}  ·  backlåda: ${backlogFor(args) ? 'ja' : 'nej'}`)
  if (!dryRun && !ownerEmail()) {
    console.warn('  Varning: OWNER_EMAIL saknas — eskaleringar kan inte meddelas.')
  }

  await forEachTarget(args.only, async (persona) => {
    const credentials = credentialsFor(persona.id)!
    const client = createImapClient(credentials)
    console.log(`\n=== ${persona.address} ===`)

    await client.connect()
    try {
      const mailboxes = await listMailboxes(client)
      console.log(`  ${mailboxes.length} mappar tillgangliga`)

      const round = await processMailbox(client, credentials, persona, { dryRun })
      if (!round.handled) {
        console.log('  Inga nya mejl att hantera.')
        return
      }

      for (const { mail, result } of round.results) {
        const who = mail.fromName ? `${mail.fromName} <${mail.from}>` : mail.from
        console.log(`  · uid ${mail.uid}  ${result.action.padEnd(9)}  ${who}  "${mail.subject}"`)
        if (result.reason) console.log(`      orsak: ${result.reason}`)
      }
      console.log(
        `  ${round.handled} mejl hanterade${round.stopped ? ' (avbrots — ett mejl sparas till nasta omgang)' : ''}`,
      )
    } finally {
      await client.logout().catch(() => undefined)
    }
  })
}

// ---------------------------------------------------------------------------
// guardrails — sjalvtest utan server
// ---------------------------------------------------------------------------

interface Check {
  name: string
  got: unknown
  want: unknown
}

/** Kollar att skyddsreglerna beter sig som specat. Returnerar antal fel. */
function runGuardrails(): number {
  const checks: Check[] = []
  const expect = (name: string, got: unknown, want: unknown): void => {
    checks.push({ name, got, want })
  }

  // Naddtrappan: mild=1, allvarlig=3, taket vid 10.
  expect('nadd 0 + mild', nextAbuseCount(0, 'mild'), 1)
  expect('nadd 0 + allvarlig', nextAbuseCount(0, 'severe'), 3)
  expect('nadd 1 + mild', nextAbuseCount(1, 'mild'), 2)
  expect('nadd 1 + allvarlig', nextAbuseCount(1, 'severe'), 4)
  expect('nadd 7 + allvarlig', nextAbuseCount(7, 'severe'), 10)
  expect('taket stannar vid 10', nextAbuseCount(10, 'severe'), 10)
  expect('normal paverkar inte', nextAbuseCount(1, 'normal'), 1)

  // Tystad avsandare.
  expect('nadd 10 = tystad', isSilenced(ABUSE_STOP_THRESHOLD), true)
  expect('nadd 9 = inte tystad', isSilenced(ABUSE_STOP_THRESHOLD - 1), false)

  // Tonen skarpas stegvis: normal → mild → warning (vid 8–9).
  expect('ton normal vid 0', toneFor(0), 'normal')
  expect('ton mild vid 1', toneFor(1), 'mild')
  expect('ton mild vid 7', toneFor(7), 'mild')
  expect('ton warning vid 8', toneFor(8), 'warning')
  expect('ton warning vid 9', toneFor(9), 'warning')

  // Undanflykter ska fangas upp och goras om.
  expect('undanflykt: "I cannot help you with that request"', isRefusal('I cannot help you with that request.'), true)
  expect('undanflykt: "Jag ar bara en AI"', isRefusal('Jag ar bara en AI.'), true)
  expect('riktigt svar ar ingen undanflykt', isRefusal('Hej! Vi kan gora en sakerhetsgenomgang i nasta vecka.'), false)

  // Automatsvar ska aldrig besvaras.
  expect('no-reply-adress', isNoReplyAddress('no-reply@example.com'), true)
  expect('mailer-daemon', isNoReplyAddress('MAILER-DAEMON@example.com'), true)
  expect('vanlig kund', isNoReplyAddress('anna@foretaget.se'), false)

  // Korten: svarstak per avsandare och dygn.
  expect('svarstak per avsandare/dygn', MAX_REPLIES_PER_SENDER_PER_DAY, 15)
  expect('omforsok innan eskalering', MAX_REFUSAL_RETRIES, 3)
  expect('tysta-troskel', ABUSE_STOP_THRESHOLD, 10)

  let failed = 0
  for (const check of checks) {
    const ok = check.got === check.want
    if (!ok) failed += 1
    console.log(
      `  ${ok ? 'OK  ' : 'FEL '} ${check.name}${ok ? '' : ` — fick ${String(check.got)}, ville ${String(check.want)}`}`,
    )
  }

  console.log(`\n  ${checks.length - failed}/${checks.length} kontroller OK.`)
  return failed
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  loadEnv()
  const args = parseArgs(process.argv.slice(2))

  switch (args.command) {
    case 'check':
      await runCheck(args.only)
      break
    case 'once':
      await runOnce(args)
      break
    case 'guardrails': {
      const failed = runGuardrails()
      if (failed > 0) process.exitCode = 1
      break
    }
    default:
      console.log(HELP)
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
