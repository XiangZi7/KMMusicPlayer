<script setup>
import { videoSearch } from "@/api";

const router = useRouter();
const state = reactive({
  animes: [],
  searchQuery: "",
  currentPage: 1,
  loading: false,
});
const { animes, searchQuery, loading } = toRefs(state);
onMounted(() => {
  state.loading = true;
  videoSearch({ name: "刀剑神域" }).then(({ data }) => {
    state.animes = data;
    state.loading = false;
  });
});

// 搜索动漫
function filterAnimes() {
  state.animes = [];
  state.loading = true;
  videoSearch({ name: state.searchQuery })
    .then(({ data }) => {
      state.animes = data;
      state.loading = false;
    })
    .catch((error) => {
      console.error("Search error:", error);
    })
    .finally(() => {
      state.loading = false; // 加载完毕，无论成功或失败
    });
}

function goToDetails(id) {
  router.push(`/anim/animeDetails?id=${id}`);
}
</script>
<template>
  <div>
    <!-- 搜索框 -->
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        class="search-input"
        placeholder="搜索动漫..."
        @keydown.enter="filterAnimes"
      />
    </div>
    <!-- 动漫列表 -->
    <div v-if="!loading">
      <div v-if="animes.length > 0" class="anime-list">
        <div
          v-for="anime in animes"
          :key="anime.videoId"
          class="anime-card"
          @click="goToDetails(anime.videoId)"
        >
          <img :src="anime.cover" :alt="anime.title" class="anime-cover" />
          <h3 class="anime-title">{{ anime.title }}</h3>
        </div>
      </div>
      <div v-else class="no-content">无内容</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "./anime";
</style>
