import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Root from './Root.jsx'
import '@fontsource-variable/inter'
import '@fontsource-variable/instrument-sans'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/geist'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/urbanist'
import '@fontsource-variable/figtree'
import './index.css'

const el = document.getElementById('root')
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
)
// Production pages are prerendered, so hydrate them; dev starts empty.
if (el.hasChildNodes()) ReactDOM.hydrateRoot(el, app)
else ReactDOM.createRoot(el).render(app)
