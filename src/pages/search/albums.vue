<script setup lang="ts">
import { cloudsearch, API } from '@/api'
const route = useRoute()

const props = defineProps({
  selected: {
    type: String,
    default: '10',
  },
})
const filteredPlaylists = ref<API.AlbumSearchResult>()

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
  getCloudSearch()
}
// 监听当前页变化
const handleCurrentChange = () => {
  getCloudSearch()
}

const getCloudSearch = () => {
  filteredPlaylists.value = undefined
  cloudsearch<API.AlbumSearchResult>({
    kw: route.query.query as string,
    offset: currentPage.value,
    limit: pageSize.value,
    type: props.selected,
  }).then((res) => {
    filteredPlaylists.value = res.result
    state.total = res.result.albumCount
  })
}

watch(
  () => [route.query.query, props.selected],
  (val) => {
    if (!val[0]) return
    if (!val[1] || val[1] != '10') return
    getCloudSearch()
  },
  {
    immediate: true,
  }
)
</script>
<template>
  <div class="flex-1 h-full flex flex-col overflow-hidden">
    <div class="flex-1 overflow-x-hidden">
      <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6">
        <div
          v-for="playlist in filteredPlaylists?.albums"
          :key="playlist.id"
          class="rounded-lg hover:bg-background transition duration-300 border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-lg"
        >
          <div class="flex flex-col space-y-1.5 p-0">
            <div class="relative">
              <el-image
                :alt="playlist.name"
                lazy
                class="w-full aspect-square object-cover"
                :src="playlist.picUrl"
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
            <h3 class="font-semibold tracking-tight text-lg mb-2 line-clamp-1">
              {{ playlist.name }}
            </h3>
            <div
              class="flex items-center justify-between text-sm text-muted-foreground"
            >
              <div class="flex items-center">
                <span
                  class="relative flex shrink-0 overflow-hidden rounded-full w-4 h-4 mr-2"
                >
                  <img
                    class="aspect-square h-full w-full"
                    :alt="playlist.artist.name"
                    :src="playlist.artist.picUrl"
                  />
                </span>
                <span>{{ playlist.artist.name }}</span>
              </div>
              <div class="flex items-center gap-1">
                <icon-solar:music-library-broken />
                <span>{{ playlist.size }}</span>
              </div>
            </div>
          </div>
          <div
            class="items-center p-4 pt-0 flex justify-between text-sm text-muted-foreground"
            v-if="playlist.transNames"
          >
            {{ playlist.transNames[0] }}
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
