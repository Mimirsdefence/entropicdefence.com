import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import TimeField from '@/components/TimeField'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FloatingCta from '@/components/FloatingCta'
import Home from '@/pages/Home'
import Checkout from '@/pages/Checkout'
import CheckoutExtern from '@/pages/CheckoutExtern'
import CheckoutIntern from '@/pages/CheckoutIntern'
import CheckoutLedning from '@/pages/CheckoutLedning'
import Success from '@/pages/Success'
import BusinessProfile from '@/pages/BusinessProfile'
import Papers from '@/pages/Papers'
import Legal from '@/pages/Legal'
import Support from '@/pages/Support'
import Advisories from '@/pages/Advisories'
import Status from '@/pages/Status'
import NotFound from '@/pages/NotFound'

const meta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Entropic Defence — Kontinuerlig säkerhet mot utländska aktörer',
    description:
      '40+ år i världens högsta säkerhetsklass. Entropic Defence skyddar företag, myndigheter och kritisk infrastruktur mot utländska aktörer — dygnet runt.',
  },
  '/checkout': {
    title: 'Säkerhetspaket & priser — Entropic Defence',
    description:
      'Kontinuerlig säkerhetskontroll från 24 900 kr/mån, intern säkerhetsrevision 3 500 kr/tim och säkerhetsledning på offert. Fasta priser exkl. moms.',
  },
  '/checkout/extern': {
    title: 'Kontinuerlig säkerhetskontroll — fasta priser | Entropic Defence',
    description:
      'Fasta priser på extern säkerhetskontroll: månadsvis, veckovis eller dagligen. Pris efter antal sidor — under 20, 20–100 eller 100+ sidor. Exkl. moms.',
  },
  '/checkout/intern': {
    title: 'Intern säkerhetsrevision — tre nivåer | Entropic Defence',
    description:
      'Intern säkerhetsrevision i tre nivåer: vanlig säkerhet, hög säkerhet och militär grad. 3 500 kr/tim — AI-verktyg ger 1/6 av tiden och högre säkerhet.',
  },
  '/checkout/ledning': {
    title: 'Säkerhetsledning för ledning och styrelse | Entropic Defence',
    description:
      'Strategisk säkerhetsledning på offert och 24/7 säkerhetsexpert för hela organisationen — kommer snart. Prata säkerhet på ledningsnivå med oss.',
  },
  '/success': {
    title: 'Förfrågan mottagen — Entropic Defence',
    description: 'Er förfrågan är mottagen. En konsult återkommer inom 24 timmar.',
  },
  '/business-profile': {
    title: 'Business Profile — Entropic Defence',
    description: 'Hantera företagets säkerhetsprenumeration, rapportmottagare och konto.',
  },
  '/papers': {
    title: 'Papers — Entropic Defence',
    description: 'Vetenskapliga rapporter, hypoteser och essäer om AI, teoretisk fysik, filosofi och säkerhet.',
  },
  '/legal': {
    title: 'Legal — Entropic Defence',
    description: 'Integritetspolicy, användarvillkor och cookieinformation för Entropic Defence AB.',
  },
  '/support': {
    title: 'Support & FAQ — Entropic Defence',
    description: 'Vanliga frågor och kundsupport. Vår supportbot svarar 24/7.',
  },
  '/advisories': {
    title: 'Advisories & Disclosures — Entropic Defence',
    description: 'Säkerhetsadvisories, koordinerad sårbarhetsrapportering och ansvarsfull disclosure.',
  },
  '/status': {
    title: 'Säkerhetsstatus — Entropic Defence',
    description: 'Följ er pågående säkerhetskontroll — från planering till slutrapport.',
  },
  '*': {
    title: 'Sidan hittades inte — Entropic Defence',
    description: 'Signalen tappades. Sidan du söker finns inte.',
  },
}

function usePageEffects() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const m = meta[pathname] ?? meta['*']
    document.title = m.title
    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', m.description)
  }, [pathname])

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
}

export default function App() {
  usePageEffects()

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <TimeField />
      <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,6,11,0.45)_72%,rgba(4,6,11,0.88)_100%)]" />
        <div className="noise-overlay absolute inset-0 opacity-[0.05]" />
      </div>

      <Nav />

      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/extern" element={<CheckoutExtern />} />
          <Route path="/checkout/intern" element={<CheckoutIntern />} />
          <Route path="/checkout/ledning" element={<CheckoutLedning />} />
          <Route path="/success" element={<Success />} />
          <Route path="/business-profile" element={<BusinessProfile />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/support" element={<Support />} />
          <Route path="/advisories" element={<Advisories />} />
          <Route path="/status" element={<Status />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <FloatingCta />
    </div>
  )
}
