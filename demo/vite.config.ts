import { fileURLToPath, URL } from 'url'
import { resolve } from 'path'
import analyze from 'rollup-plugin-analyzer'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(process.cwd(), 'demo'),
  build: {
    outDir: '../dist-demo',
    rollupOptions: {
      plugins: [analyze()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
