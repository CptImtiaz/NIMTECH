// "Why NIMTECH": three gradient cards with small illustrations.
const R2 = 'https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor'

export default function CoreFeatures() {
  return (
    <section className="cf bg-white px-5 py-24 md:py-32">
      <div className="mx-auto max-w-[1100px] text-center">
        <p className="cf-badge rise">Why NIMTECH</p>
        <h2 className="cf-title rise" style={{ '--d': '.06s' }}>
          Simple to start. Built to last.
        </h2>
        <p className="cf-sub rise" style={{ '--d': '.12s' }}>
          Tell us the problem in plain words.
          <br />
          We handle the rest, and you own the result.
        </p>
        <div className="cf-grid">
          <article className="cf-card cf-card-1 rise">
            <div className="cf-prompt">
              We want <b className="cf-blur">customers to book</b> boat trips <b className="cf-blur">online</b> and <b className="cf-blur">pay instantly</b>, without calling us.
            </div>
            <span className="cf-pill">
              <span className="text-[#a855f7]">✦</span> Turn it into a plan
            </span>
            <svg className="cf-cursor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 2L20 11L11 13L9 22L4 2Z" />
            </svg>
            <h3>Plain words in, clear plan out</h3>
          </article>
          <article className="cf-card cf-card-2 rise" style={{ '--d': '.08s' }}>
            <div className="cf-api">
              <img src={`${R2}/network.svg`} alt="" loading="lazy" className="cf-network" onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
            </div>
            <h3>Connects to the tools you use</h3>
          </article>
          <article className="cf-card cf-card-3 rise" style={{ '--d': '.16s' }}>
            <div className="cf-mesh" />
            <img src={`${R2}/library%20icon.svg`} alt="" loading="lazy" className="cf-folder" onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
            <span className="cf-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              Code, models and data
            </span>
            <h3>You own everything we build</h3>
          </article>
        </div>
      </div>
    </section>
  )
}
