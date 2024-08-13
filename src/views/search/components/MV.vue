<script setup lang="ts">
interface Artist {
  name: string
}

// 定义 Item 接口
interface Item {
  id: number
  name: string
  cover: string
  artists: Artist[]
}
let modelValue = defineModel<Item[]>()
</script>
<template>
  <section
    class="flex-1 p-4 md:p-6 grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]"
  >
    <router-link
      :to="`/video?id=${item.id}`"
      class="group relative overflow-hidden"
      v-for="item in modelValue"
      :key="item.id"
    >
      <el-image
        :src="item.cover + '?param=320y200'"
        lazy
        class="transition-opacity rounded-lg"
      />
      <div class="p-2">
        <h3 class="font-medium text-sm line-clamp-1">{{ item.name }}</h3>
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <span class="line-clamp-1 text-xs">{{
            item.artists.map((item) => item.name).join(' / ')
          }}</span>
        </div>
      </div>
    </router-link>
  </section>
</template>
