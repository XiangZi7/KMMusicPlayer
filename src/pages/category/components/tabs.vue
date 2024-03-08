<script setup lang="ts">
const ModelValue = defineModel<string>();
const tabElements = ref([]); // 用于引用所有选项卡元素的数组
const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
});
const { tabs } = toRefs(props);

const highlightStyle = reactive({
  width: "0px",
  left: "0px",
  opacity: 0,
  height: "0px",
}); // 添加 top 属性并初始化
onMounted(() => {
  switchTab(ModelValue.value as string);
});

function switchTab(tab: string) {
  ModelValue.value = tab;
  const activeIndex = tabs.value.findIndex((item) => item === tab);
  const activeElement: HTMLElement = tabElements.value[activeIndex]; // 通过索引访问特定DOM元素
  if (activeElement) {
    highlightStyle.width = `${activeElement.offsetWidth}px`;
    highlightStyle.height = `${activeElement.offsetHeight}px`;
    highlightStyle.left = `${activeElement.offsetLeft}px`;
    highlightStyle.opacity = 1; // 初始化时设置不透明度
  }
}
</script>
<template>
  <!-- Tabs 容器 -->
  <div class="flex justify-around mt-2 items-center h-[55px] relative">
    <!-- 背景元素，应用动态样式 -->
    <div
      class="absolute transition-all duration-300 rounded-3xl bg-white/30 border shadow-sm backdrop-filter backdrop-blur-lg"
      :style="highlightStyle"
    ></div>
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      ref="tabElements"
      class="cursor-pointer hover:text-white px-6 py-2 relative z-10"
      :class="{
        'text-white': ModelValue === tab,
        'text-gray-200': ModelValue !== tab,
      }"
      @click="switchTab(tab)"
    >
      <span>{{ tab }}</span>
    </div>
  </div>
</template>
