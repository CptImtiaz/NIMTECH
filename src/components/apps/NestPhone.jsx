import { forwardRef } from 'react'
import { Doodle } from './Doodles.jsx'

// "Nestling", a concept baby-tracking app designed by NIMTECH, shown as
// real UI inside an iPhone frame.
export const APP = 'Nestling'

export function Wordmark({ className = '' }) {
  return <span className={`nest-wordmark ${className}`}>nestling</span>
}

const Plus = () => (
  <span className="nest-plus" aria-hidden="true">
    <svg viewBox="0 0 12 12" className="h-3 w-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M6 1.5v9M1.5 6h9" />
    </svg>
  </span>
)
const X = () => (
  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 shrink-0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <path d="M2 2l8 8M10 2l-8 8" />
  </svg>
)

/** The big Feed card (also used as the pop-out on the night section). */
export const FeedCard = forwardRef(function FeedCard({ ago = '2h 10m', amount = '120', className = '', style }, ref) {
  return (
    <div ref={ref} className={`nest-card nest-feed ${className}`} style={style}>
      <div className="flex items-start justify-between">
        <Doodle name="bottle" size={30} />
        <Plus />
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div>
          <b className="block text-[13px] font-semibold text-[#1D1D1B]">Feed</b>
          <span className="text-[10.5px] text-[#5A5B48]">Last feeding {ago} ago</span>
        </div>
        <span className="nest-amount">
          {amount}
          <small>mL</small>
        </span>
      </div>
    </div>
  )
})

/** @param {Record<string, any>} props */
export default function NestPhone({ className = '', feedRef, hideFeed = false, ago, amount, perch = false }) {
  return (
    <div className={`nest-phone ${className}`}>
      {perch && <Doodle name="owl" size={54} stroke="#F2F2ED" className="absolute -top-[46px] right-8 z-10" />}
      <div className="nest-screen">
        <div className="flex items-center justify-between px-5 pt-3 text-[11px] font-semibold text-[#1D1D1B]">
          <span>8:23</span>
          <span className="h-[18px] w-[72px] rounded-full bg-black" />
          <span className="flex items-center gap-1">
            <i className="block h-2 w-3 rounded-[2px] border border-[#1D1D1B]" />
          </span>
        </div>
        <div className="flex items-center justify-between px-4 pt-3">
          <Wordmark className="text-[17px]" />
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1D1D1B] text-[9.5px] font-semibold text-[#F6F7F4]">AP</span>
        </div>
        <div className="px-4 pt-3">
          <span className="text-[10.5px] text-[#6B6D54]">Today</span>
          <b className="nest-name">Luz</b>
          <span className="text-[11px] text-[#5A5B48]">4 months old</span>
        </div>
        <div className="space-y-2 px-3 pt-3">
          <div className="nest-card flex gap-2 !bg-[#DBDBCF] !py-2.5">
            <Doodle name="star" size={26} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <b className="block text-[11px] font-semibold text-[#1D1D1B]">Connect {APP} to your AI</b>
              <span className="block text-[9.5px] leading-snug text-[#5A5B48]">Ask questions about your baby using their real data. Learn more ›</span>
            </div>
            <span className="text-[#5A5B48]">
              <X />
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-[#E3E5D8] px-3 py-1.5 text-[10.5px] text-[#1D1D1B]">
            <Doodle name="moon" size={14} />
            <span className="flex-1">
              Next nap likely <b>10:40–11:10</b>
            </span>
            <X />
          </div>
          <FeedCard ref={feedRef} ago={ago} amount={amount} style={hideFeed ? { visibility: 'hidden' } : undefined} />
          <div className="grid grid-cols-2 gap-2">
            {[
              ['moon', 'Sleep', '1h 05m ago'],
              ['sock', 'Diaper', 'Wet'],
              ['bottle', 'Pump', '90 mL today'],
              ['ball', 'Tummy time', '12m today'],
            ].map(([d, t, v]) => (
              <div key={t} className="nest-card !p-2.5">
                <div className="flex items-start justify-between">
                  <Doodle name={d} size={22} />
                  <Plus />
                </div>
                <b className="mt-1.5 block text-[11px] font-semibold text-[#1D1D1B]">{t}</b>
                <span className="text-[9.5px] text-[#5A5B48]">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <nav className="nest-tabs" aria-hidden="true">
          {['Activity', 'History', 'Trends', 'Growth', 'Food'].map((t, i) => (
            <span key={t} className={i === 0 ? 'on' : ''}>
              <i />
              {t}
            </span>
          ))}
        </nav>
      </div>
    </div>
  )
}
