import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ORDER, SERVICES } from '../../data/services.js'

const POSTER = { ai: 'ai', vision: 'vision', software: 'software', apps: 'apps', api: 'api', content: 'content' }
const TINT = {
  'ai-agents': 'from-[#ede9ff] to-[#f8f6ff]',
  'computer-vision': 'from-[#e3f1ff] to-[#f5faff]',
  software: 'from-[#eef0f3] to-[#f9fafb]',
  apps: 'from-[#ffeede] to-[#fff8f1]',
  'api-integration': 'from-[#e3f7ee] to-[#f5fcf8]',
  'ai-content': 'from-[#ffe6f1] to-[#fff6fa]',
}

// Six services as picture cards. The first two are wide.
export default function ServicesGrid() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="rise">
            <span className="eyebrow">What we do</span>
            <h2 className="h2 mt-5 max-w-[18ch]">
              Six ways we help <em>you grow.</em>
            </h2>
          </div>
          <p className="rise max-w-[380px] text-[17px] leading-relaxed text-neutral-600" style={{ '--d': '.1s' }}>
            Pick one, or combine them. Every service is designed, built and supported by the same team.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {ORDER.map((id, i) => {
            const s = SERVICES[id]
            return (
              <li key={id} className={`rise ${i < 2 ? 'lg:col-span-6' : 'lg:col-span-3'}`} style={{ '--d': `${(i % 4) * 0.07}s` }}>
                <Link
                  to={`/services/${id}`}
                  className={`group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[28px] bg-gradient-to-br p-7 transition-transform duration-500 hover:-translate-y-1 ${TINT[id]} ${i < 2 ? 'lg:min-h-[380px]' : ''}`}
                >
                  <img
                    src={`/posters/${POSTER[s.scene]}.webp`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={`pointer-events-none absolute -bottom-6 -right-6 w-[62%] max-w-[340px] transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-105 ${i < 2 ? 'lg:w-[52%]' : 'lg:w-[80%]'}`}
                  />
                  <span className="relative text-sm font-medium text-neutral-500">0{i + 1}</span>
                  <h3 className="relative mt-3 font-display text-[28px] font-semibold leading-tight tracking-tight">{s.name}</h3>
                  <p className="relative mt-2 max-w-[24ch] text-[16px] leading-snug text-neutral-600">{s.tagline}</p>
                  <span className="relative mt-auto grid h-11 w-11 place-items-center rounded-full bg-black text-white transition-colors group-hover:bg-[#3054ff]">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
