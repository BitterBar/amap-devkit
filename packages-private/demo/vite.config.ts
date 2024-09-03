import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import { isCustomElement } from '@amap-devkit/core/compiler'

const base = '/preview'
const __DEV__ = process.env.NODE_ENV !== 'production'

export default defineConfig({
  base,
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: isCustomElement
        }
      }
    }),
    vueJsx({
      isCustomElement: isCustomElement
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
