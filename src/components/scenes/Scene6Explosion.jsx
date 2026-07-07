import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SceneWrapper from '../ui/SceneWrapper'
import ParticleBurst from '../particles/ParticleBurst'
import NextHint from '../ui/NextHint'

const GLYPHS = ['🦋', '🌸', '✨', '🌷']

function FloatingGlyph({ glyph, left, delay, duration, size }) {
  return (
    <motion.span
      className="absolute select-none"
      style={{ left: `${left}%`, fontSize: size, filter: 'drop-shadow(0 0 12px rgba(255,93,143,0.5))' }}
      initial={{ y: '105vh', opacity: 0, rotate: 0 }}
      animate={{ y: '-15vh', opacity: [0, 1, 1, 0], rotate: [0, 15, -10, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {glyph}
    </motion.span>
  )
}

/**
 * Scene 6 — the emotional peak. Everything releases into thousands of
 * glowing particles: butterflies, flowers, stars, and an aurora wash.
 */
export default function Scene6Explosion({ onNext }) {
  const [burstTrigger, setBurstTrigger] = useState(0)

  useEffect(() => {
    setBurstTrigger(1)
    const t = setTimeout(onNext, 6500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const glyphs = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        glyph: GLYPHS[i % GLYPHS.length],
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: Math.random() * 6 + 7,
        size: Math.random() * 18 + 18,
      })),
    []
  )

  return (
    <SceneWrapper className="cursor-pointer bg-navy" onClick={onNext}>
      {/* Aurora wash */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(60% 50% at 30% 20%, rgba(255,93,143,0.35), transparent), radial-gradient(50% 40% at 70% 70%, rgba(185,166,240,0.35), transparent), radial-gradient(40% 40% at 50% 100%, rgba(243,201,120,0.25), transparent)',
        }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <ParticleBurst trigger={burstTrigger} continuous palette="aurora" shape="dot" count={200} />

      {glyphs.map((g) => (
        <FloatingGlyph key={g.id} {...g} />
      ))}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="relative z-10 text-center font-display text-3xl italic text-cream text-glow sm:text-5xl"
      >
        Everything, all at once.
      </motion.p>

      <NextHint />
    </SceneWrapper>
  )
}
