import { Link } from 'react-router-dom'
import LogoMark from '@/components/LogoMark'

const columns = [
  {
    title: 'Navigering',
    links: [
      { to: '/#tjanster', label: 'Tjänster' },
      { to: '/advisories', label: 'Advisories' },
      { to: '/papers', label: 'Papers' },
      { to: '/status', label: 'Säkerhetsstatus' },
    ],
  },
  {
    title: 'Företag',
    links: [
      { to: '/checkout', label: 'Välj paket' },
      { to: '/business-profile', label: 'Business Profile' },
      { to: '/support', label: 'Support & FAQ' },
      { to: '/legal', label: 'Legal' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-abyss/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <LogoMark />
            <span className="font-display text-sm font-bold tracking-[0.22em] text-frost">
              ENTROPIC<span className="text-signal">DEFENCE</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fog">
            Kontinuerlig säkerhet mot utländska aktörer. 40+ år i världens högsta
            säkerhetsklass — för företag, myndigheter och kritisk infrastruktur.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-fog">
            Stockholm · Sverige
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
                  <Link to={l.to} className="text-sm text-fog transition-colors hover:text-frost">
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
          <p>© 2026 Entropic Defence AB. Alla rättigheter förbehållna.</p>
          <p className="font-mono">contact@entropicdefence.com</p>
        </div>
      </div>
    </footer>
  )
}
