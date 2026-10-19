import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Fixed layer behind every page: drifting aurora and a 3D grid floor.
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="aurora a" />
      <div className="aurora b" />
      <div className="floor" />
    </div>
  )
}

// Ring + dot cursor that swells over anything clickable (fine pointers only).
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 })
  const [on, setOn] = useState(false)
  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setOn(!!e.target.closest?.('a, button, input, select, textarea, [role="button"]'))
    }
    addEventListener('pointermove', move, { passive: true })
    return () => removeEventListener('pointermove', move)
  }, [x, y])
  return (
    <>
      <motion.div className={`cursor-ring ${on ? 'on' : ''}`} style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }} aria-hidden="true" />
      <motion.div className="cursor-dot" style={{ x, y, translateX: '-50%', translateY: '-50%' }} aria-hidden="true" />
    </>
  )
}
