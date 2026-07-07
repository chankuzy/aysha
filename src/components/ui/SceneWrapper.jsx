import { motion } from 'framer-motion'

const sceneVariants = {
  initial: { opacity: 0, scale: 1.03, filter: 'blur(12px)' },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(16px)',
    transition: { duration: 0.7, ease: [0.4, 0, 1, 1] },
  },
}

/**
 * Wraps every scene with a consistent cinematic fade/scale/blur transition
 * and a full-bleed relative container for absolutely-positioned particles.
 */
export default function SceneWrapper({ children, className = '', ...rest }) {
  return (
    <motion.section
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 py-16 ${className}`}
      {...rest}
    >
      {children}
    </motion.section>
  )
}
