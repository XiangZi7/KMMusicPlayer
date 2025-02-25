<script setup lang="ts">
import { aniPlay, API } from '@/api'
const route = useRoute()

const detailList = ref<API.DetailList | null>(null) // 初始化为 null
const videoUrl = ref<string>('')

// 获取视频数据
const fetchVideoData = async (id: string, type: string, ep?: string) => {
  const params: Record<string, string> = { id, type, ...(ep && { ep }) }

  const res = await aniPlay(params)
  detailList.value = res.data

  // 设置默认视频地址为第一个视频
  if (detailList.value?.detailInfo.video_plays.length) {
    videoUrl.value = detailList.value.detailInfo.video_plays[0].play_data
  }
}

watch(
  () => route.query.id,
  (val) => {
    fetchVideoData(val as string, route.query.type as string)
  },
  {
    immediate: true,
  }
)

// 切换视频播放源
function changeVideo(index: string) {
  fetchVideoData(route.query.id as string, route.query.type as string, index)
}
</script>
<template>
  <div class="space-y-8 p-4">
    <div class="rounded-lg overflow-hidden container">
      <Artplayer :src="videoUrl" />
    </div>
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
              <ul class="list-disc pl-5 text-primary-foreground mb-4">
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
              <p class="text-primary-foreground mb-4">
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
</template>
