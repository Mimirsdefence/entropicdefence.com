/**
 * Mejlklient for agenterna.
 *
 * Lasning:  IMAP mot imap.one.com. Servern knuffar in nya mejl via IDLE,
 *           sa agenten svarar inom sekunder utan att polla och utan API.
 * Skickning: SMTP mot send.one.com. Vi bygger MIME sjalva och skickar samma
 *           rada via SMTP och via IMAP APPEND till Skickat-mappen, precis
 *           som en vanlig mejlklient gor.
 *
 * Inget API ar inblandat. SPF/DKIM stammer darfor automatiskt, eftersom
 * svaret kommer fran sjalva brevlada som kunden skrev till.
 */
import { ImapFlow } from 'imapflow'
import type { FetchMessageObject, ListResponse } from 'imapflow'
import { simpleParser } from 'mailparser'
import type { AddressObject, ParsedMail } from 'mailparser'
import nodemailer from 'nodemailer'
import type { IncomingMail, MailboxCredentials, MailboxInfo, OutgoingReply } from './types.js'

const CLIENT_INFO = { name: 'EntropicAgents', version: '0.1.0' }

/** Max antal mejl per omgang, sa en stor hog inte forsinker lyssnaren. */
export const MAX_MESSAGES_PER_ROUND = 20

/** Sa mycket text ur ett mejl skickas till modellen. */
const MAX_BODY_CHARS = 20_000

/** Rubriker som avslojar autosvar, utskick och var egen trafik. */
const AUTOMATED_HEADERS = [
  'auto-submitted',
  'list-unsubscribe',
  'list-id',
  'x-auto-response-suppress',
  'x-entropic-agent',
]

const AUTOMATED_PRECEDENCE = ['bulk', 'junk', 'list', 'auto_reply']

/** Adresser som per definition inte kan ta emot ett svar. */
const NO_REPLY_PATTERN = /^(no-?reply|do-?not-?reply|mailer-daemon|postmaster|bounce)/i

export interface RawMessage {
  uid: number
  source: Buffer
  internalDate?: Date | string | undefined
}

export interface FetchOptions {
  /** Las hela historiken vid forsta korningen (annars hoppar vi over det gamla). */
  backlog?: boolean
  /** Max antal mejl denna omgang. */
  max?: number
  /** false nar anroparen redan haller en las pa mappen (worker-lyssnaren). */
  lock?: boolean
  /**
   * Unik nyckel for brevlådan (t.ex. "INBOX:security@entropicdefence.com").
   * UID:n raknas per IMAP-mapp, sa den har nyckeln — inte mappnamnet — maste
   * anvandas nar ett mejl markeras som hanterat eller slas upp igen.
   * Standard: mappnamnet (raknas da som en enda brevlåda).
   */
  scope?: string
}

export interface FetchResult {
  messages: IncomingMail[]
  /** Hogsta UID vi ar klara med — spara den och skicka in den nasta gang. */
  lastUid: number
}

export interface MimeResult {
  raw: Buffer
  messageId: string | null
}

export interface SendResult {
  messageId: string
  savedToSent: boolean
}

export interface VerifyResult {
  mailboxes: MailboxInfo[]
  sentFolder: string | null
}

// ---------------------------------------------------------------------------
// Anslutningsinstallningar
// ---------------------------------------------------------------------------

function envValue(key: string, fallback: string): string {
  return (process.env[key] ?? '').trim() || fallback
}

function envPort(key: string, fallback: number): number {
  const value = Number((process.env[key] ?? '').trim())
  return Number.isFinite(value) && value > 0 ? value : fallback
}

export function imapHost(): string {
  return envValue('IMAP_HOST', 'imap.one.com')
}

export function imapPort(): number {
  return envPort('IMAP_PORT', 993)
}

export function smtpHost(): string {
  return envValue('SMTP_HOST', 'send.one.com')
}

export function smtpPort(): number {
  return envPort('SMTP_PORT', 465)
}

/** IMAP-anslutningen. Halls oppen — IDLE skots automatiskt nar den ar ledig. */
export function createImapClient(credentials: MailboxCredentials): ImapFlow {
  return new ImapFlow({
    host: imapHost(),
    port: imapPort(),
    secure: true,
    auth: { user: credentials.user, pass: credentials.pass },
    clientInfo: CLIENT_INFO,
    logger: false,
    connectionTimeout: 30_000,
    greetingTimeout: 20_000,
    socketTimeout: 10 * 60_000,
    // Bryt och ateruppta IDLE var femte minut, sa en tyst lina inte dor.
    maxIdleTime: 5 * 60_000,
  })
}

function smtpTransport(credentials: MailboxCredentials) {
  return nodemailer.createTransport({
    host: smtpHost(),
    port: smtpPort(),
    secure: true,
    auth: { user: credentials.user, pass: credentials.pass },
    connectionTimeout: 30_000,
    greetingTimeout: 20_000,
    socketTimeout: 60_000,
  })
}

// ---------------------------------------------------------------------------
// Tolka inkommande
// ---------------------------------------------------------------------------

function headerText(parsed: ParsedMail, key: string): string {
  const raw = parsed.headers.get(key)
  if (raw === undefined || raw === null) return ''
  if (typeof raw === 'string') return raw
  if (Array.isArray(raw)) return raw.map((item) => String(item)).join(' ')
  return String(raw)
}

/** Autosvar, utskick och nyhetsbrev ska aldrig besvaras — det blir bara rundganger. */
export function isAutomatedMail(parsed: ParsedMail): boolean {
  for (const key of AUTOMATED_HEADERS) {
    if (headerText(parsed, key).trim()) return true
  }
  const precedence = headerText(parsed, 'precedence').trim().toLowerCase()
  return AUTOMATED_PRECEDENCE.includes(precedence)
}

export function isNoReplyAddress(address: string): boolean {
  return NO_REPLY_PATTERN.test(address.trim().toLowerCase())
}

function firstAddress(field: AddressObject | AddressObject[] | undefined): string | null {
  const box = Array.isArray(field) ? field[0] : field
  return box?.value?.[0]?.address?.trim().toLowerCase() ?? null
}

function truncate(value: string): string {
  return value.length > MAX_BODY_CHARS ? `${value.slice(0, MAX_BODY_CHARS)}\n[...]` : value
}

function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|tr|li|h[1-6])>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#3[49];/gi, "'")
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function bodyText(parsed: ParsedMail): string {
  if (typeof parsed.text === 'string' && parsed.text.trim()) return truncate(parsed.text.trim())
  if (typeof parsed.html === 'string') return truncate(htmlToText(parsed.html))
  return ''
}

function toDate(internalDate: Date | string | undefined, parsedDate: Date | undefined): Date {
  if (internalDate instanceof Date) return internalDate
  if (typeof internalDate === 'string') {
    const fromHeader = new Date(internalDate)
    if (!Number.isNaN(fromHeader.getTime())) return fromHeader
  }
  if (parsedDate instanceof Date) return parsedDate
  return new Date()
}

/** Gor om ett rada mejl till var normaliserade form. null = lamna (t.ex. ingen avsandare). */
export async function parseIncoming(mailbox: string, raw: RawMessage): Promise<IncomingMail | null> {
  const parsed = await simpleParser(raw.source)
  const from = parsed.from?.value?.[0]
  const fromAddress = (from?.address ?? '').trim().toLowerCase()
  if (!fromAddress) return null

  const references =
    typeof parsed.references === 'string'
      ? parsed.references.split(/\s+/).filter(Boolean)
      : [...(parsed.references ?? [])]

  return {
    mailbox,
    uid: raw.uid,
    from: fromAddress,
    fromName: (from?.name ?? '').trim(),
    to: firstAddress(parsed.to) ?? '',
    replyTo: firstAddress(parsed.replyTo),
    subject: (parsed.subject ?? '').trim(),
    text: bodyText(parsed),
    attachments: (parsed.attachments ?? []).map(
      (attachment, index) => attachment.filename?.trim() || `bilaga-${index + 1}`,
    ),
    messageId: parsed.messageId?.trim() || null,
    references,
    date: toDate(raw.internalDate, parsed.date),
    isAutomated: isAutomatedMail(parsed),
    authResults: headerText(parsed, 'authentication-results').trim() || null,
  }
}

// ---------------------------------------------------------------------------
// Lasning
// ---------------------------------------------------------------------------

/**
 * Hamtar nya mejl fran en mapp (INBOX).
 *
 * `sinceUid` ar hogsta UID vi redan tittat pa. Ar den 0 (forsta korningen)
 * borjar vi fran slutet, sa agenten inte svarar pa gammal post — satts
 * `backlog: true` for att i stallet ta med de senaste mejlen.
 */
export async function fetchMessages(
  client: ImapFlow,
  mailbox: string,
  sinceUid: number,
  options: FetchOptions = {},
): Promise<FetchResult> {
  const max = options.max ?? MAX_MESSAGES_PER_ROUND
  const raw: RawMessage[] = []
  let lastUid = Math.max(sinceUid, 0)

  const lock = options.lock === false ? null : await client.getMailboxLock(mailbox)
  try {
    const box = client.mailbox
    const uidNext = box && typeof box === 'object' && typeof box.uidNext === 'number' ? box.uidNext : 1

    let start = Math.max(sinceUid, 0)
    if (start === 0) {
      start = options.backlog ? Math.max(uidNext - 1 - max, 0) : Math.max(uidNext - 1, 0)
    }
    lastUid = start

    const range = start > 0 ? `${start + 1}:*` : '1:*'
    const query = { uid: true, source: true, internalDate: true }
    for await (const message of client.fetch(range, query, { uid: true }) as AsyncIterable<FetchMessageObject>) {
      // En tom intervall far servern att svara med sista meddelandet — hoppa over det.
      if (message.uid <= start) continue
      // Resten tar vi nasta runda; lastUid star kvar vid senast bearbetade.
      if (raw.length >= max) break
      raw.push({
        uid: message.uid,
        source: message.source ?? Buffer.alloc(0),
        internalDate: message.internalDate,
      })
    }
  } finally {
    lock?.release()
  }

  raw.sort((a, b) => a.uid - b.uid)
  const scope = options.scope ?? mailbox
  const messages: IncomingMail[] = []
  for (const item of raw) {
    lastUid = Math.max(lastUid, item.uid)
    if (item.source.length === 0) continue
    try {
      const parsed = await parseIncoming(scope, item)
      if (parsed) messages.push(parsed)
    } catch (error) {
      console.error(`[mail] kunde inte tolka uid ${item.uid} i ${scope}:`, error)
    }
  }

  return { messages, lastUid }
}

export async function listMailboxes(client: ImapFlow): Promise<MailboxInfo[]> {
  const boxes: ListResponse[] = await client.list()
  return boxes.map((box) => ({
    path: box.path,
    specialUse: box.specialUse ?? null,
    subscribed: box.subscribed,
  }))
}

const sentFolderCache = new WeakMap<ImapFlow, string | null>()

/** Hittar Skickat-mappen (helst via serverns `\Sent`-markering). */
export async function findSentFolder(client: ImapFlow): Promise<string | null> {
  const cached = sentFolderCache.get(client)
  if (cached !== undefined) return cached

  const boxes: ListResponse[] = await client.list()
  const match =
    boxes.find((box) => (box.specialUse ?? '').toLowerCase() === '\\sent') ??
    boxes.find((box) => /^(sent|sent items|skickat|skickat objekt)$/i.test(box.name)) ??
    null

  const path = match?.path ?? null
  sentFolderCache.set(client, path)
  return path
}

// ---------------------------------------------------------------------------
// Skickning
// ---------------------------------------------------------------------------

/** Bygger sjalva MIME-radan (samma som senare skickas och sparas i Skickat). */
export async function buildReplyMime(reply: OutgoingReply): Promise<MimeResult> {
  const builder = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'unix' })
  const references = reply.references.filter(Boolean)

  const built = await builder.sendMail({
    from: { name: reply.persona.displayName, address: reply.persona.address },
    to: reply.to,
    replyTo: reply.replyTo,
    subject: reply.subject,
    text: reply.body,
    inReplyTo: reply.inReplyTo ?? undefined,
    references: references.length ? references.join(' ') : undefined,
    headers: {
      // Var egen markering: om ett svar av nagon anledning studsar tillbaka
      // hit igen kanner vi igen det och svarar inte.
      'X-Entropic-Agent': reply.persona.id,
      // RFC 3834: marks att svaret ar automatiskt, sa andra autosvarare
      // avstar fran att svara oss (skyddar mot mejlrundor).
      'Auto-Submitted': 'auto-replied',
    },
  })

  const raw = built.message
  if (!Buffer.isBuffer(raw)) throw new Error('Kunde inte bygga MIME-meddelandet (ingen buffer).')

  return { raw, messageId: built.messageId || null }
}

/**
 * Skickar svaret via SMTP och lagger samma rada i Skickat-mappen.
 *
 * `reply.to` maste vara kundens adress. Envelope-from satts alltid till
 * personans adress, sa SPF stammer aven om autentiseringen sker med ett alias.
 */
export async function sendReply(
  client: ImapFlow,
  credentials: MailboxCredentials,
  reply: OutgoingReply,
): Promise<SendResult> {
  const { raw } = await buildReplyMime(reply)

  const smtp = smtpTransport(credentials)
  let messageId = ''
  try {
    const info = await smtp.sendMail({
      envelope: { from: reply.persona.address, to: reply.to },
      raw,
    })
    messageId = info.messageId
  } finally {
    smtp.close()
  }

  let savedToSent = false
  try {
    const sent = await findSentFolder(client)
    if (sent) {
      await client.append(sent, raw, ['\\Seen'])
      savedToSent = true
    } else {
      console.warn(`[mail] hittade ingen Skickat-mapp i ${credentials.user} — kopian uteblir.`)
    }
  } catch (error) {
    console.error('[mail] kunde inte spara kopia i Skickat:', error)
  }

  return { messageId, savedToSent }
}

// ---------------------------------------------------------------------------
// Kontroll (anvands av CLI:t innan nagot skickas)
// ---------------------------------------------------------------------------

/** Loggar in pa IMAP, listar mapparna och hittar Skickat. Skickar ingenting. */
export async function verifyImap(credentials: MailboxCredentials): Promise<VerifyResult> {
  const client = createImapClient(credentials)
  await client.connect()
  try {
    const mailboxes = await listMailboxes(client)
    const sentFolder = await findSentFolder(client)
    return { mailboxes, sentFolder }
  } finally {
    await client.logout().catch(() => undefined)
  }
}

/** Loggar in pa SMTP utan att skicka nagot (EHLO + AUTH). */
export async function verifySmtp(credentials: MailboxCredentials): Promise<boolean> {
  const smtp = smtpTransport(credentials)
  try {
    await smtp.verify()
    return true
  } finally {
    smtp.close()
  }
}

/** Markerar ett hanterat mejl som last, sa brevlådan visar vad agenten gjort. */
export async function markSeen(
  client: ImapFlow,
  mailbox: string,
  uid: number,
  options: { lock?: boolean } = {},
): Promise<void> {
  const lock = options.lock === false ? null : await client.getMailboxLock(mailbox)
  try {
    await client.messageFlagsAdd({ uid }, ['\\Seen'], { uid: true })
  } finally {
    lock?.release()
  }
}
