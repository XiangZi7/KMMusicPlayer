<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const setting = settingStore()
const { currentTrack, currentLyricIndex, currentTime } = useAudioPlayer()
const scrollContainer = ref<HTMLDivElement | null>(null)

// 处理滚动事件
function handleScroll() {
  isUserScrolling.value = true
  debouncedFn()
}
function scrollToCurrentLyric(el: any) {
  if (!el.value) return
  const activeLyric = el.value.wrapRef.querySelector(
    '.activeLyric'
  ) as HTMLElement
  if (!activeLyric) return

  // 计算歌词应居中的位置：歌词顶部位置 + 歌词高度/2 - 容器高度/2
  const targetScrollTop =
    activeLyric.offsetTop -
    el.value.wrapRef.clientHeight / 2 -
    activeLyric.clientHeight +
    50
  el.value.setScrollTop(targetScrollTop)
}

const isUserScrolling = ref(false)
// 防抖函数
const debouncedFn = useDebounceFn(() => {
  isUserScrolling.value = false
  scrollToCurrentLyric(scrollContainer)
}, 3000)

// 监听播放当前时间，并用于歌词滚动
watch(
  () => currentTime.value,
  () => {
    if (currentTime.value && !isUserScrolling.value) {
      scrollToCurrentLyric(scrollContainer)
    }
  },
  {
    immediate: true,
  }
)
</script>
<template>
  <el-scrollbar
    @scroll="handleScroll"
    ref="scrollContainer"
    wrap-class="w-full h-full flex justify-center"
    :view-class="`space-y-5  w-full flex flex-col ${currentTrack.lyrics.lines?.length > 1 ? '' : 'items-center justify-center'}`"
    class="w-full h-[calc(80vh-8rem)] relative inset-0 px-4 mask-t flex flex-col items-center"
  >
    <template
      v-for="(item, index) in currentTrack.lyrics.lines"
      :key="item.time"
    >
      <div
        style="
          transform-style: preserve-3d;
          perspective: 100px;
          text-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
        "
        class="transition-all duration-300 ease-in-out text-base text-center"
        :class="
          currentLyricIndex == index
            ? 'text-primary scale-150 activeLyric'
            : 'text-inactive'
        "
      >
        <p>
          {{ item.lrc }}
        </p>
        <p v-if="item.tlyric && setting.isTranslatedParsed">
          {{ item.tlyric }}
        </p>
        <p v-if="item.romalrc && setting.isRomaParsed">
          {{ item.romalrc }}
        </p>
      </div>
    </template>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.mask-t {
  mask-image: linear-gradient(transparent, black 20%, black 80%, transparent);
}
</style>
