const logos = [
  {
    name: 'Vertex',
    svg: (
      <svg viewBox="0 0 140 32" className="h-8 w-auto" fill="currentColor">
        <path d="M4 6h7l5 13 5-13h7L19 26h-6z" />
        <text x="36" y="23" fontFamily="Fustat, sans-serif" fontWeight="700" fontSize="20">Vertex</text>
      </svg>
    ),
  },
  {
    name: 'Orbitly',
    svg: (
      <svg viewBox="0 0 140 32" className="h-8 w-auto" fill="currentColor">
        <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="24" cy="8" r="4" />
        <text x="36" y="23" fontFamily="Fustat, sans-serif" fontWeight="700" fontSize="20">Orbitly</text>
      </svg>
    ),
  },
  {
    name: 'Stackr',
    svg: (
      <svg viewBox="0 0 140 32" className="h-8 w-auto" fill="currentColor">
        <rect x="4" y="5" width="24" height="6" rx="2" />
        <rect x="4" y="13" width="24" height="6" rx="2" opacity=".7" />
        <rect x="4" y="21" width="24" height="6" rx="2" opacity=".4" />
        <text x="36" y="23" fontFamily="Fustat, sans-serif" fontWeight="700" fontSize="20">Stackr</text>
      </svg>
    ),
  },
  {
    name: 'Pulse',
    svg: (
      <svg viewBox="0 0 140 32" className="h-8 w-auto" fill="currentColor">
        <path d="M2 17h6l4-9 6 17 4-8h8" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="36" y="23" fontFamily="Fustat, sans-serif" fontWeight="700" fontSize="20">Pulse</text>
      </svg>
    ),
  },
  {
    name: 'Hexa',
    svg: (
      <svg viewBox="0 0 140 32" className="h-8 w-auto" fill="currentColor">
        <path d="M16 3l11 6.5v13L16 29 5 22.5v-13z" />
        <path d="M16 10l5.5 3.2v6.1L16 22.5l-5.5-3.2v-6.1z" fill="#fff" />
        <text x="36" y="23" fontFamily="Fustat, sans-serif" fontWeight="700" fontSize="20">Hexa</text>
      </svg>
    ),
  },
]

export default function TrustedBy() {
  return (
    <section className="relative z-10 px-5 pb-20 pt-16 sm:px-10 lg:px-20 lg:pt-10">
      <p className="text-center text-[15px] font-medium text-neutral-500">
        Trusted by Top-tier product companies
      </p>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:gap-[100px]">
        {logos.map((logo) => (
          <li
            key={logo.name}
            aria-label={logo.name}
            className="text-neutral-900 opacity-50 grayscale transition-opacity duration-300 hover:opacity-80"
          >
            {logo.svg}
          </li>
        ))}
      </ul>
    </section>
  )
}
