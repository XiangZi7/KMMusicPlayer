<script setup lang="ts">
import { formatTime } from '@/utils'
import { Icon } from '@iconify/vue'

const {
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  nextTrack,
  prevTrack,
  togglePlayPause,
  seek,
  setPlayMode,
} = useAudioPlayer()
</script>
<template>
  <div
    class="w-full h-[calc(80vh-8rem)] relative inset-0 px-4 flex flex-col items-center"
  >
    <div class="flex flex-1 flex-col gap-4 items-center justify-center w-full">
      <!-- 封面 -->
      <div :class="` ${isPlaying ? 'is-playing' : ''}`">
        <div class="album">
          <div class="album-art rounded-md"></div>
          <div
            class="vinyl"
            :style="{
              animationPlayState: isPlaying ? 'running' : 'paused',
            }"
          ></div>
        </div>
      </div>
      <!-- 标题类 -->
      <div class="flex flex-col items-center gap-2">
        <h2 class="text-3xl font-bold text-primary-foreground">
          {{ currentTrack.title }}
        </h2>
        <p class="text-xl text-inactive">{{ currentTrack.artist }}</p>
      </div>
      <!-- 控制区 -->
      <div class="flex gap-3 items-center justify-center">
        <el-button text circle @click="setPlayMode('order')">
          <icon-octicon:three-bars-16 class="text-lg" />
        </el-button>
        <el-button text circle @click="setPlayMode('shuffle')">
          <icon-lets-icons:sort-random class="text-lg" />
        </el-button>
        <el-button text circle @click="prevTrack" class="!p-3">
          <icon-solar:skip-previous-bold class="text-xl" />
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
        <el-button text circle class="!p-3" @click="nextTrack">
          <icon-solar:skip-previous-bold
            class="transform scale-x-[-1] text-xl"
          />
        </el-button>
        <el-button text circle @click="setPlayMode('loop')">
          <icon-cil:loop class="text-lg" />
        </el-button>
        <el-button text circle @click="setPlayMode('single')">
          <icon-cil:loop-1 class="text-lg" />
        </el-button>
      </div>
      <div class="flex gap-2 w-full items-center justify-center">
        <span class="text-xs w-10 text-foreground/50">{{
          formatTime(currentTime)
        }}</span>
        <el-slider
          v-model="currentTime"
          :show-tooltip="false"
          @change="seek"
          :max="duration"
          class="w-2/4"
          size="small"
        />
        <span class="text-xs w-10 text-foreground/50">{{
          formatTime(duration)
        }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.album {
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.65);
  height: 100%;
  position: relative;
  width: 100%;
  z-index: 10;
  border-radius: 8px;
}

// .album
.album-art {
  background: #fff var(--track-cover-url) center / cover no-repeat;
  height: 315px;
  position: relative;
  width: 325px;
  z-index: 10;
}

.vinyl {
  animation: spin 2s linear infinite;
  transition: all 500ms;
  background-image: url('@/assets/vinyl.png'), var(--track-cover-url);
  background-position: center, center;
  background-size:
    cover,
    40% auto;
  background-repeat: no-repeat;
  border-radius: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  height: 300px;
  left: 5%;
  position: absolute;
  top: 8px;
  width: 300px;
  z-index: 5;
  will-change: transform, left;

  .is-playing & {
    left: 52%;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
