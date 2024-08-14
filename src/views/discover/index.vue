<script setup lang="ts">
import { topPlaylist } from '@/api'
interface Playlist {
  id: number
  name: string
  description: string
  coverImgUrl: string
}
const state = reactive({
  Playlist: [] as Playlist[],
})

const { Playlist } = toRefs(state)
const router = useRouter()
// 使用hook并传入必要的参数
const observedElement = ref([])
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
  topPlaylist({ offset: 1, limit: 20 }).then(({ playlists }) => {
    state.Playlist = playlists
  })
})
</script>
<template>
  <div class="p-6">
    <section class="bg-gradient rounded-xl text-white py-5">
      <div class="container mx-auto px-4 md:px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex flex-col justify-center">
            <h1
              class="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4"
            >
              Discover the Latest Trends in Urban Fashion
            </h1>
            <p class="text-gray-400 mb-6">
              Delve into our stylish and accessible collection of musical
              exploration, instruments, and creative inspiration
            </p>
            <div class="flex gap-3">
              <el-button type="primary">View</el-button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="py-12">
      <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-8">
        <div
          class="group relative rounded-lg overflow-hidden cursor-pointer"
          v-for="item in Playlist"
          :key="item.id"
          @click="router.push(`/songlist?id=${item.id}`)"
          ref="observedElement"
        >
          <img
            :src="item.coverImgUrl + '?param=260y260'"
            :alt="item.name"
            class="w-full h-auto rounded-lg object-cover transition-all duration-300 group-hover:opacity-80"
          />
          <div
            class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg"
          >
            <h3 class="text-white text-sm font-semibold line-clamp-1">
              {{ item.name }}
            </h3>
            <p class="text-white text-xs line-clamp-2">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bg-gradient {
  background: linear-gradient(to right, #1f2937, rgba(31, 41, 55, 0.7)),
    url('@/assets/bg2.png');
  background-size: cover; /* 确保背景图片按比例缩放，并能完整显示 */
  background-repeat: no-repeat; /* 禁止背景图片重复 */
  background-position: center; /* 将背景图片放置在容器中央 */
}
</style>
