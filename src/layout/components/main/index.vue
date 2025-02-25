<template>
  <main class="flex-1 overflow-x-hidden bg-themeBgColor">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
</template>
