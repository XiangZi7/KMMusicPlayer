/**
 * v-get-size
 * @description 获取元素的宽高
 * @return {width,height}
 * @type {{mounted(*, *): void, updated(*, *): void}}
 */
export const GetElSizeDirective = {
  // 使用 mounted 钩子函数获取元素初次插入时的宽高
  mounted(el, binding) {
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    // 检查绑定值是否为函数，若是函数，则将宽高作为参数传递
    if (typeof binding.value === "function") {
      binding.value({ width, height });
    }
  },
  // 使用 updated 钩子函数获取元素更新后的宽高
  updated(el, binding) {
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    // 类似于 mounted，检查绑定值是否为函数
    if (typeof binding.value === "function") {
      binding.value({ width, height });
    }
  },
};
