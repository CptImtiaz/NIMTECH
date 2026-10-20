import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { richWords } from '../lib/rich.jsx'

export const EASE = [0.16, 1, 0.3, 1]

// Swings its children up out of perspective, un-blurring as they arrive.
/** @param {Record<string, any>} props */
export function Reveal({ children, delay = 0, y = 50, className = '', as = 'div', ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, rotateX: 14, filter: 'blur(8px)', transformPerspective: 1200 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}

// Headline whose words rise out of a mask one after another.
export function SplitText({ lines, className = '', delay = 0, stagger = 0.05, as = 'h1', inView = false }) {
  const H = as
  let i = 0
  const anim = inView
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
    : { initial: 'hidden', animate: 'show' }
  return (
    <H className={className}>
      <motion.span className="block" {...anim}>
        {lines.map((line, li) => (
          <span key={li} className="inline md:block">
            {richWords(line).map(({ w, em }) => {
              const d = delay + i++ * stagger
              return (
                <span key={w + d} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <motion.span
                    className={`inline-block ${em ? 'accent' : ''}`}
                    variants={{ hidden: { y: '110%', rotate: 4 }, show: { y: '0%', rotate: 0 } }}
                    transition={{ duration: 1.1, ease: EASE, delay: d }}
                  >
                    {w}
                  </motion.span>
                  &nbsp;
                </span>
              )
            })}
          </span>
        ))}
      </motion.span>
    </H>
  )
}

// Large statement whose words light up as it scrolls through the viewport.
export function ScrollWords({ text, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = richWords(text)
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} em={w.em}>
          {w.w}
        </Word>
      ))}
    </p>
  )
}

// Words light up from a readable grey (always above WCAG large-text
// contrast) to full ink; accent words fade in from a softer start.
function Word({ children, progress, range, em }) {
  const color = useTransform(progress, range, ['#7A829C', '#0B1020'])
  const opacity = useTransform(progress, range, [0.45, 1])
  return (
    <>
      <motion.span style={em ? { opacity } : { color }} className={em ? 'accent' : ''}>
        {children}
      </motion.span>{' '}
    </>
  )
}

// Wrapper that pulls its child gently toward the pointer.
export function Magnetic({ children, strength = 0.25, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const leave = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.span ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ x: sx, y: sy }} className={`inline-flex ${className}`}>
      {children}
    </motion.span>
  )
}

// 3D tilt toward the pointer with a moving glare highlight.
/** @param {Record<string, any>} props */
export function Tilt({ children, className = '', max = 8 }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const on = useMotionValue(0)
  const glareOpacity = useSpring(on, { stiffness: 200, damping: 25 })
  const sx = useSpring(rx, { stiffness: 180, damping: 18 })
  const sy = useSpring(ry, { stiffness: 180, damping: 18 })
  const glare = useTransform([gx, gy], ([x, y]) => `radial-gradient(420px circle at ${x}% ${y}%, rgba(76, 99, 246,.10), transparent 60%)`)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * max * 2)
    rx.set(-(py - 0.5) * max * 2)
    gx.set(px * 100)
    gy.set(py * 100)
    on.set(1)
  }
  const leave = () => {
    rx.set(0)
    ry.set(0)
    on.set(0)
  }
  return (
    <motion.div ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ rotateX: sx, rotateY: sy, transformPerspective: 1000, transformStyle: 'preserve-3d' }} className={`relative h-full ${className}`}>
      {children}
      <motion.span aria-hidden="true" style={{ background: glare, opacity: glareOpacity }} className="pointer-events-none absolute inset-0 z-10 rounded-[20px]" />
    </motion.div>
  )
}

// Parallax helper: moves children by `amount` px across the element's scroll.
export function Parallax({ children, amount = 80, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
