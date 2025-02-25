import { ElMessage } from 'element-plus'
/**
 * @description 切换主题
 * */
export const useTheme = () => {
    const theme = themeStore()
    // 修改主题颜色
    const changePrimary = (val: string) => {
        if (!val) {
            val = '#7E22CE'
            ElMessage({
                type: 'success',
                message: `主题颜色已重置为 #7E22CE`,
            })
        }
        theme.setPrimary(val)
        // 颜色加深
        document.documentElement.style.setProperty(
            '--el-color-primary-dark-2',
            `${getDarkColor(theme.primary, 0.1)}`
        )
        document.documentElement.style.setProperty(
            '--el-color-primary',
            theme.primary
        )
        document.documentElement.style.setProperty(
            '--primary',
            theme.primary
        )
        // 颜色变浅
        for (let i = 1; i <= 9; i++) {
            document.documentElement.style.setProperty(
                `--el-color-primary-light-${i}`,
                `${getLightColor(theme.primary, i / 10)}`
            )
        }
    }

    onBeforeMount(() => {
        changePrimary(theme.primary)
    })

    return {
        changePrimary,
    }
}