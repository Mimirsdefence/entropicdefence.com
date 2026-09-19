import { useState, type FormEvent } from 'react'
import { ChevronDown, Headset } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import { useI18n } from '@/i18n'

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="panel overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-frost">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-signal transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      {open && <p className="px-6 pb-6 text-sm leading-relaxed text-fog">{a}</p>}
    </div>
  )
}

export default function Support() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageHero
        eyebrow={t.support.hero.eyebrow}
        title={
          <>
            {t.support.hero.titleLead}
            <span className="text-gradient">{t.support.hero.titleHighlight}</span>
            {t.support.hero.titleEnd}
          </>
        }
        description={t.support.hero.description}
      />

      <section className="mx-auto max-w-4xl px-5 pb-24 lg:px-8">
        <Reveal>
          <div className="panel flex flex-col items-start gap-4 border-signal/40 p-6 sm:flex-row sm:items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-signal/15">
              <Headset className="h-6 w-6 text-signal" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold">{t.support.duty.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-fog">{t.support.duty.text}</p>
            </div>
            <span className="rounded-full bg-mint/15 px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-mint">
              {t.support.duty.badge}
            </span>
          </div>
        </Reveal>

        <div className="mt-12">
          <Reveal>
            <h2 className="font-display text-2xl font-bold">{t.support.faqTitle}</h2>
          </Reveal>
          <div className="mt-6 space-y-3">
            {t.support.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <FaqItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
        </div>

        <div id="kontakt" className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl font-bold">{t.support.contactTitle}</h2>
            <p className="mt-3 max-w-lg text-lg leading-relaxed text-fog">
              {t.support.contactText}
            </p>
          </Reveal>

          <Reveal delay={100}>
            {sent ? (
              <div className="panel mt-8 border-mint/40 p-8 text-center">
                <p className="font-display text-xl font-semibold text-mint">
                  {t.support.sentTitle}
                </p>
                <p className="mt-2 text-sm text-fog">{t.support.sentText}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="panel mt-8 space-y-5 p-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm text-fog">{t.support.form.name}</span>
                    <input
                      required
                      type="text"
                      className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
                      placeholder={t.support.form.namePlaceholder}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-fog">{t.support.form.email}</span>
                    <input
                      required
                      type="email"
                      className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
                      placeholder={t.support.form.emailPlaceholder}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm text-fog">{t.support.form.subject}</span>
                  <select
                    required
                    defaultValue=""
                    className="mt-2 w-full rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost focus:border-signal focus:outline-none"
                  >
                    <option value="" disabled>
                      {t.support.form.subjectPlaceholder}
                    </option>
                    <option>{t.support.form.subjectOptions.serviceQuestion}</option>
                    <option>{t.support.form.subjectOptions.ongoingSupport}</option>
                    <option>{t.support.form.subjectOptions.incident}</option>
                    <option>{t.support.form.subjectOptions.other}</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-fog">{t.support.form.message}</span>
                  <textarea
                    required
                    rows={5}
                    className="mt-2 w-full resize-none rounded-lg border border-line bg-void/70 px-4 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
                    placeholder={t.support.form.messagePlaceholder}
                  />
                </label>
                <Button type="submit" className="w-full">
                  {t.support.form.send}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
