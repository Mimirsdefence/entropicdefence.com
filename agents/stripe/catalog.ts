/**
 * Fasta externpriser for Stripe — en spegling av sajtens facit.
 *
 *   Kalla: entropicdefence.com/src/data/packages.ts
 *   (andra inget har utan att andra dar forst — `npm run stripe:plan` visar
 *    hela tabellen sa avvikelser syns direkt)
 *
 * Alla belopp ar i SEK och EXKL. moms, precis som pa sajten. Fakturan visar
 * 25 % moms for svenska kunder, omvand skattskyldighet for EU-B2B med
 * giltigt VAT-nummer (se `taxRates` i setup.ts).
 *
 * Modellen: 3 planer x 2 storlekar = 6 produkter, och 3 faktureringsperioder
 * per produkt (manad / kvartal / ar) = 18 priser. Periodrabatten ligger i
 * priset per manad; Stripe-priset drar hela periodens belopp.
 *
 * 100+ exponerade adresser, intern revision och ledning ar offert — de har
 * aldrig ett fast pris och ska darfor inte skapas i Stripe.
 */

export type ExternalPlanId = 'manad' | 'vecka' | 'dag'
export type PageTierKey = 'small' | 'medium'
export type BillingPeriod = 'month' | 'quarter' | 'year'

export const EXTERNAL_PLAN_IDS: ExternalPlanId[] = ['manad', 'vecka', 'dag']
export const PAGE_TIER_KEYS: PageTierKey[] = ['small', 'medium']
export const PERIOD_KEYS: BillingPeriod[] = ['month', 'quarter', 'year']

/** Samma faktorer som sajten: kvartal -10 %, ar = 12 manader for 9. */
const PERIOD_FACTORS: Record<BillingPeriod, number> = {
  month: 1,
  quarter: 0.9,
  year: 0.75,
}

const PERIOD_MONTHS: Record<BillingPeriod, number> = {
  month: 1,
  quarter: 3,
  year: 12,
}

/** Pris per manad, kr ex moms, for varje plan och storlek. */
export const EXTERNAL_PRICES: Record<ExternalPlanId, Record<PageTierKey, number>> = {
  manad: { small: 24900, medium: 44900 },
  vecka: { small: 59900, medium: 99900 },
  dag: { small: 149900, medium: 249900 },
}

/** Pris per manad for vald period, avrundat till hela 100-tal — som pa sajten. */
export function periodPrice(price: number, period: BillingPeriod): number {
  return Math.round((price * PERIOD_FACTORS[period]) / 100) * 100
}

/**
 * Konsulttimme for intern sakerhetsrevision, kr ex moms. Samma tal som
 * `INTERNAL_RATE` pa sajten — Forseti anvander det for att kanna igen ett
 * korrekt belopp i ett kundsvar.
 */
export const INTERNAL_RATE = 3500

/** Kundvanda namn — samma ord som i `src/i18n/sv.ts`. */
export const PLAN_NAMES: Record<ExternalPlanId, string> = {
  manad: 'Månadskontroll',
  vecka: 'Veckokontroll',
  dag: 'Daglig kontroll',
}

export const PLAN_CADENCE: Record<ExternalPlanId, string> = {
  manad: '1 extern kontroll per månad',
  vecka: '1 extern kontroll per vecka',
  dag: '1 extern kontroll per dag',
}

export const TIER_NAMES: Record<PageTierKey, string> = {
  small: 'Under 20 exponerade adresser',
  medium: '20–100 exponerade adresser',
}

export const PERIOD_NAMES: Record<BillingPeriod, string> = {
  month: 'Månad',
  quarter: 'Kvartal',
  year: 'År',
}

export interface ProductSpec {
  /** Stabil nyckel i Stripes metadata (`metadata[ed_key]`) — gor skapandet idempotent. */
  key: string
  plan: ExternalPlanId
  tier: PageTierKey
  name: string
  description: string
}

export interface PriceSpec {
  /** Stabil nyckel i Stripes metadata (`metadata[ed_key]`). */
  key: string
  productKey: string
  plan: ExternalPlanId
  tier: PageTierKey
  period: BillingPeriod
  /** Pris per manad for perioden, kr ex moms. */
  monthly: number
  /** Antal manader som perioden omfattar. */
  months: number
  /** Hela periodens belopp, kr ex moms. */
  total: number
  /** Hela periodens belopp i ore — det Stripe tar emot. */
  unitAmountOre: number
  /** Stripes intervall: `month` (1 eller 3 manader) eller `year`. */
  interval: 'month' | 'year'
  intervalCount: number
  nickname: string
}

export function productKeyFor(plan: ExternalPlanId, tier: PageTierKey): string {
  return `extern_${plan}_${tier}`
}

export function priceKeyFor(plan: ExternalPlanId, tier: PageTierKey, period: BillingPeriod): string {
  return `extern_${plan}_${tier}_${period}`
}

function buildProduct(plan: ExternalPlanId, tier: PageTierKey): ProductSpec {
  return {
    key: productKeyFor(plan, tier),
    plan,
    tier,
    name: `Extern säkerhetskontroll — ${PLAN_NAMES[plan]}, ${TIER_NAMES[tier]}`,
    description: `${PLAN_CADENCE[plan]}. ${TIER_NAMES[tier]}. Pris exkl. moms.`,
  }
}

function buildPrice(product: ProductSpec, period: BillingPeriod): PriceSpec {
  const monthly = periodPrice(EXTERNAL_PRICES[product.plan][product.tier], period)
  const months = PERIOD_MONTHS[period]
  const total = monthly * months
  return {
    key: priceKeyFor(product.plan, product.tier, period),
    productKey: product.key,
    plan: product.plan,
    tier: product.tier,
    period,
    monthly,
    months,
    total,
    unitAmountOre: total * 100,
    interval: period === 'year' ? 'year' : 'month',
    intervalCount: period === 'year' ? 1 : months,
    nickname: `${PERIOD_NAMES[period]} — ${total.toLocaleString('sv-SE')} kr`,
  }
}

export const PRODUCT_SPECS: ProductSpec[] = EXTERNAL_PLAN_IDS.flatMap((plan) =>
  PAGE_TIER_KEYS.map((tier) => buildProduct(plan, tier)),
)

export const PRICE_SPECS: PriceSpec[] = PRODUCT_SPECS.flatMap((product) =>
  PERIOD_KEYS.map((period) => buildPrice(product, period)),
)

export function priceSpecFor(
  plan: ExternalPlanId,
  tier: PageTierKey,
  period: BillingPeriod,
): PriceSpec {
  const spec = PRICE_SPECS.find(
    (candidate) => candidate.plan === plan && candidate.tier === tier && candidate.period === period,
  )
  if (!spec) throw new Error(`Okand priskombination: ${plan}/${tier}/${period}`)
  return spec
}

/** Tva momssatser som fakturan kan anvanda. Skapas av setup.ts. */
export interface TaxRateSpec {
  key: string
  displayName: string
  percentage: number
  description: string
}

export const TAX_RATE_SPECS: TaxRateSpec[] = [
  {
    key: 'se_moms_25',
    displayName: 'Moms 25 %',
    percentage: 25,
    description: 'Svensk mervärdesskatt. Gäller kunder i Sverige.',
  },
  {
    key: 'omvand_skattskyldighet',
    displayName: 'Omvänd skattskyldighet (EU-B2B)',
    percentage: 0,
    description: 'Kräver giltigt VAT-nummer. Kunden redovisar momsen själv.',
  },
]
