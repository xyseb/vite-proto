import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'

process.env.BROWSER = "chrome"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      workbox: {
        sourcemap: true
      }
    }),
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: "eslint ./src/**/*",
      },
      stylelint: {
        lintCommand: "stylelint ./src/**/*.{scss,css}",
      },
    })
  ],
  logLevel: 'info', // info par defaut. 'info' | 'warn' | 'error' | 'silent'
  css: {
    devSourcemap: true
  },
  server: {
      host: 'localhost',
      port: 5173,
      origin: 'http://localhost:5173',
      strictPort: true,
      open: true,
  }
})
