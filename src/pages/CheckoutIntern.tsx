import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  EyeOff,
  Lock,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import QuoteForm, { type QuoteOption } from '@/components/QuoteForm'
import { INTERNAL_LEVEL_IDS, INTERNAL_RATE, type InternalLevelId } from '@/data/packages'
import { useI18n } from '@/i18n'

const levelIcons: Record<InternalLevelId, LucideIcon> = {
  vanlig: ShieldCheck,
  hog: Lock,
  militar: EyeOff,
}

const efficiencyIcons = [Zap, ShieldCheck, EyeOff]

export default function CheckoutIntern() {
  const { t } = useI18n()

  const formatPrice = (n: number) => `${n.toLocaleString('sv-SE')} ${t.common.currency}`

  const options: QuoteOption[] = [
    { value: 'intern-vanlig', label: t.checkoutIntern.form.options.vanlig },
    { value: 'intern-hog', label: t.checkoutIntern.form.options.hog },
    { value: 'intern-militar', label: t.checkoutIntern.form.options.militar },
  ]

  return (
    <>
      <PageHero
        eyebrow={t.checkoutIntern.hero.eyebrow}
        title={
          <>
            {t.checkoutIntern.hero.titleLead}
            <span className="text-gradient">{t.checkoutIntern.hero.titleHighlight}</span>
            {t.checkoutIntern.hero.titleEnd}
          </>
        }
        description={t.checkoutIntern.hero.description}
      />

      {/* NIVÅER */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {INTERNAL_LEVEL_IDS.map((id: InternalLevelId, i) => {
            const level = t.checkoutIntern.levels[id]
            const Icon = levelIcons[id]
            const featured = id === 'hog'

            return (
              <Reveal key={id} delay={i * 100}>
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

                  <Icon className="h-8 w-8 text-signal" aria-hidden="true" />
                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.25em] text-fog">
                    {level.level}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold">{level.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{level.tagline}</p>

                  <ul className="mt-6 space-y-3 border-t border-line pt-6">
                    {level.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-frost">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Button href="#forfragan" variant={featured ? 'primary' : 'ghost'}>
                      {t.checkoutIntern.requestReview}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* TIMMARVDE */}
        <Reveal>
          <div className="panel mt-10 flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal">
                {t.checkoutIntern.rate.eyebrow}
              </p>
              <p className="mt-3 font-display text-3xl font-bold">
                {formatPrice(INTERNAL_RATE)}
                <span className="ml-2 text-sm font-normal text-fog">
                  {t.checkoutIntern.rate.perHour}
                </span>
              </p>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-fog">
              {t.checkoutIntern.rate.text}
            </p>
          </div>
        </Reveal>

        <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-fog">
          {t.common.vatNote} · {t.checkoutIntern.rateNote} · {t.common.launchPrice}
        </p>

        <div className="mt-10 text-center">
          <Link
            to="/checkout"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-fog transition-colors hover:text-frost"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t.common.allPackages}
          </Link>
        </div>
      </section>

      {/* EFFEKTIVITET */}
      <section className="border-t border-line/70 bg-abyss/50">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
              <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
              {t.checkoutIntern.efficiency.eyebrow}
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.checkoutIntern.efficiency.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">
              {t.checkoutIntern.efficiency.paragraphLead}
              <span className="text-gradient">{t.checkoutIntern.efficiency.paragraphHighlight}</span>
              {t.checkoutIntern.efficiency.paragraphEnd}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {t.checkoutIntern.efficiency.cards.map((c, i) => {
              const Icon = efficiencyIcons[i] ?? Zap
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
              {t.checkoutIntern.form.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fog">
              {t.checkoutIntern.form.description}
            </p>
            <ul className="mt-8 space-y-3">
              {t.checkoutIntern.form.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-frost">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <QuoteForm
              options={options}
              defaultInterest="intern-hog"
              submitLabel={t.checkoutIntern.requestReview}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
