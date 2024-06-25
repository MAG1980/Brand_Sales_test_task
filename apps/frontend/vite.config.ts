import {resolve} from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

const apps = resolve(__dirname,'../')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@backend': resolve(apps, 'backend/src'),
      '@frontend': resolve(apps, 'frontend/src'),
    }
  },
  envDir: '../../',
})
