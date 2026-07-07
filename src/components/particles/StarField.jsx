import { useEffect, useRef } from 'react'
import useMousePosition from '../../hooks/useMousePosition'
import useReducedMotion from '../../hooks/useReducedMotion'

/**
 * Full-viewport canvas of soft, twinkling stars that drift gently
 * with the pointer for a subtle parallax feeling of depth.
 */
export default function StarField({ density = 140, className = '' }) {
  const canvasRef = useRef(null)
  const mouse = useMousePosition()
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let stars = []
    let width = 0
    let height = 0

    function resize() {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio
    }

    function seed() {
      const count = Math.floor(density * (canvas.offsetWidth / 1440))
      stars = Array.from({ length: Math.max(40, count) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.3,
        depth: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.6 + 0.2,
      }))
    }

    resize()
    seed()
    window.addEventListener('resize', () => {
      resize()
      seed()
    })

    let t = 0
    function draw() {
      t += 0.016
      ctx.clearRect(0, 0, width, height)
      const { x: mx, y: my } = mouse.current

      for (const s of stars) {
        const twinkle = 0.55 + 0.45 * Math.sin(t * s.speed + s.phase)
        const parallaxX = prefersReduced ? 0 : mx * 14 * s.depth
        const parallaxY = prefersReduced ? 0 : my * 14 * s.depth
        ctx.beginPath()
        ctx.arc(s.x + parallaxX, s.y + parallaxY, s.r * window.devicePixelRatio, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(251, 246, 239, ${twinkle * 0.9})`
        ctx.shadowColor = 'rgba(243, 201, 120, 0.6)'
        ctx.shadowBlur = s.r * 3
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(raf)
  }, [density, mouse, prefersReduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
