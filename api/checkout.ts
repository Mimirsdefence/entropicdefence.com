import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const CONSULTANT_EMAIL = 'consultant@entropicdefence.com'

function clamp(value: unknown, max: number): string {
  return String(value ?? '').slice(0, max)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body: Record<string, unknown>
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body ?? {})
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' })
  }

  // Honeypot — bots fill hidden fields, humans don't.
  if (body.website) {
    return res.status(200).json({ ok: true })
  }

  const company = clamp(body.company, 200).trim()
  const orgnr = clamp(body.orgnr, 100).trim()
  const name = clamp(body.name, 200).trim()
  const email = clamp(body.email, 254).trim()
  const plan = clamp(body.plan, 200).trim()
  const message = clamp(body.message, 5000).trim()

  if (!company || !name || !email || !plan) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const lines = [
    `Företag: ${company}`,
    orgnr ? `Organisationsnummer: ${orgnr}` : '',
    `Kontaktperson: ${name}`,
    `E-post: ${email}`,
    `Intresse: ${plan}`,
    message ? `\n${message}` : '',
  ].filter(Boolean)

  try {
    // OBS: Resend-SDK:n kastar INTE vid API-fel, den returnerar { data, error }.
    const { error } = await resend.emails.send({
      from: 'Entropic Defence <no-reply@entropicdefence.com>',
      to: [CONSULTANT_EMAIL],
      replyTo: email,
      subject: `Offertförfrågan: ${plan}`,
      text: lines.join('\n'),
    })

    if (error) {
      console.error('Resend send failed:', error)
      return res.status(500).json({ error: 'Failed to send email' })
    }
  } catch (error) {
    console.error('Resend send threw:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }

  return res.status(200).json({ ok: true })
}
