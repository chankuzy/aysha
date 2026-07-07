import { motion } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'

const container = (stagger, delayChildren) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

const word = {
  hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * Reveals text word-by-word with a soft fade + blur + rise, the signature
 * "letters assembling out of nothing" motion used throughout the piece.
 */
export default function AnimatedText({
  text,
  as: Tag = 'p',
  className = '',
  stagger = 0.08,
  delay = 0,
  once = true,
}) {
  const prefersReduced = useReducedMotion()
  const words = text.split(' ')
  const MotionTag = motion[Tag] || motion.p

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <MotionTag
      className={className}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.6 }}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} className="mr-[0.28em] inline-block whitespace-nowrap">
          {w}
        </motion.span>
      ))}
    </MotionTag>
  )
}
