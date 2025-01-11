import DefaultLayout from '@/layout/mobile/index.vue'

export default [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('@/pages/mobile/index.vue'),
            }
        ],
    },
]