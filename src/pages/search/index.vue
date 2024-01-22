<script setup lang="ts">
import ASongList from "./components/ASongList.vue";
import AMV from "./components/AMV.vue";
import { cloudsearch } from "@/api";
import { ResSearch } from "./interface";

const route = useRoute();
const state = reactive<ResSearch>({
  activeName: "1",
  list: [],
  songTotal: {
    songCount: 0,
    playlistCount: 0,
    mvCount: 0,
  },
});

const { songTotal, list, activeName } = toRefs(state);

function getMusic(type: string | number) {
  cloudsearch({ kw: route.query.kw as string, type }).then(({ result }) => {
    state.list = result.songs || result.playlists || result.mvs;
    if (result.songCount !== undefined) {
      state.songTotal.songCount = result.songCount;
    }
    if (result.playlistCount !== undefined) {
      state.songTotal.playlistCount = result.playlistCount;
    }
    if (result.mvCount !== undefined) {
      state.songTotal.mvCount = result.mvCount;
    }
  });
}
// Tabs Change
function handleClick(e: any) {
  state.list = [];
  const { props } = e;
  getMusic(props.name);
}
watch(
  () => route.query.kw,
  () => {
    getMusic(state.activeName);
  },
  {
    immediate: true,
  },
);
</script>
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane name="1">
      <template #label>
        <el-badge
          :hidden="songTotal.songCount == 0"
          :value="songTotal.songCount"
          :max="99"
          type="primary"
        >
          <label>歌曲</label>
        </el-badge>
      </template>
      <song-sheet v-if="activeName == '1'" v-model="list" />
    </el-tab-pane>
    <el-tab-pane name="1000">
      <template #label>
        <el-badge
          :hidden="songTotal.playlistCount == 0"
          :value="songTotal.playlistCount"
          :max="99"
          type="primary"
        >
          <label>歌单</label>
        </el-badge>
      </template>
      <ASongList v-if="activeName == '1000'" v-model="list" />
    </el-tab-pane>
    <el-tab-pane name="1004">
      <template #label>
        <el-badge
          :hidden="songTotal.mvCount == 0"
          :value="songTotal.mvCount"
          :max="99"
          type="primary"
        >
          <label>MV</label>
        </el-badge>
      </template>
      <AMV v-if="activeName == '1004'" v-model="list" />
    </el-tab-pane>
  </el-tabs>
</template>
<style lang="scss" scoped></style>
