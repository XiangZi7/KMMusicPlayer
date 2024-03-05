<script setup lang="ts">
import {commentPlaylist} from "@/api";
import {CommentMVPOJO} from "@/api/interface";

const observedElement = ref([]);
const ModelValue = defineModel();

const commList = ref<CommentMVPOJO>({
  comments: [],
  hotComments: [],
  total: 0,
});
const handleIntersect = (offset: number) => {
  commentPlaylist({id: ModelValue.value as number, offset}).then((res) => {
    commList.value.comments.push(...res.comments);
  });
};

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
watch(
  () => ModelValue.value,
  () => {
    commentPlaylist({id: ModelValue.value as number}).then((res) => {
      commList.value = res;
    });
  },
  {immediate: true},
);
</script>
<template>
  <div v-if="commList.comments?.length > 0" class="p-3">
    <h3 class="py-2">热门评论</h3>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div
        v-for="item in commList.hotComments"
        :key="item.commentId"
        ref="observedElement"
        class="bg-white transition bg-opacity-40 hover:bg-[#D9DEE3] hover:bg-opacity-50 p-5 rounded-lg shadow-lg  flex flex-col justify-between"
      >
        <div class="header flex items-center gap-3">
          <el-avatar
            :src="item.user.avatarUrl + '?param=60y60'"
            :alt="item.user.nickname"
            class="w-10 h-10 rounded-full"
          />
          <div class="user-info">
            <h3 class="username font-bold text-sm">
              {{ item.user.nickname }}
            </h3>
            <p class="text-gray-700 text-xs">{{ item.timeStr }}</p>
          </div>
        </div>
        <p class="comment-text text-gray-800 text-xs py-3">
          {{ item.content }}
        </p>
        <div class="like flex items-center gap-2 justify-between">
          <div class="flex items-center gap-1">
            <i-material-symbols:favorite class="text-red-400"/>
            <span class="text-gray-800 text-xs"> {{ item.likedCount }}</span>
          </div>
          {{ item.ipLocation.location }}
        </div>
      </div>
    </div>
    <h3 class="py-2">最新评论 ({{ commList.total }})</h3>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div
        v-for="item in commList.comments"
        :key="item.commentId"
        ref="observedElement"
        class="bg-white transition bg-opacity-40 hover:bg-[#D9DEE3] hover:bg-opacity-50 p-5 rounded-lg shadow-lg  flex flex-col justify-between"
      >
        <div class="header flex items-center gap-3">
          <el-avatar
            :src="item.user.avatarUrl + '?param=60y60'"
            alt="头像"
            class="w-10 h-10 rounded-full"
          />
          <div class="user-info">
            <h3 class="username font-bold text-sm">
              {{ item.user.nickname }}
            </h3>
            <p class="text-gray-700 text-xs">{{ item.timeStr }}</p>
          </div>
        </div>
        <p class="comment-text text-gray-800 text-xs py-3">
          {{ item.content }}
        </p>
        <div class="like flex items-center gap-2 justify-between text-xs">
          <div class="flex items-center gap-1">
            <i-material-symbols:favorite class="text-red-400"/>
            <span class="text-gray-800"> {{ item.likedCount }}</span>
          </div>
          {{ item.ipLocation.location }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
