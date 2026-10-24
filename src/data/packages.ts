/**
 * Säkerhetspaketen — numeriska priser och strukturella nycklar.
 * Alla priser är exkl. moms (25 % moms tillkommer för svenska kunder).
 * Dessa är lanseringspriser och kan höjas när referenser finns.
 * All visningstext (namn, beskrivningar, features) finns i `src/i18n/sv.ts`
 * och hämtas via `useI18n()`.
 */

export type PageTierKey = 'small' | 'medium' | 'large'

export type ExternalPlanId = 'manad' | 'vecka' | 'dag'

export type InternalLevelId = 'vanlig' | 'hog' | 'militar'

export type BillingPeriod = 'month' | 'quarter' | 'year'

export const PERIOD_KEYS: BillingPeriod[] = ['month', 'quarter', 'year']

const PERIOD_FACTORS: Record<BillingPeriod, number> = {
  month: 1,
  quarter: 0.9,
  year: 0.75,
}

/** Pris per månad för vald faktureringsperiod (avrundat till hela 100-tal). `null` = offert. */
export function periodPrice(price: number | null, period: BillingPeriod): number | null {
  if (price === null) return null
  return Math.round((price * PERIOD_FACTORS[period]) / 100) * 100
}

/** Pris per plan och sid-/adresstier. `null` = offert. */
export const EXTERNAL_PRICES: Record<ExternalPlanId, Record<PageTierKey, number | null>> = {
  manad: { small: 24900, medium: 44900, large: null },
  vecka: { small: 59900, medium: 99900, large: null },
  dag: { small: 149900, medium: 249900, large: null },
}

/** Planen som markeras som "Mest vald" på checkout. */
export const EXTERNAL_FEATURED: ExternalPlanId = 'vecka'

export const EXTERNAL_PLAN_IDS: ExternalPlanId[] = ['manad', 'vecka', 'dag']

export const INTERNAL_RATE = 3500

/** Startups & mindre företag — kvartalsvis penetrationstest. Pris per månad per faktureringsperiod. */
export const SMALL_BUSINESS_PRICES: Record<BillingPeriod, number> = {
  month: 6999,
  quarter: 5999,
  year: 4999,
}

/** Extra konsulttid utöver de 6 ingående timmarna per kvartal. */
export const SMALL_BUSINESS_EXTRA_HOUR_RATE = 500

/**
 * Månadsvis kontroll (flyttad från Kontinuerlig säkerhetskontroll, <20 adresser).
 * Baspris per månad — periodPrice() ger 18 700 kr/mån (år) och 22 400 kr/mån (kvartal).
 */
export const SMALL_BUSINESS_MONTHLY_CHECK_BASE = 24900

export const INTERNAL_LEVEL_IDS: InternalLevelId[] = ['vanlig', 'hog', 'militar']
