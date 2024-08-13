<script setup lang="ts">
import { topPlaylist, playlistCatList } from '@/api'
interface Playlist {
  id: number
  name: string
  description: string
  coverImgUrl: string
}

interface Category {
  name: string
  label: string
}
const state = reactive({
  Playlist: [] as Playlist[],
  CatList: [{ name: '全部', label: '全部' }] as Category[],
  currentCat: ['全部'] as string[],
})

const { currentCat, CatList, Playlist } = toRefs(state)

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

onMounted(() => {
  topPlaylist({ offset: 1, cat: state.currentCat as [] }).then(
    ({ playlists }) => {
      state.Playlist = playlists
    }
  )
  playlistCatList().then(({ sub }) => {
    state.CatList = state.CatList.concat(sub)
  })
})

function handleIntersect(PageNum: number) {
  topPlaylist({ offset: PageNum + 1, cat: state.currentCat as [] }).then(
    ({ playlists }) => {
      state.Playlist = state.Playlist.concat(playlists)
    }
  )
}

function catChange(e: []) {
  state.Playlist = []
  topPlaylist({ offset: 1, cat: e.join() }).then(({ playlists }) => {
    state.Playlist = playlists
  })
}
</script>
<template>
  <div class="h-full w-full p-4">
    <el-select-v2
      v-model="currentCat"
      filterable
      :options="CatList"
      style="width: 240px"
      multiple
      clearable
      :props="{ label: 'name', value: 'name' }"
      @change="catChange"
    >
      <template #default="{ item }">
        <div class="flex items-center">
          <span>{{ item.name }}</span>
        </div>
      </template>
    </el-select-v2>
    <section
      class="flex-1 pt-4 grid gap-4 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]"
    >
      <div
        class="group relative rounded-lg overflow-hidden cursor-pointer"
        v-for="item in Playlist"
        :key="item.id"
        ref="observedElement"
        @click="router.push(`/songlist?id=${item.id}`)"
      >
        <el-image
          :src="item.coverImgUrl + '?param=260y260'"
          lazy
          class="transition-opacity rounded-lg"
        />
        <div class="p-2">
          <h3 class="font-medium text-sm line-clamp-1">
            {{ item.name }}
          </h3>
          <div
            class="flex items-center w-full gap-2 text-sm text-muted-foreground"
          >
            <span class="text-xs line-clamp-1">
              {{ item.description }}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
