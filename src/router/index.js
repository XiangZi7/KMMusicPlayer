import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
	{
		path: '/',
		component: () => import('@/pages/index.vue'),
		meta: {
			keepAlive: true
		}
	},
	{
		path: '/musiclibrary',
		component: () => import('@/pages/musiclibrary/index.vue'),
		meta: {
			keepAlive: true
		}
	},
	{
		path: '/mv',
		component: () => import('@/pages/mv/index.vue'),
		meta: {
			keepAlive: true
		}
	},
	{
		path: '/mv/:id',
		name: "mv",
		component: () => import('@/pages/mv/[id].vue'),
	},
	{
		path: '/radio',
		component: () => import('@/pages/radio/index.vue'),
		meta: {
			keepAlive: true
		}
	},
	{
		path: '/songList',
		component: () => import('@/pages/songList/index.vue'),
		meta: {
			keepAlive: true
		}
	},
	{
		path: '/testPlayer',
		component: () => import('@/pages/testPlayer/index.vue'),
	},
	{
		path: '/theme',
		component: () => import('@/pages/theme/index.vue'),
		meta: {
			keepAlive: true
		}
	},
	{
		path: '/search',
		component: () => import('@/pages/search/index.vue'),
		meta: {
			keepAlive: true
		}
	},
	{
		path: '/playList',
		component: () => import('@/pages/playListDetail/index.vue'),
		meta: {
			keepAlive: true
		}
	},
	{
		path: '/currentPlaylist',
		component: () => import('@/pages/currentPlaylist/index.vue'),
		meta: {
			keepAlive: true
		}
	},
	{
		path: '/animation',
		component: () => import('@/pages/animation/index.vue'),
		meta: {
			keepAlive: true
		}
	},
	{
		path: '/animation/:id',
		name: "animation",
		component: () => import('@/pages/animation/[id].vue'),
	},
	{
		path: '/animation/player/:id',
		name: "playerAnimation",
		component: () => import('@/pages/animation/player.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes
})

export default router
