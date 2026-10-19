import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TrustedBy from './components/TrustedBy.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {/* Background glow, top-left */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[220px] -top-[260px] h-[620px] w-[820px] rounded-full bg-[#60B1FF] opacity-30 blur-[140px]" />
        <div className="absolute -left-[120px] -top-[180px] h-[380px] w-[520px] rounded-full bg-[#319AFF] opacity-25 blur-[120px]" />
        <div className="absolute left-[180px] top-[40px] h-[240px] w-[360px] rounded-full bg-[#60B1FF] opacity-20 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <Navbar />
        <main>
          <Hero />
          <TrustedBy />
        </main>
      </div>
    </div>
  )
}
