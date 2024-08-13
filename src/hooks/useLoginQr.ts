import {
    loginQrKey,
    loginQrCreate,
    loginQrCheck,
    loginStatus,
} from "@/api";
import { QrCallback, ResLoginStatus } from "@/hooks/interface";

export function useLoginQr(qrCallback: QrCallback) {
    const qrKey = ref<string>(""); // 存储二维码 key 的响应式数据
    const qrImgUrl = ref<string>(""); // 存储二维码图片 URL 的响应式数据
    const qrStatus = ref<ResLoginStatus | null>(null); // 存储二维码当前状态的响应式数据
    let intervalId: ReturnType<typeof setInterval> | null = null; // 存放 setInterval 的标识符，用于清除轮询
    const userStore = useUserStore();
    // 获取二维码 key 的方法
    const fetchQrKey = async () => {
        try {
            const response = await loginQrKey();
            qrKey.value = response.data.unikey; // 存储获取到的 key
            return response.data.unikey;
        } catch (error) {
            console.error("获取二维码 key 失败:", error);
        }
    };

    // 根据 key 创建二维码的方法
    const createQrCode = async () => {
        try {
            const key = await fetchQrKey();
            const response = await loginQrCreate(key);
            qrImgUrl.value = response.data.qrimg; // 存储二维码图片 URL
        } catch (error) {
            console.error("创建二维码失败:", error);
        }
    };

    // 检查二维码扫描状态的方法
    const checkQrStatus = async () => {
        try {
            const response = await loginQrCheck(qrKey.value);
            qrStatus.value = response; // 更新二维码状态

            if (response.code === 800) {
                // 如果二维码过期（code 为 800），则重新获取
                clearInterval(intervalId as unknown as number); // 清除现有轮询
                await createQrCode(); // 重新获取二维码
                startPolling(); // 重新开始轮询
            } else if (response.code === 803) {
                // 如果二维码授权成功（code 为 803）停止检查二维码
                stopPolling();
                // 获取用户信息,并存储在本地
                loginStatus().then(({ data }) => {
                    const { nickname, avatarUrl, userId } = data.profile;
                    const userInfo = {
                        nickname,
                        avatarUrl,
                        userId,
                    };
                    userStore.setUserInfo(userInfo);
                    //   通知已获取到数据
                    qrCallback(true);
                });
            }
        } catch (error) {
            console.error("检查二维码状态失败:", error);
        }
    };

    // 开始轮询二维码的方法
    const startPolling = () => {
        intervalId = setInterval(() => {
            checkQrStatus();
        }, 3000); // 每1秒钟轮询一次状态
    };

    // 停止轮询二维码的方法
    const stopPolling = () => {
        if (intervalId !== null) {
            clearInterval(intervalId as unknown as number);
            intervalId = null;
        }
    };

    // 组件被加载后立刻执行，开始二维码登录流程
    onMounted(async () => {
        await createQrCode(); // 创建二维码
        startPolling(); // 开始轮询状态
    });

    // 组件卸载前执行，清理轮询
    onUnmounted(() => {
        stopPolling();
    });

    // 将定义的响应式数据和方法暴露给使用该 hook 的组件
    return { qrKey, qrImgUrl, qrStatus, stopPolling };
}