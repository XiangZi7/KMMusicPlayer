import { DirectiveBinding } from 'vue'

export const lazyLoad = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    const options: IntersectionObserverInit = {
      root: null, // 交叉观察的根元素
      rootMargin: '0px', // 根元素的外边距
      threshold: 0.1, // 触发交叉观察的阈值
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 当元素进入视口时，设置真实的图片 URL
          el.src = binding.value as string // binding.value 存储了图片的 URL
          observer.unobserve(el) // 移除观察
        }
      })
    }, options)

    observer.observe(el) // 开始观察 el
  },
}
