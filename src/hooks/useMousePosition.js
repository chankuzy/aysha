import { useEffect, useRef } from 'react'

/**
 * Tracks pointer position as normalized values (-1 to 1) around the
 * viewport center, without triggering React re-renders on every move.
 * Consumers read `ref.current` inside their own animation loop (rAF).
 */
export default function useMousePosition() {
  const position = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      position.current = { x, y }
    }
    const handleTouch = (e) => {
      if (!e.touches?.[0]) return
      const t = e.touches[0]
      position.current = {
        x: (t.clientX / window.innerWidth) * 2 - 1,
        y: (t.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchmove', handleTouch)
    }
  }, [])

  return position
}
