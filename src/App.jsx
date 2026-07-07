import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ProgressDots from './components/ui/ProgressDots'
import Scene1Intro from './components/scenes/Scene1Intro'
import Scene2Stars from './components/scenes/Scene2Stars'
import Scene3Name from './components/scenes/Scene3Name'
import Scene4Memories from './components/scenes/Scene4Memories'
import SceneGallery from './components/scenes/SceneGallery'
import Scene5Anticipation from './components/scenes/Scene5Anticipation'
import Scene6Explosion from './components/scenes/Scene6Explosion'
import Scene7Bubbles from './components/scenes/Scene7Bubbles'
import Scene8Constellation from './components/scenes/Scene8Constellation'
import Scene9Finale from './components/scenes/Scene9Finale'

const SCENES = [
  Scene1Intro,
  Scene2Stars,
  Scene3Name,
  Scene4Memories,
  SceneGallery,
  Scene5Anticipation,
  Scene6Explosion,
  Scene7Bubbles,
  Scene8Constellation,
  Scene9Finale,
]

/**
 * Orchestrates the full scene sequence: which scene is showing, how to
 * advance (click, button, or arrow keys / space), and the progress dots.
 */
export default function App() {
  const [index, setIndex] = useState(0)

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, SCENES.length - 1))
  }, [])

  const goBack = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0))
  }, [])

  useEffect(() => {
    function handleKey(e) {
      if (['ArrowRight', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        goBack()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goBack])

  const ActiveScene = SCENES[index]

  return (
    <main className="relative min-h-[100dvh] w-full bg-midnight">
      <AnimatePresence mode="wait">
        <ActiveScene key={index} onNext={goNext} />
      </AnimatePresence>
      <ProgressDots total={SCENES.length} current={index} />
    </main>
  )
}