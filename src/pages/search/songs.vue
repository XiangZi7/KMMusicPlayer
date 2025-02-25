<script setup lang="ts">
import { cloudsearch, API } from '@/api'
const route = useRoute()

const props = defineProps({
  selected: {
    type: String,
    default: '1',
  },
})
const tableData = ref<API.songsCloudSearchResult>()

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
  tableData.value = undefined
  cloudsearch<API.songsCloudSearchResult>({
    kw: route.query.query as string,
    offset: currentPage.value,
    limit: pageSize.value,
    type: props.selected,
  }).then((res) => {
    tableData.value = res.result
    state.total = res.result.songCount
  })
}

watch(
  () => [route.query.query, props.selected],
  (val) => {
    if (!val[0]) return
    if (!val[1] || val[1] != '1') return
    getCloudSearch()
  },
  {
    immediate: true,
  }
)
</script>
<template>
  <div class="flex-1 h-full flex flex-col overflow-hidden">
    <Table :data="tableData?.songs" class="flex-1 overflow-x-hidden" />
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
