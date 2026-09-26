import { FileText, ShieldCheck, Cookie, type LucideIcon } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { useI18n } from '@/i18n'

const sectionIcons: LucideIcon[] = [ShieldCheck, FileText, Cookie]

export default function Legal() {
  const { t } = useI18n()

  const sections = t.legal.sections.map((s, i) => ({
    ...s,
    icon: sectionIcons[i],
  }))

  return (
    <>
      <PageHero
        eyebrow={t.legal.hero.eyebrow}
        title={
          <>
            {t.legal.hero.titleLead}
            <span className="text-gradient">{t.legal.hero.titleHighlight}</span>
            {t.legal.hero.titleEnd}
          </>
        }
        description={t.legal.hero.description}
      />

      <section className="mx-auto max-w-4xl px-5 pb-24 lg:px-8">
        <div className="space-y-5">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <article className="panel p-7">
                <div className="flex items-center gap-3">
                  <s.icon className="h-5 w-5 text-signal" aria-hidden="true" />
                  <h2 className="font-display text-xl font-semibold">{s.title}</h2>
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
                  {t.legal.updatedPrefix}
                </p>
                <div className="mt-5 space-y-4">
                  {s.body.map((p) => (
                    <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-fog">
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <p className="mt-8 text-center text-sm text-fog">
            {t.legal.questions}{' '}
            <a
              href="mailto:support@entropicdefence.com"
              className="text-signal transition-colors hover:text-pulse hover:underline"
            >
              support@entropicdefence.com
            </a>
          </p>
        </Reveal>
      </section>
    </>
  )
}
