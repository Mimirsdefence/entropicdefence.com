/**
 * Språkmodellen. Leverantörsoberoende: allt som talar OpenAI-kompatibelt
 * /chat/completions fungerar (xAI, DeepSeek, OpenAI …) — byt bara LLM_BASE_URL
 * och LLM_MODEL i agents/.env.
 */

import type { AbuseLevel, AgentDecision, InvoiceOrder } from './types.js'
import { INVOICE_PERIODS, INVOICE_PLANS, INVOICE_TIERS } from './types.js'

const TIMEOUT_MS = 90_000

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

function readConfig(): { apiKey: string; model: string; baseUrl: string } {
  const apiKey = (process.env.LLM_API_KEY ?? '').trim()
  const model = (process.env.LLM_MODEL ?? '').trim()
  const baseUrl = (process.env.LLM_BASE_URL ?? 'https://api.x.ai/v1').trim().replace(/\/+$/, '')

  if (!apiKey) throw new Error('LLM_API_KEY saknas. Kopiera agents/.env.example till agents/.env och fyll i.')
  if (!model) throw new Error('LLM_MODEL saknas (t.ex. grok-4, deepseek-chat eller gpt-4o-mini).')

  return { apiKey, model, baseUrl }
}

interface ChatCompletionResponse {
  choices?: { message?: { content?: string } }[]
}

/**
 * Ett anrop mot modellen. Temperaturen är låg för granskning (Forseti ska vara
 * förutsägbar) och något högre för svaren till kunderna.
 */
async function chat(messages: ChatMessage[], temperature: number): Promise<string> {
  const { apiKey, model, baseUrl } = readConfig()

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      response_format: { type: 'json_object' },
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })

  if (!response.ok) {
    const body = (await response.text()).slice(0, 400)
    throw new Error(`Språkmodellen svarade ${response.status}: ${body}`)
  }

  const data = (await response.json()) as ChatCompletionResponse
  return data.choices?.[0]?.message?.content ?? ''
}

/** Agentens svar, tolkat som det besluts-objekt `base.md` beskriver. */
export async function askAgent(messages: ChatMessage[]): Promise<AgentDecision> {
  return parseDecision(await chat(messages, 0.6))
}

/**
 * Rå JSON från modellen — för anropare med ett eget kontrakt (Forseti). Kastar
 * om svaret inte går att läsa som ett JSON-objekt.
 */
export async function askJson(
  messages: ChatMessage[],
  temperature = 0.2,
): Promise<Record<string, unknown>> {
  return extractJson(await chat(messages, temperature))
}

/**
 * Laser modellens bestallning. Allt maste vara ifyllt och igenkant — ett enda
 * okant paket, en tom fakturamottagare eller ett halvt org.nr ger `null`, sa
 * ett slarvigt svar aldrig kan bli en faktura.
 *
 * Ett utkast som kastas loggas alltid med skal: annars ser en tyst `null` ut
 * som att modellen lat bli, och da gar felet inte att hitta.
 */
export function parseInvoiceOrder(value: unknown): InvoiceOrder | null {
  const reject = (reason: string): null => {
    console.warn(`[llm] fakturautkast forkastades: ${reason}`)
    return null
  }

  // Modellen skriver `null` nar ingen bestallning finns — det är normalt.
  if (value === null || value === undefined) return null
  if (typeof value !== 'object' || Array.isArray(value)) {
    return reject('invoice var inte ett objekt')
  }

  const raw = value as Record<string, unknown>

  // Modellen skriver ibland camelCase dar prompten sager snake_case ("orgNr"
  // i stallet for "org_nr"). Vi laser bada formerna — ett fullstandigt svar
  // ska inte kastas pa en nyckelform.
  const text = (...keys: string[]): string => {
    for (const key of keys) {
      const field = raw[key]
      if (typeof field === 'string' && field.trim()) return field.trim()
    }
    return ''
  }

  // "Månad" ska bli "manad" och "Month" bli "month" — vardet jamfors mot listan.
  const normalize = (value: string): string =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()

  const company = text('company', 'company_name', 'companyName', 'foretag', 'företag')
  const orgNr = text(
    'org_nr',
    'orgNr',
    'orgnr',
    'organisationsnummer',
    'organization_number',
    'organizationNumber',
  )
  const vatNumber = text('vat_number', 'vatNumber', 'vat', 'vat_nr', 'vatNr')
  const email = text('email', 'e_post', 'ePost')
  const reference = text('reference', 'referens')
  const plan = normalize(text('plan'))
  const tier = normalize(text('tier', 'niva', 'nivå', 'level'))
  const period = normalize(text('period'))

  // Foretagsnamn och ett organisationsnummer eller VAT-nummer maste finnas.
  if (!company || (!orgNr && !vatNumber)) {
    return reject(`foretagsnamn eller organisationsnummer/VAT-nummer saknas (nycklar: ${Object.keys(raw).join(', ')})`)
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reject(`ogiltig e-postadress: ${email}`)
  if (!(INVOICE_PLANS as readonly string[]).includes(plan)) {
    return reject(`okand plan "${plan}" (tillatna: ${INVOICE_PLANS.join(', ')})`)
  }
  if (!(INVOICE_TIERS as readonly string[]).includes(tier)) {
    return reject(`okand tier "${tier}" (tillatna: ${INVOICE_TIERS.join(', ')})`)
  }
  if (!(INVOICE_PERIODS as readonly string[]).includes(period)) {
    return reject(`okand period "${period}" (tillatna: ${INVOICE_PERIODS.join(', ')})`)
  }

  return {
    company,
    orgNr,
    vatNumber,
    email,
    reference,
    plan: plan as InvoiceOrder['plan'],
    tier: tier as InvoiceOrder['tier'],
    period: period as InvoiceOrder['period'],
  }
}

/**
 * Modellen ska svara med ren JSON, men vi tål ett kodblock eller en pratig
 * inledning utan att ge upp.
 */
export function extractJson(raw: string): Record<string, unknown> {
  const text = String(raw ?? '')
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/, '')
    .trim()

  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start === -1 || end <= start) throw new Error('Modellen svarade inte med JSON.')
    parsed = JSON.parse(text.slice(start, end + 1))
  }

  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('Modellen svarade med JSON som inte är ett objekt.')
  }

  return parsed as Record<string, unknown>
}

export function parseDecision(raw: string): AgentDecision {
  const obj = extractJson(raw)
  const control = (obj.control ?? {}) as Record<string, unknown>

  const rawLevel = control.abuse_level
  const abuseLevel: AbuseLevel = rawLevel === 'mild' || rawLevel === 'severe' ? rawLevel : 'normal'

  const escalate = control.escalate === true
  const notifyOwner = control.notify_owner === true && !escalate
  const purchaseIntent = control.purchase_intent === true
  const reply = escalate ? '' : typeof obj.reply === 'string' ? obj.reply.trim() : ''

  // Hållbeskedet finns bara när ärendet går till en människa och tonen är normal.
  // Vid mild eller severe ton ska kunden inte få något svar alls.
  const holdReply =
    escalate && abuseLevel === 'normal' && typeof obj.hold_reply === 'string'
      ? obj.hold_reply.trim().slice(0, 600)
      : ''

  return {
    reply,
    holdReply,
    abuseLevel,
    escalate,
    escalateReason: typeof obj.escalate_reason === 'string' ? obj.escalate_reason.trim() : '',
    notifyOwner,
    purchaseIntent,
    summary: typeof obj.summary === 'string' ? obj.summary.trim().slice(0, 400) : '',
    invoice: escalate ? null : parseInvoiceOrder(obj.invoice),
  }
}
