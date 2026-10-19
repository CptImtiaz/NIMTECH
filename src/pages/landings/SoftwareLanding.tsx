import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftRight, Bell, Briefcase, Check, ChevronDown, ChevronRight, CreditCard, Home, Landmark, ListChecks, MoreVertical, Play, Plus, Search, Send, Settings, Wallet } from 'lucide-react'
import { Button } from '../../components/ui/button'
import ServiceBody from '../../components/ServiceBody.jsx'

const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4'
const LINKS: [string, string][] = [
  ['Home', '/'],
  ['Pricing', '/contact?service=software'],
  ['About', '/company'],
  ['Contact', '/contact'],
]
const up = (y: number, duration: number, delay = 0) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: [0.16, 1, 0.3, 1] as const },
})

function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className="relative z-20 flex items-center justify-between px-6 py-5 font-body md:px-12 lg:px-20">
      <Link to="/" className="text-xl font-semibold tracking-tight text-foreground">
        ✦ NIMTECH
      </Link>
      <div className="flex items-center gap-8">
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map(([l, to]) => (
            <Link key={l} to={to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l}
            </Link>
          ))}
        </div>
        <Button className="rounded-full px-5 text-sm font-medium" onClick={() => navigate('/contact?service=software')}>
          Get started
        </Button>
      </div>
    </nav>
  )
}

/* ---------- coded dashboard preview ---------- */
const SIDEBAR: [React.ElementType, string, string?, boolean?][] = [
  [Home, 'Home', undefined, true],
  [ListChecks, 'Tasks', '10'],
  [ArrowLeftRight, 'Transactions'],
  [Send, 'Payments', 'chevron'],
  [CreditCard, 'Cards'],
  [Landmark, 'Capital'],
  [Wallet, 'Accounts', 'chevron'],
]
const WORKFLOWS: [React.ElementType, string][] = [
  [Briefcase, 'Trake rutes'],
  [Send, 'Payments'],
  [Bell, 'Notifications'],
  [Settings, 'Settings'],
]
const ACTIONS = ['Send', 'Request', 'Transfer', 'Deposit', 'Pay Bill', 'Create Invoice']
const TX: [string, string, string, string][] = [
  ['Aug 24', 'AWS', '-$5,200', 'Pending'],
  ['Aug 23', 'Client Payment', '+$125,000', 'Completed'],
  ['Aug 22', 'Payroll', '-$85,450', 'Completed'],
  ['Aug 21', 'Office Supplies', '-$1,200', 'Completed'],
]
const AREA = 'M0,62 C30,58 45,48 70,50 C95,52 110,38 140,36 C170,34 185,44 210,40 C235,36 250,22 280,20 C310,18 330,28 355,24 C375,21 390,12 400,10'

function Dashboard() {
  return (
    <div className="flex h-[560px] select-none flex-col overflow-hidden rounded-xl border border-border bg-background text-[11px] text-foreground pointer-events-none">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-[11px] font-semibold text-primary-foreground">N</span>
          <span className="font-semibold">NIMTECH</span>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </div>
        <div className="hidden w-72 items-center gap-2 rounded-md border border-border bg-secondary/50 px-2.5 py-1.5 text-muted-foreground sm:flex">
          <Search className="h-3 w-3" />
          <span className="flex-1">Search</span>
          <span className="rounded border border-border bg-background px-1 text-[9px]">⌘K</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium">Move Money</span>
          <Bell className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-[9px] font-semibold text-accent-foreground">JB</span>
        </div>
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-40 shrink-0 flex-col gap-0.5 border-r border-border p-2 sm:flex">
          {SIDEBAR.map(([Icon, label, extra, active]) => (
            <div key={label} className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${active ? 'bg-secondary font-medium text-foreground' : 'text-muted-foreground'}`}>
              <Icon className="h-3.5 w-3.5" />
              <span className="flex-1">{label}</span>
              {extra === 'chevron' ? <ChevronRight className="h-3 w-3" /> : extra && <span className="rounded-full bg-accent px-1.5 text-[9px] text-accent-foreground">{extra}</span>}
            </div>
          ))}
          <span className="mt-3 px-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Workflows</span>
          {WORKFLOWS.map(([Icon, label]) => (
            <div key={label} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </div>
          ))}
        </aside>
        <div className="min-w-0 flex-1 space-y-3 overflow-hidden bg-secondary/30 p-4">
          <div className="text-sm font-semibold">Welcome, Jane</div>
          <div className="flex flex-wrap items-center gap-1.5">
            {ACTIONS.map((a, i) => (
              <span key={a} className={`rounded-full px-3 py-1 text-[10px] ${i === 0 ? 'bg-accent text-accent-foreground' : 'border border-border bg-background'}`}>
                {a}
              </span>
            ))}
            <span className="ml-1 text-[10px] text-muted-foreground">Customize</span>
          </div>
          <div className="flex gap-3">
            <div className="min-w-0 flex-1 basis-0 rounded-lg border border-border bg-background p-3">
              <div className="flex items-center gap-1 text-muted-foreground">
                Operating Balance <Check className="h-3 w-3 text-accent" />
              </div>
              <div className="mt-1 text-lg font-semibold tracking-tight">
                $8,450,190<span className="text-xs text-muted-foreground">.32</span>
              </div>
              <div className="mt-1 flex gap-3 text-[10px]">
                <span className="text-muted-foreground">Last 30 Days</span>
                <span className="text-emerald-600">+$1.8M</span>
                <span className="text-red-500">-$900K</span>
              </div>
              <svg viewBox="0 0 400 70" preserveAspectRatio="none" className="mt-2 h-20 w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="nx-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${AREA} L400,70 L0,70 Z`} fill="url(#nx-area)" />
                <path d={AREA} fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="min-w-0 flex-1 basis-0 rounded-lg border border-border bg-background p-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Accounts</span>
                <span className="flex gap-1.5 text-muted-foreground">
                  <Plus className="h-3 w-3" />
                  <MoreVertical className="h-3 w-3" />
                </span>
              </div>
              {[
                ['Credit', '$98,125.50'],
                ['Treasury', '$6,750,200.00'],
                ['Operations', '$1,592,864.82'],
              ].map(([n, v]) => (
                <div key={n} className="flex justify-between py-3 text-xs">
                  <span className="text-muted-foreground">{n}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-3">
            <div className="mb-2 font-semibold">Recent Transactions</div>
            <table className="w-full text-left">
              <thead className="text-muted-foreground">
                <tr>
                  {['Date', 'Description', 'Amount', 'Status'].map((h) => (
                    <th key={h} className="pb-1.5 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TX.map(([dt, desc, amt, st]) => (
                  <tr key={desc} className="border-t border-border">
                    <td className="py-1.5 text-muted-foreground">{dt}</td>
                    <td className="py-1.5">{desc}</td>
                    <td className={`py-1.5 ${amt.startsWith('+') ? 'text-emerald-600' : ''}`}>{amt}</td>
                    <td className="py-1.5">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] ${st === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{st}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SoftwareLanding() {
  const navigate = useNavigate()
  return (
    <>
      <div className="nexora flex h-screen flex-col overflow-hidden bg-background font-body">
        <Navbar />
        <section className="relative flex flex-1 flex-col items-center px-6 pt-6 md:pt-10">
          <video src={VIDEO} autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover" aria-hidden="true" />
          <div className="relative z-10 flex w-full flex-col items-center">
            <motion.span {...up(10, 0.5)} className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 font-body text-sm text-muted-foreground">
              Now with GPT-5 support ✨
            </motion.span>
            <motion.h1 {...up(16, 0.6, 0.1)} className="max-w-xl text-center font-display text-5xl leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-[5rem]">
              The Future of <em className="italic">Smarter</em> Automation
            </motion.h1>
            <motion.p {...up(16, 0.6, 0.2)} className="mt-4 max-w-[650px] text-center font-body text-base leading-relaxed text-muted-foreground md:text-lg">
              Automate your busywork with intelligent agents that learn, adapt, and execute—so your team can focus on what matters most.
            </motion.p>
            <motion.div {...up(16, 0.6, 0.3)} className="mt-5 flex items-center gap-3">
              <Button className="rounded-full px-6 py-5 font-body text-sm font-medium" onClick={() => navigate('/contact?service=software')}>
                Book a demo
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="See how it works"
                className="h-11 w-11 rounded-full border-0 bg-background shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:bg-background/80"
                onClick={() => document.getElementById('show')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="h-4 w-4 fill-foreground" />
              </Button>
            </motion.div>
            <motion.div {...up(30, 0.8, 0.5)} className="mt-8 w-full max-w-5xl">
              <div className="overflow-hidden rounded-2xl p-3 md:p-4" style={{ background: 'rgba(255, 255, 255, 0.4)', border: '1px solid rgba(255, 255, 255, 0.5)', boxShadow: 'var(--shadow-dashboard)' }}>
                <Dashboard />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <ServiceBody id="software" />
    </>
  )
}
