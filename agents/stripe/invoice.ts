/**
 * Skapar fakturautkast i Stripe — köpvägen för Consultant-agenten.
 *
 * Ägarens beslut: faktura med 30 dagars betalningstid är standard, och agenten
 * skapar den som UTKAST. Ingenting går till kunden förrän ägaren öppnar
 * utkastet i Stripe och klickar "Skicka". Vill kunden betala direkt används i
 * stället den fasta betallänken från `npm run stripe:apply`.
 *
 *   npm run stripe:invoice                 torrkörning med exempelkund (ingen nyckel krävs)
 *   npm run stripe:invoice -- --apply      skapar kund + fakturautkast i Stripe
 *
 * Beloppen kommer från `catalog.ts`, som i sin tur speglar sajtens
 * `src/data/packages.ts`. Momsen avgörs av land + VAT-nummer, aldrig av
 * modellen: Sverige 25 %, EU-B2B med VAT-nummer 0 % (omvänd skattskyldighet),
 * allt annat lämnas utan moms och flaggas till ägaren.
 */
import { loadEnv } from '../core/env.js'
import {
  PERIOD_KEYS,
  PERIOD_NAMES,
  PLAN_NAMES,
  TIER_NAMES,
  EXTERNAL_PLAN_IDS,
  PAGE_TIER_KEYS,
  priceSpecFor as catalogPriceSpecFor,
  type BillingPeriod,
  type ExternalPlanId,
  type PageTierKey,
  type PriceSpec,
} from './catalog.js'
import {
  dashboardUrl,
  formatKr,
  keyMode,
  listAll,
  readMap,
  requireSecretKey,
  stripeRequest,
  type StripeCustomer,
  type StripeInvoice,
  type StripeMode,
  type StripeMap,
} from './client.js'

/** Länderna i EU (används för att avgöra om omvänd skattskyldighet är rätt). */
const EU_COUNTRIES = [
  'AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'EL', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU',
  'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK',
]

const DUE_DAYS = 30

export interface InvoiceRequest {
  company: string
  orgNr: string
  vatNumber: string
  email: string
  reference: string
  plan: ExternalPlanId
  tier: PageTierKey
  period: BillingPeriod
  /** ISO 3166-1 alpha-2, t.ex. SE, DE, NO. Tomt = okänt. */
  country: string
}

export interface InvoiceResult {
  customerId: string
  customerFound: boolean
  invoiceId: string
  dashboardUrl: string
  priceKey: string
  subtotalOre: number
  vatOre: number
  totalOre: number
  taxRateKey: string
  vatRate: number
  periodStart: string
  periodEnd: string
  dueDate: string
  warnings: string[]
}

interface TaxDecision {
  /** ed_key i .stripe-map.json, eller 'none' när ingen momssats kan väljas. */
  key: 'se_moms_25' | 'omvand_skattskyldighet' | 'none'
  rate: number
  note: string
  warning?: string
}

function decideTax(request: InvoiceRequest): TaxDecision {
  const country = request.country.trim().toUpperCase()
  const hasVat = request.vatNumber.trim().length > 0

  if (country === 'SE') {
    return { key: 'se_moms_25', rate: 25, note: 'Kund i Sverige — svensk moms 25 %.' }
  }
  if (hasVat && EU_COUNTRIES.includes(country)) {
    return {
      key: 'omvand_skattskyldighet',
      rate: 0,
      note: 'Kund i EU med VAT-nummer — omvänd skattskyldighet, 0 %.',
    }
  }
  if (hasVat) {
    return {
      key: 'omvand_skattskyldighet',
      rate: 0,
      note: `Kund utanför EU (${country || 'okänt land'}) — tjänsten faktureras utan svensk moms.`,
      warning: 'Land utanför EU med VAT-nummer: 0 % används (omvänd skattskyldighet visas på fakturan). Kontrollera bokföringen.',
    }
  }
  return {
    key: 'none',
    rate: 0,
    note: 'Land/VAT-nummer räcker inte för att avgöra momsen.',
    warning: 'MOMSSATS SAKNAS — fakturan skapas utan moms. Fyll i land och VAT-nummer, eller lägg på momsen manuellt i Stripe innan du skickar.',
  }
}

function priceSpecFor(request: InvoiceRequest): PriceSpec {
  try {
    return catalogPriceSpecFor(request.plan, request.tier, request.period)
  } catch {
    throw new Error(
      `Okänd kombination: plan=${request.plan} storlek=${request.tier} period=${request.period}. ` +
        `Giltiga: ${EXTERNAL_PLAN_IDS.join('/')} + ${PAGE_TIER_KEYS.join('/')} + ${PERIOD_KEYS.join('/')}.`,
    )
  }
}

function requireText(value: string, label: string): string {
  const trimmed = value.trim()
  if (!trimmed) throw new Error(`Underlaget saknar ${label} — be kunden om det innan fakturan skapas.`)
  return trimmed
}

function addMonths(from: Date, months: number): Date {
  const to = new Date(from.getTime())
  to.setUTCMonth(to.getUTCMonth() + months)
  return to
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function unixSeconds(date: Date): number {
  return Math.floor(date.getTime() / 1000)
}

/** Stable nyckel: samma kund + samma paket + samma period ger samma utkast. */
function invoiceKeyFor(request: InvoiceRequest): string {
  return `faktura_${request.email.trim().toLowerCase()}_${request.plan}_${request.tier}_${request.period}`
}

interface PeriodWindow {
  start: Date
  end: Date
  due: Date
}

function periodWindow(months: number, now = new Date()): PeriodWindow {
  // Starten läggs på dagen, inte på sekunden: samma beställning samma dag ska
  // ge exakt samma underlag, så att idempotensnyckeln mot Stripe kan återanvändas
  // (Stripe svarar annars "keys can only be used with the same parameters").
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const end = addMonths(start, months)
  const due = new Date(start.getTime() + DUE_DAYS * 24 * 60 * 60 * 1000)
  return { start, end, due }
}

export interface InvoicePlan {
  request: InvoiceRequest
  spec: PriceSpec
  tax: TaxDecision
  window: PeriodWindow
  subtotalOre: number
  vatOre: number
  totalOre: number
  warnings: string[]
  /** Stripes momssats-id för vald momssats (saknas när momsen inte kunde avgöras). */
  taxRateId?: string
  /** Säljarens momsreg.nr från .env (SELLER_VAT_NR) — visas i fakturans fottext. */
  sellerVat: string
  /** Rader som skulle skickas till Stripe vid --apply. */
  customerParams: Record<string, string | number | boolean>
  invoiceParams: Record<string, string | number | boolean>
  itemParams: Record<string, string | number | boolean>
}

/** Bygger hela planen utan att röra nätet — används av både torrkörning och --apply. */
export function buildInvoicePlan(
  request: InvoiceRequest,
  options: { taxRates?: Record<string, string> } = {},
): InvoicePlan {
  const company = requireText(request.company, 'företagsnamn')
  const email = requireText(request.email, 'fakturamejl')
  const reference = requireText(request.reference, 'referens')
  const orgNr = request.orgNr.trim()
  const vatNumber = request.vatNumber.trim()
  const sellerVat = (process.env.SELLER_VAT_NR ?? '').trim()

  const spec = priceSpecFor(request)
  const tax = decideTax(request)
  const window = periodWindow(spec.months)
  const taxRateId = tax.key === 'none' ? undefined : options.taxRates?.[tax.key]

  const warnings: string[] = []
  if (tax.warning) warnings.push(tax.warning)
  if (!orgNr) warnings.push('Organisationsnummer saknas i underlaget.')
  if (!email.includes('@')) warnings.push(`Fakturamejlet ser fel ut: ${email}`)
  if (!sellerVat) warnings.push('Säljarens momsreg.nr (SELLER_VAT_NR) saknas i .env — lägg in den innan fakturan skickas.')
  if (tax.key !== 'none' && options.taxRates && !taxRateId) {
    warnings.push(
      `Momssatsen ${tax.key} finns inte i .stripe-map.json — kör \`npm run stripe:apply\` först.`,
    )
  }

  const subtotalOre = spec.unitAmountOre
  const vatOre = Math.round((subtotalOre * tax.rate) / 100)
  const totalOre = subtotalOre + vatOre
  const key = invoiceKeyFor(request)

  const customerParams: Record<string, string | number | boolean> = {
    name: company,
    email,
    description: orgNr ? `${company} — org.nr ${orgNr}` : company,
    'metadata[ed_key]': `kund_${email.toLowerCase()}`,
    'metadata[ed_org_nr]': orgNr,
    'metadata[ed_vat]': vatNumber,
  }

  const invoiceParams: Record<string, string | number | boolean> = {
    collection_method: 'send_invoice',
    days_until_due: DUE_DAYS,
    auto_advance: false,
    currency: 'sek',
    description:
      `${PLAN_NAMES[request.plan]} — ${TIER_NAMES[request.tier]}. ` +
      `Period ${PERIOD_NAMES[request.period]}. Referens: ${reference}`,
    footer:
      `Entropic Defence · Godkänd för F-skatt` +
      `${sellerVat ? ` · Momsreg.nr ${sellerVat}` : ''}` +
      ` · Ange referens ${reference} vid betalning. Betalningstid ${DUE_DAYS} dagar.`,
    'metadata[ed_key]': key,
    'metadata[ed_company]': company,
    'metadata[ed_org_nr]': orgNr,
    'metadata[ed_vat]': vatNumber,
    'metadata[ed_reference]': reference,
    'metadata[ed_period]': request.period,
  }

  const itemParams: Record<string, string | number | boolean> = {
    // Raden prissätts med `amount` (öre, exkl. moms) i createDraftInvoice —
    // Stripe tillåter inte `amount` och `quantity` samtidigt, och prislistans
    // priser är återkommande medan en fakturarad bara tar engångsbelopp.
    description: `${PLAN_NAMES[request.plan]} — ${TIER_NAMES[request.tier]} (${PERIOD_NAMES[request.period]})`,
    'period[start]': unixSeconds(window.start),
    'period[end]': unixSeconds(window.end),
    'metadata[ed_key]': `${key}_rad`,
  }
  if (taxRateId) itemParams['tax_rates[0]'] = taxRateId

  return {
    request: { ...request, company, email, reference, orgNr, vatNumber },
    spec,
    tax,
    taxRateId,
    window,
    subtotalOre,
    vatOre,
    totalOre,
    warnings,
    sellerVat,
    customerParams,
    invoiceParams,
    itemParams,
  }
}

/** Mänsklig sammanfattning — samma text används i torrkörning och i mejlet till ägaren. */
export function describeInvoicePlan(plan: InvoicePlan, mode: StripeMode, link: string): string {
  const { request, spec, tax, window } = plan
  const lines = [
    `Kund:          ${request.company}${request.orgNr ? ` (org.nr ${request.orgNr})` : ''}`,
    `VAT-nummer:    ${request.vatNumber || '—'}`,
    `Fakturamejl:   ${request.email}`,
    `Referens:      ${request.reference}`,
    `Paket:         ${PLAN_NAMES[request.plan]} — ${TIER_NAMES[request.tier]}`,
    `Period:        ${PERIOD_NAMES[request.period]} (${spec.months} mån, ${isoDate(window.start)} → ${isoDate(window.end)})`,
    `Belopp:        ${formatKr(plan.subtotalOre)} exkl. moms + ${formatKr(plan.vatOre)} moms = ${formatKr(plan.totalOre)}`,
    `Moms:          ${tax.note}`,
    `Säljare:       Entropic Defence · Godkänd för F-skatt${plan.sellerVat ? ` · Momsreg.nr ${plan.sellerVat}` : ''}`,
    `Betalningstid: ${DUE_DAYS} dagar (förfaller ${isoDate(window.due)})`,
    `Läge:          ${mode}`,
  ]
  if (link) lines.push(`Utkast i Stripe: ${link}`)
  if (plan.warnings.length > 0) {
    lines.push('', 'Att granska:')
    for (const warning of plan.warnings) lines.push(`  ! ${warning}`)
  }
  return lines.join('\n')
}

/** Mejlet ägaren får varje gång ett utkast skapats. */
export function ownerNotification(
  plan: InvoicePlan,
  result: Pick<InvoiceResult, 'dashboardUrl' | 'invoiceId'>,
  mode: StripeMode,
): { subject: string; body: string } {
  const subject = `Fakturautkast att skicka: ${plan.request.company} — ${formatKr(plan.totalOre)}`
  const body = [
    `Ett fakturautkast ligger klart i Stripe (${mode}LÄGE) och väntar på ditt klick.`,
    '',
    describeInvoicePlan(plan, mode, result.dashboardUrl),
    '',
    'Så gör du:',
    '  1. Öppna länken ovan (Stripe-panelen).',
    '  2. Kontrollera uppgifterna.',
    '  3. Klicka "Skicka faktura" — först då får kunden mejlet.',
    '',
    `Stripe-id: ${result.invoiceId}`,
  ].join('\n')
  return { subject, body }
}

function requireMap(mode: StripeMode): StripeMap {
  const map = readMap()
  if (!map) {
    throw new Error('Kartan .stripe-map.json saknas — kör `npm run stripe:apply` först.')
  }
  if (map.mode !== mode) {
    throw new Error(
      `Kartan byggdes i ${map.mode}LÄGE men nyckeln är för ${mode}LÄGE. ` +
        'Kör `npm run stripe:apply` med rätt nyckel så pris-id matchar.',
    )
  }
  return map
}

/** Skapar (eller återanvänder) kunden. Befintlig kund lämnas orörd. */
async function ensureCustomer(
  secretKey: string,
  plan: InvoicePlan,
): Promise<{ id: string; found: boolean }> {
  const email = plan.request.email.trim().toLowerCase()
  const existing = await listAll<StripeCustomer>(secretKey, '/customers', { email })
  const found = existing[0]
  if (found) return { id: found.id, found: true }

  const created = await stripeRequest<StripeCustomer>(
    secretKey,
    'POST',
    '/customers',
    plan.customerParams,
    `ed-customer-${email}`,
  )
  return { id: created.id, found: false }
}

/** Skapar utkastet. Ingenting skickas till kunden — ägaren klickar "Skicka" i Stripe. */
export async function createDraftInvoice(request: InvoiceRequest): Promise<InvoiceResult> {
  const secretKey = requireSecretKey()
  const mode = keyMode(secretKey)
  const map = requireMap(mode)
  const plan = buildInvoicePlan(request, { taxRates: map.taxRates })

  // Prislistan i Stripe är byggd för abonnemang (type=recurring) och en
  // fakturarad tar bara engångspriser. Raden sätts därför med `amount` i öre
  // från vår egen prislista — samma belopp som `stripe:apply` lade in — och
  // momsen kommer från kartans momssats. Kartan behövs fortfarande för moms.
  const customer = await ensureCustomer(secretKey, plan)
  console.log(`${customer.found ? '=' : '+'} kund ${customer.id} (${plan.request.email})`)

  // Idempotensnyckeln får dagen i sig, så att en ny beställning en annan dag
  // blir en ny faktura medan en omkörning samma dag återanvänder samma utkast.
  const key = `${plan.invoiceParams['metadata[ed_key]'] as string}-${isoDate(plan.window.start)}`

  const invoice = await stripeRequest<StripeInvoice>(
    secretKey,
    'POST',
    '/invoices',
    { ...plan.invoiceParams, customer: customer.id },
    `ed-invoice-${key}`,
  )

  await stripeRequest(
    secretKey,
    'POST',
    '/invoiceitems',
    {
      ...plan.itemParams,
      customer: customer.id,
      invoice: invoice.id,
      amount: plan.subtotalOre,
      currency: 'sek',
    },
    `ed-item-${key}`,
  )

  return {
    customerId: customer.id,
    customerFound: customer.found,
    invoiceId: invoice.id,
    dashboardUrl: dashboardUrl(mode, `invoices/${invoice.id}`),
    priceKey: plan.spec.key,
    subtotalOre: plan.subtotalOre,
    vatOre: plan.vatOre,
    totalOre: plan.totalOre,
    taxRateKey: plan.tax.key,
    vatRate: plan.tax.rate,
    periodStart: isoDate(plan.window.start),
    periodEnd: isoDate(plan.window.end),
    dueDate: isoDate(plan.window.due),
    warnings: plan.warnings,
  }
}

/** Exempelunderlag för torrkörningen. `.example` kan aldrig nå en riktig brevlåda. */
export const DEMO_REQUEST: InvoiceRequest = {
  company: 'Testbolaget AB',
  orgNr: '556123-4567',
  vatNumber: '',
  email: 'faktura@testbolaget.example',
  reference: 'Test 2026-10',
  plan: 'vecka',
  tier: 'medium',
  period: 'quarter',
  country: 'SE',
}

function flagValue(name: string): string | undefined {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : undefined
}

function requestFromFlags(): InvoiceRequest {
  return {
    company: flagValue('--company') ?? DEMO_REQUEST.company,
    orgNr: flagValue('--orgnr') ?? DEMO_REQUEST.orgNr,
    vatNumber: flagValue('--vat') ?? DEMO_REQUEST.vatNumber,
    email: flagValue('--email') ?? DEMO_REQUEST.email,
    reference: flagValue('--ref') ?? DEMO_REQUEST.reference,
    plan: (flagValue('--plan') ?? DEMO_REQUEST.plan) as ExternalPlanId,
    tier: (flagValue('--tier') ?? DEMO_REQUEST.tier) as PageTierKey,
    period: (flagValue('--period') ?? DEMO_REQUEST.period) as BillingPeriod,
    country: flagValue('--country') ?? DEMO_REQUEST.country,
  }
}

async function main(): Promise<void> {
  loadEnv()
  const request = requestFromFlags()
  const apply = process.argv.includes('--apply')

  const preview = buildInvoicePlan(request)
  if (!apply) {
    console.log('FAKTURAUTKAST — torrkorning (ingenting skapas)\n')
    console.log(describeInvoicePlan(preview, 'TEST', ''))
    console.log('\nVad som skulle skickas till Stripe:')
    console.log(`  kund:    ${JSON.stringify(preview.customerParams)}`)
    console.log(`  faktura: ${JSON.stringify(preview.invoiceParams)}`)
    console.log(`  rad:     ${JSON.stringify(preview.itemParams)}`)
    console.log('\nKör `npm run stripe:invoice -- --apply` för att skapa utkastet (kräver testnyckel).')
    return
  }

  const result = await createDraftInvoice(request)
  const map = readMap()
  const mode = map?.mode ?? keyMode(requireSecretKey())
  const finalPlan = buildInvoicePlan(request, { taxRates: map?.taxRates })
  const notification = ownerNotification(finalPlan, result, mode)

  console.log(`\nUtkast klart i Stripe (${mode}LÄGE): ${result.invoiceId}`)
  console.log(result.dashboardUrl)
  console.log(`\n--- Mejl till ägaren ---\nÄmne: ${notification.subject}\n\n${notification.body}`)
  console.log('\nIngenting har skickats till kunden. Öppna länken och klicka "Skicka faktura".')
}

/**
 * Kör bara när filen startas direkt (`npm run stripe:invoice`). Importeras den
 * av agenten ska ingenting hända — ingen torrkörning, inget anrop.
 */
function isDirectRun(): boolean {
  const entry = process.argv[1] ?? ''
  return /invoice\.(ts|js)$/.test(entry)
}

if (isDirectRun()) {
  main().catch((error: unknown) => {
    console.error(`\nFel: ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  })
}
