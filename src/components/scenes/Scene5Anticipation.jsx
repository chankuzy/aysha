import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StarField from '../particles/StarField'
import NextHint from '../ui/NextHint'
import { revealLines } from '../../config'

const LINE_DURATION = 2400

/**
 * Scene 5 — near-empty darkness with tiny floating particles while
 * letters slowly assemble, one confession at a time.
 */
export default function Scene5Anticipation({ onNext }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (lineIndex >= revealLines.length - 1) {
      const t = setTimeout(() => setDone(true), LINE_DURATION)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), LINE_DURATION)
    return () => clearTimeout(t)
  }, [lineIndex])

  return (
    <div
      className="relative flex min-h-[100dvh] w-full cursor-pointer flex-col items-center justify-center bg-black"
      onClick={done ? onNext : undefined}
    >
      <StarField density={50} className="opacity-30" />

      <div className="relative z-10 flex h-40 items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={lineIndex}
            initial={{ opacity: 0, letterSpacing: '0.3em', filter: 'blur(8px)' }}
            animate={{ opacity: 1, letterSpacing: '0.02em', filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center font-display text-xl italic text-cream/90 sm:text-3xl"
          >
            {revealLines[lineIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {done && <NextHint label="continue" />}
    </div>
  )
}
