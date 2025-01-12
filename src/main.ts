import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import './style/index.scss'
import i18n from './i18n/i18n'; // i18n的配置文件路径，也就是 createI18n 的文件地址

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')   
