import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ORDER } from '../data/content.js'
import { COMPANY_LINKS, EMAIL, HQ } from '../data/site.js'
import { Button, svcName } from './blocks.jsx'
import { Logo } from './Icons.jsx'

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const spacing = useTransform(scrollYProgress, [0, 1], ['0.06em', '-0.06em'])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1])

  return (
    <footer ref={ref} className="relative mt-16 overflow-hidden bg-deep text-white">
      <div className="footer-glow" aria-hidden="true" />
      <div className="wrap relative">
        <div className="grid gap-10 border-b border-white/10 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="min-w-0">
            <Link to="/" className="flex items-center gap-2 font-fustat text-[22px] font-bold tracking-[-.5px]">
              <Logo className="h-7 w-7" />
              NIMTECH
            </Link>
            <p className="mt-4 max-w-[34ch] text-[14.5px] text-white/70">A global engineering studio for AI agents, computer vision, software, apps, integration and AI content.</p>
            <div className="mt-6">
              <Button to="/contact">Start a Project</Button>
            </div>
          </div>
          <FootCol title="Services" links={ORDER.map((id) => [`/services/${id}`, svcName(id)])} />
          <FootCol title="Company" links={COMPANY_LINKS} />
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[.14em] text-white/60">Contact</p>
            <ul className="grid gap-2.5 text-[14.5px] text-white/60">
              <li><Link to="/contact" className="hover:text-white">Contact form</Link></li>
              <li><a href={`mailto:${EMAIL}`} className="hover:text-white">{EMAIL}</a></li>
              <li className="text-white/60">HQ {HQ}</li>
              <li className="text-white/60">Working worldwide</li>
            </ul>
          </div>
        </div>
        <motion.div style={{ letterSpacing: spacing, opacity }} aria-hidden="true" className="footer-word select-none">
          NIMTECH
        </motion.div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 py-6 text-[13px] text-white/60">
          <span>© {new Date().getFullYear()} NIMTECH. All rights reserved.</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  )
}

function FootCol({ title, links }) {
  return (
    <div>
      <p className="mb-4 text-xs font-medium uppercase tracking-[.14em] text-white/60">{title}</p>
      <ul className="grid gap-2.5 text-[14.5px]">
        {links.map(([to, l]) => (
          <li key={to}>
            <Link to={to} className="text-white/75 transition-colors hover:text-white">{l}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
