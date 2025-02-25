import { defineStore } from 'pinia'
import piniaPersistConfig from '@/stores/helper/persist'
import { UserState } from "@/stores/interface";
import { logout, loginStatus } from '@/api'
/**
 * 用户信息
 */
export const UserStore = defineStore({
    id: 'UserStore',
    state: (): UserState => {
        return {
            userInfo: {},      //用户信息
            isLoggedIn: false, //登录状态
        }
    },
    actions: {
        //设置用户信息
        setUserInfo(userInfo: any) {
            this.userInfo = userInfo
        },
        //设置登录状态
        setIsLoggedIn(isLoggedIn: boolean) {
            this.isLoggedIn = isLoggedIn
        },
        // 检查登陆状态
        async checkLoginStatus() {
            try {
                const { data } = await loginStatus()
                if (data.profile) {
                    this.setUserInfo(data.profile)
                } else {
                    this.setUserInfo({})
                }
            } catch (err) {
                console.error('Error checking login status:', err)
            }
        },
        // 用户退出
        async userLogout() {
            try {
                await logout()
                this.setUserInfo({})
                this.setIsLoggedIn(false)
            } catch (err) {
                console.error('Error logging out:', err)
            }
        },
    },
    persist: piniaPersistConfig('UserStore'),
})