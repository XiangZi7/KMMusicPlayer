import { defineStore } from "pinia";
import { ThemeState } from "../interface";
import piniaPersistConfig from "@/config/piniaPersist";

/**
 * 全局设置
 */
export const useThemeStore = defineStore({
  id: "useThemeStore",
  state: (): ThemeState => {
    return {
      // 主题
      primary: "#409EFF",
      // 深色模式
      isDark: false,
    };
  },
  actions: {
    setIsDark(isDark: boolean) {
      this.isDark = isDark;
    },
    setPrimary(primary: string) {
      this.primary = primary;
    },
  },
  persist: piniaPersistConfig("useThemeStore"),
});
