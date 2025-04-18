import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // Make sure react-day-picker is properly bundled
      external: [],
    },
    // Increase the chunk size warning limit to avoid warnings
    chunkSizeWarningLimit: 600,
  },
})
