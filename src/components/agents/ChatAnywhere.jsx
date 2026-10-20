import { useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import Puppet, { CAST } from '../Puppet.jsx'
import { REDUCE, useReduced } from '../../lib/canvas.js'
import { IMessageIcon, MailIcon, SlackIcon } from './AppIcons.jsx'

const EMMA = CAST[0]
const CHANNELS = [
  ['iMessage', IMessageIcon],
  ['Slack', SlackIcon],
  ['Email', MailIcon],
]

function Face({ size = 28 }) {
  return (
    <span className="inline-block shrink-0 overflow-hidden rounded-full bg-[#F0EEEB]" style={{ width: size, height: size }}>
      <Puppet c={EMMA} size={size} label={false} tile={false} className="-mt-[2px] block scale-[1.35]" />
    </span>
  )
}

function IMessage() {
  return (
    <div className="flex h-full flex-col bg-black">
      <div className="flex flex-col items-center gap-1 border-b border-white/10 pb-3 pt-12">
        <Face size={44} />
        <span className="text-[11px] text-white/90">Emma ›</span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-1.5 px-3 pb-3 text-[13px] leading-snug">
        <p className="mb-2 text-center text-[10px] text-white/60">Today 9:41</p>
        <p className="bubble-me">Emma, can you take the support queue this week?</p>
        <p className="bubble-them">On it. I’ll work through everything I can and flag anything sensitive before it goes out.</p>
        <p className="bubble-me">Perfect, thank you</p>
        <p className="pr-1 text-right text-[10px] text-white/60">Delivered</p>
        <div className="bubble-them typing" role="img" aria-label="Emma is typing">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="mx-3 mb-6 rounded-full border border-white/15 px-4 py-2 text-[12px] text-white/55">iMessage</div>
    </div>
  )
}

function Slack() {
  return (
    <div className="flex h-full flex-col bg-[#1A1D21] text-[13px] text-white/90">
      <div className="border-b border-white/10 px-4 pb-3 pt-12">
        <b className="block text-[15px]"># support</b>
        <span className="text-[11px] text-white/65">34 members</span>
      </div>
      <div className="flex-1 space-y-4 px-4 py-4">
        <div className="flex gap-2.5">
          <span className="overflow-hidden rounded-md">
            <Face size={34} />
          </span>
          <div className="min-w-0">
            <p className="text-[13px]">
              <b>Emma</b> <span className="rounded bg-white/10 px-1 text-[9px] font-semibold text-white/75">APP</span> <span className="text-[10px] text-white/60">4:52 PM</span>
            </p>
            <p className="mt-0.5 text-white/85">Queue’s clear. 34 tickets resolved today, 2 waiting on your review.</p>
            <div className="mt-2 flex gap-1.5">
              <span className="reaction">✅ 2</span>
              <span className="reaction">🎉 3</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2.5">
          <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-md bg-[#E8912D] text-[13px] font-bold text-white">Z</span>
          <div>
            <p className="text-[13px]">
              <b>Zaria</b> <span className="text-[10px] text-white/60">4:53 PM</span>
            </p>
            <p className="mt-0.5 text-white/85">amazing work 🙌</p>
          </div>
        </div>
      </div>
      <div className="mx-3 mb-6 rounded-lg border border-white/15 px-3 py-2 text-[12px] text-white/55">Message #support</div>
    </div>
  )
}

function Email() {
  return (
    <div className="flex h-full flex-col bg-[#F5F5F5] text-[#181818]">
      <div className="px-4 pb-2 pt-12 text-[13px] text-[#2F7BF6]">‹ Inbox</div>
      <div className="flex-1 px-4">
        <div className="flex items-center gap-2.5 border-b border-black/10 pb-3">
          <Face size={34} />
          <div className="min-w-0 leading-tight">
            <b className="text-[13px]">Emma</b>
            <p className="text-[11px] text-black/60">to Zaria · 5:02 PM</p>
          </div>
        </div>
        <h4 className="mt-4 text-[16px] font-semibold leading-snug">Weekly support recap, ready for review</h4>
        <p className="mt-3 text-[12.5px] leading-relaxed text-black/70">Hi Zaria, this week I resolved 142 tickets, cut first-response time to 4 minutes and flagged 2 refunds for your approval. The full recap is attached.</p>
        <p className="mt-2 text-[12.5px] text-black/70">Emma</p>
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-black/10 bg-white p-2.5">
          <span className="grid h-9 w-8 place-items-center rounded-md bg-[#E5484D] text-[9px] font-bold text-white">PDF</span>
          <span className="leading-tight">
            <b className="block text-[12px]">support-recap-w30.pdf</b>
            <span className="text-[10.5px] text-black/60">2.4 MB</span>
          </span>
        </div>
      </div>
    </div>
  )
}

const SCREENS = [IMessage, Slack, Email]

// Pinned section: the phone swaps channel as you scroll; the matching
// chip on the left lights up in sync.
export default function ChatAnywhere() {
  const ref = useRef(null)
  const reduced = useReduced()
  const [k, setK] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (!REDUCE) setK(Math.min(2, Math.max(0, Math.floor(p * 3.05))))
  })

  return (
    <section ref={ref} data-theme="dark" className={`agents-x relative ${reduced ? '' : 'h-[260vh]'}`} aria-labelledby="chat-anywhere">
      <div className={`${reduced ? 'py-24' : 'sticky top-0 h-[100svh]'} flex items-center overflow-hidden`}>
        <div className="mx-auto grid w-full max-w-[1100px] items-center gap-10 px-5 pt-16 md:grid-cols-[1fr_auto] md:gap-20 md:pt-0">
          <div className="max-w-[420px]">
            <h2 id="chat-anywhere" className="agents-h3">Chat anywhere</h2>
            <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Channels">
              {CHANNELS.map(([name, I], i) => (
                <button key={name} type="button" role="tab" aria-selected={k === i} onClick={() => setK(i)} className={`channel-chip ${k === i ? 'on' : ''}`}>
                  <I className="h-3.5 w-3.5" />
                  {name}
                </button>
              ))}
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-[#ACACAC]">Talk to the same agent on web, Slack, email, or iMessage. One identity, one memory, wherever you work.</p>
            <a href="#show" onClick={(e) => (e.preventDefault(), document.getElementById('show')?.scrollIntoView({ behavior: 'smooth' }))} className="agents-small-btn mt-7">
              Learn more →
            </a>
          </div>
          <div className="mx-auto">
            <div className="agents-phone">
              <span className="agents-island" />
              {SCREENS.map((S, i) => (
                <div key={i} className="agents-screen" style={{ opacity: k === i ? 1 : 0 }} aria-hidden={k !== i}>
                  <S />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
