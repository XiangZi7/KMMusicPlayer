<script setup lang="ts">
import { MusicPlayer } from '@/hooks/interface'
const router = useRouter()

const audioStore = useAudioStore()

const { playSong } = inject('MusicPlayer') as MusicPlayer

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
  <el-popover :width="450" trigger="click" placement="top-end">
    <div class="py-4">
      <h1 class="text-2xl font-bold mb-4 dark:text-white">最近播放 <span class="text-base">({{ audioStore.trackList.length }})</span></h1>
      <el-scrollbar class="!h-[300px]">
        <ul class="space-y-1">
          <li
            v-for="(song, index) in audioStore.trackList"
            :key="index"
            class="flex items-center px-4 py-1 hover:bg-gray-300 dark:hover:bg-[#414243] rounded-lg transition justify-between"
            @click="playMusic(song.id)"
          >
            <div class="flex items-center">
              <img
                :src="song.cover + '?param=90y90'"
                :alt="song.title"
                class="w-8 h-8 rounded-lg mr-4"
              />
              <div>
                <h2 class="text-sm font-semibold dark:text-white">
                  {{ song.title }}
                </h2>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ song.singer }}
                </p>
              </div>
            </div>

            <div class="flex items-center">
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
            </div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
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
