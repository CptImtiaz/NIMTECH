import { Fragment } from 'react'

// Renders strings like "Build <em>AI agents</em> that…" with accent styling.
export function Rich({ text }) {
  return text.split(/(<em>.*?<\/em>)/).filter(Boolean).map((part, i) => {
    const m = part.match(/^<em>(.*)<\/em>$/)
    return m ? <em key={i} className="accent">{m[1]}</em> : <Fragment key={i}>{part}</Fragment>
  })
}

// Splits rich text into words, keeping accent words flagged.
export function richWords(text) {
  const out = []
  text.split(/(<em>.*?<\/em>)/).filter(Boolean).forEach((part) => {
    const m = part.match(/^<em>(.*)<\/em>$/)
    ;(m ? m[1] : part).split(/\s+/).filter(Boolean).forEach((w) => out.push({ w, em: !!m }))
  })
  return out
}

export const plain = (text) => text.replace(/<\/?em>/g, '')
