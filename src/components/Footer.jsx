import { Link } from 'react-router-dom'
import { ORDER, SERVICES } from '../data/services.js'
import { EMAIL, HQ, WHATSAPP, WHATSAPP_LABEL } from '../data/site.js'

const MEADOW = 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4d01c727-d9c5-47c8-a778-35a451ffd39f.mp4'
const MEADOW_POSTER = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261014_121838_c97d0940-f430-4304-8573-4f47ee44f447.png'

// Footer: a pale paper top with the brand and three link columns, a
// blue-hour meadow video below, and a frosted-glass wordmark in the fog.
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__stage" aria-hidden="true">
        <video className="footer__video" src={MEADOW} poster={MEADOW_POSTER} autoPlay muted loop playsInline preload="none" />
      </div>
      <p className="footer__wordmark" aria-hidden="true">
        NIMTECH
      </p>
      <div className="footer__fog" aria-hidden="true" />
      <div className="footer__content">
        <div className="brand">
          <Link to="/" className="brand__logo" aria-label="NIMTECH home">
            <span className="brand__mark" />
            NIMTECH
          </Link>
          <h2 className="brand__title">AI and software, built to last</h2>
          <p className="brand__text">We design and build software, mobile apps, websites, integrations, AI models and AI agents for growing businesses, with one senior team from idea to launch.</p>
          <Link to="/contact" className="brand__cta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3.5 6 8.5 7 8.5-7" />
            </svg>
            Start a project
          </Link>
          <p className="brand__copy">
            © {new Date().getFullYear()} NIMTECH · {HQ}
          </p>
          <ul className="brand__status" aria-label="How we work">
            <li className="chip">
              <span className="chip__dot" aria-hidden="true" />
              Replies within 1 working day
            </li>
            <li className="chip">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 11a8 8 0 1 0-2.3 5.7" />
                <path d="M20 4v7h-7" />
              </svg>
              Demo every 2 weeks
            </li>
            <li className="chip">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6z" />
              </svg>
              You own the code
            </li>
          </ul>
        </div>
        <nav className="col col--menu" aria-label="Services">
          <h3 className="col__title">Services</h3>
          <ul className="col__list">
            {ORDER.map((id) => (
              <li key={id}>
                <Link to={`/services/${id}`}>{SERVICES[id].name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="col" aria-label="Company">
          <h3 className="col__title">Company</h3>
          <ul className="col__list">
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/services">All services</Link></li>
            <li><Link to="/insights">Insights</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <nav className="col" aria-label="Get in touch">
          <h3 className="col__title">Get in touch</h3>
          <ul className="col__list">
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_LABEL}</a></li>
            <li>{HQ}</li>
            <li>Working worldwide</li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
