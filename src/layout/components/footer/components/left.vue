<script setup lang="ts">
const { currentTrack, currentLyricIndex } = useAudioPlayer()
const showDrawerMusic = ref(false)
</script>
<template>
  <div class="flex items-center gap-2 w-64">
    <div class="min-w-14 max-w-14 h-full">
      <img
        @click="showDrawerMusic = !showDrawerMusic"
        :src="currentTrack.cover + '?param=90y90'"
        :alt="currentTrack.title"
        class="w-full h-full object-cover"
      />
    </div>
    <div>
      <div
        class="text-sm text-primary-foreground line-clamp-1"
        :title="currentTrack.title"
      >
        {{ currentTrack.title }}
      </div>
      <div class="text-xs text-muted-foreground line-clamp-1 h-4">
        {{ currentTrack.lyrics?.lines[currentLyricIndex]?.lrc || '...' }}
      </div>
    </div>
    <DrawerMusic v-model="showDrawerMusic" />
  </div>
</template>
