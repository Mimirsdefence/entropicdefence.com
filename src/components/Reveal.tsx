import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  /** Re-trigger the animation every time the element scrolls in or out of view. */
  repeat?: boolean
}

export default function Reveal({ children, className = '', delay = 0, repeat = false }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [visible, setVisible] = useState(reduced)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (!repeat) obs.disconnect()
        } else if (repeat) {
          setVisible(false)
        }
      },
      { threshold: 0.12 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [repeat, reduced])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
