<script setup lang="ts">
const settingStore = useSettingStore();
// const state = reactive({
//   list: [],
// });
// const { list } = toRefs(state);
</script>
<template>
  <!--  1.是否播放器显示歌词-->
  <div class="setting-box flex flex-col gap-3">
    <div class="setting-item rounded-xl">
      <div>底部播放器是否显示歌词</div>
      <el-switch
        v-model="settingStore.loadLyric"
        @change="settingStore.setLoadLyric"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "setting";
</style>
