import { defineStore } from 'pinia'
import { userModel, UserState } from '../interface'
import piniaPersistConfig from '@/config/piniaPersist'
import { logout, loginStatus } from '@/api'

export const useUserStore = defineStore({
  id: 'useUserStore',
  state: (): UserState => {
    return {
      userInfo: {},
      isLoggedIn: false  //登录状态
    }
  },
  actions: {
    setUserInfo(userInfo: userModel) {
      this.userInfo = userInfo
      this.isLoggedIn = !!userInfo.userId; // 基于 userId 设置登录状态
    },
    // 检查登陆状态
    async checkLoginStatus() {
      try {
        const { data } = await loginStatus();
        if (data.profile) {
          this.setUserInfo(data.profile);
        } else {
          this.setUserInfo({});
        }
      } catch (err) {
        console.error("Error checking login status:", err);
      }
    },
    // 用户退出
    async userLogout() {
      try {
        await logout();
        this.setUserInfo({});
      } catch (err) {
        console.error("Error logging out:", err);
      }
    }
  },
  persist: piniaPersistConfig('UserStore'),
})
