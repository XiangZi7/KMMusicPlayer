export const MenuData = [
    {
        separator: true,
    },
    {
        title: "",
        children: [
            { title: "首页", icon: "solar:home-smile-broken", router: "/" },
        ]
    },
    {
        title: "发现",
        children: [
            { title: "发现", icon: "ph:magnifying-glass", router: "/discover", shortcut: '⌘+D', },
            // { title: "视频", icon: "ph:film-strip", router: "/video", shortcut: '⌘+V' },
            { title: "歌单", icon: "streamline:song-recommendation", router: "/discover/songlist" },
            // { title: "动漫", icon: "tdesign:film", router: "/animation" },
            { title: "UI1", icon: "ph:test-tube-duotone", router: "/ui1", },
            { title: "UI2", icon: "ph:test-tube-duotone", router: "/ui2", },
            { title: "UI3", icon: "ph:test-tube-duotone", router: "/ui3", },
        ]
    },
    {
        title: "设置",
        children: [
            { title: "设置", icon: "hugeicons:settings-03", router: "/setting" },
            { title: "EQ均衡器", icon: "hugeicons:settings-03", router: "/eq" },
            { title: "测试", icon: "ph:test-tube-duotone", router: "/test", },
            { title: "主题", icon: "unjs:theme-colors", router: "/theme", shortcut: '⌘+Q' },
        ]
    },
]