<script setup lang="ts">
import { Icon } from '@iconify/vue'
import localhostSong from './components/localhostSong.vue'
import Volume from './components/volume.vue'
import { MusicPlayer } from '@/hooks/interface'
import { PlayMode } from '@/enum'

const {
  currentSong,
  togglePlayPause,
  isPlaying,
  playNext,
  playPrevious,
  currentTime,
  duration,
  changeCurrentTime,
  setPlayMode,
} = inject('MusicPlayer') as MusicPlayer

const Emit = defineEmits(['show'])

// 格式化时间
function formatTime(seconds: number): string {
  // 将秒数转换为整数分钟数和剩余秒数
  const min = Math.floor(seconds / 60)
  const sec = Math.floor(seconds % 60)

  // 返回格式化的字符串，确保分钟和秒数都至少有两位数
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}
</script>
<template>
  <footer class="border-t shadow-sm dark:border-gray-600">
    <div class="mx-auto flex items-center justify-between px-4 py-2">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 w-[240px]">
          <el-image
            :src="currentSong.cover"
            alt="Album cover"
            class="rounded-md w-9 h-9"
            style="aspect-ratio: 40 / 40; object-fit: cover"
            @click="Emit('show')"
          />
          <div>
            <div
              class="text-sm font-medium line-clamp-1 dark:text-gray-200"
              :title="currentSong.title"
            >
              {{ currentSong.title }}
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">
              {{ currentSong.singer }}
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <el-button text circle @click="playPrevious" class="!p-3">
            <icon-solar:skip-previous-bold class="text-lg" />
          </el-button>
          <el-button text circle class="!p-3" @click="togglePlayPause">
            <Icon
              :icon="
                isPlaying
                  ? 'ic:round-pause-circle'
                  : 'material-symbols:play-circle'
              "
              class="text-3xl"
            />
          </el-button>
          <el-button text circle class="!p-3" @click="playNext">
            <icon-solar:skip-previous-bold
              class="transform scale-x-[-1] text-lg"
            />
          </el-button>
          <el-button text circle class="!p-3">
            <Icon
              :icon="isPlaying ? 'mdi:cards-heart' : 'mdi:cards-heart-outline'"
              class="text-lg"
              :class="isPlaying ? 'text-red-500' : ''"
            />
          </el-button>
        </div>
      </div>
      <div class="flex-1 mx-4 flex gap-3 w-full items-center">
        <el-slider
          v-model="currentTime"
          :show-tooltip="false"
          @change="changeCurrentTime"
          :max="duration"
          class="w-full"
          size="small"
        />
        <div
          class="flex items-center gap-2 text-gray-500 text-xs dark:text-gray-400"
        >
          <span>{{ formatTime(currentTime) }}</span>
          <span>/</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>
      <div class="flex items-center">
        <el-button text circle @click="setPlayMode(PlayMode.Sequence)">
          <icon-octicon:three-bars-16 />
        </el-button>
        <el-button text circle @click="setPlayMode(PlayMode.Random)">
          <icon-lets-icons:sort-random />
        </el-button>
        <el-button text circle @click="setPlayMode(PlayMode.Loop)">
          <icon-cil:loop />
        </el-button>
        <el-button text circle @click="setPlayMode(PlayMode.Single)">
          <icon-cil:loop-1 />
        </el-button>
        <Volume />
        <localhostSong />
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.el-button + .el-button {
  margin-left: 0;
}
</style>
