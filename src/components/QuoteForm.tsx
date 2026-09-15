import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/Button'

export type QuoteOption = { value: string; label: string }

type Props = {
  options: QuoteOption[]
  /** Förvalt paket i listan (value). */
  defaultInterest?: string
  submitLabel?: string
}

export default function QuoteForm({
  options,
  defaultInterest = '',
  submitLabel = 'Skicka förfrågan',
}: Props) {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    // Simulerad förfrågan — riktig integration kommer i Phase B (Neon + Stripe + mejl).
    setTimeout(() => navigate('/success'), 700)
  }

  return (
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
          defaultValue={defaultInterest}
          className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost focus:border-signal focus:outline-none"
        >
          <option value="" disabled>
            Välj paket…
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
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
        {submitting ? 'Skickar…' : submitLabel}
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
  )
}
