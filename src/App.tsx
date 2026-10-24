import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import TimeField from '@/components/TimeField'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FloatingCta from '@/components/FloatingCta'
import CookieToast from '@/components/CookieToast'
import Home from '@/pages/Home'
import Checkout from '@/pages/Checkout'
import CheckoutExtern from '@/pages/CheckoutExtern'
import CheckoutSmall from '@/pages/CheckoutSmall'
import CheckoutIntern from '@/pages/CheckoutIntern'
import CheckoutLedning from '@/pages/CheckoutLedning'
import Success from '@/pages/Success'
import Papers from '@/pages/Papers'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Legal from '@/pages/Legal'
import Support from '@/pages/Support'
import Advisories from '@/pages/Advisories'
import Disclosures from '@/pages/Disclosures'
import Status from '@/pages/Status'
import NotFound from '@/pages/NotFound'
import { stripLanguagePrefix, useI18n } from '@/i18n'
import { getPost } from '@/blog/posts'
import { blogUi } from '@/blog/ui'

function usePageEffects() {
  const { pathname, hash } = useLocation()
  const { t, lang } = useI18n()
  const pagePath = stripLanguagePrefix(pathname)

  const meta: Record<string, { title: string; description: string }> = {
    '/': t.meta.home,
    '/checkout': t.meta.checkout,
    '/checkout/extern': t.meta.checkoutExtern,
    '/checkout/mindre': t.meta.checkoutSmall,
    '/checkout/intern': t.meta.checkoutIntern,
    '/checkout/ledning': t.meta.checkoutLedning,
    '/success': t.meta.success,
    '/papers': t.meta.papers,
    '/legal': t.meta.legal,
    '/support': t.meta.support,
    '/advisories': t.meta.advisories,
    '/disclosures': t.meta.disclosures,
    '/status': t.meta.status,
    '*': t.meta.notFound,
  }

  useEffect(() => {
    const post = pagePath.startsWith('/blog/') ? getPost(lang, pagePath.slice('/blog/'.length)) : undefined
    const m = post
      ? { title: `${post.title} — Entropic Defence`, description: post.description }
      : pagePath === '/blog'
        ? { title: `${blogUi[lang].title} — Entropic Defence`, description: blogUi[lang].lead }
        : (meta[pagePath] ?? meta['*'])
    document.title = m.title
    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', m.description)
    const robots = document.querySelector('meta[name="robots"]')
    if (robots) robots.setAttribute('content', pagePath === '/papers' ? 'noindex, follow' : 'index, follow')
  }, [pagePath, lang, meta])

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? ('auto' as const)
          : ('smooth' as const)
        requestAnimationFrame(() => el.scrollIntoView({ behavior, block: 'start' }))
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
          <Route path=":lang?">
            <Route index element={<Home />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkout/extern" element={<CheckoutExtern />} />
            <Route path="checkout/mindre" element={<CheckoutSmall />} />
            <Route path="checkout/intern" element={<CheckoutIntern />} />
            <Route path="checkout/ledning" element={<CheckoutLedning />} />
            <Route path="success" element={<Success />} />
            <Route path="papers" element={<Papers />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="legal" element={<Legal />} />
            <Route path="support" element={<Support />} />
            <Route path="advisories" element={<Advisories />} />
            <Route path="disclosures" element={<Disclosures />} />
            <Route path="status" element={<Status />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </main>

      <Footer />
      <FloatingCta />
      <CookieToast />
    </div>
  )
}
