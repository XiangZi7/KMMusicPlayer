<script setup lang="ts">
import { artistAlbum, artistDetail } from "@/api";
import Tabs from "./components/tabs.vue";
import { isEmptyObject } from "@/utils/utils";
const state = reactive({
  artistsDetail: {},
});
const { artistsDetail } = toRefs(state);

const route = useRoute();
onMounted(() => {
  // 首先获取歌手信息、歌手专辑
  Promise.all([
    artistAlbum(route.params.id),
    artistDetail(route.params.id),
  ]).then((res) => {
    state.artistsDetail = {
      artistAlbum: res[0],
      artistDetail: res[1].data,
    };
    console.log("=>([id].vue:15) state.artistsDetail", state.artistsDetail);
  });
});

const tabs = ["热门单曲", "所有专辑", "相关MV", "歌手介绍", "话题"];
const activeTab = ref("热门单曲"); // 初始活动选项卡
</script>
<template>
  <div
    v-if="!isEmptyObject(artistsDetail)"
    :style="{
      backgroundImage: `url(${artistsDetail?.artistAlbum?.artist?.img1v1Url})`,
    }"
    class="h-full bg-cover bg-center relative p-8 rounded-lg shadow-lg text-white"
  >
    <div
      class="absolute rounded-lg inset-0 bg-gray-900 bg-opacity-10 backdrop-filter p-8"
    >
      <div class="flex flex-col justify-between h-[calc(100%-50px)]">
        <div class="flex justify-between items-start text-xl">
          <i-material-symbols:arrow-back />
          <i-ph:list-bold />
        </div>
        <div>
          <div class="mt-6 flex justify-between items-end">
            <div class="flex flex-col gap-2">
              <h1 class="text-6xl font-bold">
                {{ artistsDetail?.artistAlbum?.artist?.name }}
              </h1>
              <p class="text-xl">
                {{
                  artistsDetail?.artistAlbum?.artist?.alias
                    .map((item) => item)
                    .join(" ")
                }}
              </p>
            </div>
            <div class="flex space-x-4">
              <div class="flex items-center">
                <i-mdi:heart-outline />
                <span class="ml-2">467</span>
              </div>
              <div class="flex items-center">
                <i-ph:share-network />
                <span class="ml-2">86</span>
              </div>
              <div class="flex items-center">
                <i-jam:movie />
                <span class="ml-2">{{
                  artistsDetail.artistDetail.videoCount
                }}</span>
              </div>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-5 gap-4">
            <div
              v-for="(item, idx) in 5"
              :key="idx"
              class="rounded-lg bg-white/30 border shadow-sm backdrop-filter backdrop-blur-lg text-white"
              data-v0-t="card"
            >
              <div class="flex flex-col space-y-1.5 p-6">
                <h3
                  class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight"
                >
                  01
                </h3>
                <p class="text-sm text-muted-foreground">好きだから</p>
                <span>04:55</span>
              </div>
              <div class="p-6 flex items-center justify-between text-xl">
                <i-ic:outline-add-circle-outline />
                <i-mdi:heart-outline />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabs v-model="activeTab" :tabs="tabs" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
