import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const Ctx = createContext(() => {})
export const useToast = () => useContext(Ctx)

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState(null)
  const timer = useRef()
  const show = useCallback((t) => {
    setMsg(t)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsg(null), 1900)
  }, [])
  return (
    <Ctx.Provider value={show}>
      {children}
      <AnimatePresence>
        {msg && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 16, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 16, x: '-50%' }}
            className="glass-strong fixed bottom-6 left-1/2 z-[120] rounded-xl px-4 py-2.5 text-sm font-medium text-ink"
          >
            {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}
