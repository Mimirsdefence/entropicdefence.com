import { ArrowLeft, SatelliteDish } from 'lucide-react'
import Button from '@/components/Button'
import { useI18n } from '@/i18n'

export default function NotFound() {
  const { t } = useI18n()

  return (
    <section className="flex min-h-svh items-center justify-center px-5 py-24">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-line bg-panel/70">
          <SatelliteDish className="h-10 w-10 text-signal" aria-hidden="true" />
        </div>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.35em] text-signal">
          {t.notFound.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl">
          {t.notFound.title}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-fog">
          {t.notFound.description}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button to="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t.notFound.ctaHome}
          </Button>
          <Button to="/support" variant="ghost">
            {t.notFound.ctaSupport}
          </Button>
        </div>
      </div>
    </section>
  )
}
