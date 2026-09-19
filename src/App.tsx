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
import { useI18n } from '@/i18n'

function usePageEffects() {
  const { pathname, hash } = useLocation()
  const { t, lang } = useI18n()

  const meta: Record<string, { title: string; description: string }> = {
    '/': t.meta.home,
    '/checkout': t.meta.checkout,
    '/checkout/extern': t.meta.checkoutExtern,
    '/checkout/intern': t.meta.checkoutIntern,
    '/checkout/ledning': t.meta.checkoutLedning,
    '/success': t.meta.success,
    '/business-profile': t.meta.businessProfile,
    '/papers': t.meta.papers,
    '/legal': t.meta.legal,
    '/support': t.meta.support,
    '/advisories': t.meta.advisories,
    '/status': t.meta.status,
    '*': t.meta.notFound,
  }

  useEffect(() => {
    const m = meta[pathname] ?? meta['*']
    document.title = m.title
    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', m.description)
  }, [pathname, lang])

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
