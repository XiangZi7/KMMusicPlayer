import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'
import './styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { lazyLoad } from './directives/lazyLoad';
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.directive('lazy-load', lazyLoad);
app.mount('#app')
