<script setup lang="ts">
  import { MusicPlayer } from '@/hooks/interface'
  const { setVolume, volume } = inject('MusicPlayer') as MusicPlayer

  const isMuted = computed(() => volume.value === 0)

  const toggleVolume = () => {
    setVolume(isMuted.value ? 70 : 0)
  }
</script>
<template>
  <div class="flex items-center">
    <el-button text circle @click="toggleVolume">
      <icon-iconamoon:volume-off-light v-if="isMuted" />
      <icon-bi:volume-up v-else />
    </el-button>

    <el-slider
      v-model="volume"
      :show-tooltip="false"
      @change="setVolume"
      class="!w-24"
      size="small"
    />
  </div>
</template>
