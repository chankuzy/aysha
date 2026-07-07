import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneWrapper from '../ui/SceneWrapper'
import StarField from '../particles/StarField'
import NextHint from '../ui/NextHint'

const FLOWER_POSITIONS = [
  { x: -70, y: -30, rotate: -12 },
  { x: 70, y: -20, rotate: 10 },
  { x: -50, y: 60, rotate: -6 },
  { x: 55, y: 55, rotate: 14 },
  { x: 0, y: -75, rotate: 0 },
]

/**
 * Scene 2 — a slow drift through a field of stars. A glowing heart
 * condenses out of the dark, then softly blooms outward into flowers.
 */
export default function Scene2Stars({ onNext }) {
  const [bloomed, setBloomed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setBloomed(true), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <SceneWrapper className="cursor-pointer bg-navy" onClick={onNext}>
      <StarField density={180} />
      <motion.div
        className="relative flex h-[280px] w-[280px] items-center justify-center"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AnimatePresence>
          {!bloomed && (
            <motion.svg
              key="heart"
              viewBox="0 0 100 90"
              className="absolute h-32 w-32 drop-shadow-[0_0_40px_rgba(255,93,143,0.6)]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.3 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <path
                d="M50 85 C10 55 0 30 20 15 C35 3 50 15 50 25 C50 15 65 3 80 15 C100 30 90 55 50 85 Z"
                fill="url(#heartGradient)"
              />
              <defs>
                <linearGradient id="heartGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF5D8F" />
                  <stop offset="100%" stopColor="#B9A6F0" />
                </linearGradient>
              </defs>
            </motion.svg>
          )}
        </AnimatePresence>

        {bloomed &&
          FLOWER_POSITIONS.map((f, i) => (
            <motion.span
              key={i}
              className="absolute text-4xl sm:text-5xl"
              style={{ filter: 'drop-shadow(0 0 18px rgba(255,93,143,0.5))' }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.2, rotate: 0 }}
              animate={{ x: f.x, y: f.y, opacity: 1, scale: 1, rotate: f.rotate }}
              transition={{ duration: 1.3, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              🌸
            </motion.span>
          ))}
      </motion.div>

      <NextHint />
    </SceneWrapper>
  )
}
