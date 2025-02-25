import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import Store from "@/stores";
import i18n from "@/i18n/i18n";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style/index.scss'
const app = createApp(App)

// 路由
app.use(router)
// 状态管理
app.use(Store)
// 国际化
app.use(i18n)
// ElementPlus
app.use(ElementPlus)
app.mount('#app')
