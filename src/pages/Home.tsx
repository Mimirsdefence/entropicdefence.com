import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Eye,
  FileText,
  Network,
  Radar,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import { useI18n } from '@/i18n'

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-bold text-frost sm:text-4xl">{value}</p>
      <p className="mt-1 text-xs leading-relaxed text-fog sm:text-sm">{label}</p>
    </div>
  )
}

export default function Home() {
  const { t } = useI18n()

  const services: { icon: LucideIcon; title: string; text: string }[] = [
    {
      icon: Radar,
      title: t.home.services.items[0].title,
      text: t.home.services.items[0].text,
    },
    {
      icon: ShieldCheck,
      title: t.home.services.items[1].title,
      text: t.home.services.items[1].text,
    },
    {
      icon: Network,
      title: t.home.services.items[2].title,
      text: t.home.services.items[2].text,
    },
    {
      icon: FileText,
      title: t.home.services.items[3].title,
      text: t.home.services.items[3].text,
    },
  ]

  const steps = t.home.process.steps.map((s, i) => ({
    nr: String(i + 1).padStart(2, '0'),
    title: s.title,
    text: s.text,
  }))

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-svh items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 py-28 lg:px-8">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
              <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
              {t.home.hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {t.home.hero.titleLead}
              <span className="text-gradient">{t.home.hero.titleHighlight}</span>
              {t.home.hero.titleEnd}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fog sm:text-xl">
              {t.home.hero.description}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="#contact">
                {t.home.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/checkout" variant="ghost">
                {t.home.hero.ctaSecondary}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8">
              {t.home.stats.map((s) => (
                <Stat key={s.value} value={s.value} label={s.label} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-line/70 bg-abyss/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 lg:px-8">
          {t.home.trustStrip.map((item, i) => (
            <Fragment key={item}>
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.28em] ${
                  i === 0 ? 'text-signal' : 'text-fog'
                }`}
              >
                {item}
              </span>
              {i < t.home.trustStrip.length - 1 && (
                <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
              )}
            </Fragment>
          ))}
        </div>
      </section>

      {/* HOTBILD */}
      <section id="hotbild" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
              <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
              {t.home.hotbild.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.home.hotbild.titleLead}
              <em>{t.home.hotbild.titleEm}</em>
              {t.home.hotbild.titleMiddle}
              <span className="text-gradient">{t.home.hotbild.titleHighlight}</span>
              {t.home.hotbild.titleEnd}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog">
              {t.home.hotbild.description}
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="panel overflow-hidden font-mono text-sm">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-danger/70" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber/70" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-mint/70" aria-hidden="true" />
                <span className="ml-3 text-xs uppercase tracking-[0.2em] text-fog">
                  entropic_sense · 2026-09-13
                </span>
              </div>
              <div className="space-y-2.5 px-5 py-5 text-[13px] leading-relaxed">
                {t.home.hotbild.terminal.map((line, i) => {
                  const isLast = i === t.home.hotbild.terminal.length - 1
                  return (
                    <p key={line} className={isLast ? 'text-mint' : 'text-fog'}>
                      <span className="text-signal">&gt;</span> {line}
                      {isLast && (
                        <span className="animate-pulse-signal"> {t.home.hotbild.terminalActive}</span>
                      )}
                    </p>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TJÄNSTER */}
      <section id="tjanster" className="border-t border-line/70 bg-abyss/50">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
              <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
              {t.home.services.eyebrow}
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.home.services.title}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <article className="panel group h-full p-6 transition-colors duration-300 hover:border-signal/50">
                  <s.icon className="h-7 w-7 text-signal" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-lg font-semibold leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 40 ÅR */}
      <section id="bakgrund" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
              <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
              {t.home.background.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.home.background.title}
            </h2>
            {t.home.background.paragraphs.map((p) => (
              <p key={p} className="mt-6 max-w-xl text-lg leading-relaxed text-fog">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={150}>
            <ul className="space-y-4">
              {t.home.background.points.map((item) => (
                <li key={item} className="panel flex items-start gap-4 p-5">
                  <Eye className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-frost sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="border-t border-line/70 bg-abyss/50">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
              <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
              {t.home.process.eyebrow}
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.home.process.title}
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.nr} delay={i * 90}>
                <div className="h-full border-t border-signal/60 pt-5">
                  <p className="font-mono text-sm text-signal">{s.nr}</p>
                  <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section id="contact" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <Reveal>
          <div className="panel relative overflow-hidden px-6 py-16 text-center sm:px-12 lg:py-20">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.14),transparent_60%)]"
              aria-hidden="true"
            />
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-signal">
              {t.home.contact.eyebrow}
            </p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {t.home.contact.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-fog">
              {t.home.contact.description}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="mailto:consultant@entropicdefence.com">
                {t.home.contact.ctaMail}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/checkout" variant="ghost">
                {t.home.contact.ctaSupport}
              </Button>
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-fog">
              consultant@entropicdefence.com
            </p>
          </div>
        </Reveal>
      </section>

      {/* PRE-FOOTER LINK TO PAPERS */}
      <section className="border-t border-line/70">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center lg:px-8">
          <p className="text-sm text-fog">{t.home.papersCta.text}</p>
          <Link
            to="/papers"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-signal transition-colors hover:text-pulse"
          >
            {t.home.papersCta.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
