import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineVideoCamera,
  HiX,
  HiChevronLeft,
  HiChevronRight,
  HiPlay,
} from 'react-icons/hi'
import SceneWrapper from '../ui/SceneWrapper'
import GlowButton from '../ui/GlowButton'
import StarField from '../particles/StarField'
import { HER_NAME, galleryIntro, galleryCaptions } from '../../config'

// Pull in every aysha* photo/video sitting in src/assets automatically.
// Drop aysha6.jpg, aysha7.jpg, etc. in later and they'll just show up —
// no code changes needed.
const imageModules = import.meta.glob('../../assets/aysha*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
})
const videoModules = import.meta.glob('../../assets/aysha*.{mp4,mov,webm}', {
  eager: true,
  import: 'default',
})

function filenameOf(path) {
  return path.split('/').pop()
}

function naturalSort(a, b) {
  const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10)
  const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10)
  return numA - numB
}

function buildItems() {
  const images = Object.entries(imageModules)
    .sort(([a], [b]) => naturalSort(a, b))
    .map(([path, src]) => ({
      type: 'image',
      src,
      caption: galleryCaptions[filenameOf(path)] || '',
    }))

  const videos = Object.entries(videoModules).map(([path, src]) => ({
    type: 'video',
    src,
    caption: galleryCaptions[filenameOf(path)] || '',
  }))

  // Video first (hero tile), then photos.
  return [...videos, ...images]
}

// Hand-tuned mosaic spans for a premium, non-uniform grid on desktop.
// Falls back to a plain grid on mobile.
const SPANS = [
  'lg:col-span-2 lg:row-span-2', // hero (video if present)
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-2',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-2 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-2',
  'lg:col-span-2 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
]

function ForBadge() {
  return (
    <span className="glass pointer-events-none absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gold">
      for {HER_NAME}
    </span>
  )
}

function ImageTile({ item, index, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ scale: 1.02, y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`glass group relative overflow-hidden rounded-2xl text-left shadow-glow-lavender/40 focus-visible:outline-offset-4 ${SPANS[index] || ''}`}
    >
      <ForBadge />
      <img
        src={item.src}
        alt={item.caption || `A photo of ${HER_NAME}`}
        className="h-full min-h-[140px] w-full object-cover transition duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
    </motion.button>
  )
}

function VideoTile({ item, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(0)}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ scale: 1.015, y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`glass group relative overflow-hidden rounded-2xl text-left shadow-glow ${SPANS[0]}`}
    >
      <ForBadge />
      <video
        src={item.src}
        muted
        playsInline
        preload="metadata"
        className="h-full min-h-[220px] w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/40">
        <motion.span
          className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/90 text-navy shadow-glow-gold"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HiPlay size={26} className="translate-x-[1px]" />
        </motion.span>
      </div>
    </motion.button>
  )
}

function Lightbox({ items, activeIndex, setActiveIndex, onClose }) {
  const item = items[activeIndex]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  function step(dir) {
    setActiveIndex((i) => (i + dir + items.length) % items.length)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 z-10 rounded-full bg-cream/10 p-2 text-cream hover:bg-cream/20"
      >
        <HiX size={22} />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          step(-1)
        }}
        aria-label="Previous"
        className="absolute left-3 z-10 rounded-full bg-cream/10 p-2 text-cream hover:bg-cream/20 sm:left-6"
      >
        <HiChevronLeft size={26} />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          step(1)
        }}
        aria-label="Next"
        className="absolute right-3 z-10 rounded-full bg-cream/10 p-2 text-cream hover:bg-cream/20 sm:right-6"
      >
        <HiChevronRight size={26} />
      </button>

      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="mx-4 flex max-h-[85vh] max-w-3xl flex-col items-center gap-4"
      >
        {item.type === 'video' ? (
          <video
            src={item.src}
            controls
            autoPlay
            className="max-h-[75vh] w-full rounded-xl bg-black shadow-glow"
          />
        ) : (
          <img
            src={item.src}
            alt={item.caption || `A photo of ${HER_NAME}`}
            className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-glow"
          />
        )}
        {item.caption && (
          <p className="max-w-xl text-center font-display text-base italic text-cream/80">
            {item.caption}
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}

/**
 * Scene — the gallery. A premium mosaic built from every aysha* photo/
 * video found in src/assets, each tagged "for {HER_NAME}", opening into
 * a full lightbox.
 */
export default function SceneGallery({ onNext }) {
  const items = useMemo(buildItems, [])
  const [activeIndex, setActiveIndex] = useState(null)
  const hasVideo = items[0]?.type === 'video'

  return (
    <SceneWrapper className="bg-navy">
      <StarField density={40} />

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-10 text-center"
      >
        <p className="mb-2 text-[11px] uppercase tracking-[0.35em] text-gold/80">
          {galleryIntro.eyebrow}
        </p>
        <h2 className="font-display text-3xl italic text-cream text-glow sm:text-4xl">
          {galleryIntro.title}
        </h2>
        <p className="mt-3 text-sm text-cream/60 sm:text-base">{galleryIntro.subtitle}</p>
      </motion.div>

      <div className="grid w-full max-w-4xl grid-cols-2 auto-rows-[140px] gap-4 lg:grid-cols-4 lg:auto-rows-[150px]">
        {hasVideo && <VideoTile item={items[0]} onOpen={setActiveIndex} />}
        {items.slice(hasVideo ? 1 : 0).map((item, i) => (
          <ImageTile
            key={item.src}
            item={item}
            index={hasVideo ? i + 1 : i}
            onOpen={setActiveIndex}
          />
        ))}
      </div>

      <div className="mt-12">
        <GlowButton onClick={onNext} tone="gold">
          Keep going
        </GlowButton>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            items={items}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>
    </SceneWrapper>
  )
}