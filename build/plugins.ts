import { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver' // 集成图标集
import Icons from 'unplugin-icons/vite'

export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
    return [
        vue(),
        // basicSsl() 模拟https的配置,
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            dirs: ['src/utils/**', 'src/stores/modules/**', 'src/hooks/**'],
            dts: 'src/auto-import/imports.d.ts',
            eslintrc: {
                enabled: true,
                filepath: 'src/auto-import/eslintrc-auto-import.json',
            },
        }),
        Components({
            dirs: ['src/components'],
            dts: 'src/auto-import/components.d.ts',
            resolvers: [
                // 集成图标集
                IconsResolver({
                    prefix: 'icon' // 私有前缀
                })
            ]
        }),
        Icons({
            autoInstall: true // 自动安装所需图标集
        }),
    ]

}