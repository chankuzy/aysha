import { motion } from 'framer-motion'
import SceneWrapper from '../ui/SceneWrapper'
import StarField from '../particles/StarField'
import NextHint from '../ui/NextHint'
import { HER_NAME } from '../../config'

const SCATTER = [
  { x: '-38vw', y: '-30vh', rotate: -20 },
  { x: '35vw', y: '-25vh', rotate: 15 },
  { x: '-32vw', y: '32vh', rotate: -8 },
  { x: '38vw', y: '30vh', rotate: 18 },
]

/**
 * Scene 3 — the flowers drift apart to the edges of the frame, everything
 * softens into blur, and her name resolves into focus at the center.
 */
export default function Scene3Name({ onNext }) {
  return (
    <SceneWrapper className="cursor-pointer bg-navy" onClick={onNext}>
      <StarField density={100} className="opacity-40 blur-[2px]" />

      {SCATTER.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-4xl opacity-40 blur-[2px] sm:text-5xl"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: s.x, y: s.y, opacity: 0.4, rotate: s.rotate }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          🌸
        </motion.span>
      ))}

      <div className="relative flex items-center justify-center">
        <motion.div
          aria-hidden="true"
          className="absolute h-[280px] w-[280px] rounded-full bg-rose/25 blur-[80px] sm:h-[380px] sm:w-[380px]"
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.h1
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(14px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center font-display text-5xl font-medium text-cream text-glow sm:text-7xl"
        >
          {HER_NAME}
        </motion.h1>
      </div>

      <NextHint />
    </SceneWrapper>
  )
}
