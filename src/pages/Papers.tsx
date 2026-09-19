import { Atom, Brain, Lock, Scale, ArrowUpRight, type LucideIcon } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { useI18n } from '@/i18n'

const categoryIcons: LucideIcon[] = [Brain, Atom, Scale, Lock]

export default function Papers() {
  const { t } = useI18n()

  const categories = t.papers.categories.map((c, i) => ({
    ...c,
    icon: categoryIcons[i],
  }))

  return (
    <>
      <PageHero
        eyebrow={t.papers.hero.eyebrow}
        title={
          <>
            {t.papers.hero.titleLead}
            <span className="text-gradient">{t.papers.hero.titleHighlight}</span>
            {t.papers.hero.titleEnd}
          </>
        }
        description={t.papers.hero.description}
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="h-full">
              <article className="panel h-full p-7">
                <div className="flex items-center gap-3">
                  <c.icon className="h-6 w-6 text-signal" aria-hidden="true" />
                  <h2 className="font-display text-lg font-semibold">{c.title}</h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fog">{c.text}</p>
                <ul className="mt-5 space-y-3">
                  {c.papers.map((p) => (
                    <li key={p.title}>
                      <button
                        type="button"
                        disabled
                        className="group flex w-full items-start justify-between gap-4 rounded-lg border border-line/70 px-4 py-3 text-left transition-colors disabled:cursor-not-allowed"
                        title={t.papers.publishedSoon}
                      >
                        <span className="text-sm leading-relaxed text-frost">{p.title}</span>
                        <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                          {t.papers.coming}
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="panel mt-8 flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-lg font-semibold">{t.papers.newsletter.title}</h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-fog">
                {t.papers.newsletter.text}
              </p>
            </div>
            <form
              className="flex w-full max-w-sm gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="papers-email" className="sr-only">
                {t.papers.newsletter.emailLabel}
              </label>
              <input
                id="papers-email"
                type="email"
                required
                placeholder={t.papers.newsletter.emailPlaceholder}
                className="w-full rounded-full border border-line bg-void/70 px-5 py-3 text-sm text-frost placeholder:text-fog/50 focus:border-signal focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-signal px-5 py-3 font-display text-sm font-semibold text-void transition-colors hover:bg-pulse"
              >
                {t.papers.newsletter.subscribe}
              </button>
            </form>
          </div>
        </Reveal>
      </section>
    </>
  )
}
