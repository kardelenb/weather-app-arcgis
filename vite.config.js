import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/react') || id.includes('/node_modules/react-dom')) {
            return 'vendor'
          }
          if (id.includes('/node_modules/@arcgis/core/')) {
            return 'arcgis'
          }
        }
      }
    },
    chunkSizeWarningLimit: 1500
  },
  optimizeDeps: {
    exclude: ['@arcgis/core']
  }
})