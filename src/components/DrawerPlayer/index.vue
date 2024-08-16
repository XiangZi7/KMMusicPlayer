<script setup lang="ts">
import { MusicPlayer } from '@/hooks/interface'
import { Icon } from '@iconify/vue'
import { PlayMode } from '@/enum'
import { Comment } from '@/api/interface'
import { commentMusic } from '@/api'

const userStore = useUserStore()

const state = reactive({
  direction: 'ttb',
  drawer: false,
  commentListData: [] as Comment[],
  commenDrawer: false,
  commenTotal: 0,
})

const { direction, drawer, commentListData, commenDrawer, commenTotal } =
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
  Loadlyrics,
  lyricsData,
  currentLyricIndex,
  scrollStyle,
  setPlayMode,
} = inject('MusicPlayer') as MusicPlayer

const SettingStore = useSettingStore()

const show = () => {
  state.drawer = true
  Loadlyrics()
}

// 格式化时间
function formatTime(seconds: number): string {
  // 将秒数转换为整数分钟数和剩余秒数
  const min = Math.floor(seconds / 60)
  const sec = Math.floor(seconds % 60)

  // 返回格式化的字符串，确保分钟和秒数都至少有两位数
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

function parseLyricInfo(lyricString: string) {
  return lyricString
    .replace(/\n/g, '<br />') // 将换行符替换为 <br />
    .replace(/^\s*|\s*$/g, '') // 去除前后空格
}

// 时间
let LocalhostcurrentTime = ref<string>(new Date().toLocaleTimeString())

// 更新时间的函数
function updateTime(): void {
  LocalhostcurrentTime.value = new Date().toLocaleTimeString()
}

// 打开评论抽屉
const showDrawer = () => {
  state.commenDrawer = true
  if (state.commentListData.length > 0) return
  commentMusic({ offset: 1, id: currentSong.value.id }).then((res) => {
    state.commentListData = res.comments
    state.commenTotal = res.total
  })
}

function formatNumber(num: number): string {
  if (num < 10000) {
    return num.toString() // 直接返回小于10000的数字
  } else if (num < 100000) {
    const formatted = (num / 10000).toFixed(1)
    return formatted.endsWith('.0')
      ? formatted.slice(0, -2) + '万'
      : formatted + '万' // 处理 1.0万 和 1.5万
  } else {
    return (num / 10000).toFixed(0) + '万' // 对于大于或等于100000的数字，直接显示为整数的万
  }
}

const getCommentPlaylist = (pages: number = 1) => {
  state.commentListData = []
  state.commenTotal = 0
  commentMusic({ offset: pages, id: currentSong.value.id }).then((res) => {
    state.commentListData = state.commentListData.concat(res.comments)
    state.commenTotal = res.total
  })
}

function handlePlayNext() {
  playNext()
  getCommentPlaylist(1)
}

function handlePlayPrevious() {
  playPrevious()
  getCommentPlaylist(1)
}

onMounted(() => {
  setInterval(updateTime, 1000) as unknown as number
  getCommentPlaylist(1)
})
defineExpose({
  show,
})
</script>
<template>
  <el-drawer
    :style="{ '--track-cover-url': `url(${currentSong.cover})` }"
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
              {{ LocalhostcurrentTime }}
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
                    v-if="commenTotal !== 0"
                  >
                    {{ formatNumber(commenTotal) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex-[50%] max-w-[50%] md:flex hidden h-full items-center justify-center"
        >
          <template v-if="lyricsData.lines.length > 0">
            <div class="items-center justify-center flex h-full">
              <el-scrollbar
                class="flex items-center justify-center w-full"
                wrap-class="mask-gradient w-full text-center !h-[600px]"
                style="--scroll-shadow-size: 40px"
              >
                <ul :style="scrollStyle">
                  <li
                    v-for="(item, index) in lyricsData.lines"
                    :key="index"
                    :class="[
                      'text-sm py-1 transition-all duration-300 ease-in-out font-body',
                      {
                        'text-[--el-color-primary]':
                          currentLyricIndex === index,
                        'text-gray-500 dark:text-gray-400':
                          currentLyricIndex !== index,
                      },
                    ]"
                  >
                    <p v-if="item.text && SettingStore.isOriginalParsed">
                      {{ item.text }}
                    </p>
                    <p
                      v-if="item.translation && SettingStore.isTranslatedParsed"
                    >
                      {{ item.translation }}
                    </p>
                    <p v-if="item.romaLrc && SettingStore.isRomaParsed">
                      {{ item.romaLrc }}
                    </p>
                  </li>
                </ul>
              </el-scrollbar>
            </div>
          </template>
          <template v-else>
            <div
              class="h-full flex items-center justify-center w-full text-[--el-color-primary-light-2] dark:text-gray-500 text-sm"
              v-html="parseLyricInfo(lyricsData.remark ?? '')"
              v-if="SettingStore.isOriginalParsed"
            ></div>
          </template>
        </div>
      </div>
    </div>
    <CommentPopup
      v-model="commenDrawer"
      :data="commentListData"
      @DIntersect="getCommentPlaylist"
    />
  </el-drawer>
</template>
<style lang="scss" scoped>
@use 'modal';
</style>
