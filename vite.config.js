import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // three.js lives in its own lazy-loaded chunk (src/three/Scene.tsx)
  build: { chunkSizeWarningLimit: 1000 },
})
