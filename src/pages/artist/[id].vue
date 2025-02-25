<script setup lang="ts">
import { getArtistsAlbum, API } from '@/api'
const route = useRoute()
// 歌手数据
const artistInfo = ref<API.ArtistResponse>()

watch(
  () => route.params.id,
  async () => {
    const getArtistsAlbumRes = await getArtistsAlbum({
      id: route.params.id as string,
    })

    artistInfo.value = getArtistsAlbumRes
  },
  { immediate: true }
)
</script>
<template>
  <div class="container mx-auto py-10 px-5 h-full flex-1 flex flex-col">
    <!-- 歌手详情 -->
    <div class="flex flex-col lg:flex-row items-center gap-8">
      <div class="w-48 h-48 rounded-full overflow-hidden bg-gray-200">
        <img
          :src="artistInfo?.artist.picUrl"
          :alt="artistInfo?.artist.name"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="text-center lg:text-left flex-1">
        <h1 class="text-3xl font-semibold text-foreground">
          {{ artistInfo?.artist.name }}
        </h1>
        <p class="mt-2 text-sm text-primary-foreground line-clamp-4">
          {{ artistInfo?.artist.briefDesc }}
        </p>
        <p class="mt-4 text-sm text-primary-foreground">
          别名: {{ artistInfo?.artist.alias.join(',') }}
        </p>
      </div>
    </div>

    <!-- 专辑列表 -->
    <div class="mt-12 flex flex-col flex-1 overflow-x-hidden">
      <h2 class="text-2xl font-semibold text-foreground">专辑</h2>
      <div class="mt-6 h-full flex w-full overflow-x-hidden">
        <Table :data="artistInfo?.hotSongs" />
      </div>
    </div>
  </div>
</template>
