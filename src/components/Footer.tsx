import { Link, useLocation } from 'react-router-dom'
import { useI18n } from '@/i18n'

export default function Footer() {
  const { t } = useI18n()
  const { pathname, hash } = useLocation()

  const scrollToTarget = (to: string) => {
    if (to.startsWith('/#')) {
      const targetHash = to.slice(1)
      if (pathname === '/' && hash === targetHash) {
        document.querySelector(targetHash)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (pathname === to) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const columns = [
    {
      title: t.footer.columnNavigation,
      links: [
        { to: '/#tjanster', label: t.footer.linkServices },
        { to: '/advisories', label: t.footer.linkAdvisories },
        { to: '/papers', label: t.footer.linkPapers },
        { to: '/status', label: t.footer.linkStatus },
      ],
    },
    {
      title: t.footer.columnCompany,
      links: [
        { to: '/checkout', label: t.footer.linkPackages },
        { to: '/business-profile', label: t.footer.linkBusinessProfile },
        { to: '/support', label: t.footer.linkSupport },
        { to: '/legal', label: t.footer.linkLegal },
      ],
    },
  ]

  return (
    <footer className="relative z-10 border-t border-line bg-abyss/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => {
              if (pathname === '/' && !hash) window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <img src="/logo.webp" alt="" className="h-8 w-8" />
            <span className="font-display text-sm font-bold tracking-[0.22em] text-frost">
              ENTROPIC<span className="text-signal">DEFENCE</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fog">{t.footer.tagline}</p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-fog">
            {t.footer.location}
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-signal">
              {col.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    onClick={() => scrollToTarget(l.to)}
                    className="text-sm text-fog transition-colors hover:text-frost"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-fog sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>{t.footer.copyright}</p>
          <p className="font-mono">support@entropicdefence.com</p>
        </div>
      </div>
    </footer>
  )
}
