// 我们创建了一个自定义的Hooks函数useObserver，用于设置Intersection Observer来观察DOM元素
import { WatchStopHandle } from "vue";

export const useObserver = (
  observer_item: Ref<Element[]>, // 接收一个Vue Ref，包含要观察的DOM元素数组
  // eslint-disable-next-line no-unused-vars
  dataCallback: (page: number) => void, // 当加载新数据时调用的回调函数
) => {
  // 当元素进入视口时调用的IntersectionObserver的回调函数
  const observerCallback: IntersectionObserverCallback = (
    entries,
    observer,
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 如果元素可见
        const element = entry.target;
        loadData(element); // 加载附加数据
        // 元素进入视口后动画处理：移除opaque类，添加come-in类
        element.classList.remove("opaque");
        element.classList.add("come-in");
        observer.unobserve(element); // 停止观察进入视口的元素
      }
    });
  };

  // 创建IntersectionObserver实例
  const observer = new IntersectionObserver(observerCallback);

  // 当前页码状态
  const currentPage: Ref<number> = ref(1);

  // 加载数据函数，判断当前元素是否是数组中的最后一个，如果是，则调用dataCallback以获取更多数据
  function loadData(element: Element): void {
    if (element === observer_item.value[observer_item.value.length - 1]) {
      currentPage.value++; // 递增当前页码
      dataCallback(currentPage.value); // 通过回调函数加载数据
    }
  }

  // 当观察元素组长度变化时，添加新的元素至IntersectionObserver
  const stopWatch: WatchStopHandle = watch(
    () => observer_item.value.length,
    (newLength, oldLength) => {
      // 对新增的元素添加观察
      observer_item.value.slice(oldLength).forEach((el) => {
        el.classList.add("opaque"); // 初始化时添加opaque类
        observer.observe(el); // 观察新元素
      });
    },
  );

  // 返回当前页码状态
  return {
    currentPage,
    stopWatch, // 返回Watcher停止函数，以便外部可以停止监听
  };
};
