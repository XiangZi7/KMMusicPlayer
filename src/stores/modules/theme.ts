import { defineStore } from 'pinia'
import piniaPersistConfig from '@/stores/helper/persist'
import { ThemeState } from "@/stores/interface";
/**
 * 主题设置
 */
export const themeStore = defineStore({
    id: 'themeStore',
    state: (): ThemeState => ({
        isDark: false,
        primary: '#7E22CE',
    }),
    actions: {
        setDark(isDark: string | number | boolean) {
            this.isDark = isDark
        },
        setPrimary(primary: string) {
            this.primary = primary
        },

    },
    persist: piniaPersistConfig('ThemeStore'),
})