import { motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'

/**
 * A quiet, breathing chevron inviting the visitor to continue.
 * The whole scene remains clickable via the parent's onClick.
 */
export default function NextHint({ label = 'continue' }) {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-cream/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 1 }}
    >
      <span className="text-[11px] uppercase tracking-[0.3em]">{label}</span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <HiChevronDown size={20} />
      </motion.span>
    </motion.div>
  )
}
