<template>
  <main
    class="bg-white dark:bg-[--el-bg-color] block w-full h-full flex-1 box-border overflow-x-hidden duration-300 ease-in-out dark:text-neutral-200"
  >
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </router-view>
  </main>
</template>
