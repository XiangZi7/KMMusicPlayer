<script setup lang="ts">
import { playlistDetail } from '@/api'
import { playlistDetailResponse } from '@/api/interface'
const route = useRoute()

const state = reactive({
  playlistData: {
    playlist: {
      tracks: [],
    },
  } as unknown as playlistDetailResponse,
})
const { playlistData } = toRefs(state)

onMounted(() => {
  playlistDetail(route.query.id as string).then((res) => {
    state.playlistData = res
  })
})

function formatNumber(num: number): string {
  if (num < 10000) {
    return num.toString() // 直接返回小于10000的数字
  } else if (num < 100000) {
    const formatted = (num / 10000).toFixed(1)
    return formatted.endsWith('.0')
      ? formatted.slice(0, -2) + '万'
      : formatted + '万' // 处理 1.0万 和 1.5万
  } else {
    return (num / 10000).toFixed(0) + '万' // 对于大于或等于100000的数字，直接显示为整数的万
  }
}
</script>
<template>
  <div
    class="container h-full px-4 md:px-6 py-12 w-full box-border flex flex-1 flex-col overflow-x-hidden"
  >
    <div
      class="flex flex-col md:flex-row h-full gap-8 md:gap-12 lg:gap-16 overflow-x-hidden"
    >
      <div class="flex flex-col items-center gap-4 relative w-[320px]">
        <img
          :src="playlistData.playlist.coverImgUrl + '?param=560y560'"
          alt="Summer Vibes Playlist"
          width="300"
          height="300"
          class="rounded-lg object-cover aspect-square"
        />
        <div
          class="absolute top-2 right-2 bg-gray-400/50 px-2 py-1 rounded-md text-white text-sm flex items-center gap-1"
        >
          <icon-ic:outline-play-circle />
          {{ formatNumber(playlistData.playlist.playCount) }}
        </div>
        <div class="text-center flex flex-col gap-3">
          <h1 class="text-2xl font-bold tracking-tight">
            {{ playlistData.playlist.name }}
          </h1>
          <div
            class="flex items-center justify-center gap-2 text-muted-foreground text-sm md:text-base"
          >
            <img
              :src="playlistData.playlist.creator?.avatarUrl"
              alt="DJ Sunny"
              width="24"
              height="24"
              class="rounded-full"
              style="aspect-ratio: 24 / 24; object-fit: cover"
            />
            <span>{{ playlistData.playlist.creator?.nickname }}</span>
          </div>
          <div
            class="flex items-center justify-center gap-2 text-muted-foreground text-sm md:text-base"
          >
            <span
              class="bg-muted px-2 py-1 rounded-md text-sm"
              v-for="item in playlistData.playlist.tags"
              >{{ item }}</span
            >
          </div>
          <p
            class="text-muted-foreground text-sm md:line-clamp-5"
            :title="playlistData.playlist.description"
          >
            {{ playlistData.playlist.description }}
          </p>
        </div>
      </div>
      <div class="gap-6 flex flex-1">
        <div class="relative w-full overflow-x-hidden">
          <MusicList v-model="playlistData.playlist.tracks" />
        </div>
      </div>
    </div>
  </div>
</template>
