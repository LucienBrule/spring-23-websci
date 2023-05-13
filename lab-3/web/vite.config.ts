import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  base: '',
  plugins: [react()],
  server: {
    strictPort: true,
    host:true,
    port: 8080,
    watch: {
        usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,

      }
    }
  }
})
