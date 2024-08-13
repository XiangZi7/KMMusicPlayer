import { defineStore } from "pinia";
import { userModel, UserState } from "../interface";
import piniaPersistConfig from "@/config/piniaPersist";
export const useUserStore = defineStore({
    id: "useUserStore",
    state: (): UserState => {
        return {
            userInfo: {},
        };
    },
    actions: {
        setUserInfo(userInfo: userModel) {
            this.userInfo = userInfo;
        },
    },
    persist: piniaPersistConfig("UserStore"),
});