import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { themeState } from '../interface'

/**
 * 主题设置s
 */
export const useThemeStore = defineStore({
    id: 'useThemeStore',
    state: (): themeState => ({
        isDark: false,
        primary: '#000000',
        language: 'Chinese'
    }),
    actions: {
        setDark(isDark: string | number | boolean) {
            this.isDark = isDark
        },
        setPrimary(primary: string) {
            this.primary = primary
        },
        setLanguage(language: string) {
            this.language = language
        },
    },
    persist: piniaPersistConfig('ThemeStore'),
})