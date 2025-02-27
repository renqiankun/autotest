import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { rmSync, readdirSync, statSync } from 'node:fs'
import electron, { ElectronOptions } from 'vite-plugin-electron'
import { notBundle } from 'vite-plugin-electron/plugin'
import pkg from './package.json'
// import renderer from 'vite-plugin-electron-renderer'
// 用于支持__dirname require等
import esmShim from '@rollup/plugin-esm-shim'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: any) => {
  const isProduction = command === 'build'
  rmSync('dist-electron', { recursive: true, force: true })
  return {
    base: './',
    plugins: [
      vue(),
      electron([
        // 编译preload下文件
        {
          vite: {
            build: {
              rollupOptions: {
                // 动态生成的入口文件
                input: getEntries(path.resolve(__dirname, 'electron/preload')),
                output: {
                  dir: 'dist-electron/preload', // 输出目录
                  entryFileNames: '[name].mjs', // 根据目录输出文件
                  chunkFileNames: '[name].mjs' // 分离的 chunk 文件
                },
              }
            }
          }
        },
        // 编译main文件
        {
          // entry: './electron/main/index.ts',
          vite: {
            plugins: [notBundle()],
            build: {
              // outDir: './dist-electron/main',
              rollupOptions: {
                // 动态生成的入口文件
                input: getEntries(path.resolve(__dirname, 'electron/main')),
                output: {
                  dir: 'dist-electron/main', // 输出目录
                  entryFileNames: '[name].js', // 根据目录输出文件
                  chunkFileNames: '[name].js' // 分离的 chunk 文件
                },
                plugins: [
                  esmShim() // 在Vite的Rollup构建配置中使用插件
                ],
                external: Object.keys(pkg.dependencies)
              }
            }
          }
        }
      ]),
      // renderer({})
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

/**
 * 遍历目录获取文件的map
 * 如dir: main/db/index.ts
 * return
 * {
 *   db/index: 'main/db/index.ts'
 * }
 * @param dir 目录
 * @returns
 */
const getEntries = (dir: string) => {
  const entries: Record<string, string> = {}
  const walk = (dirPath: string) => {
    const files = readdirSync(dirPath)
    files.forEach(file => {
      const fullPath = path.join(dirPath, file)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        walk(fullPath)
      } else if (file.endsWith('.ts') || file.endsWith('.js')) {
        const relativePath = path.relative(dir, fullPath)
        const name = relativePath.replace(/\.(ts|js)$/, '')
        entries[name] = fullPath
      }
    })
  }
  walk(dir)
  return entries
}
