import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import LogoMark from '@/components/LogoMark'
import Button from '@/components/Button'

const links = [
  { to: '/#tjanster', label: 'Tjänster' },
  { to: '/advisories', label: 'Advisories' },
  { to: '/papers', label: 'Papers' },
  { to: '/support', label: 'Support' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-void/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Entropic Defence — startsidan">
          <LogoMark />
          <span className="font-display text-sm font-bold tracking-[0.22em] text-frost">
            ENTROPIC<span className="text-signal">DEFENCE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Huvudmeny">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              className="text-sm text-fog transition-colors hover:text-frost"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button to="/#contact" variant="small">
            Prata med en konsult
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-frost md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Stäng meny' : 'Öppna meny'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-void/95 px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobilmeny">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-base text-fog transition-colors hover:text-frost"
              >
                {l.label}
              </Link>
            ))}
            <Button to="/#contact" className="mt-2 w-full" onClick={() => setOpen(false)}>
              Prata med en konsult
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
