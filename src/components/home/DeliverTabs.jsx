import { useEffect, useState } from 'react'
import { BarChart3, Check, Code2, Rocket, ShieldCheck } from 'lucide-react'
import { REDUCE } from '../../lib/canvas.js'

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_165750_358b1e72-c921-48b7-aaac-f200994f32fb.mp4'

const TABS = [
  ['discover', 'Discover', BarChart3],
  ['build', 'Build', Code2],
  ['test', 'Test', ShieldCheck],
  ['launch', 'Launch', Rocket],
]

const TOOLS = ['Python', 'PyTorch', 'OpenCV', 'React', 'Node.js', 'Flutter', 'PostgreSQL', 'AWS', 'Google Cloud', 'Shopify', 'Stripe', 'WhatsApp']

// "How we deliver": four stages that cycle every 4 seconds over a video,
// each with a small card showing what that stage looks like for you.
export default function DeliverTabs() {
  const [tab, setTab] = useState('discover')
  const [paused, setPaused] = useState(false)
  const [live, setLive] = useState(false)

  useEffect(() => {
    if (REDUCE || paused) return
    const t = setInterval(() => setTab((c) => TABS[(TABS.findIndex(([k]) => k === c) + 1) % TABS.length][0]), 4000)
    return () => clearInterval(t)
  }, [paused])

  const pick = (k) => {
    setTab(k)
    setPaused(true)
  }

  return (
    <section className="bg-white py-24 font-inter md:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <span className="rise inline-flex items-center gap-2 text-sm font-medium text-black">
          <span className="grid h-6 w-6 place-items-center rounded border border-gray-300">
            <Check className="h-3.5 w-3.5" />
          </span>
          A working demo every two weeks
        </span>
        <h2 className="rise mt-8 text-5xl font-normal leading-[1.1] tracking-tight md:text-6xl lg:text-[72px]" style={{ '--d': '.08s' }}>
          From idea to launch.
          <br />
          <span className="bg-gradient-to-r from-black via-gray-500 to-gray-400 bg-clip-text text-transparent">No surprises.</span>
        </h2>
        <p className="rise mx-auto mt-5 max-w-2xl text-lg text-gray-600 md:text-xl" style={{ '--d': '.16s' }}>
          One senior team takes your project through four clear stages. You see progress every sprint and decide what comes next.
        </p>

        <div className="rise mx-auto mt-10 grid max-w-sm grid-cols-2 gap-1 rounded-lg bg-gray-100 p-1 sm:inline-flex sm:max-w-none sm:gap-0" style={{ '--d': '.24s' }} role="tablist" aria-label="Delivery stages">
          {TABS.map(([k, label, Ico], i) => (
            <div key={k} className="flex items-center [&>button]:w-full sm:[&>button]:w-auto">
              {i > 0 && <span className="mx-0.5 hidden h-5 w-px bg-gray-300 sm:block" />}
              <button
                type="button"
                role="tab"
                aria-selected={tab === k}
                onClick={() => pick(k)}
                className={`flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all sm:px-5 ${tab === k ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'}`}
              >
                <Ico className="h-4 w-4" />
                {label}
              </button>
            </div>
          ))}
        </div>

        <div className="rise relative mt-8 h-[440px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#1b1f3a] via-[#3a2f6b] to-[#e08a5b] md:h-[520px]" style={{ '--d': '.32s' }}>
          <video src={VIDEO} autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-black/10" />
          <div key={tab} className="dt-overlay absolute inset-0 grid place-items-center p-4">
            <div className="dt-card w-full max-w-md rounded-2xl bg-white/95 p-6 text-left shadow-2xl backdrop-blur" role="tabpanel">
              {tab === 'discover' && <Discover />}
              {tab === 'build' && <Build />}
              {tab === 'test' && <Test />}
              {tab === 'launch' && <Launch live={live} onLaunch={() => setLive(true)} />}
            </div>
          </div>
        </div>

        <div className="rise mt-16" style={{ '--d': '.1s' }}>
          <p className="text-sm text-gray-500">Built with tools your future team already knows</p>
          <div className="ticker mt-6">
            <ul className="ticker__track">
              {[...TOOLS, ...TOOLS].map((t, i) => (
                <li key={i} aria-hidden={i >= TOOLS.length} className="whitespace-nowrap text-xl font-semibold tracking-tight text-gray-400">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

const Bar = ({ pct, color }) => (
  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
    <div className="dt-fill h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
  </div>
)

function Discover() {
  const steps = [
    ['Goals and success number agreed', true],
    ['Your data and systems reviewed', true],
    ['Clickable prototype', false],
    ['Fixed plan and quote', false],
  ]
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#7c5cff]">Week 1 · Discover</p>
      <h3 className="mt-1 text-xl font-semibold">Shape the project</h3>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>Step 2 of 4</span>
        <span>25%</span>
      </div>
      <div className="mt-2">
        <Bar pct={25} color="#7c5cff" />
      </div>
      <ul className="mt-5 space-y-3">
        {steps.map(([s, done]) => (
          <li key={s} className="flex items-center gap-3 text-sm">
            <span className={`grid h-5 w-5 place-items-center rounded-full ${done ? 'bg-[#7c5cff] text-white' : 'border border-gray-300'}`}>{done && <Check className="h-3 w-3" />}</span>
            <span className={done ? 'text-gray-900' : 'text-gray-500'}>{s}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

function Build() {
  const m = [
    ['Features done', '12 / 18'],
    ['Next demo', 'Friday'],
    ['Sprint', '3 of 4'],
    ['Open questions', '2'],
  ]
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#f97316]">Weeks 2–8 · Build</p>
      <h3 className="mt-1 text-xl font-semibold">Two-week sprints</h3>
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>Release 1 progress</span>
        <span>67%</span>
      </div>
      <div className="mt-2">
        <Bar pct={67} color="#f97316" />
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3">
        {m.map(([k, v]) => (
          <div key={k} className="rounded-xl bg-gray-50 p-3">
            <dt className="text-xs text-gray-500">{k}</dt>
            <dd className="mt-1 text-lg font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}

function Test() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#16a34a]">Every release · Test</p>
      <h3 className="mt-1 text-xl font-semibold">Checked before you see it</h3>
      <div className="mt-5 flex items-center gap-4 rounded-xl bg-green-50 p-4">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#16a34a] text-white">
          <Check className="h-6 w-6" />
        </span>
        <div>
          <p className="text-2xl font-semibold">127 / 127</p>
          <p className="text-sm text-green-700">automated tests passed</p>
        </div>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        <li>✓ Works on phone, tablet and desktop</li>
        <li>✓ Security and access checks</li>
        <li>✓ AI answers tested on your real past cases</li>
      </ul>
    </>
  )
}

function Launch({ live, onLaunch }) {
  const list = ['Backups and monitoring on', 'Security review done', 'Your team trained', 'Code and logins handed over']
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#3054ff]">Go live · Launch</p>
      <h3 className="mt-1 text-xl font-semibold">Launch, then keep improving</h3>
      <ul className="mt-5 space-y-3">
        {list.map((s) => (
          <li key={s} className="flex items-center gap-3 text-sm">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#3054ff] text-white">
              <Check className="h-3 w-3" />
            </span>
            {s}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onLaunch}
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-white transition-colors ${live ? 'bg-[#16a34a]' : 'bg-black hover:bg-gray-800'}`}
      >
        {live ? (
          <>
            <Check className="h-4 w-4" /> Live
          </>
        ) : (
          <>
            <Rocket className="h-4 w-4" /> Deploy now
          </>
        )}
      </button>
    </>
  )
}
