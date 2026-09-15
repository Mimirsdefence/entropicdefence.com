import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, EyeOff, Lock, ShieldCheck, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import QuoteForm, { type QuoteOption } from '@/components/QuoteForm'
import { internalLevels, VAT_NOTE } from '@/data/packages'

const levelIcons: Record<string, LucideIcon> = {
  vanlig: ShieldCheck,
  hog: Lock,
  militar: EyeOff,
}

const options: QuoteOption[] = [
  { value: 'intern-vanlig', label: 'Intern säkerhetsrevision — Vanlig säkerhet' },
  { value: 'intern-hog', label: 'Intern säkerhetsrevision — Hög säkerhet' },
  { value: 'intern-militar', label: 'Intern säkerhetsrevision — Militär grad' },
]

export default function CheckoutIntern() {
  return (
    <>
      <PageHero
        eyebrow="Intern säkerhetsrevision"
        title={
          <>
            Säkerhet inifrån — där <span className="text-gradient">ingen annan tittar</span>.
          </>
        }
        description="Ungefär en gång per år går vi igenom systemet inifrån och stänger det som en extern kontroll aldrig ser. Välj nivå efter hur säkert ni faktiskt behöver ha det."
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

        <Reveal delay={80}>
          <div className="panel mt-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
                Konsulttid
              </p>
              <p className="mt-2 font-display text-3xl font-bold">
                3 500 kr
                <span className="ml-2 text-sm font-normal text-fog">/ timme</span>
              </p>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-fog">
              Ni betalar för faktiskt arbete — inte för oss att lära oss ert system
              långsamt. Omfattning och tid bekräftas efter en kortare behovsanalys.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {internalLevels.map((l, i) => {
            const Icon = levelIcons[l.id] ?? ShieldCheck
            return (
              <Reveal key={l.id} delay={i * 100} className="h-full">
                <article
                  className={`panel relative flex h-full flex-col p-7 ${
                    l.featured ? 'border-signal/60 shadow-[0_0_40px_rgba(56,189,248,0.12)]' : ''
                  }`}
                >
                  {l.featured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-signal px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-void">
                      Rekommenderad
                    </span>
                  )}
                  <Icon className="h-6 w-6 text-signal" aria-hidden="true" />
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-signal">
                    {l.level}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold">{l.name}</h2>
                  <p className="mt-2 font-display text-sm font-semibold text-frost/90">
                    {l.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{l.description}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {l.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-frost">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="#forfragan"
                    variant={l.featured ? 'primary' : 'ghost'}
                    className="mt-8 w-full"
                  >
                    Begär revision
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </article>
              </Reveal>
            )
          })}
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
          {VAT_NOTE} · Debiteras per konsulttimme · Lanseringspris
        </p>
      </section>

      {/* Varför 3 500 kr/tim */}
      <section className="border-t border-line/70 bg-abyss/50">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
                <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
                Effektivitet
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Där en människa behöver sex timmar, behöver vi en.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fog">
                Vi arbetar med proprietära AI-verktyg genom hela revisionen. Det gör att
                komplexa uppdrag tar ungefär en sjättedel av tiden jämfört med enbart
                mänskliga säkerhetsexperter — utan att kompromissa med kvaliteten.
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-fog">
                Resultatet är inte bara snabbare. Det är <span className="text-frost">högre
                säkerhet</span> än en människa kan åstadkomma på egen hand.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <ul className="space-y-4">
                {[
                  {
                    icon: Zap,
                    title: '1/6 av tiden',
                    text: 'AI-verktygen analyserar systemet parallellt med konsulten — inte i efterhand.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Högre säkerhet',
                    text: 'Ingen utmattning, inga genvägar och ingenstans att gömma ett fynd.',
                  },
                  {
                    icon: EyeOff,
                    title: 'Osynligt resultat',
                    text: 'På Militär grad lämnar vi ett system som inte ens svarar när någon sonderar det.',
                  },
                ].map((item) => (
                  <li key={item.title} className="panel flex items-start gap-4 p-5">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-signal" aria-hidden="true" />
                    <div>
                      <p className="font-display text-sm font-semibold text-frost">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-fog">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="forfragan" className="scroll-mt-24 border-t border-line/70">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
              Berätta vad som behöver skyddas.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-fog">
              Ju känsligare miljö, desto mer vill vi veta innan vi ger ett estimat.
              Allt behandlas under tystnadsplikt och kan ske via PGP.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Kostnadsfri behovsanalys',
                'Estimat i konsulttimmar innan arbetet startar',
                'Arbetet sker på plats eller fjärrstyrt',
                'Tystnadsplikt och säkerhetsskydd enligt högsta klass',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-frost">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <QuoteForm options={options} defaultInterest="intern-hog" submitLabel="Begär revision" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
