<script setup lang="ts">
import { MenuData } from './data'
import { Icon } from '@iconify/vue'
import { userPlaylist } from '@/api'
import { API } from '@/api/interface'
const user = UserStore()

const userPlay = ref<API.Playlist[]>([])

watch(
  () => user.userInfo.userId,
  () => {
    if (user.userInfo.userId) {
      userPlaylist({ id: user.userInfo.userId, limit: 50 }).then((res) => {
        userPlay.value = res.playlist
      })
    }
  },
  {
    immediate: true,
  }
)
</script>
<template>
  <aside class="w-64 hidden h-full overflow-hidden md:block border-r">
    <nav
      class="flex flex-col p-4 space-y-4 flex-1 h-full box-border overflow-hidden"
    >
      <div
        v-for="(item, index) in MenuData"
        :key="index"
        class="w-full flex flex-col gap-1"
      >
        <h3 class="text-xs font-semibold text-inactive">
          {{ item.title }}
        </h3>
        <router-link
          class="rounded-lg w-full transition text-sm duration-300 py-2 px-2 flex items-center space-x-2 text-primary-foreground hover:bg-hoverMenuBg"
          :to="item2.router"
          v-for="(item2, index2) in item.children"
          :key="index2"
        >
          <Icon :icon="item2.icon" />
          <span>{{ item2.title }}</span>
          <span
            v-if="item2.shortcut"
            class="!ml-auto text-xs text-primary-foreground bg-emphasis border-border p-1 rounded-lg"
          >
            ⌘ + {{ item2.shortcut }}
          </span>
        </router-link>
      </div>
      <!-- 用户歌单 -->
      <div
        class="w-full flex flex-col gap-1 overflow-x-hidden"
        v-if="user.userInfo.userId"
      >
        <h3 class="text-xs font-semibold text-inactive">我的歌单</h3>
        <el-scrollbar class="flex-1">
          <router-link
            v-for="item in userPlay"
            :key="item.id"
            class="rounded-lg w-full transition text-sm duration-300 py-2 px-2 flex items-center space-x-2 text-primary-foreground hover:bg-hoverMenuBg"
            :to="`/playlist/${item.id}`"
          >
            <el-image
              lazy
              :src="item.coverImgUrl + '?param=50y50'"
              class="w-7 h-7 rounded-md"
              :alt="item.name"
            />
            <span>{{ item.name }}</span>
          </router-link>
        </el-scrollbar>
      </div>
    </nav>
  </aside>
</template>
