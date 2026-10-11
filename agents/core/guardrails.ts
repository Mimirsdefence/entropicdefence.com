/**
 * Guardrails — porterade från n8n-workflowet "Brand-Identity-Designer".
 *
 *  - Abuse-klassning och viktning (nod 14): mild +1, severe +3.
 *  - Stopptröskel: 10 (okt 2026, höjd från 3 efter ägarbeslut).
 *    Vid 8–9 poäng varnas avsändaren, vid 10 tystas den och ägaren flaggas.
 *  - Refusal-detektion (nod 8) + nytt försök upp till 3 gånger (nod 1/28).
 *  - Dagsgräns per avsändare: 15 per dygn, köp-/offerttrådar undantas —
 *    så en mejlloop aldrig kan bli oändlig utan att blockera kunder.
 */

import type { AbuseLevel } from './types.js'

/** Antal försök att få ett användbart svar innan vi ger upp (nod 1/28). */
export const MAX_REFUSAL_RETRIES = 3

/** Vid denna poäng tystas avsändaren helt — inget svar, bara en flagga till ägaren. */
export const ABUSE_STOP_THRESHOLD = 10

/** Vid denna poäng läggs en varning in i svaret (samma ton som mild). */
export const ABUSE_WARN_THRESHOLD = 8

/** Viktning per bedömd avsikt (nod 14). */
export const ABUSE_POINTS: Record<AbuseLevel, number> = {
  normal: 0,
  mild: 1,
  severe: 3,
}

/** Tak per avsändare och dygn — skyddar mot loopar och mejlbomber. Köp-/offerttrådar undantas. */
export const MAX_REPLIES_PER_SENDER_PER_DAY = 15

/**
 * Lägger på poäng för en bedömd avsikt. Taket är stopptroskeln: när avsändaren
 * väl är tystad finns ingen väg tillbaka, så räknaren behöver inte växa vidare
 * (och kan då inte heller rinna över efter år av skräp).
 */
export function nextAbuseCount(current: number, level: AbuseLevel): number {
  return Math.min(current + ABUSE_POINTS[level], ABUSE_STOP_THRESHOLD)
}

export function isSilenced(count: number): boolean {
  return count >= ABUSE_STOP_THRESHOLD
}

/** Tonen skärps stegvis: normal → mild → varning strax under stopptroskeln. */
export function toneFor(count: number): 'normal' | 'mild' | 'warning' {
  if (count === 0) return 'normal'
  if (count >= ABUSE_WARN_THRESHOLD) return 'warning'
  return 'mild'
}

function splitSentences(text: string): string[] {
  const normalized = String(text || '').replace(/\u2019/g, "'")
  return (normalized.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).map((s) => s.trim().toLowerCase())
}

/**
 * Meningar som avslöjar att modellen smet undan i stället för att svara.
 * Om någon av dessa fångas görs ett nytt försök med skärpta instruktioner.
 */
const REFUSAL_PATTERNS: RegExp[] = [
  /bare\s+cant\s+help/,
  /sorry,?\s+(i\s+)?(cant|can't|kan inte)\s+(help|assist|hjalpa|hjalpa)/,
  /(i\s+)?(cannot|can't|cant|kan\s+inte|kan\s+tyvarr\s+inte)\s+help\s+(you\s+)?with\s+(that|this|request)/,
  /(i\s+)?(am\s+)?(unable|not\s+able)\s+to\s+(comply|assist|help)/,
  /(i\s+)?(wont|will\s+not|kommer\s+inte)\s+(be\s+able\s+to\s+)?(help|assist|comply|kunna\s+hjalpa)/,
  /(i\s+)?(dont|do\s+not)\s+have\s+the\s+(capability|ability|capacity)/,
  /as\s+an?\s+(ai|artificial\s+intelligence|language\s+model|assistant)\b/,
  /(i\s+)?(cannot|can't|cant)\s+provide\s+(that|this)/,
  /(im|i\s+am)\s+(just\s+)?an?\s+(ai|language\s+model|assistant)/,
  /som\s+en\s+(ai|sprakmodell|assistent)\b/,
  /jag\s+ar\s+bara\s+en\s+(ai|sprakmodell|assistent)/,
]

export function isRefusal(reply: string): boolean {
  if (!reply.trim()) return true
  return splitSentences(reply).some((sentence) =>
    REFUSAL_PATTERNS.some((pattern) => pattern.test(sentence)),
  )
}

/** Extra stycke som läggs på vid omförsök efter en refusal. */
export const RETRY_INSTRUCTION =
  'Ditt förra svar bröt mot reglerna: det lät som en assistent som backar undan. ' +
  'Skriv om svaret som en människa på företaget. Du får inte säga att du är en AI, ' +
  'inte be om ursäkt för att du inte kan hjälpa till, och inte hänvisa någon annanstans. ' +
  'Håller ärendet utanför din roll: använd den fasta omdirigeringsmeningen. ' +
  'Svara fortfarande med exakt samma JSON-objekt.'
