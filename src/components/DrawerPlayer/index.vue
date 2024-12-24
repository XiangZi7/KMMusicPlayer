<script setup lang="ts">
  import { MusicPlayer } from '@/hooks/interface'
  import { Icon } from '@iconify/vue'
  import { PlayMode } from '@/enum'
  import { Comment } from '@/api/interface'
  import { commentMusic } from '@/api'
  import { formatTime, getCurrentTime } from '@/utils/time'
  import { fetchComments, formatNumber } from '@/services/commentService'
  import { parseLyricInfo } from '@/utils/lyricUtils'
  import { createDebouncedFunction } from '@/utils/debounceUtils'

  const userStore = useUserStore()
  const settingStore = useSettingStore()
  const themeStore = useThemeStore()
  const { switchDark } = useTheme()
  const scrollContainer = ref()
  const state = reactive({
    direction: 'ttb',
    drawer: false,
    commentListData: [] as Comment[],
    commentDrawer: false,
    commentTotal: 0,
    isUserScrolling: false,
  })

  const { direction, drawer, commentListData, commentDrawer, commentTotal } =
    toRefs(state)

  const {
    currentSong,
    togglePlayPause,
    isPlaying,
    playNext,
    playPrevious,
    currentTime,
    duration,
    changeCurrentTime,
    loadLyrics,
    lyricsData,
    currentLyricIndex,
    setPlayMode,
    scrollToCurrentLyric,
  } = inject('MusicPlayer') as MusicPlayer

  const show = () => {
    state.drawer = true
    loadLyrics()
    getCommentPlaylist()
  }

  // 本地时间
  let localhostCurrentTime = ref<string>(getCurrentTime())

  // 更新时间的函数
  function updateTime(): void {
    localhostCurrentTime.value = getCurrentTime()
  }

  // 打开评论抽屉并加载相应的评论数据
  const showDrawer = async () => {
    state.commentDrawer = true
    if (state.commentListData.length > 0) return

    const { comments, total } = await fetchComments(currentSong.value.id)
    state.commentListData = comments
    state.commentTotal = total
  }

  // 获取评论列表的函数，默认请求第一页，如果已有评论则不再请求
  const getCommentPlaylist = (pages: number = 1) => {
    if (state.commentListData.length > 0) return

    commentMusic({ offset: pages, id: currentSong.value.id }).then((res) => {
      state.commentListData = state.commentListData.concat(res.comments)
      state.commentTotal = res.total
    })
  }

  // 播放下一首歌曲的处理函数
  function handlePlayNext() {
    state.commentListData = []
    state.commentTotal = 0
    playNext()
    getCommentPlaylist(1)
  }

  // 播放上一首歌曲的处理函数
  function handlePlayPrevious() {
    state.commentListData = []
    state.commentTotal = 0
    playPrevious()
    getCommentPlaylist(1)
  }

  // 防抖函数
  const debouncedFn = createDebouncedFunction(() => {
    state.isUserScrolling = false
    scrollToCurrentLyric(scrollContainer.value)
  }, 3000)

  // 处理滚动事件
  function handleScroll() {
    state.isUserScrolling = true
    debouncedFn()
  }

  // 监听播放当前时间，并用于歌词滚动
  watch(
    () => currentTime.value,
    () => {
      if (currentTime.value && !state.isUserScrolling) {
        scrollToCurrentLyric(scrollContainer.value)
      }
    }
  )

  // 组件挂载时设置定时器以每秒更新时间
  onMounted(() => {
    setInterval(updateTime, 1000) as unknown as number
  })

  // 允许在父组件中访问这个方法
  defineExpose({
    show,
  })
</script>
<template>
  <el-drawer
    :style="{
      '--track-cover-url': `url(${settingStore.isDrawerCover ? currentSong.cover : ''})`,
    }"
    v-model="drawer"
    :direction="direction"
    style="box-shadow: none"
    size="100%"
    :modal="false"
    :showClose="false"
    class="drawer-bg"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-center gap-2">
          <el-button text circle @click="drawer = false">
            <icon-material-symbols:arrow-back-ios class="rotate-90" />
          </el-button>
          <div class="flex items-center gap-1 w-[80px]">
            <icon-material-symbols:nest-clock-farsight-analog-outline />
            <span class="text-sm">
              {{ localhostCurrentTime }}
            </span>
          </div>
          <div class="flex items-center gap-1">
            <icon-fluent:weather-hail-day-20-regular />
            27°
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div class="flex items-center gap-2">
            <icon-material-symbols:bluetooth />
            <icon-material-symbols:wifi />
            <icon-ic:baseline-battery-charging-80 />
          </div>

          <el-avatar
            v-if="userStore.userInfo && userStore.userInfo.userId"
            :src="userStore.userInfo.avatarUrl"
            class="mr-2"
            shape="circle"
            :size="32"
          />
          <el-avatar
            v-else
            src="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png"
            class="mr-2"
            shape="circle"
            :size="32"
          />
        </div>
      </div>
    </template>
    <div class="flex h-full w-full flex-col gap-3 px-6 py-2">
      <div class="flex flex-row flex-1 items-center justify-between">
        <div
          class="md:flex-[50%] md:max-w-[50%] flex-1 max-w-full flex h-full items-center justify-center"
        >
          <div class="items-center justify-center flex flex-col h-full w-full">
            <div
              :class="`music-player-container ${isPlaying ? 'is-playing' : ''}`"
            >
              <div class="album">
                <div
                  class="album-art rounded-md"
                  :style="{
                    '--track-cover-url': `url(${currentSong.cover})`,
                  }"
                ></div>
                <div
                  class="vinyl"
                  :style="{
                    '--track-cover-url': `url(${currentSong.cover})`,
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }"
                ></div>
              </div>
            </div>
            <div class="flex flex-col items-center w-96 mt-5">
              <div class="flex gap-1 items-center justify-center">
                <el-button text circle @click="setPlayMode(PlayMode.Sequence)">
                  <icon-octicon:three-bars-16 />
                </el-button>
                <el-button text circle @click="setPlayMode(PlayMode.Random)">
                  <icon-lets-icons:sort-random />
                </el-button>
                <el-button text circle @click="handlePlayPrevious" class="!p-3">
                  <icon-solar:skip-previous-bold class="text-lg" />
                </el-button>
                <el-button text circle class="!p-3" @click="togglePlayPause">
                  <Icon
                    :icon="
                      isPlaying
                        ? 'ic:round-pause-circle'
                        : 'material-symbols:play-circle'
                    "
                    class="text-3xl"
                  />
                </el-button>
                <el-button text circle class="!p-3" @click="handlePlayNext">
                  <icon-solar:skip-previous-bold
                    class="transform scale-x-[-1] text-lg"
                  />
                </el-button>
                <el-button text circle @click="setPlayMode(PlayMode.Loop)">
                  <icon-cil:loop />
                </el-button>
                <el-button text circle @click="setPlayMode(PlayMode.Single)">
                  <icon-cil:loop-1 />
                </el-button>
              </div>
              <div class="flex gap-2 w-full items-center pt-2">
                <span class="text-xs w-10 text-foreground/50">{{
                  formatTime(currentTime)
                }}</span>
                <el-slider
                  v-model="currentTime"
                  :show-tooltip="false"
                  @change="changeCurrentTime"
                  :max="duration"
                  class="w-full"
                  size="small"
                />
                <span class="text-xs w-10 text-foreground/50">{{
                  formatTime(duration)
                }}</span>
              </div>
              <div>
                <div class="flex items-center">
                  <el-button text circle class="!p-3" @click="showDrawer">
                    <icon-uil:comment-dots class="text-xl dark:text-white" />
                  </el-button>
                  <span
                    class="text-sm dark:text-gray-300"
                    v-if="commentTotal !== 0"
                  >
                    {{ formatNumber(commentTotal) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex-[50%] max-w-[50%] h-full items-center justify-center"
          style="--scroll-shadow-size: 40px"
        >
          <template v-if="lyricsData.lines.length > 0">
            <div
              class="mask-gradient !h-[600px] overflow-y-auto w-full"
              ref="scrollContainer"
              @scroll="handleScroll"
            >
              <ul
                class="text-center h-full w-full"
                style="--scroll-shadow-size: 40px; width: calc(100% - 50px)"
              >
                <li
                  v-for="(item, index) in lyricsData.lines"
                  :key="index"
                  :class="[
                    `text-sm py-1 transition-all duration-300 ease-in-out ${currentLyricIndex === index ? 'activeLyric' : 'inactiveLyric'}`,
                  ]"
                >
                  <p v-if="item.text && settingStore.isOriginalParsed">
                    {{ item.text }}
                  </p>
                  <p v-if="item.translation && settingStore.isTranslatedParsed">
                    {{ item.translation }}
                  </p>
                  <p v-if="item.romaLrc && settingStore.isRomaParsed">
                    {{ item.romaLrc }}
                  </p>
                </li>
              </ul>
            </div>
          </template>
          <template v-else>
            <div
              class="h-full flex items-center justify-center w-full text-[--el-color-primary-light-2] dark:text-gray-500 text-sm"
              v-html="parseLyricInfo(lyricsData.remark ?? '')"
              v-if="settingStore.isOriginalParsed"
            ></div>
          </template>
        </div>
      </div>
    </div>
    <CommentPopup
      v-model="commentDrawer"
      :data="commentListData"
      @DIntersect="getCommentPlaylist"
    />
    <template #footer>
      <div class="flex justify-end">
        <el-switch
          v-model="themeStore.isDark"
          @change="switchDark"
          active-text="暗黑模式"
          class="ml-2"
        />
        <el-switch
          v-model="settingStore.isTranslatedParsed"
          @change="settingStore.setTranslatedParsed"
          class="ml-2"
          active-text="翻译"
        />
        <el-switch
          v-model="settingStore.isRomaParsed"
          @change="settingStore.setRomaParsed"
          class="ml-2"
          active-text="罗马音"
        />
      </div>
    </template>
  </el-drawer>
</template>
<style lang="scss" scoped>
  @use 'modal';
</style>
