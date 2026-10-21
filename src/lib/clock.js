import { useEffect, useState } from 'react'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Live local time "9:41am" and date "12 March, 2025", ticking every second.
export function useClock() {
  const [now, setNow] = useState(null)
  useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  if (!now) return { time: '9:41am', date: '12 March, 2025', live: false }
  const h = now.getHours()
  return {
    time: `${h % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')}${h < 12 ? 'am' : 'pm'}`,
    date: `${now.getDate()} ${MONTHS[now.getMonth()]}, ${now.getFullYear()}`,
    live: true,
  }
}
