import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home'
import Service from './pages/Service.jsx'
import Contact from './pages/Contact.jsx'
import VisionLanding from './pages/landings/VisionLanding'
import SoftwareLanding from './pages/landings/SoftwareLanding'
import AppsLanding from './pages/landings/AppsLanding'
import ContentLanding from './pages/landings/ContentLanding'
import AgentsLanding from './pages/landings/AgentsLanding.jsx'
import { Article, InsightsIndex } from './pages/Insights.jsx'
import { Careers, Company, Industries, NotFound, Process, Services, Technology, Work } from './pages/Pages.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/ai-agents" element={<AgentsLanding />} />
        <Route path="services/computer-vision" element={<VisionLanding />} />
        <Route path="services/software" element={<SoftwareLanding />} />
        <Route path="services/apps" element={<AppsLanding />} />
        <Route path="services/ai-content" element={<ContentLanding />} />
        <Route path="services/:id" element={<Service />} />
        <Route path="industries" element={<Industries />} />
        <Route path="insights" element={<InsightsIndex />} />
        <Route path="insights/:slug" element={<Article />} />
        <Route path="work" element={<Work />} />
        <Route path="process" element={<Process />} />
        <Route path="technology" element={<Technology />} />
        <Route path="company" element={<Company />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
