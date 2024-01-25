<script setup lang="ts">
import { MusicPlayer } from "@/hooks/type";
import { formatTimes } from "@/utils/timeUtils";

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
} = musicPlayer;

const MusicStore = useMusicStore();

function FormattingTime(time: number) {
  return formatTime(time);
}
function ListFormattingTime(time: number) {
  return formatTimes(time);
}

const Emit = defineEmits(["showDrawer"]);

function HandleShowDrawer() {
  Emit("showDrawer");
}

// 根据下标，删除歌曲
function deleteSong(idx: number) {
  MusicStore.trackList.splice(idx, 1);
}
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
        <el-popover placement="top-start" :width="500" trigger="click">
          <template #reference>
            <i-streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger
              class="ml-3 text-2xl"
            />
          </template>
          <div class="flex items-center justify-between pt-2 pb-2">
            <div>当前播放：</div>
            <div class="cursor-pointer" @click="MusicStore.clearAllSong">
              清空
            </div>
          </div>
          <el-scrollbar height="400">
            <el-row
              v-for="(item, idx) in MusicStore.trackList"
              :key="item.id"
              :gutter="24"
              class="pt-3 pb-3 pl-1 pr-1 items-center current-item"
            >
              <el-col :span="9">
                <div class="flex items-center gap-2 text-ellipsis">
                  {{ idx + 1 }} .
                  <el-avatar :src="item.cover + '?param=50y50'" size="small" />
                  {{ item.title }}
                </div>
              </el-col>
              <el-col :span="6">
                <div class="text-ellipsis">{{ item.singer }}</div>
              </el-col>
              <el-col :span="6">
                <div>{{ ListFormattingTime(item.time) }}</div>
              </el-col>
              <el-col :span="3">
                <i-material-symbols:delete-outline
                  class="delete-icon"
                  @click="deleteSong(idx)"
                />
              </el-col>
            </el-row>
          </el-scrollbar>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "Km-Player";
</style>
