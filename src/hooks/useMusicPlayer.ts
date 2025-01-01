// 播放模式枚丽数
import { PlayMode } from '@/enum'
import { Track } from '@/stores/interface'
import { showNotification } from '@/utils/notification'
import { LyricData } from '@/utils/parseLyrics'
import { setupAudio, handleAudioError } from './audioSetup'
import { loadLyrics, findCurrentLyricIndex } from './lyricsHandler'

export function useMusicPlayer() {
  const audioStore = useAudioStore()
  // 默认数据
  const defaultSong = {
    title: '未选择歌曲',
    singer: '未知歌手',
    cover: new URL(`@/assets/default_album.jpg`, import.meta.url).href,
  }
  // 计算属性，用来获取当前播放的歌曲
  const currentSong = computed(
    () =>
      audioStore.trackList[audioStore.currentSongIndex as number] || defaultSong
  )
  // 用于追踪播放状态的响应式变量
  const isPlaying = ref(false)
  // 当前播放模式的响应式变量
  const playMode = ref(PlayMode.Sequence)
  // 创建一个新的Audio实例
  const audio = new Audio()
  // 添加当前时间和总时间的响应式引用
  const currentTime = ref(0)
  const duration = ref(0)
  // 音量控制
  const volume = ref(70) // 音量范围：0到100
  // 音乐歌词
  const lyricsData = ref<LyricData>({
    lines: [],
  })
  // 用于追踪当前歌词索引
  const currentLyricIndex = ref(0)

  // 在组件挂载时添加事件监听器
  onMounted(() => {
    setupAudio(
      audio,
      currentSong,
      currentTime,
      duration,
      volume,
      playNext,
      () =>
        handleAudioError(
          audio,
          currentSong,
          currentTime,
          duration,
          audioStore,
          pause,
          play
        )
    )
  })

  // 更新currentLyricIndex
  watch(currentTime, (newTime) => {
    findCurrentLyricIndex(lyricsData, currentLyricIndex, newTime)
  })

  // 播放音乐
  function play() {
    audio.play()
    isPlaying.value = true
  }

  // 暂停音乐
  function pause() {
    audio.pause()
    isPlaying.value = false
  }

  // 切换播放/暂停状态
  function togglePlayPause() {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  // 设置播放模式
  function setPlayMode(mode: PlayMode) {
    playMode.value = mode
    showNotification('播放模式', mode, 'success')
  }

  // 播放下一首歌曲
  function playNext() {
    switch (playMode.value) {
      case PlayMode.Random: // 如果是随机模式，则随机选择一首歌曲播放
        playRandomSong()
        break
      case PlayMode.Single: // 单曲循环模式，重新播放当前歌曲
        audio.currentTime = 0 // 回到开头
        play()
        break
      default: // 对于顺序播放和列表循环模式，播放列表中的下一首歌
        let nextIndex = (audioStore.currentSongIndex as number) + 1
        if (nextIndex >= audioStore.trackList.length) {
          nextIndex = 0 // 如果是最后一首歌，则回到列表的开始
        }
        audioStore.setCurrentSong(nextIndex)
        audio.src = currentSong.value.source // 更新audio元素的资源地址
        loadLyrics(currentSong, lyricsData, audioStore, () =>
          findCurrentLyricIndex(lyricsData, currentLyricIndex)
        )
        play()
        break
    }
  }

  // 播放上一首歌曲
  function playPrevious() {
    let previousIndex = (audioStore.currentSongIndex as number) - 1
    if (previousIndex < 0) {
      previousIndex = audioStore.trackList.length - 1 // 如果是第一首歌，则跳到列表的最后
    }
    audioStore.setCurrentSong(previousIndex)
    audio.src = currentSong.value.source // 更新audio元素的资源地址
    loadLyrics(currentSong, lyricsData, audioStore, () =>
      findCurrentLyricIndex(lyricsData, currentLyricIndex)
    )
    play()
  }

  // 随机播放一首歌曲
  function playRandomSong() {
    const randomIndex = Math.floor(Math.random() * audioStore.trackList.length)
    audioStore.setCurrentSong(randomIndex) // 设置当前歌曲为随机选择的歌曲
    audio.src = currentSong.value.source // 更新audio元素的资源地址
    play()
  }

  // 改变当前歌曲时间
  const changeCurrentTime = (currentTime: number) => {
    nextTick(() => {
      audio.currentTime = Math.round(currentTime)
    })
  }

  // 设置音量
  const setVolume = (newVolume: number) => {
    volume.value = newVolume
    audio.volume = newVolume / 100 // 将音量转换为 0 到 1 的范围
  }

  // 添加播放歌曲的方法
  const playSong = (song: Track) => {
    audio.src = song.source // 确保您设置此歌曲的音频源
    play() // 播放歌曲
  }

  // 函数计算当前高亮歌词的位置，并将其滚动到中间。使用 offsetTop 属性获取元素距离顶部的距离，并设置 scrollTop。
  function scrollToCurrentLyric(el: HTMLDivElement) {
    if (!el) return

    const activeLyric = el.querySelector('.activeLyric') as HTMLElement

    if (activeLyric) {
      el.scrollTop =
        activeLyric.offsetTop - el.clientHeight / 2 - activeLyric.clientHeight
    }
  }

  return {
    currentSong,
    isPlaying,
    play,
    playNext,
    playPrevious,
    togglePlayPause,
    playMode,
    setPlayMode,
    audio,
    currentTime, // 暴露当前播放时间
    duration, // 暴露歌曲总时间
    changeCurrentTime,
    setVolume,
    volume,
    playSong,
    loadLyrics: () =>
      loadLyrics(currentSong, lyricsData, audioStore, () =>
        findCurrentLyricIndex(lyricsData, currentLyricIndex)
      ),
    lyricsData,
    currentLyricIndex,
    scrollToCurrentLyric,
  }
}
