import { defineStore } from "pinia";
import { SettingState } from "../interface";
import piniaPersistConfig from "@/config/piniaPersist";

/**
 * 全局设置
 */
export const useSettingStore = defineStore({
  id: "useSettingStore",
  state: (): SettingState => {
    return {
      loadLyric: false,
    };
  },
  actions: {
    setLoadLyric(isLoad: boolean) {
      this.loadLyric = isLoad;
    },
  },
  persist: piniaPersistConfig("useSettingStore"),
});
