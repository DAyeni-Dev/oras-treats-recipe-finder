import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'animation': ['framer-motion'],
        }
      }
    },
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
  },
  server: {
    open: true,
    port: 3000,
  }
})
