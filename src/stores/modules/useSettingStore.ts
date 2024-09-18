import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { SettingState } from '../interface'

/**
 * 设置
 */
export const useSettingStore = defineStore({
  id: 'useSettingStore',
  state: (): SettingState => ({
    isDrawerCover: true,
    isOriginalParsed: true,
    isRomaParsed: true,
    isTranslatedParsed: true,
  }),
  actions: {
    setOriginalParsed(isOriginalParsed: boolean) {
      this.isOriginalParsed = isOriginalParsed
    },
    setRomaParsed(isRomaParsed: boolean) {
      this.isRomaParsed = isRomaParsed
    },
    setTranslatedParsed(isTranslatedParsed: boolean) {
      this.isTranslatedParsed = isTranslatedParsed
    },
    setDrawerCover(isDrawerCover: boolean) {
      this.isDrawerCover = isDrawerCover
    },
  },
  persist: piniaPersistConfig('SettingStore'),
})
