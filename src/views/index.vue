<script setup lang="ts">
  import { cloudsearch } from '@/api'
  import { CloudSearchResult, PlaylistsResponse } from '@/api/interface'
  const songListRef = ref()
  const state = reactive({
    tableData: {} as CloudSearchResult,
    SongList: {} as PlaylistsResponse,
  })

  const { tableData, SongList } = toRefs(state)

  onMounted(() => {
    Promise.all([
      cloudsearch({ kw: '境界的彼方' }),
      cloudsearch({ kw: '境界的彼方', type: 1000 }),
    ])
      .then(([result1, result2]) => {
        state.tableData = result1.result as CloudSearchResult
        state.SongList = result2.result as PlaylistsResponse
      })
      .catch((error) => {
        console.error('Error occurred:', error)
      })
  })

  const progress = (type: 'back' | 'forward') => {
    const scrollLeft = songListRef.value.wrapRef.scrollLeft
    if (type == 'back') {
      songListRef.value.setScrollLeft(scrollLeft - 150)
    } else {
      songListRef.value.setScrollLeft(scrollLeft + 150)
    }
  }
</script>
<template>
  <section class="mt-8 px-6 pt-6">
    <div class="banner rounded-lg flex">
      <div class="flex flex-col p-8">
        <h2 class="text-lg font-semibold text-white">境界的彼方</h2>
        <p class="mt-2 text-sm text-white md:line-clamp-3">
          《境界的彼方》是由鸟居奈古梦著作、鸭居知世插画的轻小说，于2012年6月9日，由KAESUMA文库文库（京都动画）发行。小说曾获得第2回京都动画大赏（小说部门）奖励赏。
          改编自小说的同名电视动画已于2013年10月至12月播出。
        </p>
      </div>
      <img
        src="@/assets/danceMk.png"
        class="w-full max-w-[350px] mt-[-50px] h-auto hidden md:flex"
      />
    </div>
  </section>
  <div class="flex flex-col flex-1 overflow-hidden px-6">
    <el-scrollbar class="relative" ref="songListRef">
      <div class="flex mt-6 space-x-4 rounded-xl pb-6">
        <router-link
          class="flex flex-col gap-2"
          v-for="item in SongList.playlists"
          :key="item.id"
          :to="`/playlist?id=${item.id}`"
        >
          <el-image
            :src="item.coverImgUrl + '?param=160y160'"
            :alt="item.name"
            class="w-28 h-28 rounded-lg"
            lazy
          />
          <span class="text-xs text-center line-clamp-1" :title="item.name">{{
            item.name
          }}</span>
        </router-link>
        <button
          class="absolute top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-muted-foreground transition-colors duration-300 hover:bg-background/75"
          @click="progress('back')"
          v-if="SongList.playlists && SongList.playlists.length > 0"
        >
          <svg
            data-id="13"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>
        <button
          class="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-background/50 p-2 text-muted-foreground transition-colors duration-300 hover:bg-background/75"
          @click="progress('forward')"
          v-if="SongList.playlists && SongList.playlists.length > 0"
        >
          <svg
            data-id="15"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </div>
    </el-scrollbar>
    <section v-if="tableData.songs?.length > 0">
      <div class="rounded-xl overflow-hidden">
        <MusicList v-model="tableData.songs" />
      </div>
    </section>
  </div>
</template>

<style scoped>
  .banner {
    background-image: url('@/assets/cubes.png'),
      linear-gradient(to right, #fd31a2, #ff3a8b, #ff4b78, #cf4af3, #e73bd7);
  }
</style>
