import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    allowedHosts: [
      '800a-175-45-191-10.ngrok-free.app' // Ganti sesuai dengan subdomain ngrok kamu
    ]
  }
})
