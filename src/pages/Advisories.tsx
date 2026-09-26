import { ShieldAlert, KeyRound, FileWarning } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { useI18n } from '@/i18n'

export default function Advisories() {
  const { t } = useI18n()

  return (
    <>
      <PageHero
        eyebrow={t.advisories.hero.eyebrow}
        title={
          <>
            {t.advisories.hero.titleLead}
            <span className="text-gradient">{t.advisories.hero.titleHighlight}</span>
            {t.advisories.hero.titleEnd}
          </>
        }
        description={t.advisories.hero.description}
      />

      <section className="mx-auto max-w-4xl px-5 pb-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal>
            <article className="panel h-full p-6">
              <FileWarning className="h-6 w-6 text-amber" aria-hidden="true" />
              <h2 className="mt-4 font-display text-base font-semibold">{t.advisories.report}</h2>
              <p className="mt-2 text-sm leading-relaxed text-fog">{t.advisories.reportText}</p>
              <p className="mt-4 font-mono text-xs">
                <a
                  href="mailto:security@entropicdefence.com"
                  className="text-signal transition-colors hover:text-pulse hover:underline"
                >
                  security@entropicdefence.com
                </a>
              </p>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="panel h-full p-6">
              <KeyRound className="h-6 w-6 text-signal" aria-hidden="true" />
              <h2 className="mt-4 font-display text-base font-semibold">{t.advisories.pgpKey}</h2>
              <p className="mt-2 text-sm leading-relaxed text-fog">{t.advisories.pgpText}</p>
              <p className="mt-4 font-mono text-xs text-fog">{t.advisories.fingerprint}</p>
            </article>
          </Reveal>
          <Reveal delay={160}>
            <article className="panel h-full p-6">
              <ShieldAlert className="h-6 w-6 text-mint" aria-hidden="true" />
              <h2 className="mt-4 font-display text-base font-semibold">{t.advisories.promise}</h2>
              <p className="mt-2 text-sm leading-relaxed text-fog">{t.advisories.promiseText}</p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="panel mt-8 p-7">
            <h2 className="font-display text-lg font-semibold">{t.advisories.activeTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-fog">{t.advisories.activeText}</p>
          </div>
        </Reveal>
      </section>
    </>
  )
}
