import {
  ArrowRight,
  Check,
  Network,
  Radar,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import QuoteForm, { type QuoteOption } from '@/components/QuoteForm'
import { EXTERNAL_PRICES, INTERNAL_RATE, periodPrice } from '@/data/packages'
import { useI18n } from '@/i18n'

type Category = {
  name: string
  icon: LucideIcon
  price: string
  period: string
  description: string
  features: string[]
  to: string
  featured?: boolean
  soon?: boolean
}

export default function Checkout() {
  const { t } = useI18n()

  const formatPrice = (n: number) => `${n.toLocaleString('sv-SE')} ${t.common.currency}`

  const categories: Category[] = [
    {
      name: t.checkout.categories[0].name,
      icon: Radar,
      price: `${t.common.from} ${formatPrice(periodPrice(EXTERNAL_PRICES.manad.small, 'year') ?? 0)}`,
      period: t.checkout.categories[0].period,
      description: t.checkout.categories[0].description,
      features: t.checkout.categories[0].features,
      to: '/checkout/extern',
      featured: true,
    },
    {
      name: t.checkout.categories[1].name,
      icon: ShieldCheck,
      price: formatPrice(INTERNAL_RATE),
      period: t.checkout.categories[1].period,
      description: t.checkout.categories[1].description,
      features: t.checkout.categories[1].features,
      to: '/checkout/intern',
    },
    {
      name: t.checkout.categories[2].name,
      icon: Network,
      price: t.common.quote,
      period: t.checkout.categories[2].period,
      description: t.checkout.categories[2].description,
      features: t.checkout.categories[2].features,
      to: '/checkout/ledning',
      soon: true,
    },
  ]

  const options: QuoteOption[] = [
    { value: 'extern', label: t.checkout.options.external },
    { value: 'intern', label: t.checkout.options.internal },
    { value: 'ledning', label: t.checkout.options.leadership },
  ]

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
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 100}>
              <article
                className={`panel relative flex h-full flex-col p-7 ${
                  c.featured ? 'border-signal/60' : ''
                }`}
              >
                {c.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-signal px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-abyss">
                    {t.common.recommended}
                  </span>
                )}
                {c.soon && (
                  <span className="absolute -top-3 left-6 rounded-full border border-line bg-abyss px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                    {t.common.comingSoon}
                  </span>
                )}

                <c.icon className="h-8 w-8 text-signal" aria-hidden="true" />
                <h2 className="mt-5 font-display text-xl font-semibold">{c.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-fog">{c.description}</p>

                <p className="mt-6 font-display text-3xl font-bold">
                  {c.price}
                  <span className="ml-2 text-sm font-normal text-fog">{c.period}</span>
                </p>

                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-frost">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Button to={c.to} variant={c.featured ? 'primary' : 'ghost'}>
                    {t.checkout.seePackages}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-fog">
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
