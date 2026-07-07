import { useEffect, useState } from 'react'

/**
 * Returns true if the user's system prefers reduced motion.
 * Used to swap heavy animations for gentle fades/opacity-only transitions.
 */
export default function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(query.matches)

    const handler = (e) => setPrefersReduced(e.matches)
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
