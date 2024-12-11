<template>
  <div class="flex -scale-y-100 h-4 mr-4">
    <div
      v-for="(item, index) in numberOfBars"
      :key="index"
      class="load animate-move6"
      :style="{
        animationDelay:
          index === numberOfBars - 1 ? '0s' : `${(index + 1) * 0.2}s`,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
  const numberOfBars = 4 // 设置波形数量
</script>
<style scoped>
  .load {
    @apply w-0.5 bg-lime-600 rounded-sm m-0.5; /* Tailwind CSS styles */
  }
</style>
