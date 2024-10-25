<script setup lang="ts">
import 'vue3-video-play/dist/style.css'
import { videoPlay } from 'vue3-video-play'
import { mvDetail, mvUrl, commentMV } from '@/api'
import { MVDetail, CommentResponse } from './interface'

const route = useRoute()

const state = reactive({
  mvUrls: '',
  mvDetails: {} as MVDetail,
  mvCommentsList: {} as CommentResponse,
})

const { mvUrls, mvDetails, mvCommentsList } = toRefs(state)

const observedElement = ref([])
// 使用hook并传入必要的参数
useIntersectionObserver(
  observedElement,
  {
    initialPageNum: 2, // 初始页码
    pageSize: 10, // 页面大小
    threshold: 0.1, // 可选阈值参数
  },
  handleIntersect
)

function handleIntersect(PageNum: number) {
  commentMV<CommentResponse>({
    offset: PageNum,
    id: route.query.id as string,
  }).then(({ comments }) => {
    state.mvCommentsList.comments =
      state.mvCommentsList.comments.concat(comments)
  })
}

watch(
  () => route.query.id,
  (id) => {
    if (typeof id == 'string') {
      Promise.all([
        mvUrl(id),
        mvDetail(id),
        commentMV<CommentResponse>({ id }),
      ]).then(([result1, result2, result3]) => {
        state.mvUrls = result1.data.url
        state.mvDetails = result2.data
        state.mvCommentsList = result3
      })
    }
  },
  { immediate: true }
)
</script>
<template>
  <div class="w-full grid grid-rows-[auto_1fr_auto] gap-6 pb-10">
    <main class="grid md:grid-cols-6 gap-10 items-start p-4 md:px-6">
      <div class="col-span-4 grid gap-6">
        <div class="grid gap-4">
          <div
            class="rounded-xl overflow-hidden border aspect-video bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
          >
            <videoPlay
              width="100%"
              height="100%"
              :title="mvDetails.name"
              :src="mvUrls"
              :poster="mvDetails.cover"
              type="video/mp4"
            />
          </div>
          <div class="py-2 grid gap-4">
            <h1 class="text-2xl font-semibold line-clamp-2">
              {{ mvDetails.name }}
            </h1>
            <div class="flex items-center justify-between">
              <div class="flex gap-3 items-center">
                <img
                  v-if="mvDetails.artists && mvDetails.artists.length > 0"
                  alt="Thumbnail"
                  class="rounded-full object-cover aspect-square border w-10 h-10"
                  :src="mvDetails.artists[0].img1v1Url"
                />
                <div class="text-sm">
                  <div
                    class="font-semibold"
                    v-if="mvDetails.artists && mvDetails.artists.length > 0"
                  >
                    {{ mvDetails.artists.map((item) => item.name).join() }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    70K subscribers
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <el-button type="primary">
                  <div class="flex gap-1 items-center">
                    <icon-ic:baseline-favorite-border class="text" />
                    <span>Subscribe</span>
                  </div>
                </el-button>
              </div>
            </div>
          </div>
          <div class="grid gap-4 text-sm leading-relaxed">
            <p>
              {{ mvDetails.desc }}
            </p>
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Video created on {{ mvDetails.publishTime }} •
            {{ mvDetails.playCount }} views • {{ mvDetails.subCount }} likes
          </div>
        </div>
        <div class="grid gap-8">
          <h2 class="font-semibold text-xl">
            {{ mvCommentsList.total }} Comments
          </h2>
          <div class="grid gap-6">
            <div
              class="text-sm flex items-start gap-4"
              v-for="item in mvCommentsList.comments"
              :key="item.id"
              ref="observedElement"
            >
              <span
                class="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border"
              >
                <el-avatar
                  :src="item.user.avatarUrl + '?param=60y60'"
                  :alt="item.user.nickname"
                />
              </span>
              <div class="grid gap-2">
                <div class="flex items-center gap-2">
                  <div class="font-semibold">@{{ item.user.nickname }}</div>
                  <div class="text-gray-500 text-xs dark:text-gray-400">
                    {{ item.timeStr }}
                  </div>
                  {{ item.ipLocation.location }}
                </div>
                <div>
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2 grid gap-6">
        <div class="flex items-start gap-4 relative group">
          <a class="absolute inset-0 z-10" href="#">
            <span class="sr-only">View</span>
          </a>
          <img
            alt="Thumbnail"
            class="aspect-video rounded-lg object-cover w-28 h-16"
            src="https://generated.vusercontent.net/placeholder.svg"
          />
          <div class="text-sm">
            <div class="font-medium line-clamp-2">
              Introducing v0: Generative UI
            </div>
            <div class="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">
              Vercel
            </div>
            <div class="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">
              300K views · 5 days ago
            </div>
          </div>
        </div>
        <div class="flex items-start gap-4 relative group">
          <a class="absolute inset-0 z-10" href="#">
            <span class="sr-only">View</span>
          </a>
          <img
            alt="Thumbnail"
            class="aspect-video rounded-lg object-cover w-28 h-16"
            src="https://generated.vusercontent.net/placeholder.svg"
          />
          <div class="text-sm">
            <div class="font-medium line-clamp-2">
              Introducing the frontend cloud
            </div>
            <div class="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">
              Vercel
            </div>
            <div class="text-xs text-gray-500 line-clamp-1 dark:text-gray-400">
              1.2M views · 5 days ago
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
