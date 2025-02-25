<script setup lang="ts">
import Left from './components/left.vue'
import Center from './components/center.vue'
import Right from './components/right.vue'
</script>
<template>
  <footer class="border-t flex items-center justify-between">
    <!-- 左边：歌曲封面和歌曲名称 -->
    <Left />
    <!-- 中间：控制区 -->
    <Center />
    <!-- 右边：历史播放和音量 -->
    <Right />
  </footer>
</template>
