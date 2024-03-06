<script setup lang="ts">
import { playlistDetail, urlV1 } from "@/api";
import { StorePlaylist, Track } from "@/pages/songList/interface";
import { formatTimestamp } from "@/utils/timeUtils";
import Comment from "./comment.vue";

const MusicStore = useMusicStore();
const route = useRoute();
const state = reactive<StorePlaylist>({
  playlists: {},
  activeName: "first",
});
const { playlists, activeName } = toRefs(state);

watch(
  () => route.params.id,
  (id) => {
    state.playlists = undefined;
    playlistDetail(id).then(({ playlist }) => {
      state.playlists = playlist;
    });
  },
  { immediate: true },
);
// 校验对象是否是“空”的函数类型
// 将 obj 任意类型改为 object 可能的类型
function isEmpty(obj: object | null | undefined): boolean {
  if (obj instanceof Object) {
    return Object.keys(obj).length > 0;
  }
  return false;
}

// 播放当前歌单全部歌曲
function playAll() {
  if (!state.playlists || !state.playlists.tracks) {
    return;
  }
  let ids = state.playlists.tracks.map((item) => item.id).join();
  let storeSong: Track[] = [];
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
    <div class="flex mb-3 bg-white shadow rounded">
      <div
        class="playlist-cover yx-col-6"
        :style="{
          backgroundImage: `url(${playlists?.coverImgUrl + '?param=500y500'})`,
        }"
      ></div>
      <div class="playlist-info">
        <h2>{{ playlists?.name }}</h2>
        <div class="author">
          <el-avatar
            class="mr-2"
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
        <div class="flex items-center justify-between">
          <ul class="tags">
            <!-- Tags -->
            <li v-for="(item1, index) in playlists?.tags" :key="index">
              {{ item1 }}>钢琴
            </li>
          </ul>
          <div class="flex items-center gap-1">
            <i-material-symbols:calendar-month-outline />
            <span class="text-sm">
              {{ formatTimestamp(playlists?.createTime) }}
            </span>
          </div>
        </div>

        <!--Btn-->
        <div class="Button-group mt-3 flex items-center gap-3 justify-between">
          <el-button type="primary" @click="playAll">播放全部</el-button>

          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1">
              <i-material-symbols:android-now-playing-outline
                class="text-red-400"
              />
              <span class="text-sm"> ({{ playlists?.playCount }}) </span>
            </div>
            <div class="flex items-center gap-1">
              <i-material-symbols:favorite class="text-red-400" />
              <span class="text-sm"> ({{ playlists?.subscribedCount }}) </span>
            </div>
            <div class="flex items-center gap-1">
              <i-ic:twotone-share class="text-red-400" />
              <span class="text-sm"> ({{ playlists?.shareCount }}) </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" class="px-3">
      <el-tab-pane :label="`歌曲 (${playlists?.trackCount})`" name="first">
        <!--歌曲-->
        <song-sheet v-if="isEmpty(playlists)" v-model="playlists.tracks" />
      </el-tab-pane>
      <el-tab-pane :label="`评论 (${playlists?.commentCount})`" name="second">
        <Comment v-model="playlists.id" />
      </el-tab-pane>
    </el-tabs>
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
  //background: #fff;
  border-radius: 8px;
  //box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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
