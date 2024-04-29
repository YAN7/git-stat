import { fileURLToPath, URL } from 'node:url'

import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/feGitStat-app/',
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    vueJsx(),
    AutoImport({
      resolvers: [],
      dirs: ['./src/components/*'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      dts: 'src/auto-components.d.ts',
    }),
    UnoCSS(),
    qiankun('feGitStat-app', {
      useDevMode: true,
    }),
    basicSsl(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    https: true,
    fs: {
      strict: false,
    },
    proxy: {
      '/git-stat': {
        changeOrigin: true,
        secure: false,
        target: 'http://localhost:5188/',
        // target: 'https://itom-test.csair.com',
      },
    },
  },
  build: {
    cssCodeSplit: false,
    outDir: 'feGitStat-app',
  },
})
