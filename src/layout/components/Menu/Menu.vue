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

// 计算属性获取用户 ID 和登录状态
const userId = computed(() => userStore.userInfo.userId)
const isLoggedIn = computed(() => userStore.isLoggedIn) // 获取登录状态

watch(
  () => [userId.value, isLoggedIn.value], // 监测用户 ID 和登录状态的变化
  async ([newUserId, loggedIn]) => {
    if (loggedIn && newUserId !== undefined) {
      // 只有在用户登录且用户 ID 有效时才触发
      const { playlist } = await userPlaylist<{
        playlist: userPlaylistRes[]
      }>({ id: newUserId as number })
      playlists.value = playlist
    } else {
      playlists.value = [] // 清空播放列表或其他处理逻辑
    }
  },
  { immediate: true }
)

// 监听快捷键
const handleKeyDown = (event: KeyboardEvent): void => {
  MenuData.some((menuItem) => {
    menuItem.children.some((childItem) => {
      if (
        childItem.shortcut &&
        event.ctrlKey &&
        childItem.shortcut.toLowerCase() === event.key
      ) {
        event.preventDefault()
        router.push(childItem.router)
        return true
      }
      return false
    })
  })
}
</script>
<template>
  <aside
    class="w-64 dark:border-gray-600 h-full border-r box-border flex flex-col overflow-x-hidden"
  >
    <div class="flex flex-col items-center p-4 gap-2">
      <span class="relative flex h-24 w-24 shrink-0">
        <img
          class="aspect-square h-full w-full rounded-full"
          src="@/assets/gthub-avatar.png"
        />
      </span>
      <a href="https://github.com/XiangZi7" target="_blank">
        <div
          class="flex items-center bg-black text-white gap-1 text-xs p-1 rounded-lg"
        >
          <img
            alt="GitHub User's stars"
            src="https://img.shields.io/github/stars/XiangZi7?style=flat&logo=github&label=XiangZi&labelColor=%23000&color=%23000"
          />
        </div>
      </a>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        Kuriyama Mirai Player
      </h2>
    </div>
    <nav
      class="flex flex-col p-4 space-y-4 flex-1 h-full box-border overflow-x-hidden"
    >
      <div
        v-for="(item, index) in MenuData"
        :key="index"
        class="w-full flex flex-col gap-1"
      >
        <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400">
          {{ item.title }}
        </h3>
        <router-link
          class="rounded-lg w-full py-2 px-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-[#414243] transition ease-in-out duration-200"
          :to="item2.router"
          v-for="(item2, index2) in item.children"
          :key="index2"
          :class="
            menuStore.menuIndex == index + '-' + index2
              ? 'bg-gray-200 dark:bg-[#414243]'
              : ''
          "
        >
          <Icon :icon="item2.icon" />
          <span class="text-sm">{{ item2.title }}</span>
          <span
            v-if="item2.shortcut"
            class="!ml-auto text-[10px] text-muted-color bg-emphasis border-surface p-1 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            ⌘+{{ item2.shortcut }}
          </span>
        </router-link>
      </div>
      <div class="w-full flex flex-col gap-1">
        <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400">
          我的歌单
        </h3>
        <el-scrollbar class="flex-1 overflow-x-hidden">
          <router-link
            class="rounded-lg w-full py-2 px-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition ease-in-out duration-200"
            v-for="(item, index) in playlists"
            :to="`/playlist?id=${item.id}`"
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
