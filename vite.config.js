import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'
// Element Plus
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'


const resolve = (dir) => path.join(__dirname, dir)
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"], // 自动导入vue和vue-router相关函数
      dirs: [
        'src/utils/**',
        'src/stores/**',
        'src/hooks/**'
      ],
      dts: 'src/auto-import/imports.d.ts',
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      dirs: [
        'src/components'
      ],
      dts: 'src/auto-import/components.d.ts',
      resolvers: [
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      autoInstall: true
    }),

    // 对大于 1k 的文件进行压缩
    viteCompression({
      threshold: 1000
    }),
    ElementPlus()
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
    }
  },
  server: {
    // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
    host: "0.0.0.0",
    port: 7171,
    cors: true,
    proxy: {
      "/colorApi": {
        target: "http://zhongguose.com/", // easymock
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/colorApi/, ""),
      },
    },
  },
  build: {
    base: './',
    rollupOptions: {
      // 静态资源分类打包
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        // 静态资源分拆打包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.toString().indexOf('.yarn/') !== -1) {
              return id.toString().split('.yarn/')[1].split('/')[0].toString()
            } else if (id.toString().indexOf('node_modules/') !== -1) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    sourcemap: false,
    target: 'es2015',
    reportCompressedSize: false
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`,
      }
    }
  },
})
