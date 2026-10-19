import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { richWords } from '../lib/rich.jsx'

export const EASE = [0.16, 1, 0.3, 1]

// Fades, lifts and un-blurs its children when scrolled into view.
export function Reveal({ children, delay = 0, y = 40, className = '', as = 'div', ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
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
          <span key={li} className="block">
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

function Word({ children, progress, range, em }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <>
      <motion.span style={{ opacity }} className={em ? 'accent' : ''}>
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
