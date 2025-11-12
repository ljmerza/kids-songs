import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { alphaTab } from "@coderline/alphatab/vite";
import { execSync } from 'node:child_process'

const commitInfo = (() => {
  try {
    const hash = execSync('git rev-parse --short HEAD', { stdio: 'pipe' }).toString().trim()
    const message = execSync('git log -1 --pretty=%s', { stdio: 'pipe' }).toString().trim()
    return `${hash} - ${message}`
  } catch {
    return 'unknown'
  }
})()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    alphaTab({
      assetOutputDir: false,
      webWorkers: true,
    }),
  ],
  optimizeDeps: {
    // Keep alphaTab out of esbuild's prebundle so its plugin can rewrite worker URLs.
    exclude: ['@coderline/alphatab'],
  },
  define: {
    __APP_COMMIT_INFO__: JSON.stringify(commitInfo),
  },
  server: {
    host: '0.0.0.0',
  },
})
