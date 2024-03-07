export function isEmptyObject(obj: object) {
  // 当传入的不是对象或者是null/undefined时，直接返回true
  if (typeof obj !== "object" || obj === null) return true;

  // 对于Vue3响应式对象，可以通过Object.keys获取它的真实属性列表
  // 如果没有任何可枚举的自有属性，则认定对象为空
  return Object.keys(obj).length === 0;
}
