import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works when hosted at
// https://<username>.github.io/<repo-name>/
export default defineConfig({
  plugins: [react()],
  base: './',
})
