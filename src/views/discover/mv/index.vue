<script setup lang="ts">
  import { getAllMV } from '@/api' // 导入你的获取MV的API
  import FilterSelect from './components/FilterSelect.vue'
  interface MV {
    id: number // MV 唯一标识符
    name: string // MV 名称
    artistName: string // 艺术家名称
    cover: string // 封面图 URL
    playCount: number // 播放次数
  }

  const router = useRouter()
  const areas = ['全部', '内地', '港台', '欧美', '日本', '韩国']
  const types = ['全部', '官方版', '原生', '现场版', '网易出品']
  const orders = ['上升最快', '最热', '最新']

  const MVS = ref<MV[]>([])

  // 使用 Intersection Observer 监听
  const observedElement = ref([])
  useIntersectionObserver(
    observedElement,
    {
      initialPageNum: 2, // 初始页码
      pageSize: 10, // 页面大小
      threshold: 0.1, // 可选阈值参数
    },
    handleIntersect
  )

  // 处理元素进入视图的事件
  function handleIntersect(pageNum: number) {
    fetchMVs({ pageNum, area: areas[0], type: types[0], order: orders[0] }) // 传入页码
  }

  // 获取 MV 列表的函数
  async function fetchMVs(selectedValues: {
    area: string
    type: string
    order: string
    pageNum?: number
  }) {
    const params = {
      area: selectedValues.area,
      type: selectedValues.type,
      order: selectedValues.order,
      limit: selectedValues.pageNum,
    }
    const response = await getAllMV(params)
    MVS.value = response.data // 更新 MV 数据
  }

  // 组件挂载后初次加载数据
  onMounted(() => {
    fetchMVs({ area: areas[0], type: types[0], order: orders[0] }) // 使用默认选项加载
  })
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- 选择区域和类型 -->
    <FilterSelect
      :areas="areas"
      :types="types"
      :orders="orders"
      @change="fetchMVs"
    />

    <!-- MV 列表展示 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        ref="observedElement"
        class="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
        v-for="item in MVS"
        :key="item.id"
        @click="router.push(`/video?id=${item.id}`)"
      >
        <div class="p-0">
          <div class="relative">
            <img
              alt="MV Thumbnail"
              width="320"
              height="180"
              class="w-full object-cover"
              :src="item.cover"
              style="aspect-ratio: 320 / 180; object-fit: cover"
            />
          </div>
          <div class="p-4">
            <h2
              class="font-semibold text-lg mb-1 line-clamp-1"
              :title="item.name"
            >
              {{ item.name }}
            </h2>
            <p class="text-sm text-muted-foreground mb-2">
              {{ item.artistName }}
            </p>
            <p class="text-xs text-muted-foreground">
              {{ item.playCount }} views
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
