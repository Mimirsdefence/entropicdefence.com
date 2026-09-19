import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-display text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal disabled:pointer-events-none disabled:opacity-50'

const variants = {
  primary: 'bg-signal text-void hover:bg-pulse hover:shadow-[0_0_36px_rgba(56,189,248,0.4)] px-7 py-3.5',
  ghost:
    'border border-line bg-white/[0.02] text-frost hover:border-signal/60 hover:bg-signal/10 px-7 py-3.5',
  small: 'bg-signal text-void hover:bg-pulse px-5 py-2.5',
} as const

type Props = {
  children: ReactNode
  to?: string
  href?: string
  variant?: keyof typeof variants
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  state?: unknown
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  type,
  onClick,
  disabled,
  state,
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick} state={state}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <button type={type ?? 'button'} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}
