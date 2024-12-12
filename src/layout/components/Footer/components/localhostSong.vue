<script setup lang="ts">
  import { MusicPlayer } from '@/hooks/interface'
  import { formatMillisecondsToTime } from '@/utils/time'
  import Waveform from '@/layout/components/Footer/components/Waveform.vue'

  const router = useRouter()

  const audioStore = useAudioStore()

  const { playSong } = inject('MusicPlayer') as MusicPlayer

  const mouseOverIndex = ref(-1) // 用于跟踪鼠标悬停的索引

  const playMusic = (id: number | string) => {
    const existingIndex = audioStore.trackList.findIndex(
      (existingTrack) => existingTrack.id === id
    )
    const existingTrack = audioStore.trackList[existingIndex]
    audioStore.setCurrentSong(existingIndex)
    playSong(existingTrack)
  }
</script>
<template>
  <el-popover
    :width="450"
    trigger="click"
    placement="top-end"
    popper-class="!rounded-lg !p-0"
  >
    <div class="py-4">
      <div class="flex items-center justify-between px-4">
        <div class="flex items-center">
          <h1 class="text-xl font-bold mb-4 dark:text-white">
            最近播放
            <span class="text-base">({{ audioStore.trackList.length }})</span>
          </h1>
        </div>
        <div
          class="flex items-center cursor-pointer"
          @click="audioStore.clearAllSong"
        >
          <icon-material-symbols:delete-outline-rounded
            class="text-lg text-gray-500"
          />
          清空
        </div>
      </div>

      <el-scrollbar class="!h-[300px] px-4">
        <ul class="space-y-1">
          <li
            v-for="(song, index) in audioStore.trackList"
            :key="index"
            :class="`flex items-center truncate px-4 py-1 hover:bg-gray-300 ${audioStore.currentSongIndex == index ? 'bg-gray-300' : ''} dark:hover:bg-[#414243] rounded-lg transition justify-between`"
            @dblclick="playMusic(song.id)"
            @mouseover="mouseOverIndex = index"
            @mouseleave="mouseOverIndex = -1"
          >
            <div class="flex items-center">
              <img
                :src="song.cover + '?param=90y90'"
                :alt="song.title"
                class="w-8 h-8 rounded-lg mr-4"
              />
              <div>
                <h2
                  class="text-sm font-semibold dark:text-white"
                  :title="song.title"
                >
                  {{ song.title }}
                </h2>
                <p
                  class="text-gray-600 dark:text-gray-400"
                  :title="song.singer"
                >
                  {{ song.singer }}
                </p>
              </div>
            </div>

            <!-- 默认显示时间 -->
            <div v-show="mouseOverIndex !== index" class="flex items-center">
              <Waveform v-if="audioStore.currentSongIndex == index" />
              {{ formatMillisecondsToTime(song.time) }}
            </div>
            <!-- 高亮显示图标 -->
            <div class="flex items-center" v-show="mouseOverIndex == index">
              <el-button type="primary" text circle @click="playMusic(song.id)">
                <icon-mingcute:play-circle-line class="text-lg text-gray-500" />
              </el-button>
              <el-button
                type="primary"
                text
                circle
                v-if="song.mv && song.mv !== 0"
                @click="router.push(`/video?id=${song.mv}`)"
              >
                <icon-solar:video-frame-linear class="text-lg text-gray-500" />
              </el-button>
              <el-button
                type="primary"
                text
                circle
                @click="audioStore.deleteTrack(song.id)"
              >
                <icon-material-symbols:delete-outline-rounded
                  class="text-lg text-gray-500"
                />
              </el-button>
            </div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <!-- 显示的图标 -->
    <template #reference>
      <el-button text circle>
        <icon-icon-park-outline:music-list class="dark:text-white" />
      </el-button>
    </template>
  </el-popover>
</template>
<style scoped>
  .el-button + .el-button {
    margin-left: 0;
  }
</style>
