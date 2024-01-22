<script setup lang="ts">
import { MusicPlayer } from "@/hooks/type";

// 使用 inject 并设置一个合适的默认值，或者校验是否 undefined
const musicPlayer = inject<MusicPlayer>("musicPlayer");

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
} = musicPlayer;

function FormattingTime(time: number) {
  return formatTime(time);
}

const Emit = defineEmits(["showDrawer"]);
function HandleShowDrawer() {
  Emit("showDrawer");
}
</script>
<template>
  <div class="music-player">
    <div class="cover-info yx-col-8">
      <div class="cover cursor-pointer">
        <img
          :src="currentTrackSong.cover"
          :alt="currentTrackSong.title"
          @click="HandleShowDrawer"
        />
      </div>
      <div class="song-info">
        <div class="song-title">{{ currentTrackSong.title }}</div>
        <div class="artist flex items-center h-[50px]">
          {{ currentTrackSong.singer }}
          <div class="ml-3 Lyric">
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
      <div class="w-[120px] flex">
        <i-material-symbols:volume-up class="text-2xl mr-1" />
        <el-slider v-model="volume" @change="setVolume" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "Km-Player";
</style>
