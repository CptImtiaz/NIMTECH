import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Globe, Instagram, Twitter } from 'lucide-react'
import { CASES, ORDER, SERVICES } from '../data/content.js'
import { CaseCard, CTA, FAQ, Section, SectionHead, Steps, svcName } from '../components/blocks.jsx'
import { Reveal } from '../components/motion.jsx'
import Counters from '../components/Counters.jsx'

const V = (id: string) => `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/${id}.mp4`
const HERO_VIDEO = V('hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a')
const FEATURED_VIDEO = V('hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8')
const PHILOSOPHY_VIDEO = V('hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8')
const SERVICE_VIDEOS: Record<string, string> = {
  'ai-agents': V('hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31'),
  'computer-vision': V('hf_20260815_034306_229eccbe-fd8f-40fb-8002-9868ef2bb1a8'),
  software: V('hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4'),
  apps: V('hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6'),
  'api-integration': V('hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa'),
  'ai-content': V('hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903'),
}
const serif = { fontFamily: "'Instrument Serif', serif" }
const view = { once: true, margin: '-100px' as const }

/* ---------- hero video with crossfade-to-black loop ---------- */
function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    let raf = 0
    let fadingOut = false
    let timer: ReturnType<typeof setTimeout> | undefined
    const fade = (to: number, ms = 500) => {
      cancelAnimationFrame(raf)
      const from = parseFloat(v.style.opacity || '0')
      const t0 = performance.now()
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / ms)
        v.style.opacity = String(from + (to - from) * k)
        if (k < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }
    const onCanPlay = () => {
      v.play().catch(() => {})
      fade(1)
    }
    const onTime = () => {
      if (!fadingOut && v.duration && v.duration - v.currentTime <= 0.55) {
        fadingOut = true
        fade(0)
      }
    }
    const onEnded = () => {
      cancelAnimationFrame(raf)
      v.style.opacity = '0'
      timer = setTimeout(() => {
        v.currentTime = 0
        fadingOut = false
        v.play().catch(() => {})
        fade(1)
      }, 100)
    }
    v.addEventListener('canplay', onCanPlay, { once: true })
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('ended', onEnded)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
      v.removeEventListener('canplay', onCanPlay)
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('ended', onEnded)
    }
  }, [])
  return <video ref={ref} src={HERO_VIDEO} muted autoPlay playsInline preload="auto" className="absolute inset-0 h-full w-full object-cover object-bottom" style={{ opacity: 0 }} aria-hidden="true" />
}

function Hero() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/contact${email ? `?email=${encodeURIComponent(email)}` : ''}`)
  }
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <HeroVideo />
      <nav className="relative z-20 px-6 py-6">
        <div className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-white">
              <Globe size={24} />
              <span className="text-lg font-semibold">NIMTECH</span>
            </Link>
            <div className="ml-8 hidden items-center gap-8 md:flex">
              {[
                ['Services', '/services'],
                ['Work', '/work'],
                ['About', '/company'],
              ].map(([l, to]) => (
                <Link key={l} to={to} className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                  {l}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/careers" className="hidden text-sm font-medium text-white sm:inline">
              Careers
            </Link>
            <Link to="/contact" className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex flex-1 -translate-y-[20%] flex-col items-center justify-center gap-8 px-6 py-12 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="whitespace-nowrap text-7xl tracking-tight text-white md:text-8xl lg:text-9xl" style={serif}>
          Build it <em className="italic">all</em>.
        </motion.h1>
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} onSubmit={submit} className="w-full max-w-xl">
          <div className="liquid-glass flex items-center gap-3 rounded-full py-2 pl-6 pr-2">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" aria-label="Your email" className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/40" />
            <button type="submit" aria-label="Start a project" className="rounded-full bg-white p-3 text-black transition-transform hover:scale-105">
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.form>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="max-w-xl px-4 text-sm leading-relaxed text-white">
          AI agents, computer vision, software, apps, integrations and AI content, engineered by one senior team. Leave your email and a senior engineer will reply within one working day.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.65 }}>
          <Link to="/company" className="liquid-glass inline-block rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5">
            Read our manifesto
          </Link>
        </motion.div>
      </div>

      <div className="relative z-10 flex justify-center gap-4 pb-12">
        {[
          [Instagram, 'Instagram'],
          [Twitter, 'Twitter'],
          [Globe, 'Website'],
        ].map(([Icon, label]) => {
          const I = Icon as typeof Globe
          return (
            <a key={label as string} href="#" aria-label={label as string} className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white">
              <I size={20} />
            </a>
          )
        })}
      </div>
    </section>
  )
}

function About() {
  const ref = useRef(null)
  const inView = useInView(ref, view)
  return (
    <section ref={ref} className="relative overflow-hidden bg-black px-6 pb-10 pt-32 md:pb-14 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-6 text-sm uppercase tracking-widest text-white/40">
          About Us
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl" style={serif}>
          Pioneering <em className="italic text-white/60">ideas</em> for
          <br className="hidden md:block" /> minds that <em className="italic text-white/60">create, build, and inspire.</em>
        </motion.h2>
      </div>
    </section>
  )
}

function Featured() {
  const ref = useRef(null)
  const inView = useInView(ref, view)
  return (
    <section ref={ref} className="overflow-hidden bg-black px-6 pb-20 pt-6 md:pb-32 md:pt-10">
      <motion.div initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }} className="relative mx-auto aspect-video max-w-6xl overflow-hidden rounded-3xl max-md:aspect-[3/4]">
        <video src={FEATURED_VIDEO} muted autoPlay loop playsInline preload="auto" className="h-full w-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start justify-between gap-4 p-6 md:flex-row md:items-end md:p-10">
          <div className="liquid-glass max-w-md rounded-2xl p-6 md:p-8">
            <p className="mb-3 text-xs uppercase tracking-widest text-white/50">Our Approach</p>
            <p className="text-sm leading-relaxed text-white md:text-base">We start with the problem, the people and the data, not with a technology. For AI work we test on your real data first, so you see results before you commit.</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/process" className="liquid-glass inline-block rounded-full px-8 py-3 text-sm font-medium text-white">
              Explore more
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

function Philosophy() {
  const ref = useRef(null)
  const inView = useInView(ref, view)
  return (
    <section ref={ref} className="overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.h2 initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="mb-16 text-5xl tracking-tight text-white md:mb-24 md:text-7xl lg:text-8xl" style={serif}>
          Innovation <em className="italic text-white/40">x</em> Vision
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }} className="aspect-[4/3] overflow-hidden rounded-3xl">
            <video src={PHILOSOPHY_VIDEO} muted autoPlay loop playsInline preload="auto" className="h-full w-full object-cover" aria-hidden="true" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }} className="flex flex-col justify-center gap-10">
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-white/40">Engineered, not plugged in</p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">Every meaningful breakthrough begins where disciplined engineering meets bold vision. We build and train our own models when off‑the‑shelf isn’t good enough, and we prove them on your real data before anything scales.</p>
            </div>
            <div className="h-px w-full bg-white/10" />
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-white/40">Yours to keep</p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">The best work emerges when curiosity meets conviction. Everything we build, from source code and trained models to datasets and infrastructure, belongs to you, documented so your team can own it.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function LazyVideo({ src, className }: { src: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { margin: '200px' })
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [inView])
  return <video ref={ref} src={inView ? src : undefined} muted loop playsInline preload="none" className={className} aria-hidden="true" />
}

function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, view)
  return (
    <section ref={ref} className="relative overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-12 flex items-end justify-between md:mb-16">
          <h2 className="text-3xl tracking-tight text-white md:text-5xl" style={serif}>
            What we do
          </h2>
          <span className="hidden text-sm text-white/40 md:block">Our services</span>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {ORDER.map((id, i) => {
            const s = SERVICES[id as keyof typeof SERVICES]
            return (
              <motion.div key={id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={{ duration: 0.8, delay: (i % 2) * 0.15 }}>
                <Link to={`/services/${id}`} className="liquid-glass group block rounded-3xl">
                  <div className="relative aspect-video overflow-hidden">
                    <LazyVideo src={SERVICE_VIDEOS[id]} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-white/40">{s.tags.slice(0, 2).join(' · ')}</span>
                      <span className="liquid-glass rounded-full p-2 text-white transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                    <h3 className="mb-3 text-xl tracking-tight text-white md:text-2xl" style={serif}>
                      {svcName(id)}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/50">{s.one}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <About />
      <Featured />
      <Philosophy />
      <Services />
      <Counters />
      <Steps
        title="How we <em>work.</em>"
        lede="A clear, repeatable delivery model, whichever service you need."
        list={[
          ['Discover', 'We start with the problem, the people and the data, not with a technology.'],
          ['Prove', 'For AI work, we test on your real data first, so you see results before you commit.'],
          ['Build', 'Two‑week sprints with a working demo at the end of each.'],
          ['Launch', 'Production release with monitoring, documentation and training.'],
          ['Evolve', 'Ongoing improvement as your users, data and business change.'],
        ]}
      />
      <Section>
        <SectionHead eyebrow="Work" title="What a project <em>looks like.</em>" lede="Illustrative examples of the kind of problems we solve." />
        <div className="grid gap-4 lg:grid-cols-3">
          {CASES.slice(0, 3).map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08} className="h-full">
              <CaseCard c={c} />
            </Reveal>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHead eyebrow="FAQ" title="Common <em>questions.</em>" />
        <FAQ
          list={[
            ['What kind of companies do you work with?', 'Growing companies and enterprise teams in many industries, anywhere in the world, from first AI project to large platforms.'],
            ['Do you work with clients outside Malaysia?', 'Yes. Most of our work is remote, with overlap hours for calls and sprint demos in your time zone.'],
            ['Can you join our existing team?', 'Yes. We can lead a project, work alongside your engineers, or hand over gradually.'],
            ['How does a project start?', 'With a short discovery: we learn the problem, review your data and systems, and propose a clear plan.'],
            ['Who owns what you build?', 'You do: source code, trained models, datasets and infrastructure.'],
          ]}
        />
      </Section>
      <CTA />
    </div>
  )
}
