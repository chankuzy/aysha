import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneWrapper from '../ui/SceneWrapper'
import ParticleBurst from '../particles/ParticleBurst'
import GlowButton from '../ui/GlowButton'
import { memories } from '../../config'

function MemoryCard({ memory, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -25 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{ rotateY: 8, rotateX: -4, scale: 1.03, y: -6 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      className="glass w-full max-w-[260px] rounded-2xl p-6 shadow-glow-lavender"
    >
      <p className="font-display text-lg italic text-gold">{memory.title}</p>
      <p className="mt-3 text-sm leading-relaxed text-cream/80">{memory.text}</p>
    </motion.div>
  )
}

/**
 * Scene 4 — memory cards drift in, gently tilt in 3D on hover, then the
 * whole cluster dissolves into particles when the visitor moves on.
 */
export default function Scene4Memories({ onNext }) {
  const [dissolving, setDissolving] = useState(false)
  const [burstTrigger, setBurstTrigger] = useState(0)

  function handleContinue() {
    setDissolving(true)
    setBurstTrigger((t) => t + 1)
    setTimeout(onNext, 900)
  }

  return (
    <SceneWrapper className="bg-navy">
      <ParticleBurst trigger={burstTrigger} palette="warm" count={140} />

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: dissolving ? 0 : 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center font-display text-2xl italic text-cream/70 sm:text-3xl"
      >
        A few of my favorite moments
      </motion.h2>

      <AnimatePresence>
        {!dissolving && (
          <motion.div
            exit={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
            transition={{ duration: 0.7 }}
            className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {memories.map((m, i) => (
              <MemoryCard key={m.title} memory={m} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12">
        <GlowButton onClick={handleContinue} tone="lavender">
          Keep going
        </GlowButton>
      </div>
    </SceneWrapper>
  )
}
