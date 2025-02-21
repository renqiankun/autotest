import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import electron from 'vite-plugin-electron'
import { notBundle } from 'vite-plugin-electron/plugin'
import pkg from './package.json'
import renderer from 'vite-plugin-electron-renderer'
import esmShim from '@rollup/plugin-esm-shim'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ command }: any) => {
  const isProduction = command === 'build'
  return {
    base: './',
    plugins: [
      vue(),
      electron([
        {
          entry: './electron/main/index.ts',
          vite: {
            plugins: [!isProduction && notBundle()],
            build: {
              outDir: './dist-electron/main',
              rollupOptions: {
                plugins: [
                  esmShim() // 在Vite的Rollup构建配置中使用插件
                ],
                external: Object.keys(pkg.dependencies)
              }
            }
          }
        },
        {
          entry: './electron/preload/index.ts',
          vite: {
            build: {
              outDir: './dist-electron/preload',
              rollupOptions: {
                plugins: [
                  esmShim() // 在Vite的Rollup构建配置中使用插件
                ],
                external: Object.keys(pkg.dependencies)
              }
            },
            plugins: [!isProduction && notBundle()]
          },
          onstart({ reload }) {
            // Notify the Renderer process to reload the page when the Preload scripts build is complete,
            // instead of restarting the entire Electron App.
            reload()
          }
        }
      ]),
      renderer({})
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@common': path.resolve(__dirname, './common')
      }
    },
    server: {
      host: '0.0.0.0'
    },
    build: {
      outDir: path.join(__dirname, 'dist'),
      cssCodeSplit: true,
      drop: isProduction ? ['console', 'debugger'] : [],
      rollupOptions: {
        output: {
          sourcemap: false,
          manualChunks: {
            // 'base-module': ['vue', 'pinia', 'vue-router', 'axios', 'lodash-es'],
            // 'element-plus': ['element-plus']
          },
          entryFileNames: 'js/[name].[hash].js',
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames: '[ext]/[name].[hash].[ext]'
        }
      }
    }
  }
})
