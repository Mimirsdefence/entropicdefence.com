import { Link } from 'react-router-dom'

export default function FloatingCta() {
  return (
    <Link
      to="/#contact"
      className="fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 rounded-full border border-signal/40 bg-void/85 px-5 py-3 font-display text-sm font-semibold text-frost shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:border-signal hover:bg-signal/10 hover:shadow-[0_0_32px_rgba(56,189,248,0.35)] md:inline-flex"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
      </span>
      Prata med en konsult · 24/7
    </Link>
  )
}
