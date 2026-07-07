import { useEffect, useRef } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion'

const PALETTES = {
  aurora: ['#FF5D8F', '#B9A6F0', '#F3C978', '#7DD3FC'],
  warm: ['#FF5D8F', '#F3C978', '#FBF6EF'],
}

/**
 * Full-viewport canvas burst of particles (soft dots / tiny hearts) that
 * radiate outward from a point and fade. Fire by incrementing `trigger`.
 * `continuous` keeps a light ambient burst rate going (used in Scene 6).
 */
export default function ParticleBurst({
  trigger = 0,
  origin = { xRatio: 0.5, yRatio: 0.5 },
  palette = 'aurora',
  shape = 'dot',
  count = 90,
  continuous = false,
  className = '',
}) {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let width, height

    function resize() {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio
    }
    resize()
    window.addEventListener('resize', resize)

    function spawn(n) {
      const colors = PALETTES[palette] || PALETTES.aurora
      const ox = width * origin.xRatio
      const oy = height * origin.yRatio
      for (let i = 0; i < (prefersReduced ? Math.min(15, n) : n); i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = (Math.random() * 2.2 + 0.6) * window.devicePixelRatio
        particles.current.push({
          x: ox,
          y: oy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - speed * 0.4,
          r: (Math.random() * 3 + 1.5) * window.devicePixelRatio,
          life: 0,
          maxLife: Math.random() * 80 + 90,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    if (trigger > 0) spawn(count)

    let ambientCounter = 0
    function draw() {
      ctx.clearRect(0, 0, width, height)
      if (continuous && !prefersReduced) {
        ambientCounter++
        if (ambientCounter % 8 === 0) spawn(4)
      }
      particles.current = particles.current.filter((p) => p.life < p.maxLife)
      for (const p of particles.current) {
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.01 * window.devicePixelRatio
        const fade = 1 - p.life / p.maxLife
        ctx.globalAlpha = Math.max(fade, 0)
        if (shape === 'heart') {
          drawHeart(ctx, p.x, p.y, p.r * 2, p.color)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.shadowColor = p.color
          ctx.shadowBlur = p.r * 2
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, continuous])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}

function drawHeart(ctx, x, y, size, color) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(size / 20, size / 20)
  ctx.beginPath()
  ctx.moveTo(0, 4)
  ctx.bezierCurveTo(0, 2, -2, 0, -5, 0)
  ctx.bezierCurveTo(-9, 0, -9, 5, -9, 5)
  ctx.bezierCurveTo(-9, 9, -5, 12, 0, 16)
  ctx.bezierCurveTo(5, 12, 9, 9, 9, 5)
  ctx.bezierCurveTo(9, 5, 9, 0, 5, 0)
  ctx.bezierCurveTo(2, 0, 0, 2, 0, 4)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.shadowColor = color
  ctx.shadowBlur = 6
  ctx.fill()
  ctx.restore()
}
