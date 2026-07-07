import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StarField from '../particles/StarField'
import GlowButton from '../ui/GlowButton'
import { openingLines } from '../../config'

const LINE_DURATION = 2200

/**
 * Scene 1 — "Close your eyes... No... Open them."
 * A near-black moment with stars slowly fading in, one whispered
 * line at a time, before inviting the visitor to continue.
 */
export default function Scene1Intro({ onNext }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    if (lineIndex >= openingLines.length - 1) {
      const t = setTimeout(() => setShowButton(true), LINE_DURATION)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), LINE_DURATION)
    return () => clearTimeout(t)
  }, [lineIndex])

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center bg-black">
      <StarField density={60} className="opacity-0 animate-[fadeIn_4s_ease_forwards]" />
      <style>{`@keyframes fadeIn { to { opacity: 0.6 } }`}</style>

      <div className="relative z-10 flex h-40 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={lineIndex}
            initial={{ opacity: 0, filter: 'blur(8px)', letterSpacing: '0.15em' }}
            animate={{ opacity: 1, filter: 'blur(0px)', letterSpacing: '0.02em' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="px-6 text-center font-display text-2xl font-light italic text-cream/90 sm:text-4xl"
          >
            {openingLines[lineIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10 mt-10"
          >
            <GlowButton onClick={onNext}>Continue</GlowButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
