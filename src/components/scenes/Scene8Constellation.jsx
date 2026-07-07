import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SceneWrapper from '../ui/SceneWrapper'
import StarField from '../particles/StarField'
import NextHint from '../ui/NextHint'

// Points roughly tracing a heart shape, used both as star nodes and
// as the path the connecting line travels.
const HEART_POINTS = [
  [50, 25], [38, 12], [22, 15], [14, 30], [18, 46], [32, 62],
  [50, 80], [68, 62], [82, 46], [86, 30], [78, 15], [62, 12], [50, 25],
]

const PATH_D = `M ${HEART_POINTS.map((p) => p.join(',')).join(' L ')}`

export default function Scene8Constellation({ onNext }) {
  const [flowered, setFlowered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setFlowered(true), 3200)
    return () => clearTimeout(t)
  }, [])

  return (
    <SceneWrapper className="cursor-pointer bg-navy" onClick={onNext}>
      <StarField density={160} />

      <div className="relative h-[320px] w-[320px] sm:h-[420px] sm:w-[420px]">
        <svg viewBox="0 0 100 90" className="absolute inset-0 h-full w-full overflow-visible">
          <motion.path
            d={PATH_D}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="0.6"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: flowered ? 0 : 0.9 }}
            transition={{ pathLength: { duration: 2.6, ease: 'easeInOut' }, opacity: { duration: 0.8 } }}
          />
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F3C978" />
              <stop offset="100%" stopColor="#FF5D8F" />
            </linearGradient>
          </defs>
          {HEART_POINTS.slice(0, -1).map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r={1.6}
              fill="#FBF6EF"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: flowered ? 0 : 1, scale: 1 }}
              transition={{ delay: i * 0.18, duration: 0.5 }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(243,201,120,0.9))' }}
            />
          ))}
        </svg>

        <AnimatePresence>
          {flowered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {HEART_POINTS.slice(0, -1).map(([x, y], i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl sm:text-3xl"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: [0, 12, -12, 0] }}
                  transition={{ delay: i * 0.08, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  🌸
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <NextHint />
    </SceneWrapper>
  )
}
