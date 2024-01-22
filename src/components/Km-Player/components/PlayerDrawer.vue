<script setup lang="ts">
// const state = reactive({
//   list: [],
// })
// const {
// list,
// }= toRefs(state)
// 使用 inject 并设置一个合适的默认值，或者校验是否 undefined
import { MusicPlayer } from "@/hooks/type";

const musicPlayer = inject<MusicPlayer>("musicPlayer");

// 确保 musicPlayer 不是 undefined
if (!musicPlayer) {
  // 提供了错误处理
  throw new Error("musicPlayer is not provided.");
}

const {
  LyricList,
  currentLyricIndex,
  lyricTranslateY,
  currentTrackSong,
  isPlaying,
} = musicPlayer;
const ModelValue = defineModel();
</script>
<template>
  <el-drawer
    v-model="ModelValue"
    :style="{ '--track-cover-url': `url(${currentTrackSong.cover})` }"
    style="box-shadow: none"
    destroy-on-close
    :modal="false"
    title=""
    class="drawer-bg"
    direction="ttb"
    size="89.6%"
  >
    <div class="flex min-w-0" style="flex-flow: row wrap">
      <!--  left  -->
      <div class="yx-col-12">
        <div class="flex items-center justify-center h-full relative">
          <el-image
            style="height: 350px; width: 350px"
            lazy
            loading="lazy"
            class="z-20"
            :src="currentTrackSong.cover + '?param=500y500'"
          />
          <img
            :style="{ animationPlayState: isPlaying ? 'running' : 'paused' }"
            src="@/assets/vinyl.png"
            class="w-[350px] h-[350px] absolute right-[-15px] z-10 rotate"
          />
        </div>
      </div>
      <!--  right  -->
      <div class="yx-col-12">
        <div class="lyrics-container">
          <ul :style="{ transform: `translateY(${lyricTranslateY}px)` }">
            <li
              v-for="(item, index) in LyricList"
              :key="index"
              :class="{ highlight: index === currentLyricIndex }"
            >
              <div>{{ item.lrc }}</div>
              <div>{{ item.tlyric }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<style lang="scss" scoped>
@use "./playerDrawer";
</style>
