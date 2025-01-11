import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import './style/index.sass'

const app = createApp(App)

app.use(router)
app.mount('#app')   
