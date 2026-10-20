import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Reveal } from './motion.jsx'

// Example apps, coded as live UI (fictional brands, illustrative only).
const Row = ({ l, r, sub, dot }) => (
  <div className="flex items-center gap-2.5 rounded-xl bg-white/[.05] px-3 py-2.5">
    {dot && <span className="h-7 w-7 shrink-0 rounded-lg" style={{ background: dot }} />}
    <div className="min-w-0 flex-1">
      <div className="truncate text-[12px] font-medium">{l}</div>
      {sub && <div className="truncate text-[10px] text-white/45">{sub}</div>}
    </div>
    {r && <b className="shrink-0 text-[12px] font-medium">{r}</b>}
  </div>
)

// Content that scrolls endlessly inside a phone screen
function Feed({ children, speed = 18 }) {
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden">
      <div className="flex flex-col gap-2" style={{ animation: `feed ${speed}s linear infinite` }}>
        {children}
        {children}
      </div>
    </div>
  )
}

function Food() {
  return (
    <>
      <div className="text-[11px] text-white/50">Deliver to · Bangsar</div>
      <h5>Good evening, <span className="text-[#12b5ad]">Aina</span></h5>
      <div className="flex h-28 shrink-0 items-end rounded-2xl p-3 text-[13px] font-medium" style={{ background: 'radial-gradient(circle at 30% 20%, #12b5ad, #3a58ff 50%, #0B1A3A)' }}>
        Today’s picks · 20% off
      </div>
      <Feed>
        {[['Nasi lemak bowl', '$9.90', '#8fa2ff'], ['Iced kopi', '$3.50', '#3a58ff'], ['Chicken satay', '$11.20', '#3a58ff'], ['Mango sago', '$4.80', '#12b5ad'], ['Laksa', '$10.50', '#3e5bff']].map(([l, r, c]) => (
          <Row key={l} l={l} r={r} sub="15–20 min" dot={c} />
        ))}
      </Feed>
      <span className="rounded-xl bg-[#3a58ff] py-2.5 text-center text-[12.5px] font-medium">View cart · 3 items</span>
    </>
  )
}

function Fitness() {
  const rings = [['#3a58ff', 0.78, 40], ['#12b5ad', 0.62, 31], ['#8fa2ff', 0.9, 22]]
  return (
    <>
      <div className="text-[11px] text-white/50">Thursday</div>
      <h5>Activity</h5>
      <svg viewBox="0 0 100 100" className="mx-auto h-32 w-32 shrink-0 -rotate-90">
        {rings.map(([c, p, r]) => (
          <g key={c}>
            <circle cx="50" cy="50" r={r} fill="none" stroke={c} strokeOpacity=".18" strokeWidth="7" />
            <circle cx="50" cy="50" r={r} fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * r * p} 999`} style={{ animation: 'ring 2.4s cubic-bezier(.16,1,.3,1) both' }} />
          </g>
        ))}
      </svg>
      <div className="grid shrink-0 grid-cols-3 gap-1.5 text-center">
        {[['8,412', 'steps'], ['512', 'kcal'], ['46', 'min']].map(([v, l]) => (
          <div key={l} className="rounded-xl bg-white/[.05] py-2">
            <b className="block text-[14px]">{v}</b>
            <span className="text-[10px] text-white/45">{l}</span>
          </div>
        ))}
      </div>
      <Feed speed={22}>
        {['Morning run · 5.2 km', 'HIIT · 25 min', 'Yoga flow · 30 min', 'Cycling · 12 km'].map((w, i) => (
          <Row key={w} l={w} sub={['Personal best', 'Streak 6 days', 'Recovery', 'Outdoor'][i]} dot={['#3a58ff', '#12b5ad', '#b794ff', '#8fa2ff'][i]} />
        ))}
      </Feed>
    </>
  )
}

function Wallet() {
  return (
    <>
      <div className="text-[11px] text-white/50">Total balance</div>
      <h5 className="!text-2xl">$24,806<span className="text-sm text-white/40">.12</span></h5>
      <div className="relative h-32 shrink-0 overflow-hidden rounded-2xl p-3" style={{ background: 'linear-gradient(135deg,#3a58ff,#6f5bff 60%,#0B1A3A)' }}>
        <div className="text-[10px] tracking-widest text-white/70">VIRTUAL CARD</div>
        <div className="absolute bottom-3 left-3 font-mono text-[12px]">•••• 4821</div>
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
      </div>
      <svg viewBox="0 0 200 50" className="h-12 w-full shrink-0">
        <path d="M0 40 C20 38 30 30 50 32 S80 18 100 22 140 10 160 14 190 6 200 4" fill="none" stroke="#8fa2ff" strokeWidth="2" strokeDasharray="300" style={{ animation: 'ring 3s ease both' }} />
      </svg>
      <Feed>
        {[['Grab', '-$12.40', '#12b5ad'], ['Salary', '+$5,200', '#8fa2ff'], ['Spotify', '-$9.99', '#12b5ad'], ['Rent', '-$1,450', '#8fa2ff'], ['Transfer · Hana', '+$80', '#b794ff']].map(([l, r, c]) => (
          <Row key={l} l={l} r={r} sub="Today" dot={c} />
        ))}
      </Feed>
    </>
  )
}

function Field() {
  return (
    <>
      <div className="text-[11px] text-white/50">Site 14 · Pump room</div>
      <h5>Inspection</h5>
      <div className="relative h-40 shrink-0 overflow-hidden rounded-2xl" style={{ background: 'repeating-linear-gradient(45deg,#0e1a30 0 10px,#0a1426 10px 20px)' }}>
        <div className="absolute left-[18%] top-[22%] h-[50%] w-[40%] animate-pulse rounded border-[1.5px] border-[#FF5A6A]">
          <span className="absolute -top-4 left-0 whitespace-nowrap rounded-sm bg-[#FF5A6A] px-1 font-mono text-[9px] text-black">corrosion 0.93</span>
        </div>
        <div className="absolute bottom-[14%] right-[10%] h-[30%] w-[26%] rounded border-[1.5px] border-[#12b5ad]">
          <span className="absolute -top-4 left-0 whitespace-nowrap rounded-sm bg-[#12b5ad] px-1 font-mono text-[9px] text-black">gauge ok</span>
        </div>
        <span className="absolute bottom-2 left-2 font-mono text-[9px] text-white/60">on‑device · offline</span>
      </div>
      <Feed speed={20}>
        {[['Valve seals', 'Checked'], ['Pressure gauge', 'OK'], ['Pipe joint', '1 issue'], ['Fire extinguisher', 'Checked'], ['Signage', 'Checked']].map(([l, r]) => (
          <Row key={l} l={l} r={r} dot={r === '1 issue' ? '#FF5A6A' : '#12b5ad'} />
        ))}
      </Feed>
      <span className="rounded-xl bg-[#3a58ff] py-2.5 text-center text-[12.5px] font-medium">Submit report</span>
    </>
  )
}

function Health() {
  return (
    <>
      <div className="text-[11px] text-white/50">Your care team</div>
      <h5>Book a visit</h5>
      <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-white/[.06] p-3">
        <span className="h-11 w-11 rounded-full" style={{ background: 'radial-gradient(circle at 35% 30%,#c9d4ff,#5a72ff)' }} />
        <div>
          <div className="text-[12.5px] font-medium">Dr. Lim Wei</div>
          <div className="text-[10px] text-white/45">General practice · 4.9 ★</div>
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-5 gap-1 text-center text-[10px]">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
          <span key={d} className={`rounded-lg py-2 ${i === 2 ? 'bg-[#12b5ad] text-[#05060f]' : 'bg-white/[.05]'}`}>
            {d}
            <b className="block text-[12px]">{14 + i}</b>
          </span>
        ))}
      </div>
      <Feed speed={16}>
        {['09:00', '10:30', '11:15', '14:00', '15:45', '17:30'].map((t, i) => (
          <Row key={t} l={t} sub={i % 2 ? 'In person' : 'Video call'} r={i === 1 ? 'Selected' : ''} dot={i === 1 ? '#12b5ad' : 'rgba(255,255,255,.1)'} />
        ))}
      </Feed>
      <span className="rounded-xl bg-[#12b5ad] py-2.5 text-center text-[12.5px] font-medium text-black">Confirm 10:30</span>
    </>
  )
}

function Home() {
  const tiles = [['Lights', 'Living room', true, '#12b5ad'], ['AC', '23°C', true, '#8fa2ff'], ['Door', 'Locked', true, '#12b5ad'], ['Camera', 'Recording', false, '#3a58ff']]
  return (
    <>
      <div className="text-[11px] text-white/50">Home · 4 devices on</div>
      <h5>Haven</h5>
      <div className="relative mx-auto grid h-32 w-32 shrink-0 place-items-center rounded-full" style={{ background: 'conic-gradient(from 220deg,#8fa2ff,#b794ff 40%,rgba(255,255,255,.06) 40%)' }}>
        <div className="grid h-24 w-24 place-items-center rounded-full bg-[#070d1a] text-center">
          <b className="text-[22px]">23°</b>
          <span className="-mt-3 text-[9px] text-white/50">cooling</span>
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-2 gap-1.5">
        {tiles.map(([n, s, on, c]) => (
          <div key={n} className="rounded-xl bg-white/[.05] p-2.5">
            <span className="mb-2 block h-2 w-2 rounded-full" style={{ background: on ? c : 'rgba(255,255,255,.2)', boxShadow: on ? `0 0 8px ${c}` : 'none' }} />
            <div className="text-[12px] font-medium">{n}</div>
            <div className="text-[10px] text-white/45">{s}</div>
          </div>
        ))}
      </div>
      <Feed speed={18}>
        {['Front door unlocked · 18:02', 'Motion · garden · 17:44', 'AC schedule started · 17:30', 'Lights off · bedroom · 08:10'].map((e) => (
          <Row key={e} l={e} dot="#6f5bff" />
        ))}
      </Feed>
    </>
  )
}

const APPS = [
  { C: Food, name: 'Kopi & Co', kind: 'Food ordering & loyalty', tech: 'Flutter · iOS & Android', glow: '#3a58ff' },
  { C: Fitness, name: 'Pulse', kind: 'Fitness & wearables', tech: 'SwiftUI · Kotlin · HealthKit', glow: '#3a58ff' },
  { C: Wallet, name: 'Vault', kind: 'Fintech wallet', tech: 'React Native · secure enclave', glow: '#6f5bff' },
  { C: Field, name: 'FieldEye', kind: 'Field inspection with on‑device AI', tech: 'Flutter · Core ML · offline‑first', glow: '#3a58ff' },
  { C: Health, name: 'CareNow', kind: 'Telehealth booking', tech: 'React Native · video calls', glow: '#12b5ad' },
  { C: Home, name: 'Haven', kind: 'Smart home & IoT', tech: 'Kotlin · Swift · BLE', glow: '#b794ff' },
]

function Phone({ app, i }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 200, damping: 18 })
  const sy = useSpring(ry, { stiffness: 200, damping: 18 })
  const shine = useTransform(sy, [-12, 12], [20, 80])
  const glare = useTransform(shine, (v) => `linear-gradient(115deg, transparent ${v - 20}%, rgba(255,255,255,.08) ${v}%, transparent ${v + 20}%)`)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 24)
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 18)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }
  const C = app.C
  return (
    <Reveal delay={(i % 3) * 0.1}>
      <div className="flex flex-col items-center" style={{ perspective: 1000 }}>
        <motion.div
          ref={ref}
          onPointerMove={move}
          onPointerLeave={reset}
          animate={{ y: [0, -12, 0] }}
          transition={{ y: { duration: 5 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 } }}
          style={{ rotateX: sx, rotateY: sy, transformStyle: 'preserve-3d' }}
          className="relative"
        >
          <div className="absolute -inset-10 -z-10 rounded-full opacity-40 blur-3xl" style={{ background: app.glow }} />
          <div className="phone !h-[500px] !w-[244px]">
            <div className="phone-screen">
              <div className="scr">
                <C />
              </div>
              <motion.div className="pointer-events-none absolute inset-0 z-20" style={{ background: glare }} />
            </div>
          </div>
        </motion.div>
        <div className="mt-8 text-center">
          <h3 className="font-fustat text-xl font-bold tracking-[-.02em] text-ink">{app.name}</h3>
          <p className="mt-1 text-[14px] text-ink-soft">{app.kind}</p>
          <span className="mt-2 inline-block rounded-full border border-line bg-white px-3 py-1 font-mono text-[10.5px] text-brand">{app.tech}</span>
        </div>
      </div>
    </Reveal>
  )
}

export default function AppGallery() {
  return (
    <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
      {APPS.map((a, i) => (
        <Phone key={a.name} app={a} i={i} />
      ))}
    </div>
  )
}
