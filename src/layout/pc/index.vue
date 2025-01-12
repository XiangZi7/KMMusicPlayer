<script setup lang="ts">
import Sidebar from './components/sidebar.vue'
</script>
<template>
  <div class="flex flex-col h-full w-full bg-gray-100 dark:bg-[#1d1a22] flex-1">
    <div class="absolute inset-0 overflow-hidden z-0">
      <div class="jumbo absolute -inset-[10px] opacity-20 dark:opacity-50" />
    </div>
    <div
      class="container mx-auto h-full overflow-hidden flex flex-col p-8 z-10"
    >
      <!-- 卡片 -->
      <div
        class="rounded-3xl h-full glass-effect overflow-hidden flex flex-col"
      >
        <header class="w-full p-4">
          <h1 class="text-content-title">Header</h1>
        </header>
        <div class="flex h-full flex-1 overflow-hidden">
          <Sidebar />
          <main class="p-4 overflow-auto flex-1">
            <p>Main content goes here</p>
          </main>
        </div>
        <footer class="w-full p-4">
          <p class="text-content-title">Footer</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-effect {
  backdrop-filter: blur(30px);
  background-color: rgba(16 18 27 / 40%);
}
</style>
