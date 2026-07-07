import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneWrapper from '../ui/SceneWrapper'
import StarField from '../particles/StarField'
import PetalField from '../particles/PetalField'
import ParticleBurst from '../particles/ParticleBurst'
import GlowButton from '../ui/GlowButton'
import AnimatedText from '../ui/AnimatedText'
import { finalMessage } from '../../config'

/**
 * Scene 9 — the final message settles into place, then a single glowing
 * button ("Hug Me") triggers the closing bloom: flowers, glow, hearts,
 * and a petal-confetti release ending on "Felt ❤️".
 */
export default function Scene9Finale() {
  const [hugged, setHugged] = useState(false)
  const [burst, setBurst] = useState(0)

  function handleHug() {
    setHugged(true)
    setBurst((b) => b + 1)
  }

  return (
    <SceneWrapper className="bg-navy">
      <StarField density={90} />
      <PetalField count={hugged ? 26 : 10} />
      <ParticleBurst trigger={burst} shape="heart" palette="warm" count={70} />
      <ParticleBurst trigger={burst} shape="dot" palette="aurora" count={90} />

      <motion.div
        aria-hidden="true"
        className="absolute h-[420px] w-[420px] rounded-full bg-rose/20 blur-[100px]"
        animate={{ opacity: hugged ? [0.5, 1, 0.6] : 0.4, scale: hugged ? [1, 1.15, 1] : 1 }}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-2xl text-center">
        {finalMessage.map((line, i) => (
          <AnimatedText
            key={line}
            text={line}
            as="p"
            delay={i * 0.9}
            className="font-display text-2xl italic leading-relaxed text-cream text-glow sm:text-4xl"
          />
        ))}
      </div>

      <div className="relative z-10 mt-14 flex min-h-[64px] items-center justify-center">
        <AnimatePresence mode="wait">
          {!hugged ? (
            <motion.div
              key="btn"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 2.4, duration: 0.8 }}
            >
              <GlowButton onClick={handleHug} tone="gold">
                Hug Me 🤗
              </GlowButton>
            </motion.div>
          ) : (
            <motion.p
              key="felt"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.3 }}
              className="font-display text-3xl italic text-rose text-glow sm:text-5xl"
            >
              Felt ❤️
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </SceneWrapper>
  )
}
