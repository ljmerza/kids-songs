import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { alphaTab } from "@coderline/alphatab/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    alphaTab({
      assetOutputDir: false,
      webWorkers: false,
    }),
  ],
  server: {
    host: '0.0.0.0',
  },
})
