<script setup lang="ts">
import { urlV1 } from "@/api";
import { Track } from "@/stores/interface";
import { MusicPlayer } from "@/hooks/type";
import { MVItem } from "@/components/interface";

const ModelValue = defineModel<MVItem[]>();
const musicStore = useMusicStore();
const musicPlayer = inject<MusicPlayer>("musicPlayer");
if (!musicPlayer) {
  // 提供了错误处理
  throw new Error("musicPlayer is not provided.");
}
const { addTrackAndPlay } = musicPlayer;

// 获取所有具有 '.observer-item' 类名的元素
const observer_item = ref([]);
const emit = defineEmits(["query"]);

const { currentPage } = useObserver(observer_item, dataCallback);

function dataCallback(PageNum: number) {
  console.log(currentPage);
  emit("query", PageNum);
}

function FormattingSongTime(time: number) {
  return formatTimes(time);
}

function addMusic(item: any) {
  urlV1(item.id).then(({ data }) => {
    let param: Track = {
      id: item.id,
      title: item.name,
      singer: item.ar.map((ar: any) => ar.name).join(" / "),
      album: item.al.name,
      cover: item.al.picUrl,
      source: data[0].url,
      time: item.dt,
      mv: item.mv,
    };
    musicStore.addTrackAndPlay(param);
    addTrackAndPlay();
  });
}
</script>
<template>
  <div class="music-list">
    <div
      v-for="item in ModelValue"
      :key="item.id"
      ref="observer_item"
      class="list-item"
      @dblclick="addMusic(item)"
    >
      <div class="item-section cover-container yx-col-6">
        <img class="cover" :src="item.al.picUrl" :alt="item.name" />
        <span class="ml-2">
          {{ item.name }}
        </span>
      </div>
      <div class="item-section artist-container yx-col-6">
        <span class="tx-ellipsis">
          {{ item.ar.map((ar) => ar.name).join(" / ") }}
        </span>
      </div>
      <div class="item-section time-container yx-col-4">
        {{ item.al.name }}
      </div>
      <div class="item-section time-container yx-col-4 text-center">
        {{ FormattingSongTime(item.dt) }}
      </div>
      <div class="item-section controls-container yx-col-4">
        <div class="button">
          <i-material-symbols:play-circle-outline-rounded
            class="icon"
            @click="addMusic(item)"
          />
        </div>
        <div v-if="item.mv != 0" class="button">
          <i-ph:film-strip class="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.music-list {
  font-size: 13px;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 10px;
  transition: background-color 0.3s ease;
}

.list-item:hover {
  background-color: #f4f4f4;
  border-radius: 10px;
}

.item-section {
  margin-right: 10px;
}

.cover-container {
  display: flex;
  align-items: center;
  gap: 2px;
}

.cover {
  width: 50px;
  height: auto;
  border-radius: 4px;
}

.artist-container {
  //flex-grow: 1;
  //display: flex;
  //align-items: center;
}

.time-container {
  min-width: 50px; // Adjust as per the actual width needed
}

.controls-container {
  display: flex;
  align-items: center;
  position: relative;
}

.icon {
  display: inline-block;
  width: 25px; // Set the size of your icon
  height: 25px;
  cursor: pointer;
  border-radius: 4px;
}

.button {
  display: none;
  margin-left: 5px;
  padding: 5px;
  color: #333;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #d9d9d9;
}

.list-item:hover .button {
  display: inline-block;
}

.tx-ellipsis {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
}

/* Add responsiveness as needed */
@media (max-width: 600px) {
  .list-item {
    flex-direction: column;
    align-items: flex-start;
  }
}

//过渡效果 observer_item的过渡效果
.come-in {
  opacity: 1;
  transform: translateY(150px);
  animation: come-in 1s ease forwards;
}

.come-in:nth-child(odd) {
  animation-duration: 1s;
}

.already-visible {
  opacity: 1;
  transform: translateY(0);
  animation: none;
}

@keyframes come-in {
  100% {
    transform: translateY(0);
  }
}

.opaque {
  opacity: 0;
}
</style>
