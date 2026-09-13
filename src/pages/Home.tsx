import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Eye,
  GraduationCap,
  Network,
  Radar,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-bold text-frost sm:text-4xl">{value}</p>
      <p className="mt-1 text-xs leading-relaxed text-fog sm:text-sm">{label}</p>
    </div>
  )
}

const services: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: 'Externa säkerhetskontroller',
    text: 'Penetrationstester, red teaming och sårbarhetsanalyser av er infrastruktur, applikationer och personal.',
  },
  {
    icon: Radar,
    title: 'Kontinuerlig övervakning',
    text: '24/7 hotjakt och övervakning mot utländska aktörer och avancerade, riktade intrång.',
  },
  {
    icon: Network,
    title: 'Leverantörsgranskning',
    text: 'Säkerhetsgranskning av leverantörer och supply chain — innan de blir er svagaste länk.',
  },
  {
    icon: GraduationCap,
    title: 'Säkerhetsledning',
    text: 'Strategisk rådgivning, utbildning och incidentberedskap för ledning, styrelse och säkerhetsorganisation.',
  },
]

const steps = [
  { nr: '01', title: 'Samtal', text: 'Vi förstår er verksamhet, era system och vad som faktiskt behöver skyddas.' },
  { nr: '02', title: 'Kartläggning', text: 'Hotbild, attackyta och svagaste länk — tekniskt och mänskligt.' },
  { nr: '03', title: 'Kontroll', text: 'Extern granskning och tester med rapporter som ledningen kan agera på.' },
  { nr: '04', title: 'Kontinuitet', text: 'Löpande uppföljning så att säkerheten håller — inte bara vid kontrolltillfället.' },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-svh items-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 py-28 lg:px-8">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
              <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
              Kontinuerlig säkerhet · Sverige
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Säkerhet som <span className="text-gradient">böjer hotbilden</span> — dygnet runt.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fog sm:text-xl">
              Entropic Defence skyddar företag, myndigheter och kritisk infrastruktur mot
              utländska aktörer. 40+ år i världens högsta säkerhetsklass — från regerings-
              och militärsystem till er verksamhet.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="#contact">
                Prata med en konsult
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/checkout" variant="ghost">
                Se våra säkerhetspaket
              </Button>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8">
              <Stat value="40+" label="år i världens högsta säkerhetsklass" />
              <Stat value="24/7" label="kontinuerlig övervakning och hotjakt" />
              <Stat value="100%" label="oberoende rådgivning" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-line/70 bg-abyss/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 lg:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
            Bakgrund
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">
            Regeringsuppdrag
          </span>
          <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">
            Militära system
          </span>
          <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">
            Kritisk infrastruktur
          </span>
          <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">
            Tystnadsplikt som standard
          </span>
        </div>
      </section>

      {/* HOTBILD */}
      <section id="hotbild" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
              <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
              Hotbilden har förändrats
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Det är inte längre frågan <em>om</em> någon försöker — det är frågan{' '}
              <span className="text-gradient">när</span>.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog">
              Statsunderstödda aktörer arbetar tålmodigt, långsiktigt och genom hela
              leveranskedjan. En engångskontroll räcker inte. Säkerhet är en kontinuerlig
              process — vi bygger den processen åt er.
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
                <p className="text-fog">
                  <span className="text-signal">&gt;</span> hotbild: statsunderstödda aktörer
                </p>
                <p className="text-fog">
                  <span className="text-signal">&gt;</span> vektorer: supply chain · insider · AI
                </p>
                <p className="text-fog">
                  <span className="text-signal">&gt;</span> exponering: kartläggning pågår
                </p>
                <p className="text-mint">
                  <span className="text-signal">&gt;</span> status:{' '}
                  <span className="animate-pulse-signal">KONTINUERLIG ÖVERVAKNING AKTIV</span>
                </p>
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
              Tjänster
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Fyra sätt vi skyddar er verksamhet.
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
              Fyra decennier
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              40 år i världens högsta säkerhetsklass.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog">
              Vi kommer från en värld där ett misstag kan kosta allt. Nu tar vi den
              erfarenheten till näringslivet — med samma noggrannhet, samma tystnadsplikt
              och samma kompromisslösa krav på resultat.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-fog">
              Vi säljer ingen hårdvara och ingen mjukvara. Vi är helt oberoende — vår
              enda lojalitet är ert skydd.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <ul className="space-y-4">
              {[
                'Bakgrund i regerings- och försvarsuppdrag',
                'Erfarenhet av militära system och kritisk infrastruktur',
                'Oberoende rådgivning — vi säljer inget annat än säkerhet',
                'Tystnadsplikt och säkerhetsskydd som standard i varje uppdrag',
              ].map((item) => (
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
              Så arbetar vi
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Från första samtal till kontinuerlig säkerhet.
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
              24/7 · Svar inom 24 timmar
            </p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Prata med en konsult om er hotbild.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-fog">
              Första samtalet är kostnadsfritt och utan förpliktelser. Berätta om er
              verksamhet — vi berättar var ni är sårbara.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="mailto:contact@entropicdefence.com">
                Mejla oss direkt
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/support" variant="ghost">
                Till supporten
              </Button>
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-fog">
              contact@entropicdefence.com
            </p>
          </div>
        </Reveal>
      </section>

      {/* PRE-FOOTER LINK TO PAPERS */}
      <section className="border-t border-line/70">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center lg:px-8">
          <p className="text-sm text-fog">
            Nyfiken på hur vi tänker? Läs våra papers om AI, fysik och säkerhet.
          </p>
          <Link
            to="/papers"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-signal transition-colors hover:text-pulse"
          >
            Till Papers
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
