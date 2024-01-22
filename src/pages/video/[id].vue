<script setup>
import { mvUrl } from "@/api";
const route = useRoute();
const state = reactive({
  mvSrc: "",
});
const { mvSrc } = toRefs(state);
watch(
  () => route.query.id,
  () => {
    console.log(route);
    mvUrl(route.params.id).then(({ data }) => {
      state.mvSrc = data.url;
    });
  },
  { immediate: true },
);
</script>
<template>
  <div>
    <video :src="mvSrc" controls loop class="rounded-xl" />
  </div>
</template>
<style lang="scss" scoped></style>
