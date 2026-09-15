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
import { VAT_NOTE } from '@/data/packages'

const options: QuoteOption[] = [
  { value: 'ledning-strategi', label: 'Säkerhetsledning — strategisk rådgivning' },
  { value: 'ledning-utbildning', label: 'Säkerhetsledning — utbildning av personal' },
  { value: 'ledning-247', label: '24/7 säkerhetsexpert — meddela mig när den lanseras' },
]

export default function CheckoutLedning() {
  return (
    <>
      <PageHero
        eyebrow="Säkerhetsledning"
        title={
          <>
            Säkerhetsledning för dem som <span className="text-gradient">fattar besluten</span>.
          </>
        }
        description="Strategisk rådgivning på ledningsnivå — och snart en säkerhetsexpert som finns tillgänglig dygnet runt för hela er organisation."
      />

      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <Reveal>
          <Link
            to="/checkout"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-fog transition-colors hover:text-signal"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Alla paket
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {/* Strategisk rådgivning */}
          <Reveal className="h-full">
            <article className="panel flex h-full flex-col p-7">
              <Network className="h-6 w-6 text-signal" aria-hidden="true" />
              <h2 className="mt-4 font-display text-xl font-semibold">
                Strategisk säkerhetsledning
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                Vi tar plats i ledningen — inte i serverrummet. Löpande rådgivning,
                prioriteringar och ett säkerhetsarbete som går att förklara för styrelsen.
              </p>
              <p className="mt-5 font-display text-3xl font-bold">
                Offert
                <span className="ml-2 text-sm font-normal text-fog">per uppdrag</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {[
                  'Säkerhetsstrategi och prioriteringar',
                  'Underlag och rapportering till styrelsen',
                  'Kravställning mot leverantörer',
                  'Stöd vid incidenter och krishantering',
                  'Utbildning av personal och ledning',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-frost">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button href="#forfragan" className="mt-8 w-full">
                Begär offert
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </article>
          </Reveal>

          {/* 24/7 expert — kommer snart */}
          <Reveal delay={120} className="h-full">
            <article className="panel relative flex h-full flex-col border-amber/40 p-7">
              <span className="absolute -top-3 left-7 rounded-full border border-amber/60 bg-amber/15 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-amber">
                Kommer snart
              </span>
              <Users className="h-6 w-6 text-amber" aria-hidden="true" />
              <h2 className="mt-4 font-display text-xl font-semibold">
                24/7 säkerhetsexpert
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                En dedikerad säkerhetsexpert — människa eller AI-agent — som hela er
                organisation kan fråga när som helst. Ingen väntetid, ingen ärendekö,
                ingen fråga som är för liten.
              </p>
              <p className="mt-5 font-display text-3xl font-bold text-amber">
                Kommer snart
                <span className="ml-2 text-sm font-normal text-fog">abonnemang</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {[
                  { icon: Clock, text: 'Svar dygnet runt, alla dagar' },
                  { icon: Users, text: 'Tillgänglig för alla i organisationen' },
                  { icon: GraduationCap, text: 'Utbildar personalen löpande' },
                  { icon: ShieldCheck, text: 'Eskalerar till expert vid skarp incident' },
                ].map((f) => (
                  <li key={f.text} className="flex items-start gap-3 text-sm text-frost">
                    <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                    {f.text}
                  </li>
                ))}
              </ul>
              <Button href="#forfragan" variant="ghost" className="mt-8 w-full">
                Meddela mig
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <p className="mt-3 text-center text-xs text-fog">
                Lämna din e-post i formuläret — du får besked först av alla.
              </p>
            </article>
          </Reveal>
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
          {VAT_NOTE} · 24/7 säkerhetsexpert är under utveckling och prissätts vid lansering
        </p>
      </section>

      <section id="forfragan" className="scroll-mt-24 border-t border-line/70 bg-abyss/50">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
              Prata säkerhet på ledningsnivå.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-fog">
              Berätta var ni står i dag. Vill ni bli meddelade när 24/7-experten
              lanseras, väljer ni det i listan — vi hör av oss först till er.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Första samtalet är alltid kostnadsfritt',
                'Vi talar ledningens språk, inte bara teknikens',
                'Tystnadsplikt i alla led',
                'Kan kombineras med kontroll och revision',
              ].map((item) => (
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
