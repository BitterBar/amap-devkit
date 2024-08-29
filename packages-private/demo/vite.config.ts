import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import templateiIsCustomElement from '@amap-devkit/vue/template-is-customElement.mjs'

const base = '/preview'
const __DEV__ = process.env.NODE_ENV !== 'production'

export default defineConfig({
  base,
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: templateiIsCustomElement
        }
      }
    }),
    vueJsx({
      isCustomElement: templateiIsCustomElement
    })
  ],
  define: {
    __DEV__
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
