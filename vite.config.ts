import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx,js,mjs,cjs,jsx}"',
      },
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.{scss}',
      },
    })
  ],
})
