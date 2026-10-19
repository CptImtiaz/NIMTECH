import { useState } from 'react'
import { ArrowUpRight, Logo } from './Icons.jsx'

const links = ['Home', 'Features', 'Company', 'Pricing']

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="sticky top-[30px] z-50 flex justify-center px-4">
      <nav className="glass-strong relative w-fit rounded-[16px] p-2">
        <div className="flex items-center gap-4 sm:gap-8 lg:gap-12">
          <a href="#" className="flex items-center gap-2 pl-2 font-fustat text-[22px] font-bold tracking-[-0.5px] text-neutral-900">
            <Logo className="h-7 w-7" />
            NIMTECH
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-[15px] font-medium text-neutral-600 transition-colors hover:text-neutral-900"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#signup"
              className="glass-strong inline-flex items-center gap-2 rounded-[12px] px-4 py-2.5 text-[15px] font-medium text-neutral-900 transition-transform duration-300 hover:scale-[1.02]"
            >
              SignUp
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] text-neutral-700 md:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <ul className="mt-2 flex flex-col border-t border-black/10 pt-2 md:hidden">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-[10px] px-3 py-2.5 text-[15px] font-medium text-neutral-700 hover:bg-white/50"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </div>
  )
}
