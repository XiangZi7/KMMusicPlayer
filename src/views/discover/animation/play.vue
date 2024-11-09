<script setup lang="ts">
import 'vue3-video-play/dist/style.css'
import { videoPlay } from 'vue3-video-play'
import { aniPlay } from '@/api'

// 类型定义
interface VideoPlay {
  play_data: string
  src_site: string
}
interface totalEpisodes {
  title: string
  slug: string
}

interface DetailedInfo {
  title: string
  alias?: string
  cast?: string
  country?: string
  director?: string
  genre?: string
  rate?: string
  synopsis?: string
  coverImageUrl?: string
}

interface DetailList {
  detailedInfo: DetailedInfo
  detailInfo: { video_plays: VideoPlay[] }
  totalEpisodes: totalEpisodes[]
}

// 状态变量
const route = useRoute()
const detailList = ref<DetailList | null>(null) // 初始化为 null
const videoUrl = ref<string>('')

// 获取视频数据
const fetchVideoData = async (id: string, type: string, ep?: string) => {
  const params = { id, type }
  if (ep !== undefined) {
    params.ep = ep // 如果有 ep 参数，则包含在请求中
  }

  const res = await aniPlay(params)
  detailList.value = res.data

  // 设置默认视频地址为第一个视频
  if (detailList.value?.detailInfo.video_plays.length) {
    videoUrl.value = detailList.value.detailInfo.video_plays[0].play_data
  }
}

// 组件挂载后获取数据
onMounted(() => {
  const { id, type } = route.query
  if (!id) return

  fetchVideoData(id as string, type as string)
})

// 切换视频播放源
function changeVideo(index: string) {
  fetchVideoData(route.query.id as string, route.query.type as string, index)
}
</script>

<template>
  <div class="p-4 h-full">
    <div
      class="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div class="aspect-w-16 aspect-h-9 bg-gray-900">
        <div class="flex items-center justify-center h-full text-white">
          <videoPlay width="100%" height="100%" :src="videoUrl" type="m3u8" />
        </div>
      </div>
      <div class="p-6">
        <el-tabs>
          <el-tab-pane label="选择剧集">
            <!-- 按钮列表 -->
            <div class="grid grid-cols-4 gap-2">
              <el-button
                v-for="(video, index) in detailList?.totalEpisodes"
                :key="index"
                type="primary"
                @click="changeVideo(video.slug)"
                class="bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded shadow hover:bg-gray-300"
              >
                {{ video.title }}
              </el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="动漫信息">
            <h1 class="text-3xl font-bold mb-2">
              {{ detailList?.detailedInfo.title }}
            </h1>
            <div class="p-1">
              <div class="flex flex-col md:flex-row md:space-x-8">
                <div
                  class="w-full md:w-1/4 mb-4"
                  v-if="detailList?.detailedInfo.coverImageUrl"
                >
                  <el-image
                    class="rounded-lg shadow-lg"
                    :src="detailList.detailedInfo.coverImageUrl"
                    fit="cover"
                  />
                </div>
                <div class="flex-1">
                  <ul class="list-disc pl-5 text-gray-800 mb-4">
                    <li v-if="detailList?.detailedInfo.alias">
                      <strong>别名:</strong> {{ detailList.detailedInfo.alias }}
                    </li>
                    <li v-if="detailList?.detailedInfo.cast">
                      <strong>配音:</strong> {{ detailList.detailedInfo.cast }}
                    </li>
                    <li v-if="detailList?.detailedInfo.country">
                      <strong>国家:</strong>
                      {{ detailList.detailedInfo.country }}
                    </li>
                    <li v-if="detailList?.detailedInfo.director">
                      <strong>导演:</strong>
                      {{ detailList.detailedInfo.director }}
                    </li>
                    <li v-if="detailList?.detailedInfo.genre">
                      <strong>类型:</strong> {{ detailList.detailedInfo.genre }}
                    </li>
                    <li v-if="detailList?.detailedInfo.rate">
                      <strong>评分:</strong> {{ detailList.detailedInfo.rate }}
                    </li>
                  </ul>
                  <p class="text-gray-600 mb-4">
                    {{ detailList?.detailedInfo.synopsis }}
                  </p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="接口信息">
            <div class="grid grid-cols-4 gap-2">
              <el-button
                type="primary"
                v-for="(video, index) in detailList?.detailInfo.video_plays"
                :key="index"
                @click="videoUrl = video.play_data"
              >
                {{ video.src_site }}
              </el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0px;
}
</style>
