<script setup lang="ts">
import { MusicPlayer } from "@/hooks/type";

const MusicStore = useMusicStore();
// 使用 inject 并设置一个合适的默认值，或者校验是否 undefined
const musicPlayer = inject<MusicPlayer>("musicPlayer");
// 确保 musicPlayer 不是 undefined
if (!musicPlayer) {
  // 提供了错误处理
  throw new Error("musicPlayer is not provided.");
}

const { currentTrackIndex } = musicPlayer;

function ListFormattingTime(time: number) {
  return formatTimes(time);
}
</script>
<template>
  <div class="flex items-center justify-between pt-2 pb-2">
    <div>当前播放：</div>
    <div class="cursor-pointer" @click="MusicStore.clearAllSong">清空</div>
  </div>
  <el-scrollbar height="400">
    <div
      v-for="(item, idx) in MusicStore.trackList"
      :key="item.id"
      class="loader items-center px-2"
      :class="{ activity: currentTrackIndex == idx }"
      @dblclick="MusicStore.setCurrentIndex(idx)"
    >
      <div
        v-if="currentTrackIndex == idx"
        class="loading h-full items-center w-6 justify-center mr-2"
      >
        <div class="load"></div>
        <div class="load"></div>
        <div class="load"></div>
        <div class="load"></div>
      </div>
      <div v-else class="w-6 items-center flex justify-center mr-2">
        {{ idx + 1 }}
      </div>
      <div class="flex gap-2">
        <el-avatar :src="item.cover + '?param=50y50'" shape="square" />
        <div class="song">
          <p class="name">{{ item.title }}</p>
          <p class="artist">{{ item.singer }}</p>
        </div>
      </div>
      <div class="ml-auto pr-2">{{ ListFormattingTime(item.time) }}</div>
    </div>
  </el-scrollbar>
</template>
<style lang="scss" scoped>
.loader {
  display: flex;
  flex-direction: row;
  height: 4em;
  border-radius: 10px;
  transition: 0.4s ease-in-out;
}

.loader:hover {
  cursor: pointer;
  background-color: lightgray;
}

.activity {
  background-color: lightgray;
}

.currentplaying {
  display: flex;
  margin: 1em;
}

.spotify {
  width: 50px;
  height: 50px;
  margin-right: 0.6em;
}

.heading {
  color: black;
  font-size: 1.1em;
  font-weight: bold;
  align-self: center;
}

.loading {
  display: flex;
  transform: rotate(180deg);
}

.load {
  width: 2px;
  height: 33px;
  background-color: limegreen;
  animation: 1s move6 infinite;
  border-radius: 5px;
  margin: 0.1em;
}

.load:nth-child(1) {
  animation-delay: 0.2s;
}

.load:nth-child(2) {
  animation-delay: 0.4s;
}

.load:nth-child(3) {
  animation-delay: 0.6s;
}

.play {
  position: relative;
  left: 0.35em;
  height: 1.6em;
  width: 1.6em;
  clip-path: polygon(50% 50%, 100% 50%, 75% 6.6%);
  background-color: black;
  transform: rotate(-90deg);
  align-self: center;
  margin-top: 0.7em;
  justify-self: center;
}

.song {
  position: relative;
  color: black;
  align-self: center;
}

.artist {
  font-size: 0.6em;
}

@keyframes move6 {
  0% {
    height: 0.2em;
  }

  25% {
    height: 0.7em;
  }

  50% {
    height: 1.5em;
  }

  100% {
    height: 0.2em;
  }
}
</style>
