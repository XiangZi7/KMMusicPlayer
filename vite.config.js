import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'


const resolve = (dir) => path.join(__dirname, dir)
export default defineConfig({
  base: "./",
  plugins: [
    AutoImport({
      imports: ["vue", "vue-router"], // 自动导入vue和vue-router相关函数
    }),
    Components({}),
    vue()],
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
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`,
      }
    }
  },
})
