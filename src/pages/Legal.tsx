import { FileText, ShieldCheck, Cookie } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'

const sections = [
  {
    icon: ShieldCheck,
    title: 'Integritetspolicy',
    updated: 'Senast uppdaterad: 2026-09-13',
    body: [
      'Entropic Defence AB ("vi", "oss") värnar din integritet. Denna policy beskriver hur vi hanterar personuppgifter när du besöker entropicdefence.com, kontaktar oss eller anlitar våra tjänster.',
      'Vi samlar in de uppgifter du själv lämnar: namn, företag, organisationsnummer, e-post och det du skriver i kontaktformulär. Vi använder uppgifterna enbart för att besvara förfrågningar, offerera och fullgöra avtal.',
      'Vi säljer aldrig dina uppgifter och delar dem endast med de leverantörer som krävs för att driva tjänsten (t.ex. hosting) under avtal som skyddar dina uppgifter. Uppgifter raderas när de inte längre behövs, dock senast i enlighet med gällande bokförings- och säkerhetslagstiftning.',
      'Rättslig grund: berättigat intresse och/eller avtal. Du har rätt att begära registerutdrag, rättelse, radering och dataportabilitet. Kontakta oss på contact@entropicdefence.com.',
    ],
  },
  {
    icon: FileText,
    title: 'Användarvillkor',
    updated: 'Senast uppdaterad: 2026-09-13',
    body: [
      'Innehållet på entropicdefence.com tillhandahålls i informationssyfte. Vi strävar efter korrekthet men lämnar inga garantier för att innehållet alltid är fullständigt eller aktuellt.',
      'Alla texter, grafik och varumärken tillhör Entropic Defence AB om inget annat anges. Innehåll får inte kopieras, spridas eller användas kommersiellt utan skriftligt tillstånd.',
      'Tjänster som beskrivs på webbplatsen regleras alltid av separat skriftligt avtal. Inget på webbplatsen utgör ett bindande anbud.',
      'Vid säkerhetsrelaterade frågor om våra system, se vår sida för Advisories & Disclosures.',
    ],
  },
  {
    icon: Cookie,
    title: 'Cookies',
    updated: 'Senast uppdaterad: 2026-09-13',
    body: [
      'Vi använder inga spårningscookies och ingen tredjepartsannonsering. De enda cookies som kan förekomma är nödvändiga sessionscookies för att webbplatsen ska fungera tekniskt.',
      'Om vi i framtiden inför valfria analyscookies kommer vi att be om ditt samtycke först, i enlighet med lagen om elektronisk kommunikation.',
      'Du kan alltid blockera eller radera cookies i din webbläsares inställningar. Webbplatsen fungerar fullt ut utan dem.',
    ],
  },
]

export default function Legal() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Juridik, <span className="text-gradient">tydligt och kort</span>.
          </>
        }
        description="Integritetspolicy, användarvillkor och cookieinformation. Skrivna för att läsas — inte för att begravas."
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
                  {s.updated}
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
            Frågor om juridik eller dataskydd?{' '}
            <a
              href="mailto:contact@entropicdefence.com"
              className="text-signal transition-colors hover:text-pulse hover:underline"
            >
              contact@entropicdefence.com
            </a>
          </p>
        </Reveal>
      </section>
    </>
  )
}
