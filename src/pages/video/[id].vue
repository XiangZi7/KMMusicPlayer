<script setup lang="ts">
import { commentMV, mvDetail, mvUrl } from "@/api";
import { mvDetails } from "@/pages/video/interface";

const route = useRoute();
const state = reactive<mvDetails>({
  mvSrc: "",
  mvInfo: {},
  comments: [],
});
const { comments, mvSrc, mvInfo } = toRefs(state);
const observer_item = ref([]);
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const Obser = useObserver(observer_item, dataCallback);
function dataCallback(PageNum: number | string) {
  commentMV({ offset: PageNum, id: route.params.id }).then(({ comments }) => {
    state.comments = state.comments.concat(comments);
  });
}
watch(
  () => route.params.id,
  () => {
    const id: number = route.params.id;
    mvUrl(id).then(({ data }) => {
      state.mvSrc = data.url;
    });
    mvDetail(id).then(({ data }) => {
      state.mvInfo = data;
    });
    commentMV({ id }).then(({ comments }) => {
      state.comments = comments;
    });
  },
  { immediate: true },
);
</script>
<template>
  <div class="mv-container">
    <video class="mv-player rounded" :src="mvSrc" controls></video>
    <div class="mv-info">
      <h1>{{ mvInfo.name }}</h1>
      <h2>{{ mvInfo.artists?.map((item) => item.name).join(" / ") }}</h2>
    </div>
    <div class="mv-comments">
      <h3>用户评论({{ mvInfo.commentCount }})</h3>
      <ul class="comments-list mt-2">
        <!-- 评论列表 -->
        <li
          v-for="item in comments"
          :key="item.id"
          ref="observer_item"
          class="comment"
        >
          <div class="user-avatar">
            <el-avatar :src="item.user.avatarUrl" :alt="item.user.nickname" />
          </div>
          <div class="comment-content ml-2">
            <div class="user-info">
              <span class="user-name">{{ item.user.nickname }}</span>
              <span class="comment-date">{{ item.timeStr }}</span>
            </div>
            <p class="user-comment">{{ item.content }}</p>
            <div class="text-xs flex justify-between">
              <span class="flex items-center gap-1 mt-2">
                <i-solar:chat-round-like-bold
                  class="text-red-500 text-[14px]"
                />
                {{ item.likedCount }}
              </span>
              <span>{{ item.ipLocation.location }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "mvDetails";
</style>
