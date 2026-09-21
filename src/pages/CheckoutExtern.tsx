import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  MessagesSquare,
  Wallet,
} from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import QuoteForm, { type QuoteOption } from '@/components/QuoteForm'
import {
  EXTERNAL_PLAN_IDS,
  EXTERNAL_PRICES,
  EXTERNAL_FEATURED,
  PERIOD_KEYS,
  periodPrice,
  type BillingPeriod,
  type ExternalPlanId,
  type PageTierKey,
} from '@/data/packages'
import { useI18n } from '@/i18n'

const TIER_KEYS: PageTierKey[] = ['small', 'medium', 'large']

const consultIcons = [MessagesSquare, Clock, Wallet]

export default function CheckoutExtern() {
  const { t } = useI18n()
  const [tier, setTier] = useState<PageTierKey>('small')
  const [period, setPeriod] = useState<BillingPeriod>('year')

  const tierInfo = t.checkoutExtern.tiers[tier]

  const formatPrice = (n: number) => `${n.toLocaleString('sv-SE')} ${t.common.currency}`

  const options: QuoteOption[] = [
    { value: 'extern-manad', label: t.checkoutExtern.form.options.manad },
    { value: 'extern-vecka', label: t.checkoutExtern.form.options.vecka },
    { value: 'extern-dag', label: t.checkoutExtern.form.options.dag },
    { value: 'extern-100plus', label: t.checkoutExtern.form.options.large },
  ]

  return (
    <>
      <PageHero
        eyebrow={t.checkoutExtern.hero.eyebrow}
        title={
          <>
            {t.checkoutExtern.hero.titleLead}
            <span className="text-gradient">{t.checkoutExtern.hero.titleHighlight}</span>
            {t.checkoutExtern.hero.titleEnd}
          </>
        }
        description={t.checkoutExtern.hero.description}
      />

      {/* KONTROLLER: Alla paket-länk + period + antal sidor */}
      <section className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">
        <Reveal>
          <Link
            to="/checkout"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-signal"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t.common.allPackages}
          </Link>
        </Reveal>

        {/* Period + adressväljare — ett tätt block direkt under "Alla paket" */}
        <Reveal delay={60}>
          <div className="mt-10">
            {/* Faktureringsperiod — kompakt, högerställd, precis ovanför adressväljaren */}
            <div className="flex items-center justify-end gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-fog">
                {t.common.periodLabel}
              </span>
              <div
                className="flex rounded-full border border-line bg-abyss/70 p-1"
                role="group"
                aria-label={t.common.periodLabel}
              >
                {PERIOD_KEYS.map((key) => {
                  const active = key === period
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPeriod(key)}
                      aria-pressed={active}
                      className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                        active
                          ? 'bg-signal text-abyss'
                          : 'text-fog hover:text-frost'
                      }`}
                    >
                      {t.common.periods[key]}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Adressväljare — gamla utförandet, tätt under */}
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
                  {t.checkoutExtern.tierLabel}
                </p>
                <p className="mt-2 text-sm text-fog">{tierInfo.note}</p>
              </div>
              <div
                role="group"
                aria-label={t.checkoutExtern.tierAria}
                className="inline-flex flex-wrap gap-1.5 self-start rounded-full border border-line bg-void/60 p-1.5"
              >
                {TIER_KEYS.map((key) => {
                  const active = key === tier
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTier(key)}
                      aria-pressed={active}
                      className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                        active
                          ? 'bg-signal text-void'
                          : 'text-fog hover:bg-signal/10 hover:text-frost'
                      }`}
                    >
                      {t.checkoutExtern.tiers[key].short}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PLANER */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {EXTERNAL_PLAN_IDS.map((planId: ExternalPlanId, i) => {
            const plan = t.checkoutExtern.plans[planId]
            const basePrice = EXTERNAL_PRICES[planId][tier]
            const price = periodPrice(basePrice, period)
            const isQuote = price === null
            const featured = planId === EXTERNAL_FEATURED

            return (
              <Reveal key={planId} delay={i * 100}>
                <article
                  className={`panel relative flex h-full flex-col p-7 ${
                    featured ? 'border-signal/60' : ''
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-6 rounded-full bg-signal px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-abyss">
                      {t.common.mostPopular}
                    </span>
                  )}

                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal">
                    {plan.cadence}
                  </p>
                  <h2 className="mt-3 font-display text-xl font-semibold">{plan.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{plan.description}</p>

                  <p className="mt-6 font-display text-3xl font-bold">
                    {isQuote ? t.common.quote : formatPrice(price as number)}
                    {!isQuote && (
                      <span className="ml-2 text-sm font-normal text-fog">
                        {t.common.perMonthShort}
                      </span>
                    )}
                  </p>
                  {!isQuote && period !== 'month' && (
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mint">
                      {t.common.savings[period]}
                    </p>
                  )}
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
                    {tierInfo.short}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-line pt-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-frost">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Button href="#forfragan" variant={featured ? 'primary' : 'ghost'}>
                      {isQuote ? t.checkoutExtern.requestQuote : t.checkoutExtern.bookCall}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-fog">
          {t.common.vatNote} · {t.common.launchPrice} · {t.checkoutExtern.largeNote}
        </p>
      </section>

      {/* KONSULTMODELL */}
      <section className="border-t border-line/70 bg-abyss/50">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
              <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
              {t.checkoutExtern.consult.eyebrow}
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.checkoutExtern.consult.title}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {t.checkoutExtern.consult.cards.map((c, i) => {
              const Icon = consultIcons[i] ?? MessagesSquare
              return (
                <Reveal key={c.title} delay={i * 90}>
                  <article className="panel h-full p-6">
                    <Icon className="h-7 w-7 text-signal" aria-hidden="true" />
                    <h3 className="mt-5 font-display text-lg font-semibold">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-fog">{c.text}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* OFFERTFORMULÄR */}
      <section id="forfragan" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.checkoutExtern.form.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fog">
              {t.checkoutExtern.form.description}
            </p>
            <ul className="mt-8 space-y-3">
              {t.checkoutExtern.form.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-frost">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <QuoteForm options={options} defaultInterest="extern-manad" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
