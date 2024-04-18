import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import qiankun from 'vite-plugin-qiankun'
import UnoCSS from 'unocss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

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
      '/itom': {
        changeOrigin: true,
        secure: false,
        target: 'https://itom-st.csair.com/',
      },
      '/uc': {
        changeOrigin: true,
        secure: false,
        target: 'https://suzaku-test.csair.com/',
      },
    },
  },
  build: {
    cssCodeSplit: false,
  },
})
