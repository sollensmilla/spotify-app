import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/graphql": "https://spotify-api-production-82d8.up.railway.app"
    }
  }
});