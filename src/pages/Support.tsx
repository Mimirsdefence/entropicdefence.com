import { useState, type FormEvent } from 'react'
import { Bot, ChevronDown } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'

const faqs = [
  {
    q: 'Vad menas med "kontinuerlig säkerhet"?',
    a: 'Att säkerhet inte är ett projekt med ett slutdatum, utan en pågående process: övervakning, hotjakt, granskning av leverantörer och återkommande kontroller — dygnet runt, året om.',
  },
  {
    q: 'Svarar ni verkligen 24/7?',
    a: 'Ja. Vår jour tar emot ärenden dygnet runt. Supportboten svarar direkt på vanliga frågor, och vid incidenter når ni alltid en människa.',
  },
  {
    q: 'Hur skickas säkerhetsrapporter?',
    a: 'Krypterat med PGP till de rapportmottagare ni anger — vanligtvis IT-ansvarig eller säkerhetschef. Ni bestämmer själva mottagare och nycklar.',
  },
  {
    q: 'Är ni oberoende?',
    a: 'Ja. Vi säljer ingen hårdvara eller mjukvara och tar ingen provision från leverantörer. Vår enda intäkt är rådgivningen — vår enda lojalitet är ert skydd.',
  },
  {
    q: 'Vad kostar det?',
    a: 'Varje verksamhet är unik, därför offererar vi alltid. Första samtalet är kostnadsfritt och utan förpliktelser. Se våra paket under "Välj paket".',
  },
  {
    q: 'Arbetar ni under tystnadsplikt?',
    a: 'Ja. Tystnadsplikt och säkerhetsskydd är standard i varje uppdrag, oavsett storlek. Vi tecknar gärna separata sekretessavtal innan första mötet.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="panel overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-frost">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-signal transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      {open && <p className="px-6 pb-6 text-sm leading-relaxed text-fog">{a}</p>}
    </div>
  )
}

export default function Support() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageHero
        eyebrow="Support & FAQ"
        title={
          <>
            Hjälp när ni behöver den — <span className="text-gradient">dygnet runt</span>.
          </>
        }
        description="Vanliga frågor, vår 24/7-supportbot och direktkontakt. Vid akuta incidenter: mejla och märk ämnesraden med INCIDENT."
      />

      <section className="mx-auto max-w-4xl px-5 pb-24 lg:px-8">
        <Reveal>
          <div className="panel flex flex-col items-start gap-4 border-signal/40 p-6 sm:flex-row sm:items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-signal/15">
              <Bot className="h-6 w-6 text-signal" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold">Prata med supportboten</h2>
              <p className="mt-1 text-sm leading-relaxed text-fog">
                Svarar direkt på vanliga frågor — och kopplar vidare till en människa när det
                behövs. Tillgänglig 24/7.
              </p>
            </div>
            <span className="rounded-full bg-mint/15 px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-mint">
              Online · 24/7
            </span>
          </div>
        </Reveal>

        <div className="mt-12">
          <Reveal>
            <h2 className="font-display text-2xl font-bold">Vanliga frågor</h2>
          </Reveal>
          <div className="mt-6 space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <FaqItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
        </div>

        <div id="kontakt" className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl font-bold">Kontakta oss</h2>
            <p className="mt-3 max-w-lg text-lg leading-relaxed text-fog">
              Mejla oss direkt — vi svarar inom 24 timmar, de flesta fall mycket snabbare.
            </p>
          </Reveal>

          <Reveal delay={100}>
            {sent ? (
              <div className="panel mt-8 border-mint/40 p-8 text-center">
                <p className="font-display text-xl font-semibold text-mint">Meddelandet är skickat.</p>
                <p className="mt-2 text-sm text-fog">
                  Vi återkommer inom 24 timmar. Vid akuta ärenden, märk mejlet med INCIDENT.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="panel mt-8 space-y-5 p-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm text-fog">Namn *</span>
                    <input
                      required
                      type="text"
                      className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
                      placeholder="För- och efternamn"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-fog">E-post *</span>
                    <input
                      required
                      type="email"
                      className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
                      placeholder="namn@foretag.se"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm text-fog">Ämne *</span>
                  <select
                    required
                    defaultValue=""
                    className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost focus:border-signal focus:outline-none"
                  >
                    <option value="" disabled>
                      Välj ämne…
                    </option>
                    <option>Fråga om tjänster</option>
                    <option>Support för pågående uppdrag</option>
                    <option>Incident (akuta ärenden)</option>
                    <option>Övrigt</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-fog">Meddelande *</span>
                  <textarea
                    required
                    rows={5}
                    className="mt-2 w-full resize-none rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
                    placeholder="Hur kan vi hjälpa er?"
                  />
                </label>
                <Button type="submit" className="w-full">
                  Skicka meddelande
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
