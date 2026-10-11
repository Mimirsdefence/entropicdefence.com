/**
 * Forseti — revisorn.
 *
 * Innan ett svar lämnar huset går det genom två steg:
 *
 *  1. **Regel-linten** (`lintDraft`): maskinell kontroll av sådant som aldrig
 *     får stå i ett kundsvar — mötesförslag, platshållare — och av varje belopp
 *     mot prislistan. Snabb, gratis och förutsägbar. Det är här den typen av fel
 *     som modellen gör om och om igen fångas.
 *  2. **Den språkliga granskningen** (`askForseti`): modellen får läsa sitt eget
 *     utkast med revisorns ögon och letar dubbeltydigheter, löften, internsnack
 *     och sådant som motsäger sajten.
 *
 * Blir utkastet underkänt skriver agentskaparen om, men bara
 * `MAX_REVIEW_ROUNDS` varv. Därefter går ärendet till en människa i stället — vi
 * loopar aldrig i evighet, och inget omedvetet felaktigt mejl går ut.
 */

import {
  EXTERNAL_PLAN_IDS,
  EXTERNAL_PRICES,
  INTERNAL_RATE,
  PAGE_TIER_KEYS,
  PERIOD_KEYS,
  periodPrice,
} from '../stripe/catalog.js'
import type { BillingPeriod } from '../stripe/catalog.js'
import { askJson } from './llm.js'
import { buildReviewPrompt } from './prompt.js'
import type { AgentDecision, IncomingMail, Persona } from './types.js'

/** Extra varv revisorn får be om innan ärendet går till en människa. */
export const MAX_REVIEW_ROUNDS = 2

/** Högsta antal anmärkningar som skickas tillbaka till agentskaparen. */
const MAX_ISSUES = 5

export interface ReviewIssue {
  /** Kort regelnamn — hamnar i loggen. */
  rule: string
  /** Vad som ska ändras, formulerat som en instruktion till agentskaparen. */
  detail: string
}

export interface DraftContext {
  persona: Persona
  mail: IncomingMail
}

/** Texten kunden faktiskt skulle få se av utkastet. */
export function customerText(decision: AgentDecision): string {
  return decision.escalate ? decision.holdReply : decision.reply
}

/* ------------------------------------------------------------------ priser */

const PERIOD_MONTHS: Record<BillingPeriod, number> = {
  month: 1,
  quarter: 3,
  year: 12,
}

/**
 * Alla belopp som får stå i ett kundsvar, i kronor: månadspriset för varje plan,
 * storlek och period — både exkl. och inkl. 25 % moms — hela periodens summa,
 * och konsulttimmen. Allt annat är ett tal modellen hittat på.
 */
const ALLOWED_AMOUNTS: ReadonlySet<number> = buildAllowedAmounts()

function buildAllowedAmounts(): ReadonlySet<number> {
  const amounts = new Set<number>()
  const add = (value: number): void => {
    amounts.add(value)
    amounts.add(Math.round(value * 1.25))
  }

  for (const plan of EXTERNAL_PLAN_IDS) {
    for (const tier of PAGE_TIER_KEYS) {
      for (const period of PERIOD_KEYS) {
        const monthly = periodPrice(EXTERNAL_PRICES[plan][tier], period)
        add(monthly)
        add(monthly * PERIOD_MONTHS[period])
      }
    }
  }

  add(INTERNAL_RATE)
  return amounts
}

/** "24 900 kr", "1 500 SEK", "31 125 kronor" — men inte "inom 24 timmar". */
const AMOUNT_PATTERN = /(\d[\d\s\u00a0.,]*)\s*(?:kr\/?mån|kr|sek|kronor)\b/gi

/** Alla belopp som nämns i texten, som heltal kronor. */
export function findAmounts(text: string): number[] {
  const amounts: number[] = []
  for (const match of text.matchAll(AMOUNT_PATTERN)) {
    const value = Number((match[1] ?? '').replace(/\D/g, ''))
    if (Number.isFinite(value) && value > 0) amounts.push(value)
  }
  return amounts
}

/* ------------------------------------------------------------------ linten */

/** Formuleringar som antyder ett samtal, ett möte eller en tid. */
const MEETING_PATTERNS: RegExp[] = [
  /\bbok\w*/i,
  /\bsamtal\w*/i,
  /\bmöte\w*/i,
  /\bvideosamtal\w*/i,
  /\bträffas\b/i,
  /\bzoom\b/i,
  /\bmeeting\w*/i,
  /\bschedule\w*/i,
  /\bappointment\w*/i,
  /\bcall\b/i,
  /\bringa\b/i,
]

/** Platshållare och mallrester som aldrig ska nå en kund. */
const PLACEHOLDER_PATTERNS: RegExp[] = [
  /\{\{/,
  /\}\}/,
  /\[[A-Za-zÅÄÖåäö ]{2,30}\]/,
  /\bXXX+\b/,
  /\bINSERT\b/i,
]

function lintText(text: string): ReviewIssue[] {
  const issues: ReviewIssue[] = []
  // En anmärkning per regel räcker: modellen ska få ett kort och tydligt besked,
  // inte samma sak upprepad fem gånger.
  const add = (rule: string, detail: string): void => {
    if (issues.length < MAX_ISSUES && !issues.some((issue) => issue.rule === rule)) {
      issues.push({ rule, detail })
    }
  }

  for (const pattern of MEETING_PATTERNS) {
    const match = text.match(pattern)
    if (match) {
      add(
        'motesforbud',
        `Formuleringen "${match[0]}" antyder ett samtal, ett möte eller en tid. Stryk meningen — vi bokar aldrig in något, hela dialogen sker via mejl.`,
      )
    }
  }

  for (const pattern of PLACEHOLDER_PATTERNS) {
    const match = text.match(pattern)
    if (match) {
      add(
        'platshallare',
        `Texten innehåller platshållaren "${match[0]}". Skriv ut det riktiga ordet, eller stryk meningen.`,
      )
    }
  }

  const unknown = [...new Set(findAmounts(text))].filter((amount) => !ALLOWED_AMOUNTS.has(amount))
  for (const amount of unknown) {
    add(
      'pris',
      `Beloppet ${amount.toLocaleString('sv-SE')} kr står inte i prislistan. Använd ett belopp som står ordagrant i prislistan — eller nämn bara rabatten i procent.`,
    )
  }

  return issues.slice(0, MAX_ISSUES)
}

/**
 * Den maskinella kontrollen. Returnerar anmärkningarna i klartext, eller en tom
 * lista när utkastet är okej. Ingen modell, inget nät — bara regler.
 */
export function lintDraft(decision: AgentDecision, _persona?: Persona): ReviewIssue[] {
  const text = customerText(decision)
  if (!text.trim()) return []
  return lintText(text)
}

/* ------------------------------------------------------- den språkliga delen */

function reviewUserMessage(context: DraftContext, decision: AgentDecision): string {
  const { persona, mail } = context
  const text = customerText(decision) || '(ingen text alls)'

  return [
    `Agent: ${persona.displayName} <${persona.address}> (${persona.id}), roll: ${persona.role}`,
    '',
    '--- kundens mejl ---',
    `Från: ${mail.fromName} <${mail.from}>`,
    `Ämne: ${mail.subject}`,
    '',
    mail.text,
    '',
    '--- agentens utkast ---',
    `Beslut: ${decision.escalate ? 'eskaleras till en människa' : 'svar till kunden'}${
      decision.notifyOwner ? ' (kopia till ägaren)' : ''
    }`,
    `Ton: ${decision.abuseLevel}`,
    decision.escalateReason ? `Skäl till eskalering: ${decision.escalateReason}` : '',
    '',
    'Text till kunden:',
    text,
  ]
    .filter((line) => line !== '')
    .join('\n')
}

/**
 * Den språkliga granskningen. Kastar aldrig: ett trasigt modellanrop får inte
 * stoppa ett svar som regel-linten redan godkänt — det loggas i stället.
 */
export async function askForseti(
  decision: AgentDecision,
  context: DraftContext,
): Promise<ReviewIssue[]> {
  const raw = await askJson([
    { role: 'system', content: buildReviewPrompt() },
    { role: 'user', content: reviewUserMessage(context, decision) },
  ])

  if (raw.verdict !== 'fix') return []

  const listed = Array.isArray(raw.issues) ? raw.issues : []
  const details = listed
    .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    .map((item) => item.trim().slice(0, 300))
    .slice(0, MAX_ISSUES)

  if (details.length === 0) {
    return [
      {
        rule: 'revisor',
        detail:
          'Revisorn underkände utkastet utan att säga varför. Skriv ett kortare, sakligare svar utan löften och utan att nämna något internt.',
      },
    ]
  }

  return details.map((detail) => ({ rule: 'revisor', detail }))
}

/**
 * Hela granskningen av ett utkast: regler först (facit), sedan den språkliga
 * bedömningen. Tom lista = svaret får skickas.
 */
export async function judgeDraft(
  decision: AgentDecision,
  context: DraftContext,
): Promise<ReviewIssue[]> {
  const issues = lintDraft(decision, context.persona)
  if (!customerText(decision).trim()) return issues

  try {
    issues.push(...(await askForseti(decision, context)))
  } catch (error) {
    console.warn(
      `[forseti] språklig granskning kunde inte köras: ${error instanceof Error ? error.message : String(error)}`,
    )
  }

  return issues.slice(0, MAX_ISSUES)
}

/* ------------------------------------------------- vad agenten ska ändra på */

/** Agentens beslut som JSON — den tur agenten får se när den ska skriva om. */
export function wireJson(decision: AgentDecision): string {
  return JSON.stringify({
    reply: decision.reply,
    hold_reply: decision.holdReply,
    control: {
      abuse_level: decision.abuseLevel,
      escalate: decision.escalate,
      notify_owner: decision.notifyOwner,
      purchase_intent: decision.purchaseIntent,
    },
    escalate_reason: decision.escalateReason,
    summary: decision.summary,
    invoice: decision.invoice,
  })
}

/** Instruktionen som skickas tillbaka till agentskaparen vid ett underkänt utkast. */
export function reviewInstruction(issues: ReviewIssue[]): string {
  return [
    'Forseti, vår revisor, har läst ditt utkast och godkänner det inte. Skriv om hela svaret och åtgärda exakt detta:',
    ...issues.map((issue) => `- ${issue.detail}`),
    'Svara fortfarande med exakt samma JSON-objekt och ingenting annat.',
  ].join('\n')
}

/** Kort sammanfattning av anmärkningarna, för logg och ägar-mejl. */
export function describeIssues(issues: ReviewIssue[]): string {
  return issues.map((issue) => `${issue.rule}: ${issue.detail}`).join(' | ')
}
