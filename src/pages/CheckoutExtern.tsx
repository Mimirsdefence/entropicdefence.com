import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Clock, MessagesSquare, Wallet } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import QuoteForm, { type QuoteOption } from '@/components/QuoteForm'
import { externalPlans, pageTiers, VAT_NOTE, type PageTierKey } from '@/data/packages'

const options: QuoteOption[] = [
  { value: 'extern-manad', label: 'Kontinuerlig säkerhetskontroll — Månadskontroll' },
  { value: 'extern-vecka', label: 'Kontinuerlig säkerhetskontroll — Veckokontroll' },
  { value: 'extern-dag', label: 'Kontinuerlig säkerhetskontroll — Daglig kontroll' },
  { value: 'extern-100plus', label: 'System över 100 sidor — behovsanalys' },
]

export default function CheckoutExtern() {
  const [tier, setTier] = useState<PageTierKey>('small')
  const activeTier = pageTiers.find((t) => t.key === tier) ?? pageTiers[0]

  return (
    <>
      <PageHero
        eyebrow="Kontinuerlig säkerhetskontroll"
        title={
          <>
            Fast pris på säkerhet som <span className="text-gradient">aldrig tar paus</span>.
          </>
        }
        description="Välj hur ofta vi kontrollerar er externt. Varje kontroll levereras med rapport, remediering och en agentisk konsult som hjälper er IT-personal att stänga fynden."
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

        {/* Sidantalsväljare */}
        <Reveal delay={80}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">
                Antal sidor
              </p>
              <p className="mt-2 text-sm text-fog">{activeTier.note}</p>
            </div>
            <div
              role="group"
              aria-label="Välj antal sidor"
              className="inline-flex flex-wrap gap-1.5 self-start rounded-full border border-line bg-void/60 p-1.5"
            >
              {pageTiers.map((t) => {
                const active = t.key === tier
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTier(t.key)}
                    aria-pressed={active}
                    className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                      active
                        ? 'bg-signal text-void'
                        : 'text-fog hover:bg-signal/10 hover:text-frost'
                    }`}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Paket */}
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {externalPlans.map((p, i) => {
            const isQuote = p.prices[tier] === 'Offert'
            return (
              <Reveal key={p.id} delay={i * 100} className="h-full">
                <article
                  className={`panel relative flex h-full flex-col p-7 ${
                    p.featured ? 'border-signal/60 shadow-[0_0_40px_rgba(56,189,248,0.12)]' : ''
                  }`}
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-signal px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-void">
                      Populärast
                    </span>
                  )}
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-signal">
                    {p.cadence}
                  </p>
                  <h2 className="mt-3 font-display text-xl font-semibold">{p.name}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{p.description}</p>

                  <div className="mt-6 border-t border-line pt-5">
                    <p className="font-display text-3xl font-bold">
                      {p.prices[tier]}
                      {!isQuote && <span className="ml-2 text-sm font-normal text-fog">/mån</span>}
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-fog">
                      {activeTier.label} · exkl. moms
                    </p>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-frost">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    href="#forfragan"
                    variant={p.featured ? 'primary' : 'ghost'}
                    className="mt-8 w-full"
                  >
                    {isQuote ? 'Begär offert' : 'Boka ett samtal'}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </article>
              </Reveal>
            )
          })}
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
          {VAT_NOTE} · Lanseringspris · System över 100 sidor prissätts efter behovsanalys
        </p>
      </section>

      {/* Konsultmodellen */}
      <section className="border-t border-line/70 bg-abyss/50">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
              <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
              Ingår i varje paket
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              En konsult som stannar kvar — inte bara en rapport.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MessagesSquare,
                title: 'Remediering per fynd',
                text: 'Varje rapport beskriver exakt vad som är fel och hur det åtgärdas — prioriterat efter verklig risk.',
              },
              {
                icon: Clock,
                title: '48 timmar efter varje kontroll',
                text: 'I Månadskontrollen ingår 48 timmar med en agentisk konsult som hjälper er IT att genomföra åtgärderna.',
              },
              {
                icon: Wallet,
                title: '24/7 i vecko- och dagspaket',
                text: 'Vecko- och Daglig kontroll ger er en agentisk konsult dygnet runt, med prioritet på kritiska fynd.',
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <article className="panel h-full p-6">
                  <c.icon className="h-7 w-7 text-signal" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog">{c.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="forfragan" className="scroll-mt-24 border-t border-line/70">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
              Boka ett samtal om er attackyta.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-fog">
              Berätta hur många sidor och system ni har, så bekräftar vi pris och nivå.
              System över 100 sidor kräver en kortare behovsanalys först.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Svar inom 24 timmar, alla dagar',
                'Kostnadsfritt första samtal',
                'Offert utan förpliktelser',
                'PGP finns för känslig kommunikation',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-frost">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <QuoteForm options={options} defaultInterest="extern-manad" />
          </Reveal>
        </div>
      </section>
    </>
  )
}
