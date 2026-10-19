import { Reveal } from './motion.jsx'

// Placeholder logos. Swap for real client logos once you have permission.
const logos = [
  ['Vertex', <path key="v" d="M4 6h7l5 13 5-13h7L19 26h-6z" />],
  ['Orbitly', <g key="o"><circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="4" /><circle cx="24" cy="8" r="4" /></g>],
  ['Stackr', <g key="s"><rect x="4" y="5" width="24" height="6" rx="2" /><rect x="4" y="13" width="24" height="6" rx="2" opacity=".7" /><rect x="4" y="21" width="24" height="6" rx="2" opacity=".4" /></g>],
  ['Pulse', <path key="p" d="M2 17h6l4-9 6 17 4-8h8" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />],
  ['Hexa', <path key="h" d="M16 3l11 6.5v13L16 29 5 22.5v-13zM16 10l-5.5 3.2v6.1l5.5 3.2 5.5-3.2v-6.1z" fillRule="evenodd" />],
]

export default function TrustedBy() {
  return (
    <section className="wrap relative z-10 pb-16 pt-6">
      <Reveal as="p" className="text-center text-[15px] font-medium text-ink-soft">
        Trusted by Top-tier product companies
      </Reveal>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:gap-[100px]">
        {logos.map(([name, mark], i) => (
          <Reveal as="li" key={name} delay={0.08 * i} y={20} aria-label={name} className="text-ink opacity-45 grayscale transition-opacity duration-300 hover:opacity-80">
            <svg viewBox="0 0 140 32" className="h-8 w-auto" fill="currentColor" aria-hidden="true">
              {mark}
              <text x="36" y="23" fontFamily="Fustat, sans-serif" fontWeight="700" fontSize="20">{name}</text>
            </svg>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
