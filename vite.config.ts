import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// L'appli est servie sur https://dallxba.github.io/revision-assp/
export default defineConfig({
  base: '/revision-assp/',
  plugins: [react()],
})
