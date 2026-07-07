# for her — a cinematic romantic web experience

A nine-scene, full-screen animated story built with React, Vite, Tailwind, and Framer Motion.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build a shareable static version:

```bash
npm run build
npm run preview
```

`npm run build` outputs to `dist/` — deploy that folder anywhere static
(Vercel, Netlify, GitHub Pages), or just open `dist/index.html`, or send the
`dist/` folder directly.

## Make it yours

Everything personal lives in **`src/config.js`** — that's the only file you
need to touch:

- `HER_NAME` — shown large in Scene 3
- `memories` — the four floating memory cards in Scene 4
- `bubbles` — the tappable bubbles in Scene 7 (compliments, memories, jokes, heartfelt lines)
- `openingLines` / `revealLines` / `finalMessage` — the whispered lines in Scenes 1, 5, and 9

## How it's organized

```
src/
  config.js                 <- edit this
  App.jsx                   <- scene sequencing, keyboard nav, progress dots
  hooks/
    useMousePosition.js     <- pointer tracking for star parallax
    useReducedMotion.js     <- respects prefers-reduced-motion
  components/
    particles/
      StarField.jsx         <- ambient twinkling stars (canvas)
      PetalField.jsx        <- falling flower petals
      ParticleBurst.jsx     <- triggerable dot/heart bursts (canvas)
    ui/
      AnimatedText.jsx      <- word-by-word fade/blur/rise reveal
      GlowButton.jsx        <- the glowing CTA buttons
      SceneWrapper.jsx      <- shared cinematic scene transition
      NextHint.jsx          <- quiet "continue" affordance
      ProgressDots.jsx      <- bottom progress indicator
    scenes/
      Scene1Intro.jsx          "Close your eyes... No... Open them."
      Scene2Stars.jsx          drifting stars -> glowing heart -> flowers
      Scene3Name.jsx           her name resolves into focus
      Scene4Memories.jsx       floating 3D memory cards
      Scene5Anticipation.jsx   "You once made me blush..."
      Scene6Explosion.jsx      the big aurora/particle release
      Scene7Bubbles.jsx        tap-to-reveal compliments & memories
      Scene8Constellation.jsx  stars connect into a heart -> flowers
      Scene9Finale.jsx         final message + "Hug Me" closing bloom
```

## Navigation

- Click/tap anywhere on a scene (or its button) to advance.
- Arrow keys (`->` / `<-`) and `Space` / `Enter` also work.
- Respects `prefers-reduced-motion`: heavy particle/parallax effects are
  automatically toned down or skipped for anyone with that OS setting on.

## Notes on the tech stack

The brief mentioned GSAP, Lottie, Lenis, and Three.js/R3F. This build keeps
every animation in **Framer Motion + hand-rolled canvas particle systems**
instead — it gets the same cinematic result (60fps, GPU-friendly, staggered
and eased motion) with a much lighter dependency footprint and no external
asset files (Lottie JSON, 3D models) to source. The particle canvases in
`components/particles/` are natural drop-in points for an R3F starfield or
GSAP timeline later, if you want to extend it — the rest of the app doesn't
need to change.

There's no audio wired up (the brief marked it optional) — if you want the
soft piano/ambient sound, drop an mp3 in `public/` and add an `<audio>` tag
with `autoPlay muted loop`, unmuted on the first click in Scene 1 (browsers
block unmuted autoplay before user interaction).
