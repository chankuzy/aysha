import { motion } from 'framer-motion'
import { useMemo } from 'react'
import useReducedMotion from '../../hooks/useReducedMotion'

const PETAL_COLORS = ['#FF5D8F', '#B9A6F0', '#F3C978', '#FBF6EF']

function Petal({ delay, duration, left, size, color, drift }) {
  return (
    <motion.div
      className="absolute rounded-[60%_40%_60%_40%] opacity-80"
      style={{
        left: `${left}%`,
        width: size,
        height: size * 1.2,
        background: `linear-gradient(135deg, ${color}, transparent)`,
        filter: 'blur(0.2px)',
      }}
      initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
      animate={{
        y: '110vh',
        opacity: [0, 0.9, 0.9, 0],
        rotate: 360,
        x: [0, drift, -drift, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

/**
 * Gentle, continuous rain of flower petals across the viewport.
 * Count and motion are reduced automatically for prefers-reduced-motion.
 */
export default function PetalField({ count = 14, className = '' }) {
  const prefersReduced = useReducedMotion()
  const petals = useMemo(
    () =>
      Array.from({ length: prefersReduced ? Math.min(4, count) : count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 14 + 10,
        duration: prefersReduced ? 0.001 : Math.random() * 10 + 12,
        delay: Math.random() * 10,
        drift: Math.random() * 60 + 20,
        color: PETAL_COLORS[i % PETAL_COLORS.length],
      })),
    [count, prefersReduced]
  )

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {petals.map((p) => (
        <Petal key={p.id} {...p} />
      ))}
    </div>
  )
}
