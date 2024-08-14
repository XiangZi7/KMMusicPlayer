<script setup lang="ts">
import { cloudsearch } from '@/api'
import { cloudsearchResult } from '@/api/interface'
import MV from './components/MV.vue'
import SongList from './components/SongList.vue'
import Album from './components/Album.vue'
import Artists from './components/Artists.vue'
interface Props {
  name: string
}
// 获取当前路由
const route = useRoute()
const state = reactive({
  activeName: '1',
  tableData: {} as cloudsearchResult,
  albumData: { albums: [] },
  singerData: { artists: [] },
  songData: { playlists: [] },
  mvData: { mvs: [] },
  currentPage: 1,
  pageSize: 30,
  size: 'small',
  total: 0,
})

const {
  tableData,
  activeName,
  mvData,
  songData,
  singerData,
  albumData,
  currentPage,
  pageSize,
  size,
  total,
} = toRefs(state)

// 封装一个公共的搜索函数
const performSearch = async (
  kw: string,
  type?: string,
  offset?: number,
  limit: number = 20
) => {
  const { result } = await cloudsearch({ kw, type, limit, offset })

  switch (state.activeName) {
    case '1':
      state.tableData = state.tableData = result
      state.total = result.songCount
      break
    case '10':
      state.albumData = state.albumData = result
      state.total = result.albumCount
      break
    case '100':
      state.singerData = state.singerData = result
      state.total = result.artistCount
      break
    case '1000':
      state.songData = state.songData = result
      state.total = result.playlistCount
      break
    case '1004':
      state.mvData = state.mvData = result
      state.total = result.mvCount
      break

    default:
      break
  }
  state.tableData = result
}

// 监听搜索关键字
watch(
  () => route.query.kw,
  (newKw) => {
    if (typeof newKw === 'string') {
      performSearch(newKw)
    }
  },
  { immediate: true }
)

// handleClick 函数
const handleClick = ({ props }: { props: Props }) => {
  state.currentPage = 1
  performSearch(route.query.kw as string, props.name)
}

const handleSizeChange = (Size: number) => {
  performSearch(
    route.query.kw as string,
    state.activeName,
    state.currentPage,
    Size
  )
}

const handleCurrentChange = (current: number) => {
  performSearch(
    route.query.kw as string,
    state.activeName,
    current,
    state.pageSize
  )
}
</script>
<template>
  <div
    class="container h-full py-4 gap-2 w-full box-border flex flex-1 flex-col overflow-x-hidden"
  >
    <div
      class="flex flex-col h-full px-4 gap-8 md:gap-12 lg:gap-16 overflow-x-hidden"
    >
      <el-tabs v-model="activeName" class="demo-tabs" @tabClick="handleClick">
        <el-tab-pane name="1">
          <template #label>
            <div class="flex gap-1 items-center">
              <icon-iconamoon:music-album-light />
              <span>Songs</span>
            </div>
          </template>
          <MusicList v-model="tableData.songs" />
        </el-tab-pane>
        <el-tab-pane name="10">
          <template #label>
            <div class="flex gap-1 items-center">
              <icon-akar-icons:music-album />
              <span>Album</span>
            </div>
          </template>
          <Album v-model="albumData.albums" />
        </el-tab-pane>
        <el-tab-pane name="100">
          <template #label>
            <div class="flex gap-1 items-center">
              <icon-iconamoon:music-artist />
              <span>Artists</span>
            </div>
          </template>
          <Artists v-model="singerData.artists" />
        </el-tab-pane>
        <el-tab-pane name="1000">
          <template #label>
            <div class="flex gap-1 items-center">
              <icon-streamline:music-folder-song />
              <span>SongList</span>
            </div>
          </template>
          <SongList v-model="songData.playlists" />
        </el-tab-pane>
        <el-tab-pane name="1004">
          <template #label>
            <div class="flex gap-1 items-center">
              <icon-solar:video-frame-linear />
              <span>MV</span>
            </div>
          </template>
          <MV v-model="mvData.mvs" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-pagination
      class="flex items-center justify-center"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>