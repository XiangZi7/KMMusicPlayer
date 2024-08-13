<script setup lang="ts">
import { MusicPlayer } from '@/hooks/interface'

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
      <h1 class="text-2xl font-bold mb-4">最近播放</h1>
      <ul class="space-y-1">
        <li
          v-for="(song, index) in audioStore.trackList"
          :key="index"
          class="flex items-center px-4 bg-white py-1 hover:bg-gray-300 rounded-lg"
          @click="playMusic(song.id)"
        >
          <img
            :src="song.cover + '?param=90y90'"
            :alt="song.title"
            class="w-8 h-8 rounded-lg mr-4"
          />
          <div>
            <h2 class="text-sm font-semibold">{{ song.title }}</h2>
            <p class="text-gray-600">{{ song.singer }}</p>
          </div>
        </li>
      </ul>
    </div>
    <template #reference>
      <el-button text circle>
        <icon-icon-park-outline:music-list />
      </el-button>
    </template>
  </el-popover>
</template>
