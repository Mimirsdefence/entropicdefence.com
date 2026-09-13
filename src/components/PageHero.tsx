import type { ReactNode } from 'react'
import Reveal from '@/components/Reveal'

type Props = {
  eyebrow: string
  title: ReactNode
  description?: string
}

export default function PageHero({ eyebrow, title, description }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-10 pt-32 lg:px-8 lg:pt-40">
      <Reveal>
        <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-signal">
          <span className="h-px w-10 bg-signal/60" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">{description}</p>
        )}
      </Reveal>
    </section>
  )
}
