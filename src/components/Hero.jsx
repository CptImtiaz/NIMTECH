import { ArrowRight, Star } from './Icons.jsx'
import GlassyOrb from './GlassyOrb.jsx'

export default function Hero() {
  return (
    <section id="home" className="grid grid-cols-1 items-center gap-8 px-5 pt-20 sm:px-10 lg:grid-cols-2 lg:gap-4 lg:px-20 lg:pt-28">
      {/* Hero left */}
      <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white/60 px-3.5 py-1.5 backdrop-blur-md">
          <div className="flex gap-0.5 text-[#FF801E]" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4" />
            ))}
          </div>
          <span className="text-[14px] font-medium text-neutral-700">
            Rated 4.9/5 by 2700+ customers
          </span>
        </div>

        <h1 className="mt-6 font-fustat text-[48px] font-bold leading-[1.05] tracking-[-2px] text-neutral-950 sm:text-[62px] lg:text-[75px]">
          Work smarter,
          <br />
          achieve faster
        </h1>

        <p className="mt-6 max-w-[520px] text-[18px] font-normal leading-[1.5] tracking-[-1px] text-neutral-600">
          Effortlessly manage your projects, collaborate with your team, and achieve your goals with our intuitive task management tool.
        </p>

        <a
          href="#signup"
          className="group mt-10 inline-flex items-center gap-3 rounded-[16px] bg-[rgba(0,132,255,0.8)] py-2.5 pl-6 pr-2.5 text-[16px] font-medium text-white shadow-[inset_0px_4px_4px_0px_rgba(255,255,255,0.35)] backdrop-blur-[2px] transition-transform duration-300 ease-out hover:scale-[1.02]"
        >
          Get Started Now
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0084FF]">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </a>
      </div>

      {/* Hero right: glassy orb */}
      <div className="relative flex items-center justify-center">
        <GlassyOrb />
      </div>
    </section>
  )
}
