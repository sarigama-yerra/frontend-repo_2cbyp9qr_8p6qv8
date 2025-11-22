import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// A full-screen, scroll-snapping, book-like page stack
// Each child becomes a full viewport-height page with a subtle 3D flip-in
export default function PageBook({ pages = [] }) {
  const containerRef = useRef(null)

  return (
    <div ref={containerRef} className="relative w-full snap-y snap-mandatory overflow-y-auto h-screen">
      {pages.map((Page, idx) => (
        <BookPage key={idx} index={idx} total={pages.length}>
          <Page />
        </BookPage>
      ))}
    </div>
  )
}

function BookPage({ children, index, total }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  // Page flip / stacking transforms
  // RotateX for a subtle book-like flip as the page enters
  const rotateX = useTransform(scrollYProgress, [0, 0.35, 1], [-22, -8, 0])
  const translateY = useTransform(scrollYProgress, [0, 1], [60, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [0, 0.65, 1])
  const shadow = useTransform(scrollYProgress, [0, 1], [0.25, 0.05])
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1])

  return (
    <section ref={ref} className="relative h-screen w-full snap-start">
      <div className="absolute inset-0 perspective-1000">
        <motion.div
          style={{
            rotateX,
            y: translateY,
            opacity,
            scale,
            transformStyle: 'preserve-3d',
            boxShadow: shadow.to(s => `0 30px 80px rgba(0,0,0,${s})`),
          }}
          className="absolute inset-4 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 overflow-hidden"
        >
          {/* Subtle page edge gradient */}
          <div className="pointer-events-none absolute inset-px rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_20%,transparent_80%,rgba(255,255,255,0.06))]" />

          {/* Content enters with fly-in animation */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.5, once: false }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
            className="relative h-full w-full"
          >
            <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(59,130,246,0.35),transparent),radial-gradient(800px_400px_at_80%_90%,rgba(16,185,129,0.35),transparent)]" />
            <div className="absolute inset-0 -z-10 mix-blend-overlay" />
            <div className="flex h-full items-center justify-center p-8">
              <div className="max-w-4xl w-full text-center">
                {wrapChildrenWithFlyIn(children)}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Stacking illusion: a faint page underneath */}
      <div className="pointer-events-none absolute inset-4 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-[1px]" style={{ transform: `translateZ(-${(total-index)*0.5}px)` }} />
    </section>
  )
}

function wrapChildrenWithFlyIn(children) {
  // Apply a variety of fly-in directions for a lively entrance
  const directions = [
    { x: -40, y: 0, r: -6 },
    { x: 0, y: 40, r: 0 },
    { x: 40, y: 0, r: 6 },
    { x: 0, y: -40, r: 0 },
  ]

  const toArray = Array.isArray(children) ? children : [children]

  return toArray.map((child, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, x: directions[i % directions.length].x, y: directions[i % directions.length].y, rotate: directions[i % directions.length].r },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          transition: { type: 'spring', stiffness: 120, damping: 16, mass: 0.7 },
        },
      }}
      className="mb-5 last:mb-0"
    >
      {child}
    </motion.div>
  ))
}
