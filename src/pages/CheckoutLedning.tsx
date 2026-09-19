import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  GraduationCap,
  Network,
  ShieldCheck,
  Users,
} from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import QuoteForm, { type QuoteOption } from '@/components/QuoteForm'
import { useI18n } from '@/i18n'

export default function CheckoutLedning() {
  const { t } = useI18n()

  const options: QuoteOption[] = [
    { value: 'ledning-strategi', label: t.checkoutLedning.form.options.strategy },
    { value: 'ledning-utbildning', label: t.checkoutLedning.form.options.training },
    { value: 'ledning-247', label: t.checkoutLedning.form.options.expert },
  ]

  const expertFeatures = [
    { icon: Clock, text: t.checkoutLedning.expert.features[0] },
    { icon: Users, text: t.checkoutLedning.expert.features[1] },
    { icon: GraduationCap, text: t.checkoutLedning.expert.features[2] },
    { icon: ShieldCheck, text: t.checkoutLedning.expert.features[3] },
  ]

  return (
    <>
      <PageHero
        eyebrow={t.checkoutLedning.hero.eyebrow}
        title={
          <>
            {t.checkoutLedning.hero.titleLead}
            <span className="text-gradient">{t.checkoutLedning.hero.titleHighlight}</span>
            {t.checkoutLedning.hero.titleEnd}
          </>
        }
        description={t.checkoutLedning.hero.description}
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

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {/* Strategisk rådgivning */}
          <Reveal className="h-full">
            <article className="panel flex h-full flex-col p-7">
              <Network className="h-6 w-6 text-signal" aria-hidden="true" />
              <h2 className="mt-4 font-display text-xl font-semibold">
                {t.checkoutLedning.strategic.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                {t.checkoutLedning.strategic.text}
              </p>
              <p className="mt-5 font-display text-3xl font-bold">
                {t.common.quote}
                <span className="ml-2 text-sm font-normal text-fog">{t.common.perAssignment}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {t.checkoutLedning.strategic.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-frost">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button href="#forfragan" className="mt-8 w-full">
                {t.checkoutLedning.strategic.requestQuote}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </article>
          </Reveal>

          {/* 24/7 expert — kommer snart */}
          <Reveal delay={120} className="h-full">
            <article className="panel relative flex h-full flex-col border-amber/40 p-7">
              <span className="absolute -top-3 left-7 rounded-full border border-amber/60 bg-amber/15 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-amber">
                {t.common.comingSoon}
              </span>
              <Users className="h-6 w-6 text-amber" aria-hidden="true" />
              <h2 className="mt-4 font-display text-xl font-semibold">
                {t.checkoutLedning.expert.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                {t.checkoutLedning.expert.text}
              </p>
              <p className="mt-5 font-display text-3xl font-bold text-amber">
                {t.checkoutLedning.expert.price}
                <span className="ml-2 text-sm font-normal text-fog">
                  {t.checkoutLedning.expert.period}
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {expertFeatures.map((f) => (
                  <li key={f.text} className="flex items-start gap-3 text-sm text-frost">
                    <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                    {f.text}
                  </li>
                ))}
              </ul>
              <Button href="#forfragan" variant="ghost" className="mt-8 w-full">
                {t.checkoutLedning.expert.notifyMe}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <p className="mt-3 text-center text-xs text-fog">{t.checkoutLedning.expert.note}</p>
            </article>
          </Reveal>
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
          {t.common.vatNote} · {t.checkoutLedning.expertVatNote}
        </p>
      </section>

      <section id="forfragan" className="scroll-mt-24 border-t border-line/70 bg-abyss/50">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
              {t.checkoutLedning.form.title}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-fog">
              {t.checkoutLedning.form.description}
            </p>
            <ul className="mt-8 space-y-4">
              {t.checkoutLedning.form.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-frost">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <QuoteForm options={options} defaultInterest="ledning-strategi" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
