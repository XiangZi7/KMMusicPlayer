import { ElNotification } from 'element-plus'

export const showNotification = (
  title: string,
  message: string,
  type: 'error' | 'warning' | 'success' = 'error'
) => {
  ElNotification({
    title,
    message,
    type,
  })
}
