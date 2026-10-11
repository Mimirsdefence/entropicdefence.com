/**
 * Delade typer för mejlagenterna.
 */

export type PersonaId = 'support' | 'security' | 'consultant'

/** Hur illa avsikten i ett inkommande mejl bedöms vara. */
export type AbuseLevel = 'normal' | 'mild' | 'severe'

export interface Persona {
  id: PersonaId
  /**
   * Förnamnet agenten går under mot kunder. Alltid samma namn för samma
   * brevlåda, så att kunden möter en och samma person i hela tråden.
   */
  name: string
  /**
   * Vem som tar över när ärendet går till en människa, som fras mitt i en
   * mening, t.ex. "vår säkerhetskonsult". Avsiktligt utan namn — kunden ska
   * bara veta att en människa tar över, inte vem. Används både i kundsvaret
   * och i ägar-mejlet.
   */
  handover: string
  /** Avsändaradressen agenten svarar ifrån. */
  address: string
  /** Visningsnamn i From-headern, t.ex. "Mimir · Entropic Defence". */
  displayName: string
  /** Kort rollbeskrivning som hamnar i systemprompten. */
  role: string
  /** Det agenten får hantera. Allt annat avvisas med `redirect`. */
  scope: string[]
  /** Fast omdirigeringsmening (översätts till kundens språk av modellen). */
  redirect: string
  /** Saker agenten aldrig får göra. */
  forbidden: string[]
  /** Situationer där ärendet i stället går till en människa. */
  escalateIf: string[]
  /** Signaturblock. Läggs till maskinellt efter modellens svar. */
  signature: string
  /** Filnamn (utan ändelse) för personaspecifika promptregler i prompts/. */
  promptFile: string
}

export interface IncomingMail {
  mailbox: string
  uid: number
  from: string
  fromName: string
  to: string
  /** Reply-To om kunden angett en annan adress än From. */
  replyTo: string | null
  subject: string
  text: string
  /** Filnamn på bilagor, så agenten kan bekräfta att de kommit fram. */
  attachments: string[]
  messageId: string | null
  references: string[]
  date: Date
  /** Autosvar, utskick eller nyhetsbrev — besvaras aldrig. */
  isAutomated: boolean
  /** One.com:s Authentication-Results (SPF/DKIM/DMARC). */
  authResults: string | null
}

/** Det modellen alltid måste returnera (samma kontrakt som i n8n-workflowet). */
export interface AgentDecision {
  reply: string
  /**
   * Kort besked till kunden NÄR ärendet eskaleras till en människa och tonen är
   * normal ("vi tar det här internt, du hörs av inom 24 timmar"). Tom sträng i
   * alla andra fall — vid mild eller severe ton får kunden inget svar alls.
   * Forseti granskar den precis som `reply`.
   */
  holdReply: string
  abuseLevel: AbuseLevel
  escalate: boolean
  escalateReason: string
  /** Sant när kunden SKA få svar OCH ägaren samtidigt får en kopia (t.ex. offertfall). */
  notifyOwner: boolean
  /** Sant när kunden tydligt vill köpa — tråden undantas från dygnstaket. */
  purchaseIntent: boolean
  summary: string
  /**
   * Kundens beställning, ifylld av modellen BARA när underlaget är komplett.
   * Modellen lämnar aldrig pris, moms eller belopp — det räknar koden fram ur
   * `stripe/catalog.ts`. `null` betyder "ingen beställning att fakturera".
   */
  invoice: InvoiceOrder | null
}

/** Paketen som går att fakturera — samma nycklar som `stripe/catalog.ts`. */
export type InvoicePlanId = 'manad' | 'vecka' | 'dag'
export type InvoiceTierId = 'small' | 'medium'
export type InvoicePeriodId = 'month' | 'quarter' | 'year'

export const INVOICE_PLANS = ['manad', 'vecka', 'dag'] as const
export const INVOICE_TIERS = ['small', 'medium'] as const
export const INVOICE_PERIODS = ['month', 'quarter', 'year'] as const

/**
 * Beställningen så som modellen lämnar den: bara fakta kunden uppgett.
 * `email` får vara tom — då används avsändarens adress (koden fyller i den,
 * aldrig modellen). Landet härleds ur VAT-numret/org.numret av koden.
 */
export interface InvoiceOrder {
  company: string
  orgNr: string
  vatNumber: string
  email: string
  reference: string
  plan: InvoicePlanId
  tier: InvoiceTierId
  period: InvoicePeriodId
}


export type RunAction = 'replied' | 'escalated' | 'silenced' | 'skipped'

export interface RunResult {
  action: RunAction
  /** Abuse-poäng efter den här omgången. */
  abuseCount: number
  /** Varför inget svar skickades (vid skipped/silenced). */
  reason?: string
  decision?: AgentDecision
  /** Sändningen misslyckades tillfälligt — försök igen nästa omgång. */
  retry?: boolean
}

export interface MailboxCredentials {
  user: string
  pass: string
}

/** Ett svar som ska skickas från en agent. */
export interface OutgoingReply {
  /** Personen som svarar — bestämmer From-header, signatur och spårheader. */
  persona: Persona
  /** Kundens adress. */
  to: string
  /**
   * Vart kundens svar ska gå. Sätts bara på hållbesked vid eskalering, så att
   * kundens följdfråga når människan i stället för att hamna hos agenten igen.
   */
  replyTo?: string
  /** Message-ID för mejlet vi svarar på (trådning). */
  inReplyTo: string | null
  /** Hela kedjan av Message-ID:n, äldst först. */
  references: string[]
  subject: string
  /** Själva svaret, utan signatur (signaturen läggs till av agenten). */
  body: string
}

/** En mapp i brevlådan, så som servern rapporterar den. */
export interface MailboxInfo {
  path: string
  /** T.ex. `\Sent` eller `\Trash` om mappen är markerad som specialmapp. */
  specialUse: string | null
  subscribed: boolean
}
