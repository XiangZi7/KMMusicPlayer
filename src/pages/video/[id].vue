<script setup lang="ts">
import { commentMV, mvDetail, mvUrl } from "@/api";
import { mvDetails } from "@/pages/video/interface";

const route = useRoute();
const state = reactive<mvDetails>({
  mvSrc: "",
  mvInfo: {},
  commentsList: {
    comments: [],
    total: 0,
  },
});
const { commentsList, mvSrc, mvInfo } = toRefs(state);
const observedElement = ref([]);
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
// 使用hook并传入必要的参数
useIntersectionObserver(
  observedElement,
  {
    initialPageNum: 2, // 初始页码
    pageSize: 10, // 页面大小
    threshold: 0.1, // 可选阈值参数
  },
  handleIntersect,
);

function handleIntersect(PageNum: number | string) {
  commentMV({ offset: PageNum, id: route.params.id }).then(({ comments }) => {
    state.commentsList.comments = state.commentsList.comments.concat(comments);
  });
}

watch(
  () => route.params.id,
  () => {
    const id: number = route.params.id;
    Promise.all([mvUrl(id), mvDetail(id), commentMV({ id })]).then((res) => {
      state.mvSrc = res[0].data.url;
      state.mvInfo = res[1].data;
      state.commentsList = res[2];
    });
  },
  { immediate: true },
);
</script>
<template>
  <div
    class="rounded-lg border bg-card text-card-foreground shadow-sm w-full grid gap-0"
    data-v0-t="card"
  >
    <div class="w-full">
      <video class="w-full rounded-xl" :src="mvSrc" controls />
    </div>
  </div>
  <div class="grid gap-6 p-2">
    <div class="grid gap-2">
      <h1 class="text-3xl font-bold tracking-tight">{{ mvInfo.name }}</h1>
      <p class="text-gray-500 dark:text-gray-400">
        {{ mvInfo.artists?.map((item) => item.name).join(" / ") }}
      </p>
    </div>
    <div class="grid gap-2">
      <h2 class="text-xl font-semibold tracking-tight">Introduction</h2>
      <p>
        "Lemon" is a song by American band N.E.R.D and Barbadian singer Rihanna.
        It was released on November 1, 2017.
      </p>
    </div>
    <div v-if="commentsList.comments.length > 0" class="grid gap-2">
      <h2 class="text-xl font-semibold tracking-tight">
        评论 ({{ commentsList.total }})
      </h2>
      <div class="grid gap-5">
        <div
          v-for="item in commentsList.comments"
          :key="item.id"
          ref="observedElement"
          class="grid gap-2 bg-white rounded-xl shadow p-4"
        >
          <div class="flex items-center gap-4">
            <span
              class="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border"
            >
              <el-avatar
                :src="item.user.avatarUrl + '?param=60y60'"
                :alt="item.user.nickname"
              />
            </span>
            <div class="grid gap-1.5">
              <div class="font-semibold">{{ item.user.nickname }}</div>
              <div class="text-gray-500 text-xs dark:text-gray-400">
                {{ item.timeStr }}
              </div>
            </div>
          </div>
          <div>
            {{ item.content }}
          </div>
          <div class="flex justify-between text-xs">
            <div class="flex items-center gap-1">
              <i-material-symbols:favorite class="text-red-400" />
              {{ item.likedCount }}
            </div>
            <div>{{ item.ipLocation.location }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "mvDetails";
</style>
