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
    console.log('🚀 => PageNum:', PageNum)
    Emit('DIntersect', PageNum)
  }
</script>
<template>
  <el-drawer
    title="评论"
    v-model="drawer"
    :direction="direction"
    class="!w-[100%]"
  >
    <div class="grid gap-4 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
      <div
        class="transform md:translate-y-4 transition-all duration-300 hover:scale-105"
        v-for="item in data"
        :key="item.commentId"
        ref="observedElement"
      >
        <div
          class="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6 h-full shadow-lg border border-white border-opacity-20"
        >
          <div class="flex items-center mb-4 space-x-2">
            <el-avatar
              :src="item.user.avatarUrl + '?param=60y60'"
              :alt="item.user.nickname"
            />
            <div>
              <div class="font-medium text-base">{{ item.user.nickname }}</div>
              <div class="text-xs text-muted-foreground">
                {{ item.timeStr }}
              </div>
            </div>
          </div>
          <p class="text-base">
            {{ item.content }}
          </p>
          <div class="flex justify-between items-center text-xs text-gray-500">
            <span>{{ item.timeStr }}</span
            ><span>IP: {{ item.ipLocation.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
