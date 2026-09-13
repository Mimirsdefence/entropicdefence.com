import { CheckCircle2 } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'

export default function Success() {
  return (
    <>
      <PageHero
        eyebrow="Förfrågan mottagen"
        title={
          <>
            Tack — vi återkommer <span className="text-gradient">inom 24 timmar</span>.
          </>
        }
        description="Er förfrågan har registrerats. En säkerhetskonsult läser igenom den och kontaktar er på angiven jobbmejl med nästa steg och en första offert."
      />

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <Reveal>
          <div className="panel mx-auto max-w-2xl p-8 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-mint" aria-hidden="true" />
            <h2 className="mt-6 font-display text-2xl font-bold">Allt är mottaget.</h2>
            <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-fog">
              Vill ni kommunicera känslig information redan nu? Be om vår PGP-nyckel i
              bekräftelsemailet — eller mejla oss direkt.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button to="/">Tillbaka till startsidan</Button>
              <Button to="/papers" variant="ghost">
                Läs våra papers
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
