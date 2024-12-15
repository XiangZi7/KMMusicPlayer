<script setup lang="ts">
import { topPlaylist, banner, playlistCatList, albumNewest } from '@/api'
import { State, Banner, Album } from './interface'

// 定义 reactive 状态的类型
const state = reactive<State>({
  Playlist: [],
  bannersList: [],
  subList: [],
  currentCat: '欧美',
  newestLsit: [],
})

const { Playlist, bannersList, subList, currentCat, newestLsit } =
  toRefs(state)
const router = useRouter()
// 使用hook并传入必要的参数
const observedElement = ref<HTMLElement[]>([]) // 添加类型声明

useIntersectionObserver(
  observedElement,
  {
    initialPageNum: 1, // 初始页码
    pageSize: 10, // 页面大小
    threshold: 0.1, // 可选阈值参数
  },
  handleIntersect
)

function handleIntersect(PageNum: number) {
  topPlaylist({ offset: PageNum + 1 }).then(({ playlists }) => {
    state.Playlist = state.Playlist.concat(playlists)
  })
}
onMounted(() => {
  Promise.all([
    banner<{ banners: Banner[] }>(),
    topPlaylist({ offset: 1, limit: 20 }),
    playlistCatList(),
    albumNewest<{ albums: Album[] }>(),
  ])
    .then(
      ([
         bannerResponse,
         playlistResponse,
         playlistCatResponse,
         albumResponse,
       ]) => {
        state.bannersList = bannerResponse.banners // 更新轮播图
        state.Playlist = playlistResponse.playlists // 更新播放列表
        state.subList = playlistCatResponse.sub // 更新分类列表
        state.newestLsit = albumResponse.albums // 更新最新专辑
      }
    )
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
})

// 处理分类变化
function handleCat(name: string) {
  currentCat.value = name // 更新当前分类
  topPlaylist({ cat: name }).then(({ playlists }) => {
    state.Playlist = playlists // 更新播放列表
  })
}
</script>
<template>
  <!-- 走马灯 -->
  <el-carousel :interval="4000" type="card" height="auto" autoplay>
    <el-carousel-item
      v-for="item in bannersList"
      :key="item"
      class="!h-28 md:!h-60 lg:!h-64"
    >
      <el-image class="!rounded-lg" :src="item.imageUrl" />
    </el-carousel-item>
  </el-carousel>
  <!-- 最新专辑 -->
  <div class="mb-2" v-if="newestLsit.length > 0">
    <h1 class="text-2xl font-bold text-black/70 dark:text-white">最新专辑</h1>
    <el-scrollbar class="py-4">
      <div class="flex space-x-2">
        <div
          class="relative flex-[180px] shrink-0 rounded-lg cursor-pointer"
          v-for="item in newestLsit"
          :key="item.id"
          @click="router.push(`/album?id=${item.id}`)"
        >
          <img
            :src="item.picUrl + '?param=360y360'"
            :alt="item.name"
            class="w-full h-auto rounded-lg object-cover transition-all duration-300 group-hover:opacity-80"
          />
          <div
            class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg"
          >
            <h3 class="text-white text-sm font-semibold truncate">
              {{ item.name }}
            </h3>
            <p class="text-white text-xs truncate">
              {{ item.artist.name }}
            </p>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
  <!-- 歌单 -->
  <div v-if="Playlist.length > 0">
    <h1 class="text-2xl font-bold mb-4 text-black/70">热门歌单</h1>
    <!-- 选项 -->
    <div class="pb-2">
      <el-scrollbar class="pb-4">
        <div class="flex space-x-2">
          <el-button
            class="!rounded-xl transition duration-200"
            style=""
            :type="currentCat == item.name ? 'primary' : ''"
            v-for="item in subList"
            :key="item.name"
            @click="handleCat(item.name)"
          >
            {{ item.name }}
          </el-button>
        </div>
      </el-scrollbar>
    </div>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-8">
      <div
        class="group relative rounded-lg overflow-hidden cursor-pointer"
        v-for="item in Playlist"
        :key="item.id"
        @click="router.push(`/playlist?id=${item.id}`)"
        ref="observedElement"
      >
        <img
          :src="item.coverImgUrl + '?param=360y360'"
          :alt="item.name"
          class="w-full h-auto rounded-lg object-cover transition-all duration-300 group-hover:opacity-80"
        />
        <div
          class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg"
        >
          <h3 class="text-white text-sm font-semibold truncate">
            {{ item.name }}
          </h3>
          <p class="text-white text-xs truncate">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
