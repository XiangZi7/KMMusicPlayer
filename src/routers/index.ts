import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'


const mode = import.meta.env.VITE_ROUTER_MODE;

const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory()
};

const router = createRouter({
  history: routerMode[mode](),
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/index.vue'),
    },
    {
      path: '/chatGPT',
      component: () => import('@/pages/chatGPT/index.vue'),
    },
    {
      path: '/utils',
      component: () => import('@/pages/utils/index.vue'),
    },
    {
      path: '/theme',
      component: () => import('@/pages/theme/index.vue'),
    },
    {
      path: '/chatGPT',
      component: () => import('@/pages/chatGPT/index.vue'),
    },
    {
      path: '/setting',
      component: () => import('@/pages/setting/index.vue'),
    },
    {
      path: '/mv',
      component: () => import('@/pages/mv/index.vue'),
    },
    {
      path: '/mv/:id',
      component: () => import('@/pages/mv/[id].vue'),
    },
    {
      path: '/animation',
      component: () => import('@/pages/animation/index.vue'),
    },
    {
      path: '/animation/play',
      component: () => import('@/pages/animation/[id].vue'),
    },
    {
      path: '/search',
      component: () => import('@/pages/search/index.vue'),
    },
    {
      path: '/artist',
      component: () => import('@/pages/artist/index.vue'),
    },
    {
      path: '/artist/:id',
      component: () => import('@/pages/artist/[id].vue'),
    },
    {
      path: '/playlist',
      component: () => import('@/pages/playlist/index.vue'),
    },
    {
      path: '/playlist/:id',
      component: () => import('@/pages/playlist/[id].vue'),
    },
  ],
})

export default router
