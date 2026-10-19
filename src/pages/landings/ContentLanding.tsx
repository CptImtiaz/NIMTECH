import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ServiceBody from '../../components/ServiceBody.jsx'
import { EMAIL } from '../../data/site.js'

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4'
const SENSITIVITY = 0.8
const LINKS: [string, string][] = [
  ['Services', '/services'],
  ['Work', '/work'],
  ['Company', '/company'],
  ['Careers', '/careers'],
]
const ACTIONS: [string, string][] = [
  ['Pitch us an idea', '/contact?service=ai-content'],
  ['Come work here', '/careers'],
  ['Send a brief hello', '/contact'],
  ['See how we operate', '/process'],
]

export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let iv: ReturnType<typeof setInterval> | undefined
    const start = setTimeout(() => {
      let i = 0
      iv = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(iv)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(start)
      clearInterval(iv)
    }
  }, [text, speed, startDelay])
  return { displayed, done }
}

// Seeks the video forwards/backwards with horizontal pointer movement,
// queueing at most one seek at a time.
function useMouseScrub(ref: React.RefObject<HTMLVideoElement>) {
  useEffect(() => {
    const video = ref.current
    if (!video) return
    let prevX: number | null = null
    let targetTime = 0
    let seeking = false
    const seek = () => {
      if (!video.duration) return
      seeking = true
      video.currentTime = targetTime
    }
    const onSeeked = () => {
      seeking = false
      if (Math.abs(video.currentTime - targetTime) > 0.01) seek()
    }
    const onMove = (e: MouseEvent) => {
      if (prevX === null) {
        prevX = e.clientX
        return
      }
      const delta = e.clientX - prevX
      prevX = e.clientX
      if (!video.duration) return
      targetTime = Math.min(video.duration, Math.max(0, targetTime + (delta / window.innerWidth) * SENSITIVITY * video.duration))
      if (!seeking) seek()
    }
    video.addEventListener('seeked', onSeeked)
    window.addEventListener('mousemove', onMove)
    return () => {
      video.removeEventListener('seeked', onSeeked)
      window.removeEventListener('mousemove', onMove)
    }
  }, [ref])
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
      <path d="M8.5 1.5h-6a1 1 0 0 0-1 1v6" />
    </svg>
  )
}

export default function ContentLanding() {
  const video = useRef<HTMLVideoElement>(null)
  const [open, setOpen] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const [copied, setCopied] = useState(false)
  const { displayed, done } = useTypewriter('Glad you stopped in. Good taste tends to find us. Now, what are we building?')
  useMouseScrub(video)

  useEffect(() => {
    const t = setTimeout(() => setShowActions(true), 400)
    return () => clearTimeout(t)
  }, [])

  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    })
  }

  const pill = 'inline-flex items-center justify-center rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200'
  const big = { fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: 400, color: '#fff' }

  return (
    <div className="mainframe">
      <video
        ref={video}
        src={VIDEO}
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 h-full w-full object-cover"
        style={{ objectPosition: '70% center' }}
      />

      <nav className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <Link to="/" className="flex items-center gap-3 text-white">
          <span className="text-[21px] tracking-tight sm:text-[26px]" style={{ fontFamily: 'var(--font-heading)' }}>
            NIMTECH®
          </span>
          <span className="select-none text-[25px] sm:text-[30px]" style={{ letterSpacing: '-0.02em' }} aria-hidden="true">
            ✳︎
          </span>
        </Link>
        <div className="hidden text-[23px] text-white md:flex">
          {LINKS.map(([l, to], i) => (
            <span key={l}>
              <Link to={to} className="transition-opacity hover:opacity-60">
                {l}
              </Link>
              {i < LINKS.length - 1 && ',\u00a0'}
            </span>
          ))}
        </div>
        <Link to="/contact" className="hidden text-[23px] text-white underline underline-offset-2 transition-opacity hover:opacity-60 md:block">
          Get in touch
        </Link>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} className="relative z-10 flex flex-col gap-[5px] md:hidden">
          <span className={`h-[2px] w-6 bg-white transition-all duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-[2px] w-6 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`h-[2px] w-6 bg-white transition-all duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <div
        className="fixed inset-0 z-[9] flex flex-col justify-center gap-8 bg-black/90 px-8 backdrop-blur-md transition-opacity duration-300 md:hidden"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      >
        {LINKS.map(([l, to]) => (
          <Link key={l} to={to} onClick={() => setOpen(false)} className="text-[32px] font-medium text-white">
            {l}
          </Link>
        ))}
        <Link to="/contact" onClick={() => setOpen(false)} className="text-[32px] font-medium text-white underline">
          Get in touch
        </Link>
      </div>

      <section className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
        <div className="relative z-10 max-w-xl">
          <p className="pointer-events-none mb-5 select-none sm:mb-6" style={{ ...big, lineHeight: 1.3, filter: 'blur(4px)' }}>
            Hey there, meet A.R.I.A,
            <br />
            NIMTECH’s Adaptive Response Interface Agent
          </p>
          <p className="mb-5 text-white sm:mb-6" style={{ ...big, lineHeight: 1.35, minHeight: 54 }}>
            {displayed}
            {!done && <span className="ml-[2px] inline-block h-[1.1em] w-[2px] bg-white align-middle" style={{ animation: 'blink 1s step-end infinite' }} />}
          </p>
          <div className="flex flex-wrap gap-y-1" style={{ opacity: showActions ? 1 : 0, transform: showActions ? 'none' : 'translateY(8px)', transition: 'opacity 0.4s ease, transform 0.4s ease' }}>
            {ACTIONS.map(([l, to]) => (
              <Link key={l} to={to} className={`${pill} border border-black/10 bg-white text-black hover:bg-black hover:text-white`}>
                {l}
              </Link>
            ))}
            <button type="button" onClick={copy} className={`${pill} gap-2 border border-white bg-transparent text-white hover:bg-white hover:text-black sm:gap-3`}>
              <span>
                {copied ? 'Copied! ' : 'Reach us: '}
                <span className="underline underline-offset-1">{EMAIL}</span>
              </span>
              <CopyIcon />
            </button>
          </div>
        </div>
      </section>

      <div className="relative z-[2]">
        <ServiceBody id="ai-content" />
      </div>
    </div>
  )
}
