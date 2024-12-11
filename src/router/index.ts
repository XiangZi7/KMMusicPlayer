import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layout/index.vue'
import { MenuData } from '@/layout/components/Menu/data.ts'

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
          component: () => import('@/views/discover/animation/index.vue'),
        },
        {
          path: '/chat',
          name: 'chat',
          component: () => import('@/views/chatGPT/index.vue'),
        },
        {
          path: '/animation/play',
          name: 'aniplay',
          component: () => import('@/views/discover/animation/play.vue'),
        },
        {
          path: '/discover',
          name: 'discover',
          component: () => import('@/views/discover/index.vue'),
        },

        {
          path: '/discover/disonglist',
          name: 'disonglist',
          component: () => import('@/views/discover/disonglist/index.vue'),
        },
        {
          path: '/playlist',
          name: 'playlist',
          component: () => import('@/views/discover/playlist/index.vue'),
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
          path: '/mv',
          name: 'mv',
          component: () => import('@/views/discover/mv/index.vue'),
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
          path: '/test',
          name: 'test',
          component: () => import('@/views/test/index.vue'),
        },
        {
          path: '/theme',
          name: 'theme',
          component: () => import('@/views/setting/theme/index.vue'),
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

// 路由拦截 用于侧边菜单栏的高亮
router.beforeEach(async (to, _from, next) => {
  const menuStore = useMenuStore()
  // 使用 some 方法，如果找到符合条件的子菜单就停止
  MenuData.some((menuItem, i) => {
    return menuItem.children.some((childItem, j) => {
      if (to.path === childItem.router) {
        menuStore.setMenuIndex(`${i}-${j}`)
        return true // 找到后返回 true 停止遍历
      }
      return false // 没有找到
    })
  })
  next()
})

export default router
