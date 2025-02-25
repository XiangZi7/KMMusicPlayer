<script setup lang="ts">
import { mvDetail, mvUrl, commentMV, API } from '@/api'
const state = reactive({
  mvInfo: {} as API.MV,
  mvUrls: '',
  comments: {} as API.CommentResponse,
})
const { mvInfo, mvUrls, comments } = toRefs(state)
const route = useRoute()

watch(
  () => route.params.id,
  async () => {
    // 获取 MV 详情
    const detailResponse = await mvDetail(route.params.id as string)
    state.mvInfo = detailResponse.data
    // 获取 MV 播放链接
    const urlResponse = await mvUrl(route.params.id as string)
    state.mvUrls = urlResponse.data.url
    // 获取 MV 评论
    const commentResponse = await commentMV({ id: route.params.id as string })
    state.comments = commentResponse
  },
  {
    immediate: true,
  }
)
</script>
<template>
  <div class="space-y-8 p-4 mx-auto max-w-7xl">
    <div class="space-y-4">
      <div class="relative shadow-xl rounded-lg overflow-hidden w-full">
        <Artplayer :src="mvUrls" :poster="mvInfo.cover" />
      </div>
      <div
        class="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 space-y-4"
      >
        <h1 class="text-2xl font-bold text-white">{{ mvInfo?.name }}</h1>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <span
              class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
            >
              <el-avatar
                v-if="mvInfo?.artists"
                :src="mvInfo?.artists[0].img1v1Url"
              />
            </span>
            <div>
              <p class="font-semibold text-white">{{ mvInfo?.artistName }}</p>
              <p class="text-sm text-gray-300">
                {{ mvInfo?.subCount }} subscribers
              </p>
            </div>
          </div>
          <el-button type="primary"> Subscribe </el-button>
        </div>
        <div class="flex items-center space-x-4 text-gray-300">
          <div class="flex items-center">
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
              class="lucide lucide-thumbs-up w-5 h-5 mr-1"
            >
              <path d="M7 10v12"></path>
              <path
                d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"
              ></path>
            </svg>
            <span>{{ mvInfo?.playCount }}</span>
          </div>
          <div class="flex items-center">
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
              class="lucide lucide-share2 w-5 h-5 mr-1"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg
            ><span>Share</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 space-y-6"
    >
      <h2 class="text-2xl font-semibold text-white">Comments</h2>
      <div class="flex items-center space-x-4">
        <span
          class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
          ><span
            class="flex h-full w-full items-center justify-center rounded-full bg-muted"
            >YA</span
          ></span
        ><textarea
          disabled
          class="flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 bg-white bg-opacity-10 border-none text-white placeholder-gray-400 resize-none"
          placeholder="Add a comment..."
        ></textarea>
      </div>
      <el-button disabled type="primary"> Post Comment </el-button>

      <!-- 评论列表 -->
      <div class="space-y-6">
        <div
          class="flex space-x-4"
          v-for="comment in comments.comments"
          :key="comment.id"
        >
          <span
            class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
          >
            <el-avatar v-if="comment.user" :src="comment.user.avatarUrl" />
          </span>
          <div class="flex-1 space-y-2">
            <div class="flex items-center space-x-2">
              <p class="font-semibold text-white">
                {{ comment.user?.nickname }}
              </p>
              <p class="text-xs text-gray-400">{{ comment.timeStr }}</p>
            </div>
            <p class="text-gray-200">{{ comment.content }}</p>
            <div class="flex items-center space-x-4 text-gray-400">
              <button class="flex items-center space-x-1 hover:text-white">
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
                  class="lucide lucide-thumbs-up w-4 h-4"
                >
                  <path d="M7 10v12"></path>
                  <path
                    d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"
                  ></path>
                </svg>
                <span>{{ comment.likedCount }}</span>
              </button>
              <button class="flex items-center space-x-1 hover:text-white">
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
                  class="lucide lucide-thumbs-down w-4 h-4"
                >
                  <path d="M17 14V2"></path>
                  <path
                    d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"
                  ></path>
                </svg>
              </button>
              <button class="text-sm hover:text-white">Reply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
