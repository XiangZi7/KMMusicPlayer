import { ElNotification } from 'element-plus'

export const showNotification = (title: string, message: string, type: 'error' | 'warning' = 'error') => {
  ElNotification({
    title,
    message,
    type,
  })
} 
