<script setup lang="ts">
import {
  playlistCatList,
  topPlaylist,
  topPlaylistHighquality,
  API,
} from '@/api'
import { formatNumber } from '@/utils'
import { playlistsList, playlistOrder } from '@/utils/enum'

// 路由
const router = useRouter()
// 播放列表
const playlists = ref<API.Playlist[] | undefined>([])

const selected = ref('user')
// 歌单排序
const selectedOrder = ref<'new' | 'hot'>('hot')
// 歌单tag
const playTags = ref<{ name: string }[]>([])
const selectedTag = ref('全部')

// 选择歌单
const selectPlaylist = (playlist: string) => {
  selected.value = playlist
  getTopPlaylist()
}

// 分页组件状态
const currentPage = ref(1) // 当前页
const pageSize = ref(30) // 每页显示的数量
const state = reactive({
  size: 'default',
  disabled: false,
  background: false,
  layout: 'total, sizes, prev, pager, next, jumper',
  total: 0,
  pageSizes: [20, 30, 40, 50],
})

// 监听分页变化
const handleSizeChange = () => {
  getTopPlaylist()
}
// 监听当前页变化
const handleCurrentChange = () => {
  getTopPlaylist()
}

// 获取歌单
const getTopPlaylist = () => {
  playlists.value = undefined
  if (selected.value == 'user') {
    topPlaylist({
      offset: currentPage.value,
      limit: pageSize.value,
      order: selectedOrder.value,
      cat: selectedTag.value,
    }).then((res) => {
      playlists.value = res.playlists
      state.total = res.total
    })
  } else {
    topPlaylistHighquality({
      limit: pageSize.value,
      order: selectedOrder.value,
      cat: selectedTag.value,
    }).then((res) => {
      playlists.value = res.playlists
      state.total = res.total
    })
  }
}

onMounted(() => {
  // 获取歌单tag
  playlistCatList().then((res) => {
    playTags.value = res.sub
  })
  getTopPlaylist()
})
</script>
<template>
  <div class="flex flex-col h-full flex-1 overflow-hidden bg-background p-4">
    <div class="py-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="relative flex-grow">
          <icon-mdi:magnify
            class="lucide lucide-search absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            disabled
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8"
            placeholder="搜索歌单..."
            type="search"
          />
        </div>
        <el-select class="w-48" v-model="selectedTag" @change="getTopPlaylist">
          <el-option
            v-for="item in playTags"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
        <el-select
          class="w-48"
          v-model="selectedOrder"
          @change="getTopPlaylist"
        >
          <el-option
            v-for="item in playlistOrder"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </div>
    </div>
    <div class="flex-grow flex flex-col overflow-x-hidden">
      <div class="border-b pb-1">
        <div
          class="inline-flex h-10 items-center rounded-lg bg-muted/70 p-1 text-muted-foreground w-full justify-start mb-2 overflow-x-auto"
        >
          <button
            v-for="playlist in playlistsList"
            :key="playlist.value"
            @click="selectPlaylist(playlist.value)"
            :class="{
              'bg-background text-foreground shadow-sm':
                selected === playlist.value,
            }"
            class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {{ playlist.name }}
          </button>
        </div>
      </div>
      <div class="flex-1 overflow-x-hidden my-2">
        <div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          <div
            v-for="playlist in playlists"
            :key="playlist.id"
            @click="router.push('/playlist/' + playlist.id)"
            class="rounded-lg hover:bg-background transition duration-300 border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-lg"
          >
            <div class="flex flex-col space-y-1.5 p-0">
              <div class="relative">
                <el-image
                  lazy
                  :alt="playlist.name"
                  class="w-full aspect-square object-cover"
                  :src="playlist.coverImgUrl + '?param=330y330'"
                />
                <button
                  class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 w-10 absolute bottom-2 right-2 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-play h-4 w-4"
                  >
                    <polygon points="6 3 20 12 6 21 6 3"></polygon>
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-4">
              <h3
                class="font-semibold tracking-tight text-lg mb-2 line-clamp-1"
              >
                {{ playlist.name }}
              </h3>
              <div class="flex items-center text-sm text-muted-foreground">
                <span
                  class="relative flex shrink-0 overflow-hidden rounded-full w-6 h-6 mr-2"
                >
                  <el-avatar
                    class="aspect-square h-full w-full"
                    :alt="playlist.creator.nickname"
                    :src="playlist.creator.avatarUrl"
                  />
                </span>
                <span>{{ playlist.creator.nickname }}</span>
              </div>
            </div>
            <div
              class="items-center p-4 pt-0 flex justify-between text-sm text-muted-foreground"
            >
              <div class="flex items-center gap-1">
                <icon-solar:music-library-broken />
                <span>{{ formatNumber(playlist.playCount) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <icon-mdi:cards-heart />
                <span>{{ formatNumber(playlist.subscribedCount) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="mx-auto flex w-full justify-center mt-4">
      <el-pagination
        v-model:page-size="pageSize"
        v-model:currentPage="currentPage"
        v-bind="state"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </nav>
  </div>
</template>
