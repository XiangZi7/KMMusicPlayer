
export const mvTabs = [
    { id: '全部', label: '全部' },
    { id: '官方版', label: '官方版' },
    { id: '原生', label: '原生' },
    { id: '现场版', label: '现场版' },
    {
        id: '网易出品',
        label: '网易出品',
    },
]

export const areasList = [
    { id: '全部', label: '全部' },
    { id: '内地', label: '内地' },
    { id: '港台', label: '港台' },
    { id: '欧美', label: '欧美' },
    { id: '日本', label: '日本' },
    { id: '韩国', label: '韩国' },
]

export const orderList = [
    { id: '上升最快', label: '上升最快' },
    { id: '最热', label: '最热' },
    { id: '最新', label: '最新' },
]

export const playlistsList = [
    { value: 'user', name: '用户歌单' },
    { value: 'all', name: '精品歌单' },
]

export const playlistOrder = [
    { value: 'new', name: 'new' },
    { value: 'hot', name: 'hot' },
]

export const searchTabs = [
    { id: '1', label: '单曲', icon: 'solar:turntable-music-note-linear' },
    { id: '10', label: '专辑', icon: 'solar:music-library-2-broken' },
    { id: '100', label: '艺术家', icon: 'iconamoon:music-artist' },
    { id: '1000', label: '歌单', icon: 'iconamoon:music-artist' },
    { id: '1004', label: 'MV', icon: 'majesticons:film-line' },
]

export const qualityList = [
    { id: 'standard', label: '标准 (128kbps)' },
    { id: 'higher', label: '较高 (192kbps)' },
    { id: 'exhigh', label: '极高 (256kbps)' },
    { id: 'lossless', label: '无损' },
    { id: 'hires', label: 'Hi-Res' },
    { id: 'jyeffect', label: '高清环绕声' },
    { id: 'sky', label: '沉浸环绕声' },
    { id: 'dolby', label: '杜比全景声' },
    { id: 'jymaster', label: '超清母带' },
];


// 定义语言选项
export const languageOptions = [
    { id: 'zh', label: '中文' },
    { id: 'en', label: '英文' },
    { id: 'ja', label: '日文' },
]

// 定义导航菜单的结构
interface Category {
    name: string;
    isOpen: boolean;
    subCategories: { id: string; label: string }[];
}
// 导航数据
export const categories = ref<Category[]>([
    {
        name: '歌手类型',
        isOpen: true,
        subCategories: [
            { id: '-1', label: '全部' },
            { id: '1', label: '男歌手' },
            { id: '2', label: '女歌手' },
            { id: '3', label: '组合/乐队' }
        ]
    },
    {
        name: '地区类型',
        isOpen: true,
        subCategories: [
            { id: '-1', label: '全部' },
            { id: '7', label: '华语' },
            { id: '96', label: '欧美' },
            { id: '8', label: '日本' },
            { id: '16', label: '韩国' },
            { id: '0', label: '其他' }
        ]
    },
]);