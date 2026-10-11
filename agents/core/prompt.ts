import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Persona } from './types.js'
import { toneFor } from './guardrails.js'

const promptsDir = fileURLToPath(new URL('../prompts/', import.meta.url))

function render(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_match: string, key: string) => vars[key] ?? '')
}

function readPrompt(file: string): string {
  return readFileSync(resolve(promptsDir, file), 'utf8').trim()
}

function bullets(items: string[]): string {
  return items.map((item) => `- ${item}`).join('\n')
}

/**
 * Bygger systemprompten: en delad stomme (prompts/base.md) plus personans
 * egna regler (prompts/<persona>.md).
 */
export function buildSystemPrompt(
  persona: Persona,
  context: { abuseCount: number; summary: string },
): string {
  const base = readPrompt('base.md')
  const extra = readPrompt(`${persona.promptFile}.md`)

  return [
    render(base, {
      name: persona.name,
      handover: persona.handover,
      role: persona.role,
      scope: bullets(persona.scope),
      redirect: persona.redirect,
      forbidden: bullets(persona.forbidden),
      escalateIf: bullets(persona.escalateIf),
      signature: persona.signature,
      abuseCount: String(context.abuseCount),
      tone: toneFor(context.abuseCount),
      summary: context.summary || '(första mejlet i tråden — inget tidigare underlag)',
    }),
    extra,
  ].join('\n\n')
}

/**
 * Systemprompten till Forseti, revisorn (prompts/revisor.md). Revisorn ser
 * aldrig personans egen prompt — den ska döma texten, inte tycka synd om den.
 */
export function buildReviewPrompt(): string {
  return readPrompt('revisor.md')
}
