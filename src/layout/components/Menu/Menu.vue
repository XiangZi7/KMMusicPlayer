<script setup lang="ts">
import { userPlaylistRes } from '@/api/interface'
import { MenuData } from './data'
import { userPlaylist } from '@/api'
import { Icon } from '@iconify/vue'
const menuStore = useMenuStore()
const router = useRouter()
const userStore = useUserStore()
const playlists = ref<userPlaylistRes[]>([])
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

watch(
  () => userStore.userInfo,
  () => {
    if (Object.keys(userStore.userInfo).length > 0) {
      userPlaylist<{ playlist: userPlaylistRes[] }>({
        id: userStore.userInfo.userId,
      }).then(({ playlist }) => {
        playlists.value = playlist
      })
    }
  },
  {
    immediate: true,
  }
)

// 监听快捷键
const handleKeyDown = (event: KeyboardEvent): void => {
  // 监听 Ctrl + D
  if (event.ctrlKey && event.key === 'd') {
    event.preventDefault()
    router.push('/discover')
    menuStore.setMenuIndex('2-0')
  }
  // 监听 Ctrl + T
  if (event.ctrlKey && event.key === 'q') {
    event.preventDefault()
    router.push('/theme')
    menuStore.setMenuIndex('3-2')
  }
}
</script>
<template>
  <aside
    class="w-64 bg-white h-full border-r box-border flex flex-col overflow-x-hidden"
  >
    <div class="flex flex-col items-center p-4">
      <span
        class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
      >
        <img
          class="aspect-square h-full w-full"
          src="https://generated.vusercontent.nethttps://generated.vusercontent.net/placeholder.svg"
        />
      </span>
      <h2 class="mt-2 text-lg font-semibold">Kuriyama Mirai Player</h2>
    </div>
    <nav
      class="flex flex-col p-4 space-y-4 flex-1 h-full box-border overflow-x-hidden"
    >
      <div
        v-for="(item, index) in MenuData"
        :key="index"
        class="w-full flex flex-col gap-1"
      >
        <h3 class="text-xs font-semibold text-gray-500">{{ item.title }}</h3>
        <router-link
          class="rounded-lg w-full py-2 px-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 transition ease-in-out duration-200"
          :to="item2.router"
          v-for="(item2, index2) in item.children"
          :data-index="index + '-' + index2"
          :key="index2"
          :class="
            menuStore.menuIndex == index + '-' + index2 ? 'bg-gray-200' : ''
          "
          @click="menuStore.setMenuIndex(index + '-' + index2)"
        >
          <Icon :icon="item2.icon" />
          <span class="text-sm">{{ item2.title }}</span>
          <span
            v-if="item2.shortcut"
            class="!ml-auto text-[10px] text-muted-color bg-emphasis border-surface p-1 rounded-lg"
            >{{ item2.shortcut }}</span
          >
        </router-link>
      </div>
      <div class="w-full flex flex-col gap-1 overflow-x-hidden">
        <h3 class="text-xs font-semibold text-gray-500">我的歌单</h3>
        <el-scrollbar class="flex-1 overflow-x-hidden">
          <router-link
            class="rounded-lg w-full py-2 px-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 transition ease-in-out duration-200"
            v-for="(item, index) in playlists"
            :to="`/songlist?id=${item.id}`"
            :key="index"
          >
            <el-image
              class="w-7 h-7 rounded-lg"
              :src="item.coverImgUrl + '?param=50y50'"
              :alt="item.name"
            />
            <span class="text-sm line-clamp-1">{{ item.name }}</span>
          </router-link>
        </el-scrollbar>
      </div>
    </nav>
  </aside>
</template>
