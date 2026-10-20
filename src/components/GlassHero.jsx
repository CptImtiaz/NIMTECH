import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Orb from './Orb.jsx'
import Puppet, { CAST } from './Puppet.jsx'
import { Button } from './blocks.jsx'
import { ArrowRight } from './Icons.jsx'
import { EASE, SplitText } from './motion.jsx'

const fade = (d) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease: EASE, delay: d } })

// Monochrome wordmarks of platforms we build on (plain type, not the
// companies' logo artwork, and not a claim of partnership).
const MARKS = [
  ['AWS', 'aws', 700, -0.5],
  ['Microsoft Azure', 'Azure', 600, -0.3],
  ['Google Cloud', 'Google Cloud', 500, -0.4],
  ['NVIDIA', 'NVIDIA', 800, 1],
  ['OpenAI', 'OpenAI', 600, -0.3],
]

// Home hero: white "liquid glass" page with a blue glow top-left, copy on
// the left and the glassy orb on the right, platforms along the bottom.
export default function GlassHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-[18%] -top-[30%] h-[70vh] w-[60vw] rounded-full bg-[#60B1FF] opacity-30 blur-[120px]" />
        <div className="absolute -left-[8%] -top-[18%] h-[44vh] w-[36vw] rounded-full bg-[#319AFF] opacity-25 blur-[100px]" />
        <div className="absolute left-[10%] top-[6%] h-[26vh] w-[22vw] rounded-full bg-white opacity-70 blur-[80px]" />
      </div>
      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1600px] items-center gap-y-6 px-5 pb-10 pt-32 sm:px-8 lg:grid-cols-2 lg:px-16 lg:pt-28">
        <div className="order-2 min-w-0 lg:order-1">
          <motion.div {...fade(0.1)}>
            <Link to="/services/ai-agents" className="glass-chip group">
              <span className="flex -space-x-2">
                {CAST.slice(0, 4).map((c) => (
                  <span key={c.name} className="h-7 w-7 overflow-hidden rounded-full bg-[#F0EEEB] ring-2 ring-white">
                    <Puppet c={c} size={28} label={false} tile={false} className="block translate-y-[3px] scale-[1.5]" />
                  </span>
                ))}
              </span>
              <span className="text-[14px] text-ink-soft">
                <b className="font-semibold text-ink">New:</b> AI agents with names, roles and their own computer
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-ink transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <SplitText lines={['Build smarter,', 'deliver faster']} delay={0.2} stagger={0.06} className="mt-7 font-display text-[clamp(44px,5.2vw,75px)] font-bold leading-[1.05] tracking-[-2px] text-ink" />
          <motion.p {...fade(0.55)} className="mt-6 max-w-[520px] text-[18px] leading-[1.5] tracking-[-0.5px] text-ink-soft">
            NIMTECH designs, builds and runs AI agents, computer vision, software and apps for growing companies, with one senior team from first prototype to production.
          </motion.p>
          <motion.div {...fade(0.7)} className="mt-9 flex flex-wrap gap-3">
            <Button to="/contact">Start a Project</Button>
            <Button to="/services" variant="ghost" arrow={false}>Explore services</Button>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.6, ease: EASE, delay: 0.1 }} className="order-1 lg:order-2">
          <Orb className="mx-auto aspect-square w-[min(88vw,720px)] scale-125" />
        </motion.div>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-14 sm:px-8 lg:px-16">
        <p className="text-center text-[14px] text-ink-dim">Built on the platforms top-tier product companies trust</p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-[clamp(32px,6vw,100px)] gap-y-6 grayscale">
          {MARKS.map(([name, text, w, ls]) => (
            <li key={name}>
              <svg viewBox={`0 0 ${text.length * 15 + 10} 30`} height="26" role="img" aria-label={name} className="text-ink/45">
                <text x="0" y="22" fill="currentColor" fontFamily="Inter Variable, system-ui, sans-serif" fontSize="22" fontWeight={w} letterSpacing={ls}>
                  {text}
                </text>
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
