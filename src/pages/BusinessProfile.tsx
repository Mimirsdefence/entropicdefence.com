import { KeyRound, ShieldAlert, LogOut, Trash2, XCircle } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line/60 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-fog">{label}</span>
      <span className="font-mono text-sm text-frost">{value}</span>
    </div>
  )
}

export default function BusinessProfile() {
  return (
    <>
      <PageHero
        eyebrow="Business Profile"
        title={
          <>
            Ert företags <span className="text-gradient">säkerhetskonto</span>.
          </>
        }
        description="Hantera prenumeration, rapportmottagare och konto. Full funktionalitet aktiveras när portalen lanseras i fas B."
      />

      <section className="mx-auto max-w-4xl px-5 pb-24 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="panel h-full p-7">
              <h2 className="font-display text-lg font-semibold">Konto</h2>
              <div className="mt-4">
                <Row label="Företag" value="Entropic Defence AB" />
                <Row label="Organisationsnummer" value="559999-9999" />
                <Row label="Kontaktperson" value="—" />
                <Row label="E-post" value="—" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="panel h-full p-7">
              <h2 className="font-display text-lg font-semibold">Prenumeration</h2>
              <p className="mt-3 font-display text-2xl font-bold">
                Kontinuerlig säkerhet
                <span className="ml-3 rounded-full bg-mint/15 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.15em] text-mint">
                  Aktiv
                </span>
              </p>
              <p className="mt-2 text-sm text-fog">Nästa faktura: —</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="ghost" disabled>
                  Hantera betalning
                </Button>
                <Button variant="ghost" disabled>
                  Uppgradera paket
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="panel p-7">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <KeyRound className="h-5 w-5 text-signal" aria-hidden="true" />
                Rapportmottagare (PGP)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fog">
                Säkerhetsrapporter levereras krypterat till er IT-ansvarige. Lägg till
                mottagare och PGP-nycklar när portalen lanseras.
              </p>
              <div className="mt-5 space-y-2">
                <Row label="IT-ansvarig" value="—" />
                <Row label="PGP-nyckel" value="Ingen nyckel tillagd" />
              </div>
              <Button variant="ghost" className="mt-5" disabled>
                Lägg till mottagare
              </Button>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="panel p-7">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <ShieldAlert className="h-5 w-5 text-danger" aria-hidden="true" />
                Kontoåtgärder
              </h2>
              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  disabled
                  className="flex w-full items-center justify-between rounded-lg border border-line px-4 py-3 text-sm text-fog transition-colors disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    <XCircle className="h-4 w-4" aria-hidden="true" /> Pausa prenumeration
                  </span>
                </button>
                <button
                  type="button"
                  disabled
                  className="flex w-full items-center justify-between rounded-lg border border-line px-4 py-3 text-sm text-fog transition-colors disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" aria-hidden="true" /> Radera konto
                  </span>
                </button>
                <button
                  type="button"
                  disabled
                  className="flex w-full items-center justify-between rounded-lg border border-line px-4 py-3 text-sm text-fog transition-colors disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" aria-hidden="true" /> Logga ut
                  </span>
                </button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-fog">
                Aktiveras med inloggning i fas B (säker autentisering via e-post).
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
