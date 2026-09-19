import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import LogoMark from '@/components/LogoMark'
import Button from '@/components/Button'
import { LANGUAGES, useI18n } from '@/i18n'

function LanguagePicker({ onSelect }: { onSelect?: () => void }) {
  const { t, lang, setLang } = useI18n()
  const [langOpen, setLangOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setLangOpen((v) => !v)}
        className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-line px-3 py-2 text-sm text-frost transition-colors hover:border-signal/60"
        aria-label={t.common.chooseLanguage}
        aria-expanded={langOpen}
      >
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true">{current.flag}</span>
          <span className="font-mono text-xs uppercase tracking-wider">{current.code}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-fog transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {langOpen && (
        <ul
          className="absolute right-0 z-10 mt-2 max-h-72 w-44 overflow-auto rounded-xl border border-line bg-void/95 p-1.5 shadow-2xl backdrop-blur-xl"
          aria-label={t.common.chooseLanguage}
        >
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                onClick={() => {
                  setLang(l.code)
                  setLangOpen(false)
                  onSelect?.()
                }}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  l.code === lang ? 'bg-signal/15 text-signal' : 'text-frost hover:bg-panel'
                }`}
              >
                <span aria-hidden="true">{l.flag}</span>
                <span>{l.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()
  const { pathname, hash } = useLocation()

  const links = [
    { to: '/#tjanster', label: t.nav.services },
    { to: '/advisories', label: t.nav.advisories },
    { to: '/papers', label: t.nav.papers },
    { to: '/support', label: t.nav.support },
  ]

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

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-void/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label={t.nav.homeAria}
          onClick={() => {
            if (pathname === '/' && !hash) window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <LogoMark />
          <span className="font-display text-sm font-bold tracking-[0.22em] text-frost">
            ENTROPIC<span className="text-signal">DEFENCE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label={t.nav.mainMenu}>
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              onClick={() => scrollToTarget(l.to)}
              className="text-sm text-fog transition-colors hover:text-frost"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguagePicker />
          <Button
            to="/#contact"
            variant="small"
            onClick={() => {
              if (pathname === '/' && hash === '#contact') {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            {t.nav.talkToConsultant}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-frost md:hidden"
          aria-expanded={open}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-void/95 px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-4" aria-label={t.nav.mobileMenu}>
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => {
                  setOpen(false)
                  scrollToTarget(l.to)
                }}
                className="text-base text-fog transition-colors hover:text-frost"
              >
                {l.label}
              </Link>
            ))}
            <LanguagePicker onSelect={() => setOpen(false)} />
            <Button
              to="/#contact"
              className="mt-2 w-full"
              onClick={() => {
                setOpen(false)
                if (pathname === '/' && hash === '#contact') {
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              {t.nav.talkToConsultant}
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
