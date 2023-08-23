// 容器钩子
import { defineStore, createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import { DEFAULT_PRIMARY } from "@/config/config";

export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	// 创建state
	state: () => {
		return {
			// 个人的用户信息
			userInfo: { id: 1, username: 'yxcr', avatar: "https://img2.baidu.com/it/u=2979343759,1090469389&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" },
			// 登录状态
			isLogin: false,
			// 生成二维码的key
			qrKey: "",
			// 主题
			themeConfig: {
				primary: DEFAULT_PRIMARY,
				// 深色模式
				isDark: false,
			},
			// 视频选集信息
			anthologyObj: {}
		}
	},
	// 计算
	getters: {
		doubleCount(state) {
			return state.count * 2
			// return this.count * 2
		},

	},
	// 方法
	actions: {
		change() {
			this.count += 2;
			this.msg = "哈哈哈"
		},
		setThemeConfig(themeConfig) {
			this.themeConfig = themeConfig;
		},
		setAnthologyObj(anthologyObj) {
			this.anthologyObj = anthologyObj
		}
	},
	// 开启数据缓存
	persist: {
		enabled: true,
		strategies: [
			{
				paths: ["themeConfig"],
				storage: localStorage,
			},
		],
	},
})

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersist);
export default pinia;
