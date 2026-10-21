import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ORDER, SERVICES } from '../../data/services.js'
import { REDUCE } from '../../lib/canvas.js'

const SRC = 'https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8'
const POSTER =
  'https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZWNobm9sb2d5JTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3Njg5NzIyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080'

// Home hero: black, streaming video under a dark veil, big type.
export default function VideoHero() {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v || REDUCE) return
    let hls
    let dead = false
    const play = () => v.play().catch(() => {})
    if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = SRC
      v.addEventListener('loadedmetadata', play, { once: true })
    } else {
      // hls.js loads only when needed
      import('hls.js').then(({ default: Hls }) => {
        if (dead || !Hls.isSupported()) return
        hls = new Hls({ capLevelToPlayerSize: true })
        hls.loadSource(SRC)
        hls.attachMedia(v)
        hls.on(Hls.Events.MANIFEST_PARSED, play)
      })
    }
    return () => {
      dead = true
      hls?.destroy()
    }
  }, [])

  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden bg-black text-white">
      <video ref={ref} poster={POSTER} muted loop playsInline className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-black/60 backdrop-blur-[2px]" />
      <div className="pointer-events-none absolute left-[20%] top-[-20%] -z-10 h-[600px] w-[600px] rounded-full bg-blue-900/20 mix-blend-screen blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[20%] -z-10 h-[500px] w-[500px] rounded-full bg-indigo-900/20 mix-blend-screen blur-[120px]" />

      <div className="mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center space-y-10 px-6 pb-36 pt-32 text-center md:space-y-12">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="serif text-3xl leading-[1.1] sm:text-5xl lg:text-[48px]">
          AI and software for growing businesses
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-b from-white via-white to-[#b4c0ff] bg-clip-text font-display text-6xl font-semibold leading-[0.9] tracking-tighter text-transparent sm:text-8xl lg:text-[136px]"
        >
          Build Faster
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.75 }} transition={{ delay: 0.4, duration: 0.6 }} className="max-w-xl font-display text-lg leading-[1.65] sm:text-[20px]">
          AI agents, computer vision, software and apps, designed, built and run by one senior team. You get working results in weeks, and you own everything we build.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="flex flex-col items-center gap-6 sm:flex-row">
          <Link to="/contact" className="group inline-flex items-center gap-4 rounded-full bg-white py-2 pl-6 pr-2 font-display text-lg font-medium text-[#0a0400] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Start your project
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#3054ff] transition-colors group-hover:bg-[#2040e0]">
              <ArrowRight className="h-5 w-5 text-white" />
            </span>
          </Link>
          <Link to="/work" className="group inline-flex items-center gap-2 rounded-lg px-4 py-2 font-display text-white/75 backdrop-blur-sm transition-colors hover:bg-white/5 hover:text-white">
            See our work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* what we do, at a glance */}
      <motion.nav initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }} aria-label="Services" className="absolute inset-x-0 bottom-6 px-4">
        <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2">
          {ORDER.map((id) => (
            <li key={id}>
              <Link to={`/services/${id}`} className="inline-flex items-center rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-[13.5px] text-white/80 backdrop-blur-md transition-colors hover:border-white/40 hover:text-white">
                {SERVICES[id].name}
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
    </section>
  )
}
