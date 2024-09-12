import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/index.vue'),
        },
        {
          path: '/animation',
          name: 'animation',
          component: () => import('@/views/animation/index.vue'),
        },
        {
          path: '/discover',
          name: 'discover',
          component: () => import('@/views/discover/index.vue'),
        },

        {
          path: '/discover/songlist',
          name: 'disonglist',
          component: () => import('@/views/discover/songlist/index.vue'),
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('@/views/search/index.vue'),
        },
        {
          path: '/utils',
          name: 'utils',
          component: () => import('@/views/utils/index.vue'),
        },
        {
          path: '/video',
          name: 'video',
          component: () => import('@/views/video/index.vue'),
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('@/views/setting/index.vue'),
        },

        {
          path: '/songlist',
          name: 'songlist',
          component: () => import('@/views/songlist/index.vue'),
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('@/views/test/index.vue'),
        },
        {
          path: '/theme',
          name: 'theme',
          component: () => import('@/views/theme/index.vue'),
        },
        {
          path: '/ui1',
          name: 'ui1',
          component: () => import('@/views/ui1/index.vue'),
        },
        {
          path: '/ui2',
          name: 'ui2',
          component: () => import('@/views/ui2/index.vue'),
        },
        {
          path: '/ui3',
          name: 'ui3',
          component: () => import('@/views/ui3/index.vue'),
        },
        {
          path: '/ui3',
          name: 'ui3',
          component: () => import('@/views/ui3/index.vue'),
        },
        {
          path: '/eq',
          name: 'eq',
          component: () => import('@/views/eq/index.vue'),
        },
      ],
    },
    {
      path: '/dataScreen',
      name: 'dataScreen',
      component: () => import('@/views/dataScreen/index.vue'),
    },
  ],
})

export default router
