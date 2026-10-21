import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { REDUCE } from '../../lib/canvas.js'

// Five-card product mosaic showing what automation looks like day to day.
// Plays its entrance once, when it first scrolls into view.

const Slack = () => (
  <svg viewBox="0 0 122.8 122.8" aria-hidden="true">
    <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#E01E5A" />
    <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36C5F0" />
    <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2EB67D" />
    <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ECB22E" />
  </svg>
)
const Teams = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="18.5" cy="6.5" r="2.5" fill="#7B83EB" />
    <rect x="13" y="10" width="10" height="8" rx="2.5" fill="#7B83EB" />
    <circle cx="11.5" cy="5" r="3" fill="#5059C9" />
    <rect x="1" y="7" width="12" height="12" rx="2" fill="#4B53BC" />
    <path d="M4 10h6M7 10v6" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)
const Notion = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="4" fill="#fff" stroke="#111" strokeWidth="1.6" />
    <path d="M8.5 16.5v-9l7 9v-9" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const GitHub = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path
      fill="#0d0d0d"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    />
  </svg>
)
const Drive = () => (
  <svg viewBox="0 0 87.3 78" aria-hidden="true">
    <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
    <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47" />
    <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
    <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
    <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
    <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
  </svg>
)
const Figma = () => (
  <svg viewBox="0 0 38 57" aria-hidden="true">
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe" />
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0acf83" />
    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262" />
    <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e" />
    <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff" />
  </svg>
)

const Win = ({ cls }) => (
  <div className={`mz-win ${cls}`}>
    <div className="mz-bar">
      <i />
      <i />
      <i />
    </div>
    <div className="mz-body">
      <span className="mz-strip" />
    </div>
  </div>
)

const DAYS = [
  ['MON', '2h', 43.2],
  ['TUE', '6h', 80.9],
  ['WED', '12h', 131.7],
  ['THU', '20h', 165.5],
  ['FRI', '31h', 203.2],
  ['SAT', '40h', 235.2],
  ['SUN', '48h', 265],
]

export default function Mosaic() {
  const ref = useRef(null)
  const [state, setState] = useState('') // '' | pending | run
  useEffect(() => {
    if (REDUCE || !ref.current) return
    setState('pending')
    let t
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        setState('run')
        t = setTimeout(() => setState(''), 1900)
      },
      { threshold: 0.25 },
    )
    io.observe(ref.current)
    return () => {
      io.disconnect()
      clearTimeout(t)
    }
  }, [])

  return (
    <section className="bg-[#f0f0f0] py-20 md:py-28">
      <div className="wrap">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div className="rise">
            <span className="eyebrow">AI automation</span>
            <h2 className="h2 mt-5 max-w-[16ch]">
              Let AI do the <em>busywork.</em>
            </h2>
          </div>
          <div className="rise max-w-[400px]" style={{ '--d': '.1s' }}>
            <p className="text-[17px] leading-relaxed text-neutral-600">Reports, follow-ups, data entry and searching for files: our agents handle them inside the tools you already use.</p>
            <Link to="/services/ai-agents" className="mt-4 inline-flex items-center gap-2 font-medium text-[#3054ff]">
              Meet the AI agents →
            </Link>
          </div>
        </div>
      </div>

      <div ref={ref} className={`mz ${state === 'pending' ? 'mz-pending' : state === 'run' ? 'mz-run' : ''}`}>
        <div className="mz-stage" role="group" aria-label="Product feature overview">
          <section className="mz-card mz-notif" aria-label="Automation notification">
            <div className="mz-toast-wrap">
              <div className="mz-ledge" />
              <div className="mz-toast">
                <svg viewBox="0 0 24 24" className="mz-spark" aria-hidden="true">
                  <circle cx="12" cy="12" r="12" fill="#0d0d0d" />
                  <path d="M12 5.2c.5 3.4 1.4 4.3 4.8 4.8-3.4.5-4.3 1.4-4.8 4.8-.5-3.4-1.4-4.3-4.8-4.8 3.4-.5 4.3-1.4 4.8-4.8z" fill="#fff" transform="translate(0 2)" />
                </svg>
                <div className="min-w-0 flex-1">
                  <b className="mz-t">Automation completed!</b>
                  <p className="mz-s">Weekly client report sent automatically</p>
                </div>
                <time className="mz-time">2:34 PM</time>
              </div>
            </div>
          </section>

          <section className="mz-card mz-connect" aria-label="Integrations">
            <h3>
              Connect your
              <br />
              Tools Now.
            </h3>
            <p className="mz-sub">Works with the tools you already use</p>
            <div className="mz-chips">
              <div className="mz-row r1">
                <span className="mz-chip">Microsoft Teams <Teams /></span>
              </div>
              <div className="mz-row r2">
                <span className="mz-chip">Notion <Notion /></span>
                <span className="mz-chip">GitHub <GitHub /></span>
              </div>
              <div className="mz-row r3">
                <span className="mz-chip">Google Drive <Drive /></span>
                <span className="mz-chip">Figma <Figma /></span>
              </div>
            </div>
            <span className="mz-chip mz-slack">Slack <Slack /></span>
          </section>

          <section className="mz-card mz-automate" aria-label="Automate your work">
            <div className="mz-copy">
              <h3>
                <span className="g">Automate</span> your work.
                <br />
                Focus on what matters.
              </h3>
              <p className="mz-sub">AI-powered workflows that save teams hours every week.</p>
            </div>
            <div className="mz-illo" aria-hidden="true">
              <Win cls="mz-back" />
              <Win cls="mz-front" />
              <div className="mz-wf">
                <span className="mz-tick">
                  <svg viewBox="0 0 16 16">
                    <path d="M4 8.4l2.6 2.6L12 5.4" fill="none" stroke="#161616" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Workflow Automated
              </div>
              <div className="mz-ai">
                <span className="grid flex-1 gap-2">
                  <i />
                  <i className="w-2/3" />
                </span>
                <svg viewBox="0 0 24 24" className="h-[calc(23*var(--m))] w-[calc(23*var(--m))]">
                  <path d="M16.5 3.5c.4 2.2 1 2.8 3.2 3.2-2.2.4-2.8 1-3.2 3.2-.4-2.2-1-2.8-3.2-3.2 2.2-.4 2.8-1 3.2-3.2z" fill="#eff4e6" stroke="#4f7433" strokeWidth="1.4" strokeLinejoin="round" />
                  <path d="M9 7c.7 4 1.9 5.3 6 6-4.1.7-5.3 1.9-6 6-.7-4.1-1.9-5.3-6-6 4.1-.7 5.3-2 6-6z" fill="#eff4e6" stroke="#4f7433" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </div>
              <svg className="mz-cursor" viewBox="0 0 24 28">
                <path d="M3 2l17 11-7.4 1.6L9 22z" fill="#fff" stroke="#2b2b2b" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
            </div>
          </section>

          <section className="mz-card mz-insights" aria-label="Productivity insights">
            <span className="mz-tag">Productivity Insights</span>
            <h3>48 hours</h3>
            <p className="mz-sub">saved this week!</p>
            <div className="mz-chart" role="img" aria-label="Hours saved per day: Monday 2, Tuesday 6, Wednesday 12, Thursday 20, Friday 31, Saturday 40, Sunday 48">
              {DAYS.map(([d, l, h], i) => (
                <div key={d} className="mz-col">
                  <div className={`mz-q ${i === 6 ? 'sun' : ''}`} style={{ height: `calc(${h} * var(--m))` }}>
                    {l}
                  </div>
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mz-card mz-search" aria-label="Search">
            <h3>
              Find anything
              <br />
              instantly
            </h3>
            <div className="mz-bar-search">
              <span className="mz-mag">
                <svg viewBox="0 0 24 24" fill="none" stroke="#121212" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="10.5" cy="10.5" r="7.1" />
                  <path d="m16 16 5 5" />
                </svg>
              </span>
              <span className="flex-1">Search tasks, docs, workflows...</span>
              <svg viewBox="0 0 16 20" className="h-[calc(20*var(--m))] w-[calc(16*var(--m))]" aria-hidden="true">
                <rect x="5" y="1" width="6" height="11" rx="3" fill="#141414" />
                <path d="M2.5 9a5.5 5.5 0 0 0 11 0M8 14.5V18M5 18.5h6" fill="none" stroke="#141414" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
