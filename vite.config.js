import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // three.js loads lazily in its own chunk (src/three/gravity.js);
    // libraries get stable chunks so they stay cached between releases
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('/three/')) return 'three'
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'motion'
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler') || id.includes('react-router')) return 'react'
        },
      },
    },
  },
})
