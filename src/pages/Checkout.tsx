import {
  Check,
  ShieldCheck,
  Radar,
  Network,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import QuoteForm, { type QuoteOption } from '@/components/QuoteForm'
import { VAT_NOTE } from '@/data/packages'

type Category = {
  name: string
  icon: LucideIcon
  price: string
  period: string
  description: string
  features: string[]
  to: string
  featured?: boolean
  soon?: boolean
}

const categories: Category[] = [
  {
    name: 'Kontinuerlig säkerhetskontroll',
    icon: Radar,
    price: 'Från 24 900 kr',
    period: 'per månad',
    description:
      'Externa kontroller som aldrig tar paus — månadsvis, veckovis eller dagligen. Rapport, remediering och agentisk konsult ingår.',
    features: [
      'Månads-, vecko- eller dagskontroll',
      'Fast pris efter antal sidor',
      'Remediering av varje fynd',
      'Agentisk konsult 48 h eller 24/7',
    ],
    to: '/checkout/extern',
    featured: true,
  },
  {
    name: 'Intern säkerhetsrevision',
    icon: ShieldCheck,
    price: '3 500 kr',
    period: 'per konsulttimme',
    description:
      'Super-säkra systemet inifrån, ungefär en gång per år. Tre nivåer — från vanlig säkerhet till militär grad.',
    features: [
      'Tre nivåer efter ert behov',
      'Behörigheter, loggning och isolation',
      'System som inte svarar vid sondering',
      'AI-verktyg ger 1/6 av tiden',
    ],
    to: '/checkout/intern',
  },
  {
    name: 'Säkerhetsledning',
    icon: Network,
    price: 'Offert',
    period: 'per uppdrag',
    description:
      'Strategisk rådgivning för ledning och styrelse — och 24/7 säkerhetsexpert som utbildar er personal. Experten kommer snart.',
    features: [
      'Säkerhetsstrategi på ledningsnivå',
      'Utbildning av personal och styrelse',
      'Stöd vid incidenter',
      '24/7 säkerhetsexpert — kommer snart',
    ],
    to: '/checkout/ledning',
    soon: true,
  },
]

const options: QuoteOption[] = [
  { value: 'extern', label: 'Kontinuerlig säkerhetskontroll' },
  { value: 'intern', label: 'Intern säkerhetsrevision' },
  { value: 'ledning', label: 'Säkerhetsledning' },
]

export default function Checkout() {
  return (
    <>
      <PageHero
        eyebrow="Välj paket"
        title={
          <>
            Säkerhet som är värd <span className="text-gradient">vartenda öre</span>.
          </>
        }
        description="Fasta priser på kontinuerliga kontroller och intern revision — offert där uppdraget kräver mer. Öppna ett paket för att se priser och nivåer."
      />

      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 100} className="h-full">
              <article
                className={`panel relative flex h-full flex-col p-7 ${
                  c.featured ? 'border-signal/60 shadow-[0_0_40px_rgba(56,189,248,0.12)]' : ''
                }`}
              >
                {c.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-signal px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-void">
                    Rekommenderad
                  </span>
                )}
                {c.soon && (
                  <span className="absolute -top-3 left-7 rounded-full border border-amber/60 bg-amber/15 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-amber">
                    Kommer snart
                  </span>
                )}
                <c.icon className="h-6 w-6 text-signal" aria-hidden="true" />
                <h2 className="mt-4 font-display text-xl font-semibold">{c.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-fog">{c.description}</p>
                <p className="mt-5 font-display text-3xl font-bold">
                  {c.price}
                  <span className="ml-2 text-sm font-normal text-fog">{c.period}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-frost">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  to={c.to}
                  variant={c.featured ? 'primary' : 'ghost'}
                  className="mt-8 w-full"
                >
                  Se paket &amp; priser
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
          {VAT_NOTE} · Lanseringspris
        </p>
      </section>

      <section id="forfragan" className="scroll-mt-24 border-t border-line/70 bg-abyss/50">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
              Berätta om er verksamhet.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-fog">
              Ju mer vi vet, desto bättre offert — särskilt för system över 100 sidor
              och intern revision. Allt ni skickar behandlas under tystnadsplikt.
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
            <QuoteForm options={options} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
