import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tailwindcss from "tailwindcss"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    open: true,
  },
})
