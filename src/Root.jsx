import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import Seo from './components/Seo.jsx'
import { ToastProvider } from './components/Toast.jsx'

// Shared by the browser entry and the prerenderer.
export default function Root() {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <Seo />
        <App />
      </ToastProvider>
    </MotionConfig>
  )
}
