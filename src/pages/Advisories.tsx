import { ShieldAlert, KeyRound, FileWarning } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'

export default function Advisories() {
  return (
    <>
      <PageHero
        eyebrow="Advisories & Disclosures"
        title={
          <>
            Koordinerad <span className="text-gradient">sårbarhetsrapportering</span>.
          </>
        }
        description="Har du hittat en sårbarhet i våra system eller tjänster? Vi tar det på allvar — och vi lovar att hantera det professionellt och snabbt."
      />

      <section className="mx-auto max-w-4xl px-5 pb-24 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal>
            <article className="panel h-full p-6">
              <FileWarning className="h-6 w-6 text-amber" aria-hidden="true" />
              <h2 className="mt-4 font-display text-base font-semibold">Rapportera</h2>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                Mejla detaljerna till oss. Använd gärna vår PGP-nyckel för känsliga fynd.
              </p>
              <p className="mt-4 font-mono text-xs text-signal">security@entropicdefence.com</p>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="panel h-full p-6">
              <KeyRound className="h-6 w-6 text-signal" aria-hidden="true" />
              <h2 className="mt-4 font-display text-base font-semibold">PGP-nyckel</h2>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                Publiceras inom kort. Kontakta oss så skickar vi nyckeln direkt.
              </p>
              <p className="mt-4 font-mono text-xs text-fog">Fingerprint: —</p>
            </article>
          </Reveal>
          <Reveal delay={160}>
            <article className="panel h-full p-6">
              <ShieldAlert className="h-6 w-6 text-mint" aria-hidden="true" />
              <h2 className="mt-4 font-display text-base font-semibold">Vårt löfte</h2>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                Bekräftelse inom 72 timmar. Koordinerad publicering. Inga rättsliga åtgärder
                mot den som rapporterar i god tro.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="panel mt-8 p-7">
            <h2 className="font-display text-lg font-semibold">Aktiva advisories</h2>
            <p className="mt-4 text-sm leading-relaxed text-fog">
              Inga publika säkerhetsadvisories just nu. När en sårbarhet åtgärdats och
              koordinerats publicerar vi en teknisk sammanfattning här.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  )
}
