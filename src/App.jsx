import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Service from './pages/Service.jsx'
import Contact from './pages/Contact.jsx'
import { Careers, Company, Industries, NotFound, Process, Services, Technology, Work } from './pages/Pages.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<Service />} />
        <Route path="industries" element={<Industries />} />
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
