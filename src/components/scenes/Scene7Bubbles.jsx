import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneWrapper from '../ui/SceneWrapper'
import GlowButton from '../ui/GlowButton'
import { bubbles } from '../../config'

const TYPE_LABEL = {
  compliment: 'A compliment',
  memory: 'A memory',
  joke: 'Just a joke',
  heartfelt: 'From the heart',
}

const TYPE_COLOR = {
  compliment: 'from-rose to-rose-deep',
  memory: 'from-lavender to-rose',
  joke: 'from-gold to-rose',
  heartfelt: 'from-lavender to-gold',
}

function Bubble({ bubble, index, onOpen }) {
  const size = 90 + (index % 3) * 18
  const left = 8 + ((index * 17) % 84)
  const floatDelay = index * 0.4

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(bubble)}
      className={`glass absolute flex items-center justify-center rounded-full bg-gradient-to-br ${TYPE_COLOR[bubble.type]}/20 text-center text-xs font-semibold text-cream shadow-glow`}
      style={{ width: size, height: size, left: `${left}%` }}
      initial={{ y: 40, opacity: 0 }}
      animate={{
        y: [0, -16, 0],
        opacity: 1,
      }}
      transition={{
        y: { duration: 4 + (index % 3), repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
        opacity: { duration: 0.8, delay: index * 0.15 },
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
    >
      {TYPE_LABEL[bubble.type]}
    </motion.button>
  )
}

/**
 * Scene 7 — a soft field of clickable bubbles, each popping open to
 * reveal a compliment, a memory, a joke, or something heartfelt.
 */
export default function Scene7Bubbles({ onNext }) {
  const [active, setActive] = useState(null)
  const [opened, setOpened] = useState(new Set())

  const positions = useMemo(() => bubbles.map((b, i) => ({ ...b, i })), [])

  function handleOpen(bubble) {
    setActive(bubble)
    setOpened((prev) => new Set(prev).add(bubble.text))
  }

  const allOpened = opened.size >= bubbles.length

  return (
    <SceneWrapper className="bg-navy">
      <h2 className="mb-2 text-center font-display text-2xl italic text-cream/80 sm:text-3xl">
        Pop a few of these
      </h2>
      <p className="mb-8 text-center text-sm text-cream/50">tap each bubble</p>

      <div className="relative h-[360px] w-full max-w-xl">
        {positions.map((b) => (
          <Bubble key={b.text} bubble={b} index={b.i} onOpen={handleOpen} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/80 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="glass max-w-md rounded-3xl p-8 text-center shadow-glow"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
                {TYPE_LABEL[active.type]}
              </p>
              <p className="font-display text-xl italic leading-relaxed text-cream sm:text-2xl">
                {active.text}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10">
        <GlowButton onClick={onNext} tone={allOpened ? 'gold' : 'rose'}>
          {allOpened ? 'Keep going' : 'Continue anyway'}
        </GlowButton>
      </div>
    </SceneWrapper>
  )
}
