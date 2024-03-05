<script setup lang="ts">
// 使用 inject 并设置一个合适的默认值，或者校验是否 undefined
import { MusicPlayer } from "@/hooks/type";
import { commentMusic } from "@/api";
import { CommentMVPOJO } from "@/api/interface";

const musicPlayer = inject<MusicPlayer>("musicPlayer");

// 确保 musicPlayer 不是 undefined
if (!musicPlayer) {
  // 提供了错误处理
  throw new Error("musicPlayer is not provided.");
}

const {
  LyricList,
  currentLyricIndex,
  lyricTranslateY,
  currentTrackSong,
  isPlaying,
  currentTrackIndex,
} = musicPlayer;
const ModelValue = defineModel<boolean>();
const observedElement = ref<HTMLElement[]>([]);
const commList = ref<CommentMVPOJO>({
  comments: [],
  hotComments: [],
  total: 0,
});

watch(
  () => currentTrackIndex.value && ModelValue.value,
  () => {
    if (!ModelValue.value) return;
    commList.value = { comments: [], hotComments: [], total: 0 }; // 重置评论列表
    commentMusic({ id: currentTrackSong.value.id }).then(
      (res: CommentMVPOJO) => {
        commList.value = res;
      },
    );
  },
  {
    immediate: true,
  },
);

// 定义当元素进入视口时触发的回调函数
const handleIntersect = (offset: number) => {
  let params = {
    id: currentTrackSong.value.id,
    offset,
  };
  commentMusic(params).then((res) => {
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
</script>
<template>
  <el-drawer
    v-model="ModelValue"
    :style="{ '--track-cover-url': `url(${currentTrackSong?.cover})` }"
    style="box-shadow: none"
    destroy-on-close
    :modal="false"
    title=""
    class="drawer-bg"
    direction="ttb"
    size="calc(100% - 90px)"
  >
    <el-scrollbar>
      <div class="h-full">
        <div class="flex min-w-0" style="flex-flow: row wrap">
          <!--  left  -->
          <div class="yx-col-12">
            <div class="flex items-center justify-center h-full">
              <div class="relative" style="height: 350px; width: 350px">
                <el-image
                  lazy
                  loading="lazy"
                  class="z-20"
                  :src="currentTrackSong.cover + '?param=700y700'"
                  style="height: 100%; width: 100%"
                />
                <img
                  :style="{
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }"
                  src="@/assets/vinyl.png"
                  class="w-full h-full absolute top-0 left-[170px] z-10 rotate"
                />
              </div>
            </div>
          </div>
          <!--  right  -->
          <div class="yx-col-12">
            <div class="lyrics-container">
              <ul :style="{ transform: `translateY(${lyricTranslateY}px)` }">
                <li
                  v-for="(item, index) in LyricList"
                  :key="index"
                  :class="{ highlight: index === currentLyricIndex }"
                >
                  <div>{{ item.lrc }}</div>
                  <div>{{ item.tlyric }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-if="commList.comments?.length > 0" class="p-3">
        <h3 class="py-2">热门评论</h3>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <div
            v-for="item in commList.hotComments"
            :key="item.commentId"
            ref="observedElement"
            class="comment-card bg-white bg-opacity-40 backdrop-filter backdrop-blur-md p-5 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-[#D9DEE3] hover:bg-opacity-50 flex flex-col gap-3 justify-between"
          >
            <div class="header flex items-center gap-3">
              <el-avatar
                :src="item.user.avatarUrl"
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
            <div class="like flex items-center gap-2 justify-between">
              <div class="flex items-center gap-1">
                <i-material-symbols:favorite class="text-red-400" />
                <span class="text-gray-800 text-xs">
                  {{ item.likedCount }}</span
                >
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
            class="comment-card bg-white bg-opacity-40 backdrop-filter backdrop-blur-md p-5 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-[#D9DEE3] hover:bg-opacity-50 flex flex-col gap-3 justify-between"
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
            <div class="like flex items-center gap-2 justify-between text-xs">
              <div class="flex items-center gap-1">
                <i-material-symbols:favorite class="text-red-400" />
                <span class="text-gray-800"> {{ item.likedCount }}</span>
              </div>
              {{ item.ipLocation.location }}
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-drawer>
</template>
<style lang="scss" scoped>
@use "./playerDrawer";
</style>
