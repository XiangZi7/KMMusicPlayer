<script setup lang="ts">
import HeaderBar from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import PlayerDrawer from "@/components/Km-Player/components/PlayerDrawer.vue";
// 共享播放器数据
provide("musicPlayer", useMusicPlayer());
const PlayerDrawerRef = ref();

function showDrawer() {
  PlayerDrawerRef.value.acceptParam();
}
</script>
<template>
  <div class="Music-App">
    <!-- //////////////////// -->
    <!-- ////  HeaderBar  ///// -->
    <!-- //////////////////// -->
    <HeaderBar />
    <div class="wrapper">
      <!-- //////////////////// -->
      <!-- ////  SideBar  ///// -->
      <!-- //////////////////// -->
      <SideBar />
      <div class="main-container flex-1">
        <el-scrollbar style="height: calc(100% - 90px)">
          <div class="content-wrapper w-full h-full">
            <!-- //////////////////// -->
            <!-- ////  AppMain  ///// -->
            <!-- //////////////////// -->
            <router-view v-slot="{ Component, route }">
              <component :is="Component" :key="route.fullPath" />
            </router-view>
          </div>
        </el-scrollbar>
        <PlayerDrawer ref="PlayerDrawerRef" />
        <km-player @show-drawer="showDrawer" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "layouts";
</style>
