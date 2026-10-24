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
  PERIOD_KEYS,
  periodPrice,
  SMALL_BUSINESS_MONTHLY_CHECK_BASE,
  SMALL_BUSINESS_PRICES,
  type BillingPeriod,
} from '@/data/packages'
import { useI18n } from '@/i18n'

type SmallPlanId = 'kvartal' | 'manad'

const PLAN_IDS: SmallPlanId[] = ['kvartal', 'manad']

const FEATURED_PLAN: SmallPlanId = 'kvartal'

const consultIcons = [MessagesSquare, Clock, Wallet]

export default function CheckoutSmall() {
  const { t, lang } = useI18n()
  const [period, setPeriod] = useState<BillingPeriod>('year')
  const home = `/${lang}`
  const to = (p: string) => (p === '/' ? home : `${home}${p}`)

  const formatPrice = (n: number) => `${n.toLocaleString('sv-SE')} ${t.common.currency}`

  const prices: Record<SmallPlanId, number> = {
    kvartal: SMALL_BUSINESS_PRICES[period],
    manad: periodPrice(SMALL_BUSINESS_MONTHLY_CHECK_BASE, period) as number,
  }

  const options: QuoteOption[] = [
    { value: 'mindre-kvartal', label: t.checkoutSmall.form.options.kvartal },
    { value: 'mindre-manad', label: t.checkoutSmall.form.options.manad },
  ]

  return (
    <>
      <PageHero
        eyebrow={t.checkoutSmall.hero.eyebrow}
        title={
          <>
            {t.checkoutSmall.hero.titleLead}
            <span className="text-gradient">{t.checkoutSmall.hero.titleHighlight}</span>
            {t.checkoutSmall.hero.titleEnd}
          </>
        }
        description={t.checkoutSmall.hero.description}
      />

      {/* KONTROLLER: Alla paket-länk + faktureringsperiod */}
      <section className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">
        <Reveal>
          <div className="-mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
            <Link
              to={to('/checkout')}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-signal"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t.common.allPackages}
            </Link>

            <div className="ml-auto flex flex-wrap items-center justify-end gap-x-3 gap-y-2">
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
          </div>

          {/* Omfattning — fast för båda paketen */}
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
                {t.checkoutSmall.scopeLabel}
              </p>
              <p className="mt-2 text-sm text-fog">{t.checkoutSmall.scopeText}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PLANER */}
      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="mx-auto grid gap-6 lg:max-w-5xl lg:grid-cols-2">
          {PLAN_IDS.map((planId, i) => {
            const plan = t.checkoutSmall.plans[planId]
            const price = prices[planId]
            const featured = planId === FEATURED_PLAN

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
                  <p className="mt-2 line-clamp-4 min-h-[91px] text-sm leading-relaxed text-fog">
                    {plan.description}
                  </p>

                  {/* Prispanel */}
                  <div className="mt-6 border-t border-line pt-5">
                    <div className="flex min-h-4 items-center">
                      {period !== 'month' && (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.05em] text-mint">
                          <span
                            className="animate-pulse-signal h-1 w-1 rounded-full bg-mint"
                            aria-hidden="true"
                          />
                          {t.common.savings[period]}
                        </span>
                      )}
                    </div>

                    <p className="mt-1.5 font-display text-3xl font-bold">
                      {formatPrice(price)}
                      <span className="ml-2 text-sm font-normal text-fog">
                        {t.common.perMonthShort}
                      </span>
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
                      {t.checkoutSmall.scopeShort} · {t.common.exclVat}
                    </p>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-frost">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href="#forfragan"
                    variant={featured ? 'primary' : 'ghost'}
                    className="mt-8 w-full"
                  >
                    {t.checkoutSmall.bookCall}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </article>
              </Reveal>
            )
          })}
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
          {t.common.vatNote} · {t.common.launchPrice}
        </p>
      </section>

      {/* KONSULTMODELL */}
      <section className="border-t border-line/70 bg-abyss/50">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
              <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
              {t.checkoutSmall.consult.eyebrow}
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.checkoutSmall.consult.title}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.checkoutSmall.consult.cards.map((c, i) => {
              const Icon = consultIcons[i] ?? MessagesSquare
              return (
                <Reveal key={c.title} delay={i * 90}>
                  <article className="panel h-full p-6">
                    <Icon className="h-7 w-7 text-signal" aria-hidden="true" />
                    <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-fog">{c.text}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* OFFERTFORMULÄR */}
      <section id="forfragan" className="scroll-mt-24 border-t border-line/70">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {t.checkoutSmall.form.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fog">
              {t.checkoutSmall.form.description}
            </p>
            <ul className="mt-8 space-y-3">
              {t.checkoutSmall.form.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-frost">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <QuoteForm options={options} defaultInterest="mindre-kvartal" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
