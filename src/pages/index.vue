<script setup lang="ts">
import { cloudsearch } from "@/api";
import { IState } from "@/pages/index";
const router = useRouter();
const state = reactive<IState>({
  SongsList: [],
  SongList: [],
});
const { SongsList, SongList } = toRefs(state);
onMounted(() => {
  cloudsearch({ kw: "境界的彼方" }).then(({ result }) => {
    state.SongsList = result.songs;
  });
  cloudsearch({ kw: "境界的彼方", type: 1000 }).then(({ result }) => {
    state.SongList = result.playlists;
  });
});

function toDetail(id: number) {
  router.push({ path: `/songList/songListDetails/${id}` });
}
</script>
<template>
  <div>
    <!--   banner图  -->
    <div class="banner">
      <div class="des">
        <div class="des-title flex gap-1">
          <i-material-symbols:credit-card-heart-outline />
          境界的彼方
        </div>
        <p class="des-text">
          《境界的彼方》是由鸟居奈古梦著作、鸭居知世插画的轻小说，于2012年6月9日，由KAESUMA文库文库（京都动画）发行。小说曾获得第2回京都动画大赏（小说部门）奖励赏。
          改编自小说的同名电视动画已于2013年10月至12月播出。
        </p>
        <div class="danceMk">
          <img src="@/assets/danceMk.png" />
        </div>
      </div>
    </div>
    <!-- SongsList -->
    <el-scrollbar>
      <div class="Music-Library mt-3">
        <div
          v-for="item in SongList"
          :key="item.id"
          class="Library-item"
          @click="toDetail(item.id)"
        >
          <el-image
            lazy
            loading="lazy"
            :src="item.coverImgUrl + '?param=500y500'"
            class="w-[200px] rounded-xl shadow-xl"
            :alt="item.name"
          />
          <div>{{ item.name }}</div>
        </div>
      </div>
    </el-scrollbar>
    <!--   songSheet  -->
    <el-scrollbar>
      <song-sheet
        v-if="SongsList.length > 0"
        v-model="SongsList"
        class="mt-3 h-[180px]"
      />
    </el-scrollbar>
  </div>
</template>
<style lang="scss" scoped>
@use "index";
</style>
