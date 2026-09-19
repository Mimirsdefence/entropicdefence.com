import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/Button'
import { useI18n } from '@/i18n'

export type QuoteOption = { value: string; label: string }

type Props = {
  options: QuoteOption[]
  /** Förvalt paket i listan (value). */
  defaultInterest?: string
  submitLabel?: string
}

export default function QuoteForm({ options, defaultInterest = '', submitLabel }: Props) {
  const navigate = useNavigate()
  const { t } = useI18n()
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
          <span className="text-sm text-fog">{t.forms.company}</span>
          <input
            required
            type="text"
            name="company"
            className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
            placeholder={t.forms.companyPlaceholder}
          />
        </label>
        <label className="block">
          <span className="text-sm text-fog">{t.forms.orgNumber}</span>
          <input
            type="text"
            name="orgnr"
            className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
            placeholder={t.forms.orgNumberPlaceholder}
          />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-fog">{t.forms.contactPerson}</span>
          <input
            required
            type="text"
            name="name"
            className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
            placeholder={t.forms.namePlaceholder}
          />
        </label>
        <label className="block">
          <span className="text-sm text-fog">{t.forms.workEmail}</span>
          <input
            required
            type="email"
            name="email"
            className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
            placeholder={t.forms.emailPlaceholder}
          />
        </label>
      </div>
      <label className="block">
        <span className="text-sm text-fog">{t.forms.interestedIn}</span>
        <select
          required
          name="plan"
          defaultValue={defaultInterest}
          className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost focus:border-signal focus:outline-none"
        >
          <option value="" disabled>
            {t.forms.choosePackage}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
          <option value="vet-inte">{t.forms.notSure}</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm text-fog">{t.forms.describe}</span>
        <textarea
          name="message"
          rows={4}
          className="mt-2 w-full resize-none rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
          placeholder={t.forms.describePlaceholder}
        />
      </label>
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? t.forms.sending : (submitLabel ?? t.forms.sendRequest)}
        {!submitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </Button>
      <p className="text-center text-xs leading-relaxed text-fog">
        {t.forms.consentBefore}{' '}
        <a href="/legal" className="text-signal hover:underline">
          {t.forms.consentLink}
        </a>
        {t.forms.consentAfter}
      </p>
    </form>
  )
}
