<script setup lang="ts">
import { Comment } from '@/api/interface'

const drawer = defineModel()
defineProps({
  direction: {
    type: String as PropType<'rtl' | 'ltr' | 'ttb' | 'btt'>,
    default: 'rtl',
  },
  data: {
    type: Array as PropType<Comment[]>,
    default: () => [],
  },
})
const Emit = defineEmits(['DIntersect'])

// 使用hook并传入必要的参数
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

function handleIntersect(PageNum: number) {
  Emit('DIntersect', PageNum)
}
</script>
<template>
  <el-drawer
    v-model="drawer"
    title="评论"
    :direction="direction"
    class="!w-[50%]"
  >
    <div class="space-y-8">
      <div>
        <h2 class="text-3xl font-bold">Comments</h2>
        <p class="text-muted-foreground">
          Share your thoughts and feedback on this article.
        </p>
      </div>
      <div class="space-y-6">
        <div
          class="flex items-start gap-4"
          v-for="item in data"
          :key="item.commentId"
          ref="observedElement"
        >
          <span
            class="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10 border"
          >
            <el-avatar
              :src="item.user.avatarUrl + '?param=60y60'"
              :alt="item.user.nickname"
            />
          </span>
          <div class="grid gap-2">
            <div class="flex items-center gap-2">
              <div class="font-medium text-base">{{ item.user.nickname }}</div>
              <div class="text-xs text-muted-foreground">
                {{ item.timeStr }}
              </div>
              <div class="text-xs text-muted-foreground">
                IP: {{ item.ipLocation.location }}
              </div>
            </div>
            <p class="text-sm">
              {{ item.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
