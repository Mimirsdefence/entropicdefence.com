import { CheckCircle2 } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import { useI18n } from '@/i18n'

export default function Success() {
  const { t } = useI18n()

  return (
    <>
      <PageHero
        eyebrow={t.success.eyebrow}
        title={
          <>
            {t.success.titleLead}
            <span className="text-gradient">{t.success.titleHighlight}</span>
            {t.success.titleEnd}
          </>
        }
        description={t.success.description}
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <Reveal>
          <div className="panel mx-auto max-w-2xl p-8 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-mint" aria-hidden="true" />
            <h2 className="mt-6 font-display text-2xl font-bold">{t.success.panelTitle}</h2>
            <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-fog">
              {t.success.panelText}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button to="/">{t.success.ctaHome}</Button>
              <Button to="/papers" variant="ghost">
                {t.success.ctaPapers}
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
