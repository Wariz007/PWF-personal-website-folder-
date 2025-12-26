import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  //base: '/PWF-personal-website-folder-/',
  base: '/',
  plugins: [react()],
})
