import { createRouter, createWebHistory } from 'vue-router'
import PCRouter from "./modules/pc";
import MobileRouter from "./modules/mobile";
const router = createRouter({
    history: createWebHistory(),
    routes: useDeviceType() ? MobileRouter : PCRouter
})

export default router