import { motion } from 'framer-motion'

/**
 * A soft, glowing call-to-action button used at key emotional beats
 * (Continue, Hug Me). Keyboard accessible, respects focus rings.
 */
export default function GlowButton({ children, onClick, tone = 'rose', className = '', ...rest }) {
  const toneStyles = {
    rose: 'from-rose to-rose-deep shadow-glow',
    gold: 'from-gold to-rose shadow-glow-gold',
    lavender: 'from-lavender to-rose shadow-glow-lavender',
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative rounded-full bg-gradient-to-r ${toneStyles[tone]} px-8 py-3 font-body text-sm font-semibold tracking-wide text-navy sm:text-base ${className}`}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 -z-0 rounded-full bg-white/40 blur-xl"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.button>
  )
}
