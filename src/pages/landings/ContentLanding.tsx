import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ServicePage } from '../Service.jsx'
import { EMAIL } from '../../data/site.js'

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

// A.R.I.A, the studio's typing agent, in place of the hero lede.
function Aria() {
  const { displayed, done } = useTypewriter('Glad you stopped in. Good taste tends to find us. Now, what are we making?', 38, 1100)
  const [copied, setCopied] = useState(false)
  const copy = () =>
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    })
  const pill = 'inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-[0.35em] text-[13px] transition-colors duration-200 sm:px-5 sm:text-[15px]'
  return (
    <div className="mt-6 max-w-[560px]">
      <p className="pointer-events-none select-none text-[clamp(15px,1.4vw,18px)] leading-[1.35] text-ink-soft" style={{ filter: 'blur(3px)' }}>
        Hey there, meet A.R.I.A, NIMTECH’s Adaptive Response Interface Agent
      </p>
      <p className="mt-3 min-h-[54px] text-[clamp(17px,1.8vw,22px)] leading-[1.35] text-ink">
        {displayed}
        {!done && <span className="ml-[2px] inline-block h-[1.1em] w-[2px] bg-brand-cyan align-middle" style={{ animation: 'blink 1s step-end infinite' }} />}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {ACTIONS.map(([l, to]) => (
          <Link key={l} to={to} className={`${pill} border border-line bg-white/[.06] text-ink backdrop-blur-md hover:border-brand hover:bg-brand hover:text-white`}>
            {l}
          </Link>
        ))}
        <button type="button" onClick={copy} className={`${pill} gap-2 border border-brand-cyan/50 text-brand-cyan hover:bg-brand-cyan hover:text-night`}>
          <span>
            {copied ? 'Copied! ' : 'Reach us: '}
            <span className="underline underline-offset-2">{EMAIL}</span>
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
            <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
            <path d="M8.5 1.5h-6a1 1 0 0 0-1 1v6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function ContentLanding() {
  return <ServicePage id="ai-content" lede="" ctas={false} heroExtra={<Aria />} />
}
