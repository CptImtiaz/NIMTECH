import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home'
import Service from './pages/Service.jsx'
import Contact from './pages/Contact.jsx'
import AppsLanding from './pages/landings/AppsLanding'
import AgentsLanding from './pages/landings/AgentsLanding.jsx'
import { Article, InsightsIndex } from './pages/Insights.jsx'
import { About, NotFound, Services, Work } from './pages/Pages.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/ai-agents" element={<AgentsLanding />} />
        <Route path="services/apps" element={<AppsLanding />} />
        <Route path="services/:id" element={<Service />} />
        <Route path="work" element={<Work />} />
        <Route path="about" element={<About />} />
        <Route path="company" element={<Navigate to="/about" replace />} />
        <Route path="insights" element={<InsightsIndex />} />
        <Route path="insights/:slug" element={<Article />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
