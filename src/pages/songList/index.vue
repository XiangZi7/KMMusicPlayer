<script setup lang="ts">
import { playlistCatList, topPlaylist } from "@/api";
import { State } from "@/pages/songList/interface";
// 获取所有具有 '.observer-item' 类名的元素
const observedElement = ref([]);
const router = useRouter();
// 使用hook并传入必要的参数
useIntersectionObserver(
  observedElement,
  {
    initialPageNum: 1, // 初始页码
    pageSize: 10, // 页面大小
    threshold: 0.1, // 可选阈值参数
  },
  handleIntersect,
);

function handleIntersect(PageNum: number) {
  topPlaylist({ offset: PageNum, cat: state.currentCat }).then(
    ({ playlists }) => {
      state.Playlist = state.Playlist.concat(playlists);
    },
  );
}

const state = reactive<State>({
  Playlist: [],
  CatList: [{ name: "全部", label: "全部" }],
  currentCat: ["全部"],
});

const { currentCat, CatList, Playlist } = toRefs(state);
onMounted(() => {
  topPlaylist({ offset: 1, cat: state.currentCat }).then(({ playlists }) => {
    state.Playlist = playlists;
  });
  playlistCatList().then(({ sub }) => {
    state.CatList = state.CatList.concat(sub);
  });
});

function catChange(e: []) {
  state.Playlist = [];
  topPlaylist({ offset: 1, cat: e.join() }).then(({ playlists }) => {
    state.Playlist = playlists;
  });
}
</script>
<template>
  <div>
    <div class="mt-2 mb-2">
      <el-select-v2
        v-model="currentCat"
        filterable
        :options="CatList"
        style="width: 240px"
        multiple
        clearable
        :props="{ label: 'name', value: 'name' }"
        @change="catChange"
      >
        <template #default="{ item }">
          <div class="flex items-center">
            <span>{{ item.name }}</span>
          </div>
        </template>
      </el-select-v2>
    </div>

    <div class="playlist-container">
      <!-- 歌单列表项 -->
      <div
        v-for="item in Playlist"
        :key="item.id"
        ref="observedElement"
        class="playlist-item"
        @click="router.push({ path: `/songList/songListDetails/${item.id}` })"
      >
        <el-image
          lazy
          :src="item.coverImgUrl + '?param=350y350'"
          class="rounded"
        />
        <div class="text-xs mt-2 textov">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "index";
</style>
