<script setup lang="ts">
import { MusicPlayer } from "@/hooks/type";
import CilLoop1 from "~icons/cil/loop-1";
import IcSharpReorder from "~icons/ic/sharp-reorder";
import LetsIconsSortRandom from "~icons/lets-icons/sort-random";
import Popover from "./components/popover.vue";
// 使用 inject 并设置一个合适的默认值，或者校验是否 undefined
const musicPlayer = inject<MusicPlayer>("musicPlayer");
const settingStore = useSettingStore();
// 确保 musicPlayer 不是 undefined
if (!musicPlayer) {
  // 提供了错误处理
  throw new Error("musicPlayer is not provided.");
}

const {
  currentTrackSong,
  currentTime,
  duration,
  volume,
  isPlaying,
  LyricList,
  currentLyricIndex,
  changeCurrentTime,
  setVolume,
  play,
  pause,
  prevTrack,
  nextTrack,
  changePlayMode,
  playMode,
} = musicPlayer;

function FormattingTime(time: number) {
  return formatTime(time);
}

const Emit = defineEmits(["showDrawer"]);

function HandleShowDrawer() {
  Emit("showDrawer");
}

// 计算当前应当使用的组件
const currentPlayModeIcon = computed(() => {
  switch (playMode.value) {
    case 0:
      return IcSharpReorder;
    case 1:
      return CilLoop1;
    case 2:
      return LetsIconsSortRandom;
    default:
      return null; // 如果没有匹配的播放模式，可以返回null或默认的图标
  }
});
</script>
<template>
  <div class="music-player">
    <div class="cover-info yx-col-8">
      <div class="cover cursor-pointer">
        <el-image
          lazy
          :src="currentTrackSong?.cover + '?param=150y150'"
          :alt="currentTrackSong?.title"
          @click="HandleShowDrawer"
        />
      </div>
      <div class="song-info">
        <div class="song-title">{{ currentTrackSong?.title }}</div>
        <div class="artist flex items-center h-[50px]">
          {{ currentTrackSong?.singer }}
          <div v-if="settingStore?.loadLyric" class="ml-3 Lyric">
            <div>{{ LyricList[currentLyricIndex]?.lrc }}</div>
            <div>{{ LyricList[currentLyricIndex]?.tlyric }}</div>
          </div>
        </div>
      </div>
    </div>
    <!--  controls  -->
    <div class="controls items-center yx-col-8">
      <div class="flex text-xl items-center gap-2">
        <i-fluent:previous-32-filled @click="prevTrack" />
        <i-material-symbols:play-circle-rounded
          v-if="!isPlaying"
          class="text-3xl"
          @click="play"
        />
        <i-material-symbols:pause-circle
          v-else
          class="text-3xl"
          @click="pause"
        />
        <i-fluent:previous-32-filled class="trfo" @click="nextTrack" />
        <component :is="currentPlayModeIcon" @click="changePlayMode" />
      </div>
      <div class="flex items-center gap-3 slider-box w-full">
        <span class="text-sm left text-[var(--prism-color)]">{{
          FormattingTime(currentTime)
        }}</span>
        <el-slider
          v-model="currentTime"
          :max="duration"
          :show-tooltip="false"
          @change="changeCurrentTime"
        />
        <span class="text-sm right text-[var(--prism-color)]">{{
          FormattingTime(duration)
        }}</span>
      </div>
    </div>

    <div class="volume flex items-center yx-col-offset-4 yx-col-4">
      <div class="w-[120px] flex items-center">
        <i-material-symbols:volume-up class="text-2xl mr-1" />
        <el-slider v-model="volume" @change="setVolume" />
        <el-popover
          :popper-style="{ padding: 5 + 'px', borderRadius: 10 + 'px' }"
          placement="top-start"
          :width="400"
          trigger="click"
        >
          <template #reference>
            <i-streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger
              class="ml-3 text-2xl"
            />
          </template>
          <Popover />
        </el-popover>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "Km-Player";
</style>
