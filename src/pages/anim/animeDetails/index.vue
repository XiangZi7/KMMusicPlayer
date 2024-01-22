<script setup>
import AnimeDetails from "./AnimeDetails.vue";
import PlayVideo from "./playVideo.vue";
import { videoChapter } from "@/api";
const route = useRoute();
const state = reactive({
  anime: {},
  videoUrl: "",
});
const { anime, videoUrl } = toRefs(state);
watch(
  () => route.query.id,
  () => {
    state.anime = {};
    state.videoUrl = "";
    videoChapter(route.query.id).then(({ data }) => {
      state.anime = data;
    });
  },
  { immediate: true },
);

function selectEpisode(episode) {
  state.videoUrl = episode;
}
</script>
<template>
  <div class="anime-details">
    <AnimeDetails v-if="!videoUrl" :anime="anime" />
    <PlayVideo v-else :src="videoUrl" class="mb-3" />
    <div class="info-section">
      <!-- Episodes -->
      <div class="episodes-grid">
        <el-button
          v-for="episode in anime.chapterList"
          :key="episode"
          type="primary"
          @click="selectEpisode(episode.chapterPath)"
        >
          {{ episode.title }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.anime-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 20px;
}
.info-section {
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.episodes-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(120px, 1fr)
  ); /* 创建尽可能多的列，但列宽至少为 120px 并填满可用空间 */
  gap: 8px; /* 控制按钮之间的空间 */
}
.el-button + .el-button {
  margin-left: 0;
}

.episode-btn {
  padding: 8px 16px;
  border: 1px solid #ddd; /* 边框颜色 */
  background-color: #fff;
  border-radius: 4px; /* 圆角按钮 */
  cursor: pointer; /* 鼠标悬停变为手形图标 */
  flex: none; /* 避免按钮被强制伸缩 */
}

.episode-btn:hover {
  background-color: #f0f0f0; /* 按钮悬停时改变背景色 */
}

/* 可以添加一些媒体查询，以改善小屏幕设备上的布局 */
@media (max-width: 600px) {
  .episode-btn {
    flex-basis: 100%; /* 在小屏幕上，按钮占满整行 */
  }
}
</style>
