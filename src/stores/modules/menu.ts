import { defineStore } from 'pinia'
import piniaPersistConfig from '@/stores/helper/persist'
import { MenuState } from "@/stores/interface";
/**
 * 主题设置
 */
export const MenuStore = defineStore({
    id: 'MenuStore',
    state: (): MenuState => ({
        menuIndex: '1-0',
    }),
    actions: {
        setMenuIndex(menuIndex: string) {
            this.menuIndex = menuIndex
        },
    },
    persist: piniaPersistConfig('MenuStore'),
})