<script setup lang="ts">
import { cloudsearch, API } from '@/api'
const route = useRoute()

const props = defineProps({
  selected: {
    type: String,
    default: '1004',
  },
})
const mvlists = ref<API.MVSearchResult>()

const currentPage = ref(1) // 当前页
const pageSize = ref(20) // 每页显示的数量

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
  mvlists.value = undefined
  cloudsearch<API.MVSearchResult>({
    kw: route.query.query as string,
    offset: currentPage.value,
    limit: pageSize.value,
    type: props.selected,
  }).then((res) => {
    mvlists.value = res.result
    state.total = res.result.mvCount
  })
}

watch(
  () => [route.query.query, props.selected],
  (val) => {
    if (!val[0]) return
    if (!val[1] || val[1] != '1004') return
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
      <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
        <div
          v-for="playlist in mvlists?.mvs"
          :key="playlist.id"
          class="rounded-lg hover:bg-background transition duration-300 border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-lg"
        >
          <div class="flex flex-col space-y-1.5 p-0">
            <div class="relative">
              <el-image
                :alt="playlist.name"
                lazy
                class="w-full aspect-square object-cover h-44"
                :src="playlist.cover"
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
          <div class="px-4 py-2">
            <h3
              class="font-semibold tracking-tight text-lg line-clamp-1 text-center"
            >
              {{ playlist.name }}
            </h3>
          </div>
        </div>
      </div>
    </div>

    <nav class="mx-auto flex w-full justify-center mt-4">
      <el-pagination
        v-model:page-size="pageSize"
        v-model:current-page="currentPage"
        v-bind="state"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </nav>
  </div>
</template>
