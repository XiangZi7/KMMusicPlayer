<script setup>
import HeaderBar from "@/layouts/components/Header.vue";
import SideBar from "@/layouts/components/SideBar.vue";
import PlayerDrawer from "@/components/Km-Player/components/PlayerDrawer.vue";
// 共享播放器数据
provide("musicPlayer", useMusicPlayer());

const ShowDrawer = ref(false);
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
      <div class="main-container w-full">
        <el-scrollbar>
          <div class="content-wrapper">
            <!-- //////////////////// -->
            <!-- ////  AppMain  ///// -->
            <!-- //////////////////// -->
            <router-view v-slot="{ Component }">
              <transition appear name="fade-transform" mode="out-in">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
          <div class="h-[90px]"></div>
        </el-scrollbar>
        <PlayerDrawer v-model="ShowDrawer" />
        <km-player @show-drawer="ShowDrawer = !ShowDrawer" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "layouts";
</style>
