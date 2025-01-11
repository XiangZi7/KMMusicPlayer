import DefaultLayout from '@/layout/pc/index.vue'

export default [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('@/pages/pc/index.vue'),
            }
        ],
    },
]