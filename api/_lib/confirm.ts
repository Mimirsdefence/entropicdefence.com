import type { VercelRequest } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'Entropic Defence <no-reply@entropicdefence.com>'

type Lang = 'sv' | 'en'

type Template = {
  subject: string
  text: string
}

/**
 * Autobekräftelse till kunden. Två språk räcker i v1 — svenska och engelska.
 * Språket väljs från webbläsarens Accept-Language, engelska som fallback.
 */
const TEMPLATES: Record<Lang, Template> = {
  sv: {
    subject: 'Vi har tagit emot ditt meddelande',
    text: [
      'Hej {name},',
      '',
      'Tack för ditt meddelande! Vi har tagit emot det och återkommer så snart vi kan, vanligtvis inom en arbetsdag.',
      '',
      'Ditt ärende: {reference}',
      '',
      'Med vänlig hälsning,',
      'Entropic Defence',
      'https://entropicdefence.com',
      '',
      'Det här är ett automatiskt bekräftelsemeddelande.',
    ].join('\n'),
  },
  en: {
    subject: "We've received your message",
    text: [
      'Hi {name},',
      '',
      "Thanks for reaching out! We've received your message and will get back to you as soon as we can, usually within one business day.",
      '',
      'Your request: {reference}',
      '',
      'Best regards,',
      'Entropic Defence',
      'https://entropicdefence.com',
      '',
      'This is an automated confirmation.',
    ].join('\n'),
  },
}

function pickLanguage(header: unknown): Lang {
  const value = String(header ?? '').toLowerCase()
  if (value.includes('sv')) return 'sv'
  return 'en'
}

function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

/**
 * Skickar en autobekräftelse till kunden. Best-effort: form- och offertmejlet
 * räknas som levererat till oss även om bekräftelsen skulle misslyckas.
 */
export async function sendConfirmation(
  req: VercelRequest,
  params: { to: string; replyTo: string; name: string; reference: string },
): Promise<void> {
  const lang = pickLanguage(req.headers['accept-language'])
  const template = TEMPLATES[lang]
  const text = template.text
    .split('{name}')
    .join(oneLine(params.name))
    .split('{reference}')
    .join(oneLine(params.reference))

  try {
    // OBS: Resend-SDK:n kastar INTE vid API-fel, den returnerar { data, error }.
    const { error } = await resend.emails.send({
      from: FROM,
      to: [params.to],
      replyTo: params.replyTo,
      subject: template.subject,
      text,
    })

    if (error) {
      console.error('Resend confirmation send failed:', error)
    }
  } catch (error) {
    console.error('Resend confirmation send threw:', error)
  }
}
