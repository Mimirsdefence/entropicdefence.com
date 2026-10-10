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

      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <Reveal>
          <Link
            to="/checkout"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-signal"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t.common.allPackages}
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <div className="panel mt-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
                {t.checkoutIntern.rate.eyebrow}
              </p>
              <p className="mt-2 font-display text-3xl font-bold">
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

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {INTERNAL_LEVEL_IDS.map((id, i) => {
            const level = t.checkoutIntern.levels[id]
            const Icon = levelIcons[id]
            const featured = id === 'hog'
            return (
              <Reveal key={id} delay={i * 100} className="h-full">
                <article
                  className={`panel relative flex h-full flex-col p-7 ${
                    featured ? 'border-signal/60 shadow-[0_0_40px_rgba(56,189,248,0.12)]' : ''
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-signal px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-void">
                      {t.common.recommended}
                    </span>
                  )}
                  <Icon className="h-6 w-6 text-signal" aria-hidden="true" />
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-signal">
                    {level.level}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold">{level.name}</h2>
                  <p className="mt-2 font-display text-sm font-semibold text-frost/90">
                    {level.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{level.description}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {level.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-frost">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="#forfragan"
                    variant={featured ? 'primary' : 'ghost'}
                    className="mt-8 w-full"
                  >
                    {t.checkoutIntern.requestReview}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </article>
              </Reveal>
            )
          })}
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
          {t.common.vatNote} · {t.checkoutIntern.rateNote} · {t.common.launchPrice}
        </p>
      </section>

      {/* Varför 3 500 SEK/tim */}
      <section className="border-t border-line/70 bg-abyss/50">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
                <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
                {t.checkoutIntern.efficiency.eyebrow}
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {t.checkoutIntern.efficiency.title}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog">
                {t.checkoutIntern.efficiency.paragraphFirst}
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-fog">
                {t.checkoutIntern.efficiency.paragraphLead}
                <span className="text-frost">{t.checkoutIntern.efficiency.paragraphHighlight}</span>
                {t.checkoutIntern.efficiency.paragraphEnd}
              </p>
            </Reveal>

            <Reveal delay={150}>
              <ul className="space-y-4">
                {t.checkoutIntern.efficiency.cards.map((c, i) => {
                  const Icon = efficiencyIcons[i] ?? Zap
                  return (
                    <li key={c.title} className="panel flex items-start gap-4 p-5">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
                      <div>
                        <p className="font-display text-sm font-semibold text-frost">{c.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-fog">{c.text}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="forfragan" className="scroll-mt-24 border-t border-line/70">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
              {t.checkoutIntern.form.title}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-fog">
              {t.checkoutIntern.form.description}
            </p>
            <ul className="mt-8 space-y-4">
              {t.checkoutIntern.form.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-frost">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
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
