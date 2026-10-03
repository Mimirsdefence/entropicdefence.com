import { Bot, Landmark } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { useI18n } from '@/i18n'

export default function Disclosures() {
  const { t } = useI18n()

  return (
    <>
      <PageHero
        eyebrow={t.disclosures.hero.eyebrow}
        title={
          <>
            {t.disclosures.hero.titleLead}
            <span className="text-gradient">{t.disclosures.hero.titleHighlight}</span>
            {t.disclosures.hero.titleEnd}
          </>
        }
        description={t.disclosures.hero.description}
      />

      <section className="mx-auto max-w-4xl px-5 pb-24 lg:px-8">
        <Reveal>
          <article id="ai-tool" className="panel scroll-mt-24 p-7">
            <div className="flex items-center gap-3">
              <Bot className="h-5 w-5 text-signal" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold">{t.disclosures.ai.title}</h2>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
              {t.disclosures.ai.eyebrow}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-fog">{t.disclosures.ai.lead}</p>
            <div className="mt-5 space-y-4">
              {t.disclosures.ai.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-fog">
                  {p}
                </p>
              ))}
            </div>

            <h3 className="mt-9 font-display text-base font-semibold">{t.disclosures.ai.agentsTitle}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {t.disclosures.ai.agents.map((agent) => (
                <div key={agent.title} className="rounded-xl border border-line bg-abyss/60 p-5">
                  <h4 className="font-display text-sm font-semibold text-frost">{agent.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-fog">{agent.lead}</p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-signal">
                    {t.disclosures.ai.methodLabel}
                  </p>
                  <div className="mt-2 space-y-3">
                    {agent.method.map((m) => (
                      <p key={m.slice(0, 24)} className="text-sm leading-relaxed text-fog">
                        {m}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-line bg-abyss/60 p-5">
              <h3 className="font-display text-base font-semibold">{t.disclosures.ai.manualTitle}</h3>
              <div className="mt-3 space-y-4">
                {t.disclosures.ai.manualText.map((p) => (
                  <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-fog">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal delay={120}>
          <article id="government" className="panel mt-5 scroll-mt-24 p-7">
            <div className="flex items-center gap-3">
              <Landmark className="h-5 w-5 text-signal" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold">{t.disclosures.gov.title}</h2>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
              {t.disclosures.gov.eyebrow}
            </p>
            <div className="mt-5 space-y-4">
              {t.disclosures.gov.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-fog">
                  {p}
                </p>
              ))}
            </div>

            <div id="military" className="mt-8 scroll-mt-24 rounded-xl border border-line bg-abyss/60 p-5">
              <h3 className="font-display text-base font-semibold">{t.disclosures.gov.militaryTitle}</h3>
              <div className="mt-3 space-y-4">
                {t.disclosures.gov.militaryText.map((p) => (
                  <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-fog">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </section>
    </>
  )
}
