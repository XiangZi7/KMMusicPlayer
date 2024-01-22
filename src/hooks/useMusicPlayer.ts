import { lyric } from "@/api/index.js";
import { BilingualLyricLine } from "@/utils/interface";
/**
 * @description 音乐播放器hook
 * @author Yxcr
 * @returns {{play: (function(): void), isPlaying: Ref<UnwrapRef<boolean>>, prevTrack: (function(): void), changeCurrentTime: (function(): void), currentTrackSong: ComputedRef<*>, nextTrack: (function(): void), setVolume: (function(): void), pause: (function(): void), currentTime: Ref<UnwrapRef<number>>, duration: Ref<UnwrapRef<number>>, volume: Ref<UnwrapRef<number>>, lyricTranslateY: Ref<UnwrapRef<number>>, currentLyricIndex: Ref<UnwrapRef<number>>, LyricList: Ref<UnwrapRef<*[]>>, currentTrackIndex: Ref<UnwrapRef<number>>}}
 */
export function useMusicPlayer() {
  // MusicStore
  const MusicStore = useMusicStore();
  // settingStore
  const SettingStore = useSettingStore();
  const trackList = MusicStore.trackList;
  // 创建一个新的audio元素
  const audio = new Audio();

  // 是否正在播放，是一个响应式的引用
  const isPlaying = ref<boolean>(false);

  // 当前播放曲目的索引，是一个响应式的引用
  const currentTrackIndex = computed<number>(() => MusicStore.currentIndex);

  // 当前播放时间，是一个响应式的引用
  const currentTime = ref<number>(0);

  // 歌曲总时长，是一个响应式的引用
  const duration = ref<number>(0);

  // 默认最大音量为1
  const volume = ref<number>(50);
  // 歌词
  const LyricList = ref<BilingualLyricLine[]>([]);
  // 当前高亮歌词的索引
  const currentLyricIndex = ref<number>(0);
  // 计算当前歌词需要的 translateY 值以保持在中间
  const lyricTranslateY = ref<number>(0);

  // 当前歌曲信息
  const currentTrackSong = computed(() => trackList[currentTrackIndex.value]);

  // 更新当前播放时间的方法
  const updateCurrentTime = () => {
    currentTime.value = audio.currentTime;
  };

  // 设置定期更新currentTime的定时器
  const intervalId = setInterval(updateCurrentTime, 1000);

  // 组件卸载时清除定时器，防止内存泄露
  onUnmounted(() => {
    clearInterval(intervalId);
  });

  // 加载音轨的方法，用于更新audio元素的src，并重置currentTime和duration
  const loadTrack = (index: number) => {
    audio.src = trackList[index].source;
    audio.load();
    currentTime.value = 0;
    duration.value = 0;

    // 当音轨的元数据加载完成时，更新歌曲的总时长
    audio.addEventListener("loadedmetadata", () => {
      duration.value = audio.duration;
    });
    // 先清空一遍歌词
    LyricList.value = [];
    // 加载歌词
    getLyric(trackList[index].id as number | string);
  };
  // 获取歌词
  const getLyric = (id: number | string) => {
    // 如果设置中未开启加载歌词，则直接返回
    if (!SettingStore.loadLyric) return;

    // 根据当前的歌曲索引从播放列表中获取当前歌曲
    const CurrentSong = MusicStore.trackList[currentTrackIndex.value];

    // 如果当前歌曲没有歌词信息
    if (!CurrentSong.Lyric) {
      // 异步获取歌词
      lyric(id).then(({ lrc, tlyric }) => {
        // 一旦获取歌词，就将其设置为当前歌曲的歌词
        CurrentSong.Lyric = {
          lrc: lrc.lyric, // 歌词内容
          tlyric: tlyric ? tlyric.lyric : "", // 翻译歌词内容，如果没有则为空字符串
        };

        // 使用歌词和翻译歌词生成双语歌词数据
        const bilingualData = createBilingualData(
          CurrentSong.Lyric.lrc || "", // 确保即使歌词不存在也不会是 undefined
          CurrentSong.Lyric.tlyric || "", // 确保即使翻译歌词不存在也不会是 undefined
        );
        LyricList.value = bilingualData; // 将生成的双语歌词数据设置为当前的歌词列表
      });
    } else {
      // 如果当前歌曲已有歌词信息，则直接使用现有歌词生成双语歌词数据
      const bilingualData = createBilingualData(
        CurrentSong.Lyric.lrc || "", // 确保即使歌词不存在也不会是 undefined
        CurrentSong.Lyric.tlyric || "", // 确保即使翻译歌词不存在也不会是 undefined
      );
      LyricList.value = bilingualData; // 将生成的双语歌词数据设置为当前的歌词列表
    }
  };

  // 根据当前播放时间查找当前歌词索引
  function findCurrentLyricIndex() {
    if (LyricList.value.length === 0) return;
    const index = LyricList.value.findIndex((item, i, arr) => {
      const nextItemTime = arr[i + 1]?.time ?? Infinity;
      return currentTime.value >= item.time && currentTime.value < nextItemTime;
    });
    currentLyricIndex.value = index === -1 ? LyricList.value.length - 1 : index;

    // 假定每行歌词的行高是 31px
    // 计算当前歌词需要的 translateY 值以保持在中间
    // 这个值应该根据实际的样式设置
    const lineHeight = 46;
    // 歌词容器的高度（需要提前知道或者动态获取）
    const containerHeight = 600;
    // 歌词居中时的位置
    const centerPosition = containerHeight / 2;
    // 当前歌词的位置
    const currentLyricPosition = currentLyricIndex.value * lineHeight;
    // 计算 translateY 值，减去居中用的偏移
    lyricTranslateY.value = -(
      currentLyricPosition -
      centerPosition +
      lineHeight / 2
    );
  }

  // 使用 watchEffect 来实时更新当前歌词索引
  watchEffect(findCurrentLyricIndex);
  // 播放音乐的方法
  const play = () => {
    if (audio.src !== trackList[currentTrackIndex.value].source) {
      loadTrack(currentTrackIndex.value);
    }
    audio.play();
    isPlaying.value = true;
  };

  // 暂停音乐的方法
  const pause = () => {
    audio.pause();
    isPlaying.value = false;
  };

  // 播放下一曲的方法
  const nextTrack = () => {
    MusicStore.setCurrentIndex(
      (currentTrackIndex.value + 1) % trackList.length,
    );
    play();
  };

  // 播放上一曲的方法
  const prevTrack = () => {
    MusicStore.setCurrentIndex(
      (currentTrackIndex.value + trackList.length - 1) % trackList.length,
    );
    play();
  };
  // 改变当前歌曲时间
  const changeCurrentTime = () => {
    audio.currentTime = currentTime.value;
  };
  // 改变音量
  const setVolume = () => {
    audio.volume = volume.value * 0.01;
  };

  // 当一曲播放结束后，自动播放下一曲
  audio.addEventListener("ended", nextTrack);

  const addTrackAndPlay = () => {
    // 更新当前音轨索引为最新添加的音轨
    MusicStore.setCurrentIndex(MusicStore.trackList.length - 1);
    play();
  };

  // 初始化时加载当前索引的音轨
  loadTrack(currentTrackIndex.value);

  // 返回钩子函数，这些都是响应式的，可以直接在模板中使用
  return {
    isPlaying, // 当前是否在播放
    currentTrackIndex, // 当前播放的曲目索引
    currentTime, // 当前播放时间
    duration, // 音乐总时长
    play, // 控制播放的函数
    pause, // 控制暂停的函数
    nextTrack, // 播放下一首的函数
    prevTrack, // 播放上一首的函数
    changeCurrentTime, //seek
    currentTrackSong, //当前歌曲信息
    setVolume, // 控制音量
    volume, //音量
    LyricList, //歌词
    currentLyricIndex, // 当前高亮歌词的索引
    lyricTranslateY, // 用于居中显示当前歌词的 translateY 值
    addTrackAndPlay, // 添加并播放新的音轨
  };
}
