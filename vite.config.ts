import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import IconsResolver from 'unplugin-icons/resolver' // 集成图标集
import Icons from 'unplugin-icons/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  AutoImport({
    imports: ["vue", "vue-router", "pinia"],
    dirs: ["src/utils/**", "src/stores/modules/**", "src/hooks/**"],
    dts: "src/auto-import/imports.d.ts",
    eslintrc: {
      enabled: true,
      filepath: "src/auto-import/eslintrc-auto-import.json",
    },
  }),
  Components({
    dirs: ["src/components"],
    dts: "src/auto-import/components.d.ts",
    resolvers: [
      // 集成图标集
      IconsResolver({
        prefix: 'icon' // 私有前缀
      })
    ]
  }),
  Icons({
    autoInstall: true // 自动安装所需图标集
  })],
  base: "./", // 在生产中服务时的基本公共路径
  publicDir: "public",  // 静态资源服务的文件夹, 默认"public"
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 本地运行配置
  server: {
    host: "0.0.0.0", // 指定服务器主机名  0.0.0.0 可以看见network 通过ip访问
    port: 3777, // 指定服务器端口
    // open: true, // 在服务器启动时自动在浏览器中打开应用程序
    strictPort: false, // 设置为false时,若端口被占用会尝试下一个可用端口, 而不是直接退出
    cors: true, // 为开发服务器配置 CORS, 默认启用并允许任何源
    // proxy: { // 为开发服务器配置自定义代理规则
    //   [env.VITE_APP_BASE_API]: {
    //     target: "http://192.168.xxx.xxx:xxxx", // 代理接口
    //     changeOrigin: true,
    //     rewrite: (_path) => _path.replace(/^\/api/, ""),
    //   }
    // }
  },
  // 打包配置
  build: {
    rollupOptions: {
      // 静态资源分类打包
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  }
})
