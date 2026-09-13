import { ArrowLeft, SatelliteDish } from 'lucide-react'
import Button from '@/components/Button'

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center justify-center px-5 py-24">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-line bg-panel/70">
          <SatelliteDish className="h-10 w-10 text-signal" aria-hidden="true" />
        </div>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.35em] text-signal">
          Felkod 404
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl">
          Signalförlust.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-fog">
          Sidan du söker finns inte — eller har flyttats till en säkrare plats. Fältet
          leder dig tillbaka.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button to="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Tillbaka till startsidan
          </Button>
          <Button to="/support" variant="ghost">
            Kontakta support
          </Button>
        </div>
      </div>
    </section>
  )
}
