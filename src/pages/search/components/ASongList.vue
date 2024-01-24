<script setup lang="ts">
import { IMSongList } from "@/pages/search/interface";

const ModelValue = defineModel<IMSongList[]>();
</script>
<template>
  <div class="playlist mt-2">
    <!-- Song Item -->
    <div v-for="item in ModelValue" :key="item.id" class="song">
      <div class="cover">
        <el-image :src="item.coverImgUrl + '?param=450y450'" :alt="item.name" />
      </div>
      <div class="title">{{ item.name }}</div>
      <div class="artist">{{ item.creator.nickname }}</div>
    </div>
    <!-- Repeat for other songs -->
  </div>
</template>
<style lang="scss" scoped>
.playlist {
  display: grid; /* 使用 Grid 布局 */
  grid-template-columns: repeat(
    auto-fill,
    minmax(220px, 1fr)
  ); /* 歌单项的最小宽度是 120px，1fr 表示自适应填充 */
  gap: 15px; /* 设置歌单项之间的间距 */
  text-align: center; /* Center the text */
  width: 100%;
}

.song {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  flex-direction: column; /* Stack cover on top of the text */
  transition: transform 0.3s ease-in-out;
  cursor: pointer; /* Indicate that items are interactable */
}

.song:hover {
  transform: translateY(-5px); /* Move up a bit when hovered */
}

.cover {
  position: relative;
  width: 200px;
  height: 200px;
  margin-bottom: 10px; /* Space between cover and text */
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5); /* Shadow for the cover */
  overflow: hidden;
}

.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the cover aspect ratio is maintained */
}

.cover:after {
  content: "";
  position: absolute;
  bottom: -25px;
  left: 10px;
  width: 90%;
  height: 20px;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent);
  transform: scaleY(-1); /* Flip the gradient to create a reflection effect */
  opacity: 0.6; /* Reduce opacity for subtlety */
}

.title {
  font-weight: bold;
  font-size: 14px;
  color: #333; /* Dark text color for legibility */
  margin-top: 10px; /* Space between text and cover */
}

.artist {
  color: #666; /* A lighter text color for the artist name */
  font-size: 12px;
  margin-top: 5px;
}
</style>
