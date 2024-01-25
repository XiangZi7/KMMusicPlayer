<script setup lang="ts">
import { mvFirst } from "@/api";
import { useRouter } from "vue-router";
import { MV } from "@/pages/video/interface";

const router = useRouter();
const state = reactive({
  list: [] as MV[],
});
const { list } = toRefs(state);

onMounted(() => {
  mvFirst().then(({ data }) => {
    state.list = data;
  });
});

function playMV(id: number) {
  router.push({ path: `/video/${id}` });
}
</script>
<template>
  <div class="mv-container">
    <div
      v-for="item in list"
      :key="item.id"
      class="item-mv"
      @click="playMV(item.id)"
    >
      <div class="mv-cover">
        <img :src="item.cover + '?param=400y200'" :alt="item.name" />
      </div>
      <h2 class="mv-title">
        <div class="text-[14px]">{{ item.name }}</div>
      </h2>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mv-container {
  display: grid; /* 使用 Grid 布局 */
  grid-template-columns: repeat(
    auto-fill,
    minmax(320px, 1fr)
  ); /* 歌单项的最小宽度是 120px，1fr 表示自适应填充 */
  gap: 15px; /* 设置歌单项之间的间距 */
}

.item-mv {
  display: flex; /* 使用 Flex 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  padding: 10px; /* 内边距 */
  transition: transform 0.2s; /* 添加 hover 效果的动画 */
  flex-direction: column;
}

.mv-cover {
  width: 100%;
  border-radius: 8px;
  max-height: 200px;
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: block;
  text-decoration: none;
  color: inherit;
}

.mv-cover:hover,
.mv-cover:focus {
  transform: scale(1.03);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.mv-title {
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
  transition: color 0.3s ease;
}
</style>
