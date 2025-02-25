export const MenuData = [
    {
        title: '',
        children: [
            { title: '首页', icon: 'solar:home-smile-broken', router: '/' },
        ],
    },
    {
        title: '发现',
        children: [
            // {
            //     title: '推荐',
            //     icon: 'ph:magnifying-glass',
            //     router: '/recommend',
            // },
            {
                title: '搜索',
                icon: 'ph:magnifying-glass',
                router: '/search',
                shortcut: 'D',
            },
            { title: 'MV', icon: 'ph:film-strip', router: '/mv' },
            {
                title: '歌单',
                icon: 'streamline:song-recommendation',
                router: '/playlist',
            },
            {
                title: '歌手',
                icon: 'iconamoon:music-artist',
                router: '/artist',
            },
            { title: '动漫', icon: 'tdesign:film', router: '/animation' },
        ],
    },
    {
        title: '实验性测试',
        children: [
            // {
            //     title: '数据大屏',
            //     icon: 'material-symbols:screen-search-desktop-outline-rounded',
            //     router: '/dataScreen',
            // },
            {
                title: 'ChatGPT',
                icon: 'mdi:robot-angry-outline',
                router: '/chatGPT',
            },
            // { title: '工具', icon: 'tdesign:film', router: '/utils' },
            // { title: '测试', icon: 'ph:test-tube-duotone', router: '/test' },
        ],
    },
    {
        title: '设置',
        children: [
            { title: '设置', icon: 'hugeicons:settings-03', router: '/setting' },
            {
                title: '主题',
                icon: 'unjs:theme-colors',
                router: '/theme',
                shortcut: 'Q',
            },
        ],
    },
]