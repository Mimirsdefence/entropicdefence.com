import {
  ArrowRight,
  Check,
  Network,
  Radar,
  ShieldCheck,
  Target,
  type LucideIcon,
} from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import QuoteForm, { type QuoteOption } from '@/components/QuoteForm'
import {
  EXTERNAL_PRICES,
  INTERNAL_RATE,
  periodPrice,
  SMALL_BUSINESS_PRICES,
} from '@/data/packages'
import { useI18n } from '@/i18n'

type Category = {
  name: string
  icon: LucideIcon
  price: string
  period: string
  description: string
  features: string[]
  to?: string
  href?: string
  cta?: string
  featured?: boolean
  soon?: boolean
}

export default function Checkout() {
  const { t, lang } = useI18n()
  const home = `/${lang}`
  const to = (p: string) => (p === '/' ? home : `${home}${p}`)

  const formatPrice = (n: number) => `${n.toLocaleString('sv-SE')} ${t.common.currency}`

  const categories: Category[] = [
    {
      name: t.checkout.categories[0].name,
      icon: Radar,
      price: `${t.common.from} ${formatPrice(periodPrice(EXTERNAL_PRICES.manad.small, 'year') ?? 0)}`,
      period: t.checkout.categories[0].period,
      description: t.checkout.categories[0].description,
      features: t.checkout.categories[0].features,
      to: to('/checkout/extern'),
      featured: true,
    },
    {
      name: t.checkout.categories[1].name,
      icon: ShieldCheck,
      price: formatPrice(INTERNAL_RATE),
      period: t.checkout.categories[1].period,
      description: t.checkout.categories[1].description,
      features: t.checkout.categories[1].features,
      to: to('/checkout/intern'),
    },
    {
      name: t.checkout.categories[2].name,
      icon: Network,
      price: t.common.quote,
      period: t.checkout.categories[2].period,
      description: t.checkout.categories[2].description,
      features: t.checkout.categories[2].features,
      to: to('/checkout/ledning'),
      soon: true,
    },
  ]

  // 4:e kortet finns bara i ordböcker som översatts (sv först) — andra språk visar 3 kort.
  const small = t.checkout.categories[3]
  if (small) {
    categories.push({
      name: small.name,
      icon: Target,
      price: `${t.common.from} ${formatPrice(SMALL_BUSINESS_PRICES.year)}`,
      period: small.period,
      description: small.description,
      features: small.features,
      to: '/checkout/mindre',
    })
  }

  const options: QuoteOption[] = [
    { value: 'extern', label: t.checkout.options.external },
    { value: 'intern', label: t.checkout.options.internal },
    { value: 'ledning', label: t.checkout.options.leadership },
  ]
  if (small) options.push({ value: 'mindre', label: small.name })

  return (
    <>
      <PageHero
        eyebrow={t.checkout.hero.eyebrow}
        title={
          <>
            {t.checkout.hero.titleLead}
            <span className="text-gradient">{t.checkout.hero.titleHighlight}</span>
            {t.checkout.hero.titleEnd}
          </>
        }
        description={t.checkout.hero.description}
      />

      {/* KATEGORIKORT */}
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 100} className="h-full">
              <article
                className={`panel relative flex h-full flex-col p-7 ${
                  c.featured ? 'border-signal/60 shadow-[0_0_40px_rgba(56,189,248,0.12)]' : ''
                }`}
              >
                {c.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-signal px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-void">
                    {t.common.recommended}
                  </span>
                )}
                {c.soon && (
                  <span className="absolute -top-3 left-7 rounded-full border border-amber/60 bg-amber/15 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-amber">
                    {t.common.comingSoon}
                  </span>
                )}

                <c.icon className="h-6 w-6 text-signal" aria-hidden="true" />
                <h2 className="mt-4 font-display text-xl font-semibold">{c.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-fog">{c.description}</p>

                <p className="mt-5 font-display text-3xl font-bold">
                  {c.price}
                  <span className="ml-2 text-sm font-normal text-fog">{c.period}</span>
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-frost">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  to={c.to}
                  href={c.href}
                  variant={c.featured ? 'primary' : 'ghost'}
                  className="mt-8 w-full"
                >
                  {c.cta ?? t.checkout.seePackages}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
          {t.common.vatNote} · {t.common.launchPrice}
        </p>
      </section>

      {/* OFFERTFORMULÄR */}
      <section id="forfragan" className="border-t border-line/70 bg-abyss/50">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
          <Reveal>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.checkout.form.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fog">
              {t.checkout.form.description}
            </p>
            <ul className="mt-8 space-y-3">
              {t.checkout.form.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-frost">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <QuoteForm options={options} defaultInterest="extern" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
