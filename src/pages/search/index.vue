<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Songs from './songs.vue'
import Albums from './albums.vue'
import Artists from './artists.vue'
import Songlist from './songList.vue'
import MV from './mv.vue'
import { searchTabs } from '@/utils/enum'

const selected = ref('1')
</script>
<template>
  <div class="p-4 w-full h-full overflow-x-hidden flex flex-col">
    <div class="mb-2">
      <div
        class="inline-flex h-10 items-center rounded-lg bg-muted/70 p-1 text-muted-foreground w-full justify-start mb-2 overflow-x-auto"
      >
        <button
          v-for="tab in searchTabs"
          :key="tab.id"
          @click="selected = tab.id"
          :class="{
            'bg-background text-foreground shadow-sm': selected === tab.id,
          }"
          class="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <div class="w-5 h-5">
            <Icon :icon="tab.icon" class="w-full h-full" />
          </div>
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- 歌曲 -->
    <Songs :selected v-show="selected == '1'" />
    <!-- 专辑 -->
    <Albums :selected v-show="selected == '10'" />
    <!-- 艺术家 -->
    <Artists :selected v-show="selected == '100'" />
    <!-- 歌单 -->
    <Songlist :selected v-show="selected == '1000'" />
    <!-- MV -->
    <MV :selected v-show="selected == '1004'" />
  </div>
</template>
