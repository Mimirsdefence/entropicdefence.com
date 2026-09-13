export default function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ed-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0a111d" stroke="#17233a" />
      <path d="M32 9 53 21v22L32 55 11 43V21Z" fill="none" stroke="url(#ed-grad)" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="6.5" fill="url(#ed-grad)" />
    </svg>
  )
}
