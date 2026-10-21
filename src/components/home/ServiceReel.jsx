import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ORDER, SERVICES } from '../../data/services.js'
import { REDUCE } from '../../lib/canvas.js'
import Photo from '../Photo.jsx'

// Services as big rows. On desktop a photo follows the pointer and swaps
// as you move between rows.
export default function ServiceReel({ title = true }) {
  const box = useRef(null)
  const float = useRef(null)
  const [cur, setCur] = useState(-1)

  useEffect(() => {
    const b = box.current, f = float.current
    if (!b || !f || REDUCE) return
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0
    const loop = () => {
      x += (tx - x) * 0.14
      y += (ty - y) * 0.14
      f.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${(tx - x) * 0.04}deg)`
      raf = requestAnimationFrame(loop)
    }
    const move = (e) => {
      const r = b.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
    }
    b.addEventListener('pointermove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      b.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="relative py-24 md:py-36">
      <div className="wrap">
        {title && (
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow rise text-white/70">What we do</span>
              <h2 className="h2 rise mt-5 max-w-[14ch]" style={{ '--d': '.06s' }}>
                Six services. <em className="grad-text">One senior team.</em>
              </h2>
            </div>
            <p className="rise max-w-[380px] text-[17px] leading-relaxed text-white/60" style={{ '--d': '.12s' }}>
              Start with one, add the next when you are ready. Every service is designed, built and supported by the same people.
            </p>
          </div>
        )}
        <div ref={box} className="reel" onPointerLeave={() => setCur(-1)}>
          <div ref={float} className={`reel-float ${cur >= 0 ? 'on' : ''}`} aria-hidden="true">
            {ORDER.map((id, i) => (
              <Photo key={id} src={SERVICES[id].image} sizes="380px" className={cur === i ? 'on' : ''} />
            ))}
          </div>
          <ul>
            {ORDER.map((id, i) => {
              const s = SERVICES[id]
              return (
                <li key={id} className="rise" style={{ '--d': `${i * 0.05}s` }}>
                  <Link to={`/services/${id}`} className={`reel-row ${cur === i ? 'on' : ''}`} onPointerEnter={() => setCur(i)} onFocus={() => setCur(i)}>
                    <span className="reel-n">0{i + 1}</span>
                    <span className="reel-thumb">
                      <Photo src={s.image} sizes="96px" />
                    </span>
                    <span className="reel-name">{s.name}</span>
                    <span className="reel-tag">{s.tagline}</span>
                    <span className="reel-go">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
