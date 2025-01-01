import { useDebounceFn } from '@vueuse/core'

export function createDebouncedFunction(callback: () => void, delay: number) {
  return useDebounceFn(callback, delay)
}
