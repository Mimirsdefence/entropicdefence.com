import { CheckCircle2, Circle, Clock, KeyRound } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Button from '@/components/Button'

const stages = [
  { title: 'Intag och planering', text: 'Kartläggning av system, mål och tidplan.', state: 'done' },
  { title: 'Teknisk granskning', text: 'Penetrationstester och sårbarhetsanalys av infrastruktur och applikationer.', state: 'active' },
  { title: 'Mänsklig granskning', text: 'Intervjuer, rutiner och medvetenhet hos personalen.', state: 'todo' },
  { title: 'Leverantörsgranskning', text: 'Genomgång av supply chain och tredjepartsberoenden.', state: 'todo' },
  { title: 'Rapport och åtgärdsplan', text: 'Slutrapport krypterad med PGP till er IT-ansvarige.', state: 'todo' },
] as const

function StageIcon({ state }: { state: (typeof stages)[number]['state'] }) {
  if (state === 'done') return <CheckCircle2 className="h-6 w-6 shrink-0 text-mint" aria-hidden="true" />
  if (state === 'active')
    return (
      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
        <span className="absolute h-4 w-4 animate-ping rounded-full bg-signal/50" aria-hidden="true" />
        <Clock className="relative h-6 w-6 text-signal" aria-hidden="true" />
      </span>
    )
  return <Circle className="h-6 w-6 shrink-0 text-line" aria-hidden="true" />
}

export default function Status() {
  return (
    <>
      <PageHero
        eyebrow="Säkerhetsstatus"
        title={
          <>
            Följ er kontroll <span className="text-gradient">i realtid</span>.
          </>
        }
        description="Här ser ni exakt var i processen er säkerhetskontroll befinner sig. Rapporter levereras krypterat med PGP till er IT-ansvarige."
      />

      <section className="mx-auto max-w-4xl px-5 pb-24 lg:px-8">
        <Reveal>
          <div className="panel flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal">
                Uppdrag ED-2026-014
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold">
                Kontinuerlig säkerhet — exempelkund
              </h2>
            </div>
            <span className="w-fit rounded-full bg-signal/15 px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-signal">
              Pågår · 40%
            </span>
          </div>
        </Reveal>

        <div className="mt-8">
          {stages.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="relative flex gap-5 pb-8 last:pb-0">
                {i < stages.length - 1 && (
                  <span
                    className={`absolute left-3 top-8 h-[calc(100%-2rem)] w-px ${
                      s.state === 'done' ? 'bg-mint/50' : 'bg-line'
                    }`}
                    aria-hidden="true"
                  />
                )}
                <StageIcon state={s.state} />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3
                      className={`font-display text-base font-semibold ${
                        s.state === 'todo' ? 'text-fog' : 'text-frost'
                      }`}
                    >
                      {s.title}
                    </h3>
                    {s.state === 'active' && (
                      <span className="rounded-full bg-signal/15 px-3 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-signal">
                        Pågår
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-fog">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="panel mt-10 flex flex-col items-start gap-5 border-signal/40 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <KeyRound className="mt-0.5 h-6 w-6 shrink-0 text-signal" aria-hidden="true" />
              <div>
                <h2 className="font-display text-base font-semibold">PGP-leverans</h2>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-fog">
                  Slutrapporter skickas krypterat till er IT-ansvarige. Lägg till mottagare
                  och nycklar i Business Profile.
                </p>
              </div>
            </div>
            <Button to="/business-profile" variant="ghost">
              Hantera mottagare
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
