<script setup lang="ts">
import { playlistDetail, urlV1 } from "@/api";
import { Playlist } from "@/pages/songList/interface";

const MusicStore = useMusicStore();
const route = useRoute();
const state = reactive<Playlist>({
  playlists: {},
});
const { playlists } = toRefs(state);

watch(
  () => route.params.id,
  () => {
    state.playlists = [];
    playlistDetail(route.params.id).then(({ playlist }) => {
      state.playlists = playlist;
    });
  },
  { immediate: true },
);
const isEmpty = (obj) => {
  if (obj) {
    return Object.keys(obj).length > 0;
  }
};

// 播放当前歌单全部歌曲
function playAll() {
  let ids = state.playlists.tracks.map((item) => item.id).join();
  let storeSong = [];
  urlV1(ids).then(({ data }) => {
    state.playlists.tracks.forEach((item1) => {
      let hasTarget = data.find((item2) => item1.id === item2.id);
      storeSong.push({
        id: item1.id,
        title: item1.name,
        singer: item1.ar.map((item) => item.name).join(),
        album: item1.al.name,
        cover: item1.al.picUrl,
        source: hasTarget.url,
        time: item1.dt,
        mv: item1.mv,
      });
    });
    MusicStore.addTrackAndPlay(storeSong);
  });
}
</script>
<template>
  <div v-if="isEmpty(playlists)" class="playlist">
    <div class="flex">
      <div
        class="playlist-cover yx-col-6"
        :style="{
          backgroundImage: `url(${playlists?.coverImgUrl + '?param=500y500'})`,
        }"
      ></div>
      <!-- Cover image on the left -->
      <div class="playlist-info">
        <!-- Playlist info on the right -->
        <h2>{{ playlists?.name }}</h2>
        <div class="author">
          <img
            :src="playlists?.creator?.avatarUrl + '?param=60y60'"
            :alt="playlists?.creator?.nickname"
          />
          <!-- Author avatar -->
          <span class="author-name">{{ playlists?.creator?.nickname }}</span>
          <!-- Author name -->
        </div>
        <p class="playlist-description">
          {{ playlists?.description }}
        </p>
        <ul class="tags">
          <!-- Tags -->
          <li v-for="(item1, index) in playlists?.tags" :key="index">
            {{ item1 }}>钢琴
          </li>
        </ul>
        <!--Btn-->
        <div class="Button-group mt-3">
          <el-button type="primary" @click="playAll">播放全部</el-button>
        </div>
      </div>
    </div>
    <!--歌曲-->
    <song-sheet v-if="isEmpty(playlists)" v-model="playlists.tracks" />
  </div>
</template>
<style lang="scss" scoped>
.Button-group button {
  font-size: 12px;
  transition: all 0.3s ease;
}

.playlist {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.playlist-cover {
  width: 300px;
  height: 300px;
  background-size: cover;
  background-position: center;
}

.playlist-info {
  padding: 20px;
  flex-grow: 1;
}

.author {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.author-name {
  font-weight: bold;
}

.playlist-description {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 15px;
}

.tags {
  list-style: none;
  padding: 0;
}

.tags li {
  display: inline;
  background: #eee;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
  font-size: 12px;
  color: #333;
}
</style>
