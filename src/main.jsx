import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Root from './Root.jsx'
import '@fontsource-variable/sora'
import '@fontsource-variable/inter'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
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
