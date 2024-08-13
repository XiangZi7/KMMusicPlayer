import { ElMessage } from "element-plus";

/**
 * @description 切换主题
 * */
export const useTheme = () => {
    const themeStore = useThemeStore();
    // 切换暗黑模式
    const switchDark = () => {
        const body = document.documentElement;
        themeStore.isDark
            ? body.classList.add("dark")
            : body.classList.remove("dark");
    };

    // 修改主题颜色
    const changePrimary = (val: string) => {
        if (!val) {
            val = "#409EFF";
            ElMessage({
                type: "success",
                message: `主题颜色已重置为 #409EFF`,
            });
        }
        themeStore.setPrimary(val);
        // 颜色加深
        document.documentElement.style.setProperty(
            "--el-color-primary-dark-2",
            `${getDarkColor(themeStore.primary, 0.1)}`,
        );
        document.documentElement.style.setProperty(
            "--el-color-primary",
            themeStore.primary,
        );
        // 颜色变浅
        for (let i = 1; i <= 9; i++) {
            document.documentElement.style.setProperty(
                `--el-color-primary-light-${i}`,
                `${getLightColor(themeStore.primary, i / 10)}`,
            );
        }
    };

    onBeforeMount(() => {
        switchDark();
        changePrimary(themeStore.primary);
    });

    return {
        switchDark,
        changePrimary,
    };
};