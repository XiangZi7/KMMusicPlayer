<script setup>
import { SideBarData } from "./SideBarData";

const router = useRouter();
</script>
<template>
  <aside class="left-side">
    <div class="side-wrapper">
      <div class="side-title flex" style="justify-content: center">
        <img src="@/assets/logo2.png" alt="" style="width: 150px" />
      </div>
    </div>
    <div v-for="item1 in SideBarData" :key="item1.title" class="side-box">
      <div class="side-title mt-2 mb-2">{{ item1.title }}</div>
      <div class="side-menu">
        <div
          v-for="item2 in item1.child"
          :key="item2.title"
          class="side-item"
          @click="router.push({ path: item2.router })"
        >
          <component :is="item2.icon" />
          {{ item2.title }}
        </div>
      </div>
    </div>
  </aside>
</template>
<style lang="scss" scoped>
@use "SideBar";
</style>
