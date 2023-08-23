import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from "./stores/index";

// 你自定义的 css
import './styles/main.scss'
import './styles/music.scss'

createApp(App).use(pinia).use(ElementPlus).use(router).mount('#app')
