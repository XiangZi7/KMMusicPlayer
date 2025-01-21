import { ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  // 从 localStorage 获取数据
  const storedValue = localStorage.getItem(key)

  // 如果存在，就返回存储的值，否则返回默认值
  const value = ref<T>(storedValue ? JSON.parse(storedValue) : defaultValue)

  // 设置值并保存到 localStorage
  const storeValue = (newValue: T) => {
    value.value = newValue
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return {
    value,
    storeValue,
  }
}
