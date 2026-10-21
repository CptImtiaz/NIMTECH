import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home'
import Service from './pages/Service.jsx'
import Contact from './pages/Contact.jsx'
import AgentsLanding from './pages/landings/AgentsLanding.jsx'
import { Article, InsightsIndex } from './pages/Insights.jsx'
import { About, NotFound, Services } from './pages/Pages.jsx'

const OLD = [
  ['services/computer-vision', '/services/ai-models'],
  ['services/ai-content', '/services'],
  ['work', '/services'],
  ['company', '/about'],
]

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/ai-agents" element={<AgentsLanding />} />
        <Route path="services/:id" element={<Service />} />
        <Route path="about" element={<About />} />
        <Route path="insights" element={<InsightsIndex />} />
        <Route path="insights/:slug" element={<Article />} />
        <Route path="contact" element={<Contact />} />
        {OLD.map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
