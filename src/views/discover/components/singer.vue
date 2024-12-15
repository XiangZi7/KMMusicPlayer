<script setup lang="ts">
  import { getArtistTopList } from '@/api'

  const genres = ['全部', '华语', '欧美', '韩国', '日本', '其他']
  const singers = ref()

  const currentGenre = ref('全部')

  const selectGenre = (genre: string, index: number) => {
    currentGenre.value = genre
    getArtistTopList(index).then((res) => {
      singers.value = res.list.artists
    })
  }

  onMounted(() => {
    getArtistTopList().then((res) => {
      singers.value = res.list.artists
    })
  })
</script>
<template>
  <div class="container mx-auto p-4">
    <header>
      <div class="flex space-x-4 mb-6">
        <el-button
          v-for="(genre, index) in genres"
          :key="genre"
          :type="currentGenre === genre ? 'primary' : 'default'"
          @click="selectGenre(genre, index)"
        >
          {{ genre }}
        </el-button>
      </div>
    </header>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-4">
      <div
        v-for="singer in singers"
        :key="singer.id"
        class="flex flex-col items-center p-4 rounded-lg"
      >
        <el-image
          class="rounded-full w-24 h-24"
          lazy
          :src="singer.picUrl + '?param=180y180'"
          alt="歌手头像"
        />
        <span class="text-lg">{{ singer.name }}</span>
        <span class="text-xs text-gray-500">单曲：{{ singer.musicSize }}</span>
      </div>
    </div>
  </div>
</template>
