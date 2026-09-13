import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ShieldCheck, Radar, Network, ArrowRight } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'

const plans = [
  {
    name: 'Säkerhetskontroll',
    price: 'Offert',
    period: 'per kontroll',
    description: 'En extern, grundlig säkerhetskontroll av er verksamhet.',
    icon: ShieldCheck,
    features: [
      'Kartläggning av attackyta',
      'Teknisk och mänsklig granskning',
      'Skriftlig rapport till ledningen',
      'Åtgärdsplan med prioriteringar',
    ],
    featured: false,
  },
  {
    name: 'Kontinuerlig säkerhet',
    price: 'Offert',
    period: 'per månad',
    description: 'Vår flaggskeppstjänst — säkerhet som pågår, dygnet runt.',
    icon: Radar,
    features: [
      'Allt från Säkerhetskontroll',
      '24/7 övervakning och hotjakt',
      'Löpande leverantörsgranskning',
      'Incidentberedskap och rådgivning',
      'Statusportal med PGP-rapporter',
    ],
    featured: true,
  },
  {
    name: 'Säkerhetsledning',
    price: 'Offert',
    period: 'per uppdrag',
    description: 'Strategisk rådgivning för ledning och styrelse.',
    icon: Network,
    features: [
      'Säkerhetsstrategi på ledningsnivå',
      'Utbildning av personal och styrelse',
      'Styrning av säkerhetsorganisation',
      'Stöd vid incidenter',
    ],
    featured: false,
  },
]

export default function Checkout() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    // Simulated request — real integration comes in Phase B (Neon + Stripe + mail).
    setTimeout(() => navigate('/success'), 700)
  }

  return (
    <>
      <PageHero
        eyebrow="Välj paket"
        title={
          <>
            Säkerhet som är värd <span className="text-gradient">vartenda öre</span>.
          </>
        }
        description="B2B-prissättning baserad på offert — varje verksamhet är unik. Välj inriktning så återkommer en konsult med en skräddarsydd offert inom 24 timmar."
      />

      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className="h-full">
              <article
                className={`panel relative flex h-full flex-col p-7 ${
                  p.featured ? 'border-signal/60 shadow-[0_0_40px_rgba(56,189,248,0.12)]' : ''
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-signal px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-void">
                    Rekommenderad
                  </span>
                )}
                <p.icon className="h-6 w-6 text-signal" aria-hidden="true" />
                <h2 className="mt-4 font-display text-xl font-semibold">{p.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-fog">{p.description}</p>
                <p className="mt-5 font-display text-3xl font-bold">
                  {p.price}
                  <span className="ml-2 text-sm font-normal text-fog">{p.period}</span>
                </p>
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
                  Begär offert
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="forfragan" className="border-t border-line/70 bg-abyss/50">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
              Berätta om er verksamhet.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-fog">
              Ju mer vi vet, desto bättre offert. Allt ni skickar behandlas under
              tystnadsplikt och lagras aldrig längre än nödvändigt.
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
            <form onSubmit={onSubmit} className="panel space-y-5 p-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-fog">Företag *</span>
                  <input
                    required
                    type="text"
                    name="company"
                    className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
                    placeholder="Entropic Defence AB"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-fog">Organisationsnummer</span>
                  <input
                    type="text"
                    name="orgnr"
                    className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
                    placeholder="559999-9999"
                  />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm text-fog">Kontaktperson *</span>
                  <input
                    required
                    type="text"
                    name="name"
                    className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
                    placeholder="För- och efternamn"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-fog">Jobbmejl *</span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
                    placeholder="namn@foretag.se"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm text-fog">Intresserad av *</span>
                <select
                  required
                  name="plan"
                  defaultValue=""
                  className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost focus:border-signal focus:outline-none"
                >
                  <option value="" disabled>
                    Välj paket…
                  </option>
                  <option value="kontroll">Säkerhetskontroll</option>
                  <option value="kontinuerlig">Kontinuerlig säkerhet</option>
                  <option value="ledning">Säkerhetsledning</option>
                  <option value="vet-inte">Inte säker — behöver råd</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-fog">Beskriv er verksamhet och hotbild</span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-2 w-full resize-none rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
                  placeholder="Kort om er verksamhet, system och vad ni vill skydda…"
                />
              </label>
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? 'Skickar…' : 'Skicka förfrågan'}
                {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </Button>
              <p className="text-center text-xs leading-relaxed text-fog">
                Genom att skicka godkänner du vår{' '}
                <a href="/legal" className="text-signal hover:underline">
                  integritetspolicy
                </a>
                . Vi delar aldrig dina uppgifter med tredje part.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
