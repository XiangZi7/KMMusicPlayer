interface Options {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
    pageSize: number;
    initialPageNum: number;
}
// eslint-disable-next-line no-unused-vars
type Callback = (pageNum: number, pageSize: number) => void;

export function useIntersectionObserver(
    elementRef: Ref<Element | undefined | Element[]>,
    {
        threshold = 0.1,
        root = null,
        rootMargin = "0px",
        pageSize,
        initialPageNum,
    }: Options,
    callback: Callback,
) {
    const pageNum = ref(initialPageNum ?? 1);
    const isLastElementMap = new Map<Element, boolean>();

    // 创建IntersectionObserver实例
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                const element = entry.target;
                if (entry.isIntersecting) {
                    // 元素进入视口后的动画处理
                    // element.classList.remove("opaque");
                    // element.classList.add("come-in");

                    // 检查当前元素是否为数组中的最后一个元素
                    const isLastElement = isLastElementMap.get(element) || false;
                    if (isLastElement) {
                        callback(pageNum.value, pageSize);
                        pageNum.value++; // 只有最后一个元素触发时页码自增
                        // 如果需要，可以在这里取消该元素的观察
                        observer.unobserve(element);
                    }
                }
            });
        },
        { threshold, root, rootMargin },
    );

    watchEffect(() => {
        observer.disconnect();
        isLastElementMap.clear();

        const elements = Array.isArray(elementRef.value)
            ? elementRef.value
            : [elementRef.value];
        const lastElementIndex = elements.length - 1;

        elements.forEach((el, index) => {
            if (el) {
                // 初始化时添加opaque类
                // el.classList.add("opaque");
                observer.observe(el);
                // 标记当前元素是否为数组中的最后一个元素
                const isLastElement = index === lastElementIndex;
                isLastElementMap.set(el, isLastElement);
            }
        });
    });

    onUnmounted(() => {
        observer.disconnect();
        isLastElementMap.clear();
    });

    return { pageNum };
}