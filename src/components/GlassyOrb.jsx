import { useEffect, useRef, useState } from 'react'

// Override with VITE_ORB_SRC (e.g. a self-hosted copy in /public) when needed.
const ORB_SRC =
  import.meta.env.VITE_ORB_SRC || 'https://future.co/images/homepage/glassy-orb/orb-purple.webm'

const sizing = 'aspect-square w-full max-w-[680px] scale-125'

/**
 * mix-blend-screen alone cannot show anything over a pure white page
 * (screen with white is always white). So each frame is drawn to a canvas
 * where pixel brightness becomes alpha, which drops the black background
 * and keeps the orb's glow. If the browser cannot read the frames (for
 * example the host sends no CORS headers), it falls back to the plain
 * <video> with mix-blend-screen.
 */
export default function GlassyOrb() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [keyed, setKeyed] = useState(true)

  useEffect(() => {
    if (!keyed) return
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    let raf = 0

    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (video.readyState < 2) return
      const w = video.videoWidth
      const h = video.videoHeight
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      ctx.drawImage(video, 0, 0, w, h)
      let frame
      try {
        frame = ctx.getImageData(0, 0, w, h)
      } catch {
        cancelAnimationFrame(raf)
        setKeyed(false)
        return
      }
      const d = frame.data
      for (let i = 0; i < d.length; i += 4) {
        const a = Math.max(d[i], d[i + 1], d[i + 2])
        // Treat compression noise near black as fully transparent
        if (a < 12) {
          d[i + 3] = 0
          continue
        }
        // Un-premultiply so colours stay vivid once the black is removed
        const k = 255 / a
        d[i] *= k
        d[i + 1] *= k
        d[i + 2] *= k
        d[i + 3] = a
      }
      ctx.putImageData(frame, 0, 0)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [keyed])

  if (!keyed) {
    return (
      <video
        className={`orb-grade pointer-events-none object-cover mix-blend-screen ${sizing}`}
        src={ORB_SRC}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
    )
  }

  return (
    <>
      <video
        ref={videoRef}
        className="pointer-events-none absolute h-px w-px opacity-0"
        src={ORB_SRC}
        crossOrigin="anonymous"
        onError={() => setKeyed(false)}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <canvas ref={canvasRef} className={`orb-grade pointer-events-none ${sizing}`} aria-hidden="true" />
    </>
  )
}
