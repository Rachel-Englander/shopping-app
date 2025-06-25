// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // 👈 קריטי לפרודקשן - להפוך נתיבים ליחסיים
  server: {
    port: 5173
  }
})
