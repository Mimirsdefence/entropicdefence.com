/**
 * Säkerhetspaketen — enda källan för priser och nivåer.
 * Alla priser är exkl. moms (25 % moms tillkommer för svenska kunder).
 * Dessa är lanseringspriser och kan höjas när referenser finns.
 */

export type PageTierKey = 'small' | 'medium' | 'large'

export type PageTier = {
  key: PageTierKey
  label: string
  short: string
  note: string
}

export const pageTiers: PageTier[] = [
  {
    key: 'small',
    label: 'Under 20 sidor',
    short: '< 20',
    note: 'Webbplats eller app med färre än 20 sidor.',
  },
  {
    key: 'medium',
    label: '20–100 sidor',
    short: '20–100',
    note: 'Medelstora system med flera ytor och integrationer.',
  },
  {
    key: 'large',
    label: '100+ sidor',
    short: '100+',
    note: 'Komplexa system — prissätts efter behovsanalys.',
  },
]

export type ExternalPlan = {
  id: string
  name: string
  cadence: string
  consultant: string
  description: string
  features: string[]
  /** Pris per månad och sidantal. 'Offert' där vi behöver mer information. */
  prices: Record<PageTierKey, string>
  featured?: boolean
}

export const externalPlans: ExternalPlan[] = [
  {
    id: 'manad',
    name: 'Månadskontroll',
    cadence: '1 extern kontroll per månad',
    consultant: '48 timmar agentisk konsult efter varje kontroll',
    description:
      'Den löpande basen: en fullständig extern kontroll varje månad, med åtgärdsförslag och en konsult som hjälper er stänga fynden.',
    features: [
      '1 extern säkerhetskontroll varje månad',
      'Skriftlig rapport med remediering per fynd',
      '48 timmar agentisk konsult efter varje kontroll',
      'Löpande rådgivning till er IT-personal',
    ],
    prices: {
      small: '24 900 kr',
      medium: '44 900 kr',
      large: 'Offert',
    },
  },
  {
    id: 'vecka',
    name: 'Veckokontroll',
    cadence: '1 extern kontroll per vecka',
    consultant: '24/7 agentisk konsult',
    description:
      'För verksamheter som inte har råd att vara sårbara i mer än några dagar — tätare kontroller och en konsult som alltid finns tillgänglig.',
    features: [
      '1 extern säkerhetskontroll varje vecka',
      'Skriftlig rapport med remediering per fynd',
      '24/7 agentisk konsult med obegränsad dialog',
      'Prioriterad hantering av kritiska fynd',
      'Kvartalsvis genomgång för säkerhetsledningen',
    ],
    prices: {
      small: '59 900 kr',
      medium: '99 900 kr',
      large: 'Offert',
    },
    featured: true,
  },
  {
    id: 'dag',
    name: 'Daglig kontroll',
    cadence: '1 extern kontroll per dag',
    consultant: '24/7 agentisk konsult · högsta prioritet',
    description:
      'Används nästan uteslutande av försvar och myndigheter. Angriparen får aldrig mer än ett dygn på sig — ofta mindre.',
    features: [
      '1 extern säkerhetskontroll varje dag',
      'Skriftlig rapport med remediering per fynd',
      '24/7 agentisk konsult med högsta prioritet',
      'Anpassad för försvar, myndighet och kritisk infrastruktur',
      'Säkerhetsskydd och tystnadsplikt enligt högsta klass',
    ],
    prices: {
      small: '149 900 kr',
      medium: '249 900 kr',
      large: 'Offert',
    },
  },
]

export type InternalLevel = {
  id: string
  name: string
  level: string
  tagline: string
  description: string
  features: string[]
  featured?: boolean
}

/**
 * Intern säkerhetsrevision — super-säkrar systemet inifrån.
 * Kalkyleras i konsulttid (3 500 kr/tim) utifrån vald nivå och miljö.
 */
export const internalLevels: InternalLevel[] = [
  {
    id: 'vanlig',
    name: 'Vanlig säkerhet',
    level: 'Nivå 1',
    tagline: 'Fortfarande högre än vad någon annan aktör levererar.',
    description:
      'Genomgång av behörigheter, loggning, segmentering och rutiner inifrån. Krävs av många revisorer — och stänger dörrar som en extern kontroll aldrig ser.',
    features: [
      'Behörighets- och rollgenomgång',
      'Loggning, larmning och spårbarhet',
      'Rutiner för personal och leverantörer',
      'Slutrapport med prioriterad åtgärdsplan',
    ],
  },
  {
    id: 'hog',
    name: 'Hög säkerhet',
    level: 'Nivå 2',
    tagline: 'Super hög säkerhet där insidan inte litar på någon — inte ens sig själv.',
    description:
      'Nolltillitsarkitektur, segmenterade zoner och hemligheter som aldrig lämnar hårdvaran. För verksamheter med känsliga data och verkliga skyddsvärden.',
    features: [
      'Nolltillitsarkitektur och mikrosegmentering',
      'Kryptonyckelhantering och hemlighetsspridning',
      'Insider-skydd och anomalidetektering',
      'Beredskapsplan för intern incident',
    ],
    featured: true,
  },
  {
    id: 'militar',
    name: 'Militär grad',
    level: 'Nivå 3',
    tagline: 'Systemen syns inte ens när någon pingar dem.',
    description:
      'Den högsta interna nivån vi levererar. Systemet existerar, men avger inget svar, inget fingeravtryck och ingen regelbundenhet. Reserverat för försvar, myndighet och kritisk infrastruktur.',
    features: [
      'Dold infrastruktur — inga svar vid sondering',
      'Avsiktligt brus mot fingeravtryck och tidsanalys',
      'Fysisk och logisk isolation av nyckelmaterial',
      'Kontinuerlig revision av hela kedjan inifrån',
      'Säkerhetskydd enligt högsta klass',
    ],
  },
]

export const INTERNAL_RATE = '3 500 kr'

export const VAT_NOTE = 'Priser exkl. moms · 25 % moms tillkommer'
