<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { formatTime } from '@/utils'
const {
  isPlaying,
  currentTime,
  duration,
  nextTrack,
  prevTrack,
  togglePlayPause,
  seek,
} = useAudioPlayer()
</script>
<template>
  <div class="flex items-center flex-1">
    <div class="flex items-center mr-2">
      <button
        @click="prevTrack"
        class="p-2 rounded-full hover:bg-hoverMenuBg transition"
      >
        <icon-solar:skip-previous-bold class="text-lg" />
      </button>
      <button
        @click="togglePlayPause"
        class="p-2 rounded-full hover:bg-hoverMenuBg transition"
      >
        <Icon
          :icon="
            isPlaying ? 'ic:round-pause-circle' : 'material-symbols:play-circle'
          "
          class="text-3xl"
        />
      </button>
      <button
        @click="nextTrack"
        class="p-2 rounded-full hover:bg-hoverMenuBg transition"
      >
        <icon-solar:skip-previous-bold class="transform scale-x-[-1] text-lg" />
      </button>
      <button class="p-2 rounded-full hover:bg-hoverMenuBg transition">
        <icon-mdi:cards-heart class="text-lg text-red-500" />
      </button>
    </div>
    <div class="w-full flex items-center space-x-2">
      <el-slider
        v-model="currentTime"
        :step="1"
        :show-tooltip="false"
        @change="seek"
        :max="duration"
        class="w-full"
        size="small"
      />
      <span class="text-xs">{{ formatTime(currentTime) }}</span>
      <span> / </span>
      <span class="text-xs">{{ formatTime(duration) }}</span>
    </div>
  </div>
</template>
