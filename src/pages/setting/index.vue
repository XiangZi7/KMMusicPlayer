<script setup lang="ts">
const settingStore = useSettingStore();
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
    <div class="setting-item rounded-xl">
      <div>播放器切换成音频可视化</div>
      <el-switch
        v-model="settingStore.audioVisual"
        :disabled="true"
        @change="settingStore.setAudioVisua"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "setting";
</style>
