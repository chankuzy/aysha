import { motion } from 'framer-motion'

/**
 * Minimal, unobtrusive progress dots pinned to the bottom of the viewport.
 * Communicates "there is more" without ever feeling like a form wizard.
 */
export default function ProgressDots({ total, current }) {
  return (
    <div
      className="pointer-events-none fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 gap-2"
      aria-hidden="true"
    >
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          className="h-1.5 rounded-full bg-cream/40"
          animate={{
            width: i === current ? 22 : 6,
            backgroundColor: i === current ? '#FF5D8F' : 'rgba(251,246,239,0.35)',
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
