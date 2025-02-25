<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Recently from './recently.vue'
const { volume, setVolume, setPlayMode } = useAudioPlayer()

const isMuted = computed(() => volume.value === 0)

const toggleVolume = () => {
  setVolume(isMuted.value ? 0.5 : 0)
}
</script>
<template>
  <div class="flex items-center pr-4">
    <div class="flex items-center ml-2">
      <button
        class="p-2 rounded-full hover:bg-hoverMenuBg transition w-9 h-9"
        @click="setPlayMode('order')"
      >
        <icon-octicon:three-bars-16 class="w-full h-full" />
      </button>
      <button
        class="p-2 rounded-full hover:bg-hoverMenuBg transition w-9 h-9"
        @click="setPlayMode('shuffle')"
      >
        <icon-lets-icons:sort-random class="w-full h-full" />
      </button>
      <button
        class="p-2 rounded-full hover:bg-hoverMenuBg transition w-9 h-9"
        @click="setPlayMode('loop')"
      >
        <icon-cil:loop class="w-full h-full" />
      </button>
      <button
        class="p-2 rounded-full hover:bg-hoverMenuBg transition w-9 h-9"
        @click="setPlayMode('single')"
      >
        <icon-cil:loop-1 class="w-full h-full" />
      </button>
    </div>
    <button
      @click="toggleVolume"
      class="p-2 rounded-full hover:bg-hoverMenuBg transition w-9 h-9"
    >
      <Icon
        :icon="isMuted ? 'ic:round-volume-off' : 'ic:round-volume-up'"
        class="w-full h-full"
      />
    </button>
    <el-slider
      v-model="volume"
      :show-tooltip="false"
      @change="setVolume"
      class="!w-24"
      size="small"
      :max="100"
    />
    <Recently />
  </div>
</template>
<style lang="scss">
.el-slider__button-wrapper {
  display: none !important;
}
</style>
