<script setup lang="ts">
import { mvFirst } from "@/api";
import { useRouter } from "vue-router";
const router = useRouter();
const state = reactive({
  list: [],
});
const { list } = toRefs(state);

onMounted(() => {
  mvFirst().then(({ data }) => {
    console.log(data);
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
        <h3>{{ item.name }}</h3>
      </h2>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mv-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.item-mv {
  width: 300px;
  height: 200px;
  max-width: 300px;
  max-height: 200px;
  flex: 0 0 auto;
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
