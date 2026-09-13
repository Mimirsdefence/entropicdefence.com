import { Atom, Brain, Lock, Scale, ArrowUpRight } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'

const categories = [
  {
    icon: Brain,
    title: 'Artificiell intelligens',
    text: 'Säkerhetsimplikationer av AI-system, resonerande modeller och autonomi.',
    papers: [
      { title: 'När modellen tänker själv — hotbilden mot AI-infrastruktur', date: 'Kommande' },
      { title: 'AI som attackyta: prompt, data och supply chain', date: 'Kommande' },
    ],
  },
  {
    icon: Atom,
    title: 'Teoretisk fysik',
    text: 'Entropi, information och tid — grundforskning som formar hur vi tänker om säkerhet.',
    papers: [
      { title: 'Entropi som säkerhetsmått: varför ordning kostar energi', date: 'Kommande' },
      { title: 'Tid, observation och sårbarhet — ett fysikaliskt perspektiv', date: 'Kommande' },
    ],
  },
  {
    icon: Scale,
    title: 'Filosofi',
    text: 'Etik, frihet och ansvar i en värld av övervakning och motståndare.',
    papers: [
      { title: 'Att försvara det öppna samhället med slutna medel', date: 'Kommande' },
      { title: 'Förtroende är en sårbarhet — och vår viktigaste resurs', date: 'Kommande' },
    ],
  },
  {
    icon: Lock,
    title: 'Säkerhetsforskning',
    text: 'Metoder, motståndare och lärdomar från fyra decennier i fält.',
    papers: [
      { title: 'Utländska aktörers tålamod: långa kampanjer mot svenska mål', date: 'Kommande' },
      { title: 'Kontinuerlig säkerhet — varför engångskontroller inte räcker', date: 'Kommande' },
    ],
  },
]

export default function Papers() {
  return (
    <>
      <PageHero
        eyebrow="Papers"
        title={
          <>
            Tankar och forskning <span className="text-gradient">värda att läsa</span>.
          </>
        }
        description="Vetenskapliga rapporter, hypoteser och essäer om AI, teoretisk fysik, filosofi och säkerhet. För kunder, forskare och den nyfikne."
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="h-full">
              <article className="panel h-full p-7">
                <div className="flex items-center gap-3">
                  <c.icon className="h-6 w-6 text-signal" aria-hidden="true" />
                  <h2 className="font-display text-lg font-semibold">{c.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fog">{c.text}</p>
                <ul className="mt-5 space-y-3">
                  {c.papers.map((p) => (
                    <li key={p.title}>
                      <button
                        type="button"
                        disabled
                        className="group flex w-full items-start justify-between gap-4 rounded-lg border border-line/70 px-4 py-3 text-left transition-colors disabled:cursor-not-allowed"
                        title="Publiceras inom kort"
                      >
                        <span className="text-sm leading-relaxed text-frost">{p.title}</span>
                        <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                          {p.date}
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="panel mt-8 flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-lg font-semibold">Få nya papers direkt.</h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-fog">
                Prenumerera på vårt nyhetsbrev — högst ett mejl i månaden, krypterat om du
                vill, och alltid avpublicerbart med ett klick.
              </p>
            </div>
            <form
              className="flex w-full max-w-sm gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="papers-email" className="sr-only">
                E-postadress
              </label>
              <input
                id="papers-email"
                type="email"
                required
                placeholder="jobbmejl@foretag.se"
                className="w-full rounded-full border border-line bg-void/70 px-5 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-signal px-5 py-3 font-display text-sm font-semibold text-void transition-colors hover:bg-pulse"
              >
                Prenumerera
              </button>
            </form>
          </div>
        </Reveal>
      </section>
    </>
  )
}
