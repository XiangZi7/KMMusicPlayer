<script setup lang="ts">
import 'vue3-video-play/dist/style.css'
import { videoPlay } from 'vue3-video-play'
import { aniPlay } from '@/api'

// 类型定义
interface VideoPlay {
  play_data: string
  src_site: string
}

interface DetailedInfo {
  title: string
  synopsis: string
}

interface DetailList {
  detailedInfo: DetailedInfo
  video_plays: VideoPlay[]
}

// 状态变量
const route = useRoute()
const detailList = ref<DetailList | null>(null) // 初始化为 null
const videoUrl = ref<string>('')

// 获取数据
onMounted(() => {
  if (!route.query.id) return
  aniPlay({
    id: route.query.id,
    type: route.query.type,
  }).then((res) => {
    detailList.value = res.data
    // 设置默认视频地址为第一个视频
    console.log(detailList.value)
    if (detailList.value?.detailInfo.video_plays.length) {
      videoUrl.value = detailList.value.detailInfo.video_plays[0].play_data
    }
  })
})

// 切换视频播放源
function changeVideo(index: number) {
  aniPlay({
    id: route.query.id as string,
    type: route.query.type as string,
    ep: index,
  }).then((res) => {
    detailList.value = res.data
    // 设置默认视频地址为第一个视频
    if (detailList.value?.detailInfo.video_plays.length) {
      videoUrl.value = detailList.value.detailInfo.video_plays[0].play_data
    }
  })
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
            <ul class="list-disc pl-5 text-gray-800">
              <li v-if="detailList?.detailedInfo.alias">
                别名:
                {{ detailList.detailedInfo.alias }}
              </li>
              <li v-if="detailList?.detailedInfo.cast">
                配音:
                {{ detailList.detailedInfo.cast }}
              </li>
              <li v-if="detailList?.detailedInfo.country">
                国家:
                {{ detailList.detailedInfo.country }}
              </li>
              <li v-if="detailList?.detailedInfo.director">
                导演:
                {{ detailList.detailedInfo.director }}
              </li>
              <li v-if="detailList?.detailedInfo.genre">
                类型:
                {{ detailList.detailedInfo.genre }}
              </li>
              <li v-if="detailList?.detailedInfo.rate">
                评分:
                {{ detailList.detailedInfo.rate }}
              </li>
            </ul>
            <p
              class="text-gray-600 mb-4 line-clamp-2"
              :title="detailList?.detailedInfo.synopsis"
            >
              {{ detailList?.detailedInfo.synopsis }}
            </p>
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
