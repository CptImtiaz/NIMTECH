import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import Seo from './components/Seo.jsx'

// Shared by the browser entry and the prerenderer.
export default function Root() {
  return (
    <MotionConfig reducedMotion="user">
      <Seo />
      <App />
    </MotionConfig>
  )
}
