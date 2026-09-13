import { useEffect, useRef } from 'react'

type Particle = { x: number; y: number; vx: number; vy: number; r: number }

const SPACING = 44
const RADIUS = 220
const STRENGTH = 32

/**
 * TimeField — a full-screen canvas grid that warps around the cursor,
 * like a field bending time and space. Respects prefers-reduced-motion.
 */
export default function TimeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const el = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const c = ctx

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let raf = 0
    let running = true

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    const particles: Particle[] = []
    const particleCount = Math.min(
      90,
      Math.max(36, Math.floor((window.innerWidth * window.innerHeight) / 22000)),
    )

    function seedParticles() {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: Math.random() * 1.1 + 0.4,
        })
      }
    }

    function resize() {
      width = el.clientWidth
      height = el.clientHeight
      el.width = Math.floor(width * dpr)
      el.height = Math.floor(height * dpr)
      c.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedParticles()
      if (reduced) draw()
    }

    function warp(baseX: number, baseY: number) {
      const dx = baseX - mouse.tx
      const dy = baseY - mouse.ty
      const dist = Math.hypot(dx, dy)
      if (dist < 0.001 || dist >= RADIUS * 1.8) return { x: baseX, y: baseY }
      const falloff = Math.max(0, 1 - dist / (RADIUS * 1.8))
      const pull = falloff * falloff * STRENGTH
      return {
        x: baseX + (dx / dist) * pull,
        y: baseY + (dy / dist) * pull,
      }
    }

    function lineAlpha(centerX: number, centerY: number) {
      const dist = Math.hypot(centerX - mouse.tx, centerY - mouse.ty)
      const proximity = Math.max(0, 1 - dist / (RADIUS * 2.4))
      return 0.045 + proximity * 0.2
    }

    function draw() {
      c.clearRect(0, 0, width, height)
      const cols = Math.ceil(width / SPACING) + 1
      const rows = Math.ceil(height / SPACING) + 1
      c.lineWidth = 1

      // Vertical lines
      for (let i = 0; i <= cols; i++) {
        const baseX = i * SPACING
        c.beginPath()
        for (let j = 0; j <= rows; j++) {
          const p = warp(baseX, j * SPACING)
          if (j === 0) c.moveTo(p.x, p.y)
          else c.lineTo(p.x, p.y)
        }
        c.strokeStyle = `rgba(56, 189, 248, ${lineAlpha(baseX, height / 2)})`
        c.stroke()
      }

      // Horizontal lines
      for (let j = 0; j <= rows; j++) {
        const baseY = j * SPACING
        c.beginPath()
        for (let i = 0; i <= cols; i++) {
          const p = warp(i * SPACING, baseY)
          if (i === 0) c.moveTo(p.x, p.y)
          else c.lineTo(p.x, p.y)
        }
        c.strokeStyle = `rgba(56, 189, 248, ${lineAlpha(width / 2, baseY)})`
        c.stroke()
      }

      // Cursor glow
      if (!reduced) {
        const glow = c.createRadialGradient(mouse.tx, mouse.ty, 0, mouse.tx, mouse.ty, RADIUS)
        glow.addColorStop(0, 'rgba(56, 189, 248, 0.16)')
        glow.addColorStop(0.5, 'rgba(34, 211, 238, 0.06)')
        glow.addColorStop(1, 'rgba(34, 211, 238, 0)')
        c.fillStyle = glow
        c.fillRect(mouse.tx - RADIUS, mouse.ty - RADIUS, RADIUS * 2, RADIUS * 2)
      }

      // Dust particles
      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < -10) p.x = width + 10
          if (p.x > width + 10) p.x = -10
          if (p.y < -10) p.y = height + 10
          if (p.y > height + 10) p.y = -10
        }
        c.beginPath()
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        c.fillStyle = 'rgba(148, 184, 220, 0.35)'
        c.fill()
      }
    }

    function frame() {
      if (!running) return
      mouse.tx += (mouse.x - mouse.tx) * 0.09
      mouse.ty += (mouse.y - mouse.ty) * 0.09
      draw()
      raf = requestAnimationFrame(frame)
    }

    function onMove(e: PointerEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    function onLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    if (reduced) {
      draw()
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
