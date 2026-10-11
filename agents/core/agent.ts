/**
 * Agenten — en omgang for ett inkommande mejl.
 *
 * Ordningen ar medvetet: alla billiga skydd (autosvar, dubbelhantering, tystad
 * avsandare, dygnstak) provas innan modellen far kosta pengar, och modellens
 * svar granskas innan nagot lamnar huset.
 *
 * Ingenting skickas om `dryRun` ar satt — da skrivs svaret ut i terminalen
 * i stallet, sa flodet kan koras mot ett testkonto utan att nagot gar ut.
 */
import type { ImapFlow } from 'imapflow'

import {
  MAX_REFUSAL_RETRIES,
  MAX_REPLIES_PER_SENDER_PER_DAY,
  RETRY_INSTRUCTION,
  isRefusal,
  isSilenced,
  nextAbuseCount,
} from './guardrails.js'
import { askAgent } from './llm.js'
import type { ChatMessage } from './llm.js'
import { fetchMessages, isNoReplyAddress, markSeen, sendReply } from './mail.js'
import { buildSystemPrompt } from './prompt.js'
import { createPurchase, type PurchaseOutcome } from './purchase.js'
import { markAsSeen, ownerEmail, processBacklog } from './env.js'
import {
  MAX_REVIEW_ROUNDS,
  describeIssues,
  judgeDraft,
  reviewInstruction,
  wireJson,
} from './review.js'
import type { ReviewIssue } from './review.js'
import {
  audit,
  countReply,
  getAbuseCount,
  getLastUid,
  getRepliesToday,
  getSummary,
  isProcessed,
  isPurchaseThread,
  markProcessed,
  setAbuseCount,
  setLastUid,
  setPurchaseThread,
  setSummary,
} from './store.js'
import type {
  AgentDecision,
  IncomingMail,
  MailboxCredentials,
  OutgoingReply,
  Persona,
  RunResult,
} from './types.js'

export interface RunOptions {
  /** true = allt gors som vanligt utom sändningen (för lokal testkörning). */
  dryRun?: boolean
}

/**
 * Hållbesked när granskningen stoppat svaret och modellen därför inte hann
 * formulera ett eget. Kort, utan namn och utan löften om samtal — samma ton som
 * övriga hållbesked, och svaret går till ägaren via `Reply-To`.
 */
const FALLBACK_HOLD_REPLY =
  'Tack för ditt mejl. Det har kommit fram och en av våra säkerhetskonsulter svarar dig från den här adressen.'

/** `Re:` framfor amnet, om det inte redan star dar (aven Sv:/AW:/Odp:). */
function replySubject(subject: string): string {
  const clean = subject.trim()
  if (!clean) return 'Re: (inget amne)'
  return /^(re|sv|aw|odp)\s*:/i.test(clean) ? clean : `Re: ${clean}`
}

/** Mejlet sadant modellen ser det — headers vi sjalva behover, inte hela radatan. */
function buildUserMessage(mail: IncomingMail): string {
  const lines = [
    `Fran: ${mail.fromName ? `${mail.fromName} <${mail.from}>` : mail.from}`,
    `Till: ${mail.to || mail.mailbox}`,
    `Amne: ${mail.subject || '(inget amne)'}`,
    `Datum: ${mail.date.toISOString()}`,
  ]
  if (mail.attachments.length) {
    lines.push(`Bilagor: ${mail.attachments.join(', ')}`)
  }
  lines.push('', mail.text || '(mejlet hade ingen text — bara bilagor eller formatering)')
  return lines.join('\n')
}

/** Kort svar till modellen dar den svarar pa sitt eget svar (försök 2 och 3). */
function assistantTurn(reply: string): string {
  return reply.trim() || '(inget anvandbart svar)'
}

/**
 * Fragar modellen och gor om forsoket nar svaret ar en undanflykt.
 * Vi skickar hellre aldrig nagot an ett svar som later som en robot.
 */
async function askUntilUsable(
  systemPrompt: string,
  mail: IncomingMail,
): Promise<{
  decision: AgentDecision
  attempts: number
  refused: boolean
  messages: ChatMessage[]
}> {
  const messages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: buildUserMessage(mail) },
  ]

  let decision = await askAgent(messages)
  let attempts = 1

  while (!decision.escalate && isRefusal(decision.reply) && attempts < MAX_REFUSAL_RETRIES) {
    messages.push({ role: 'assistant', content: assistantTurn(decision.reply) })
    messages.push({ role: 'user', content: RETRY_INSTRUCTION })
    decision = await askAgent(messages)
    attempts += 1
  }

  const refused = !decision.escalate && isRefusal(decision.reply)
  return { decision, attempts, refused, messages }
}

/**
 * Forseti — revisorn. Texten som är på väg till kunden granskas och agenten får
 * skriva om tills den håller, men aldrig mer än `MAX_REVIEW_ROUNDS` varv.
 * Står anmärkningarna kvar efter det går ärendet till en människa i stället för
 * att ett tveksamt mejl skickas — vi loopar aldrig i evighet.
 *
 * Samma samtalshistorik som agentskaparen använde följer med, så modellen ser
 * sitt eget utkast när den skriver om.
 */
async function reviewUntilUsable(
  messages: ChatMessage[],
  persona: Persona,
  mail: IncomingMail,
  draft: AgentDecision,
): Promise<{ decision: AgentDecision; rewrites: number; issues: ReviewIssue[] }> {
  let decision = draft
  let issues = await judgeDraft(decision, { persona, mail })
  let rewrites = 0

  while (issues.length > 0 && rewrites < MAX_REVIEW_ROUNDS) {
    console.log(`[forseti] underkänt utkast (varv ${rewrites + 1}) — ${describeIssues(issues)}`)
    messages.push({ role: 'assistant', content: wireJson(decision) })
    messages.push({ role: 'user', content: reviewInstruction(issues) })
    decision = await askAgent(messages)
    issues = await judgeDraft(decision, { persona, mail })
    rewrites += 1
  }

  if (issues.length > 0) {
    console.warn(
      `[forseti] gav upp efter ${rewrites} omskrivningar — ärendet går till en människa: ${describeIssues(issues)}`,
    )
  } else if (rewrites > 0) {
    console.log(`[forseti] godkände utkastet efter ${rewrites} omskrivning(ar).`)
  }

  return { decision, rewrites, issues }
}

function ownerAddress(): string {
  return (process.env.OWNER_EMAIL ?? '').trim()
}

/**
 * Meddelar agaren om ett arende.
 * Utan `customerReply`: eskalering — kunden far inget svar.
 * Med `customerReply`: kopia — kunden fick ett autosvar och agaren tar over.
 * `extra` hängs på i slutet (t.ex. fakturautkastet med dashboardlänk).
 */
async function notifyOwner(
  client: ImapFlow,
  credentials: MailboxCredentials,
  persona: Persona,
  mail: IncomingMail,
  reason: string,
  dryRun: boolean,
  customerReply?: string,
  extra?: string,
): Promise<boolean> {
  const owner = ownerAddress()
  if (!owner) {
    console.warn('[agent] OWNER_EMAIL saknas — agaren kan inte meddelas.')
    return false
  }

  const isCopy = typeof customerReply === 'string' && customerReply.trim().length > 0
  const heading = isCopy
    ? `Kunden fick ett autosvar fran ${persona.displayName} (<${persona.address}>), men arendet behover din uppmarksamhet.`
    : `Arendet nedan ligger utanfor vad ${persona.displayName} (<${persona.address}>) far hantera och har darfor inte besvarats automatiskt.`

  const body = [
    heading,
    '',
    `Anledning: ${reason || '(ingen anledning angiven)'}`,
    '',
    `Fran: ${mail.fromName ? `${mail.fromName} <${mail.from}>` : mail.from}`,
    `Amne: ${mail.subject || '(inget amne)'}`,
    `Datum: ${mail.date.toISOString()}`,
    `Brevlada: ${mail.mailbox} (uid ${mail.uid})`,
    '',
  ]

  if (isCopy) {
    body.push('--- agentens svar till kunden ---', customerReply as string, '')
  }

  if (extra && extra.trim()) {
    body.push('--- fakturautkast ---', extra.trim(), '')
  }

  body.push('--- kundens mejl ---', mail.text || '(ingen text)')

  const reply: OutgoingReply = {
    persona,
    to: owner,
    inReplyTo: mail.messageId,
    references: [...mail.references, ...(mail.messageId ? [mail.messageId] : [])],
    subject: `${isCopy ? '[Kopia till agaren]' : '[Manuell hantering]'} ${persona.id}: ${mail.subject || '(inget amne)'}`,
    body: body.join('\n'),
  }

  if (dryRun) {
    console.log(`\n--- [dry-run] meddelande till agaren (${owner}) ---\n${reply.subject}\n\n${body}\n`)
    return true
  }

  try {
    await sendReply(client, credentials, reply)
    return true
  } catch (error) {
    console.error('[agent] kunde inte meddela agaren:', error)
    return false
  }
}

/**
 * Kor en omgang for ett mejl. Returnerar vad som hande, sa worker och CLI kan
 * logga och bokmarka pa samma satt.
 */
export async function runMail(
  client: ImapFlow,
  credentials: MailboxCredentials,
  persona: Persona,
  mail: IncomingMail,
  options: RunOptions = {},
): Promise<RunResult> {
  const dryRun = options.dryRun === true
  const abuse = await getAbuseCount(mail.from)

  // ── Billiga skydd, fore modellen ─────────────────────────────────────────
  if (mail.isAutomated) {
    return finish({ action: 'skipped', abuseCount: abuse, reason: 'autosvar eller utskick' }, persona, mail, dryRun)
  }

  const target = mail.replyTo ?? mail.from
  if (isNoReplyAddress(target)) {
    return finish(
      { action: 'skipped', abuseCount: abuse, reason: 'avsandaradressen kan inte ta emot svar' },
      persona,
      mail,
      dryRun,
    )
  }

  if (await isProcessed(mail.mailbox, mail.uid)) {
    return finish({ action: 'skipped', abuseCount: abuse, reason: 'redan hanterad' }, persona, mail, dryRun)
  }

  if (isSilenced(abuse)) {
    return finish(
      { action: 'silenced', abuseCount: abuse, reason: 'avsandaren ar tystad sedan tidigare' },
      persona,
      mail,
      dryRun,
    )
  }

  const repliedToday = await getRepliesToday(mail.from)
  const purchaseThread = await isPurchaseThread(mail.from)
  if (repliedToday >= MAX_REPLIES_PER_SENDER_PER_DAY && !purchaseThread) {
    return finish(
      {
        action: 'skipped',
        abuseCount: abuse,
        reason: `dygnstaket (${MAX_REPLIES_PER_SENDER_PER_DAY}) natt — kop-/offerttrader undantas`,
      },
      persona,
      mail,
      dryRun,
    )
  }

  // ── Modellen ─────────────────────────────────────────────────────────────
  const summary = await getSummary(mail.from)
  const systemPrompt = buildSystemPrompt(persona, { abuseCount: abuse, summary })
  const asked = await askUntilUsable(systemPrompt, mail)

  let decision = asked.decision
  let attempts = asked.attempts

  // ── Forseti: revisorn ────────────────────────────────────────────────────
  // Svar som inte gick igenom granskningen går till en människa i stället.
  if (asked.refused) {
    decision.escalate = true
    decision.reply = ''
    decision.escalateReason = `modellen svarade inte inom ramen efter ${attempts} forsok`
  } else {
    const review = await reviewUntilUsable(asked.messages, persona, mail, decision)
    decision = review.decision
    attempts += review.rewrites
    if (review.issues.length > 0) {
      decision.escalate = true
      decision.reply = ''
      decision.escalateReason = `Forseti godkande inte svaret efter ${review.rewrites} omskrivningar — ${describeIssues(review.issues)}`
    }
  }

  // Stoppade Forseti svaret finns ingen hålltext från modellen — men kunden ska
  // inte lämnas tyst när tonen är normal. Ärendet går till en människa, och ett
  // kort hållbesked (med svar till ägaren) säger att en säkerhetskonsult tar över.
  if (decision.escalate && !decision.holdReply && decision.abuseLevel === 'normal') {
    decision.holdReply = FALLBACK_HOLD_REPLY
  }

  const nextCount = nextAbuseCount(abuse, decision.abuseLevel)
  if (dryRun) {
    await setSummary(mail.from, decision.summary)
    // I dry-run ar det sista chansen att se vad modellen faktiskt beslutade —
    // annars syns bara sjalva svaret.
    console.log(`\n--- [dry-run] beslut ---\n${JSON.stringify(decision, null, 2)}\n`)
    const reason = decision.escalate
      ? decision.escalateReason
      : isSilenced(nextCount)
        ? 'svaret skulle ha tystat avsandaren'
        : 'dry-run: inget skickades'
    if (decision.escalate) {
      if (decision.holdReply) {
        console.log(
          `\n--- [dry-run] hållbesked till ${target} ---\n${replySubject(mail.subject)}\n\n${decision.holdReply}\n\n${persona.signature}\n`,
        )
      }
      await notifyOwner(
        client,
        credentials,
        persona,
        mail,
        decision.escalateReason,
        true,
        decision.holdReply || undefined,
      )
    } else if (isSilenced(nextCount)) {
      await notifyOwner(
        client,
        credentials,
        persona,
        mail,
        `Avsändaren skulle ha nått stopptroskeln (${nextCount} poäng) — inget svar skickas.`,
        true,
      )
    } else {
      console.log(`\n--- [dry-run] svar till ${target} ---\n${replySubject(mail.subject)}\n\n${decision.reply}\n\n${persona.signature}\n`)
      const purchase = await maybePurchase(persona, decision, target, true)
      if (purchase) console.log(`\n--- [dry-run] fakturautkast ---\n${purchase.ownerNote}\n`)
      if (decision.notifyOwner) {
        await notifyOwner(
          client,
          credentials,
          persona,
          mail,
          decision.escalateReason,
          true,
          decision.reply,
          purchase?.ownerNote,
        )
      }
    }
    console.log(`[dry-run] abuse ${abuse} -> ${nextCount}, forsok ${attempts}`)
    return finish(
      { action: decision.escalate ? 'escalated' : 'replied', abuseCount: nextCount, reason, decision },
      persona,
      mail,
      true,
    )
  }

  await setAbuseCount(mail.from, nextCount)
  await setSummary(mail.from, decision.summary)

  // Köp-/offerttrådar ska aldrig stoppas av dygnstaket nästa gång avsändaren hör av sig.
  if (decision.purchaseIntent || decision.notifyOwner) {
    await setPurchaseThread(mail.from)
  }

  // ── Vidare till manniska ─────────────────────────────────────────────────
  if (decision.escalate) {
    // Kunden lämnas inte tyst när tonen är normal: ett kort hållbesked som
    // namnger vem som tar över och varifrån svaret kommer. Vid mild eller
    // severe ton är `holdReply` tom och kunden får ingenting alls.
    if (decision.holdReply) {
      const hold: OutgoingReply = {
        persona,
        to: target,
        replyTo: ownerEmail(),
        inReplyTo: mail.messageId,
        references: [...mail.references, ...(mail.messageId ? [mail.messageId] : [])],
        subject: replySubject(mail.subject),
        body: `${decision.holdReply}\n\n${persona.signature}`,
      }
      try {
        const sent = await sendReply(client, credentials, hold)
        await countReply(mail.from)
        console.log(`[agent] hållbesked till ${target} (${sent.messageId})`)
      } catch (error) {
        console.error('[agent] kunde inte skicka hållbeskedet:', error)
      }
    }

    await notifyOwner(
      client,
      credentials,
      persona,
      mail,
      decision.escalateReason,
      false,
      decision.holdReply || undefined,
    )
    return finish(
      { action: 'escalated', abuseCount: nextCount, reason: decision.escalateReason, decision },
      persona,
      mail,
      false,
    )
  }

  // ── Tysta avsandaren ─────────────────────────────────────────────────────
  if (isSilenced(nextCount)) {
    await notifyOwner(
      client,
      credentials,
      persona,
      mail,
      `Avsändaren nådde stopptroskeln (${nextCount} poäng) — inget svar skickas.`,
      false,
    )
    return finish(
      { action: 'silenced', abuseCount: nextCount, reason: 'nadd stopptroskeln — inget svar skickas', decision },
      persona,
      mail,
      false,
    )
  }

  // ── Skicka ───────────────────────────────────────────────────────────────
  const reply: OutgoingReply = {
    persona,
    to: target,
    inReplyTo: mail.messageId,
    references: [...mail.references, ...(mail.messageId ? [mail.messageId] : [])],
    subject: replySubject(mail.subject),
    body: `${decision.reply}\n\n${persona.signature}`,
  }

  try {
    const sent = await sendReply(client, credentials, reply)
    await countReply(mail.from)
    console.log(`[agent] skickat till ${target} (${sent.messageId})${sent.savedToSent ? '' : ' — ingen kopia i Skickat'}`)
    if (decision.notifyOwner) {
      // Fakturautkastet skapas efter svaret (kunden har redan fatt sitt) men
      // fore agar-mejlet, sa att dashboardlanken kommer med i samma mejl.
      const purchase = await maybePurchase(persona, decision, target, false)
      const notified = await notifyOwner(
        client,
        credentials,
        persona,
        mail,
        decision.escalateReason,
        false,
        decision.reply,
        purchase?.ownerNote,
      )
      if (!notified) console.warn('[agent] agaren kunde inte meddelas om offertarendet.')
    }
    return finish({ action: 'replied', abuseCount: nextCount, decision }, persona, mail, false)
  } catch (error) {
    console.error('[agent] sandningen misslyckades:', error)
    return finish(
      {
        action: 'skipped',
        abuseCount: nextCount,
        reason: `sandningen misslyckades: ${String(error)}`,
        decision,
        retry: true,
      },
      persona,
      mail,
      false,
    )
  }
}

/**
 * Skapar fakturautkastet om modellen lamnat en komplett bestallning.
 *
 * Bara konsulten far bestalla (forsvar mot att en prompt-injektion i en
 * supporttrad forsoker fa igenom en faktura), och aldrig samtidigt som arendet
 * eskaleras till en manniska. Returvardet ar `null` nar det inte finns nagon
 * bestallning — da hoppar anroparen over fakturablocket helt.
 */
async function maybePurchase(
  persona: Persona,
  decision: AgentDecision,
  fallbackEmail: string,
  dryRun: boolean,
): Promise<PurchaseOutcome | null> {
  if (!decision.invoice) return null
  if (decision.escalate) {
    console.warn('[agent] bestallning ignorerad: arendet eskaleras till en manniska.')
    return null
  }
  if (persona.id !== 'consultant') {
    console.warn(`[agent] bestallning ignorerad: ${persona.id} far inte skapa fakturor.`)
    return null
  }

  const outcome = await createPurchase(decision.invoice, { dryRun, fallbackEmail })
  if (outcome.ok) {
    console.log(
      `[agent] fakturautkast ${outcome.simulated ? 'simulerat' : `klart: ${outcome.invoiceId}`} for ${decision.invoice.company}`,
    )
  }
  return outcome
}

/** Skriver en rad till granskningsloggen och returnerar resultatet. */
function finish(result: RunResult, persona: Persona, mail: IncomingMail, dryRun: boolean): RunResult {
  audit({
    persona: persona.id,
    mailbox: mail.mailbox,
    uid: mail.uid,
    from: mail.from,
    subject: mail.subject,
    action: result.action,
    abuseCount: result.abuseCount,
    reason: result.reason ?? null,
    dryRun,
  })
  return result
}

/** Sammanfattning av en omgang mot en brevlåda. */
export interface MailboxRound {
  handled: number
  /** Sant nar en sandning misslyckades tillfalligt och mejlet ligger kvar for ett nytt forsok. */
  stopped: boolean
  results: { mail: IncomingMail; result: RunResult }[]
}

export interface MailboxRoundOptions extends RunOptions {
  /** Mailbox att lasa. Standard: INBOX. */
  mailbox?: string
  /**
   * `false` nar anroparen redan haller ett las pa brevlådan (arbetarens IDLE-
   * lyssnare). Da far vi aldrig ta ett till — det skulle lasta sig sjalvt.
   */
  lock?: boolean
}

/**
 * En hel omgang mot en brevlåda: hamta allt nytt, kor varje mejl genom
 * agenten och flytta fram laskurssorn. Delas av CLI:t och arbetaren.
 */
export async function processMailbox(
  client: ImapFlow,
  credentials: MailboxCredentials,
  persona: Persona,
  options: MailboxRoundOptions = {},
): Promise<MailboxRound> {
  const mailbox = options.mailbox ?? 'INBOX'
  // UID:n raknas per IMAP-mapp, och alla tre agenterna laser samma mappnamn
  // ("INBOX") i var sin brevlåda. Kursorn och dedupliceringen maste darfor
  // nycklas per brevlåda — annars svalter den brevlåda som har lagst UID:n:
  // en annan brevlådas hogre kursorn gjorde att dess nya mejl hamnade utanfor
  // intervallet (och kunde dessutom slas upp som "redan hanterat").
  const scope = `${mailbox}:${persona.address}`
  const stored = await getLastUid(scope)
  const { messages, lastUid } = await fetchMessages(client, mailbox, stored ?? 0, {
    backlog: processBacklog(),
    lock: options.lock,
    scope,
  })

  const results: MailboxRound['results'] = []
  let stopped = false

  for (const mail of messages) {
    const result = await runMail(client, credentials, persona, mail, { dryRun: options.dryRun })
    results.push({ mail, result })

    // Sandningen gick inte igenom: lat mejlet ligga kvar och forsok igen senare.
    if (result.retry) {
      stopped = true
      break
    }

    // Torrkorning ar sidoeffektfri: vi varken markerar mejlet som last eller
    // flyttar fram laskursorn. Annars skulle ett riktigt kundmejl kunna
    // "forbrukas" av en torrkorning — utan att nagot svar nagonsin skickats.
    if (options.dryRun) continue

    await markProcessed(scope, mail.uid)
    if (markAsSeen()) {
      try {
        await markSeen(client, mailbox, mail.uid, { lock: options.lock })
      } catch (error) {
        console.warn(`[${persona.id}] kunde inte markera uid ${mail.uid} som last:`, error)
      }
    }
  }

  if (!stopped && !options.dryRun) await setLastUid(scope, lastUid)
  return { handled: results.length, stopped, results }
}
