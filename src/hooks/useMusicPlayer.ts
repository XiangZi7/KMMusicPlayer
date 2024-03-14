import { lyric, urlV1 } from "@/api/index.js";
import { BilingualLyricLine } from "@/utils/interface";
import { messagePro } from "@/utils/messagePro";
import { getErrorMessage } from "@/hooks/AudioError";

/**
 * @description 音乐播放器hook
 * @author Yxcr
 */
export function useMusicPlayer() {
  // MusicStore
  const MusicStore = useMusicStore();

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
  // 枚举 播放模式
  const PlayMode = {
    SEQUENCE: 0, // 顺序播放
    LOOP: 1, // 单曲循环
    RANDOM: 2, // 随机播放
  };
  const playMode = ref(PlayMode.SEQUENCE);
  const getRandomIndex = (length: number, currentIndex: number) => {
    let randomIndex = Math.floor(Math.random() * length);
    // 确保随机索引不等于当前索引，防止重复播放同一首歌
    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * length);
    }
    return randomIndex;
  };
  // 更新当前播放时间的方法
  const updateCurrentTime = () => {
    currentTime.value = audio.currentTime;
  };

  // 设置定期更新currentTime的定时器
  const intervalId = setInterval(updateCurrentTime, 500);

  // 组件卸载时清除定时器，防止内存泄露
  onUnmounted(() => {
    // 移除错误监听器
    clearInterval(intervalId);
    audio.removeEventListener("error", handleAudioError);
  });
  // 错误处理：定义用于处理audio错误事件的方法
  const handleAudioError = async () => {
    if (!audio.error) return;
    // 显示给用户的错误消息，可以根据 audio.error.code 提供更具体的错误信息
    let errorMessage = getErrorMessage(audio.error);

    if (audio.error.code === audio.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
      try {
        // 尝试获取新的音源地址，然后重新播放
        const { data } = await urlV1(trackList[currentTrackIndex.value].id);
        trackList[currentTrackIndex.value].source = data[0].url;
        play();
      } catch (e) {
        // 如果有获取新源失败的专用错误信息
        errorMessage = "获取新源失败。";
      }
    }
    messagePro(audio.error.code, errorMessage);
  };
  // 加载音轨的方法，用于更新audio元素的src，并重置currentTime和duration
  const loadTrack = (index: number) => {
    // 移除上一首可能存在的错误监听器
    audio.removeEventListener("error", handleAudioError);
    // 添加错误监听器
    audio.addEventListener("error", handleAudioError);
    audio.src = trackList[index]?.source;
    audio.load();
    currentTime.value = 0;
    duration.value = 0;

    // 当音轨的元数据加载完成时，更新歌曲的总时长
    audio.addEventListener("loadedmetadata", () => {
      duration.value = audio.duration;
    });
    // 加载歌词
    getLyric(trackList[index]?.id as number | string);
  };
  // 获取歌词
  const getLyric = (id: number | string) => {
    // 先清空一遍歌词
    LyricList.value = [];
    // 根据当前的歌曲索引从播放列表中获取当前歌曲
    const CurrentSong = MusicStore.trackList[currentTrackIndex.value];

    // 如果当前歌曲没有歌词信息
    if (isEmptyObject(CurrentSong?.Lyric as object)) {
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
        CurrentSong.Lyric?.lrc || "", // 确保即使歌词不存在也不会是 undefined
        CurrentSong.Lyric?.tlyric || "", // 确保即使翻译歌词不存在也不会是 undefined
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
    switch (playMode.value) {
      case PlayMode.SEQUENCE:
        MusicStore.setCurrentIndex(
          (currentTrackIndex.value + 1) % trackList.length,
        );
        break;
      case PlayMode.LOOP:
        // 单曲循环时不改变当前播放索引
        break;
      case PlayMode.RANDOM:
        MusicStore.setCurrentIndex(
          getRandomIndex(trackList.length, currentTrackIndex.value),
        );
        break;
    }
    play();
  };

  // 播放上一曲的方法
  const prevTrack = () => {
    switch (playMode.value) {
      case PlayMode.SEQUENCE:
        MusicStore.setCurrentIndex(
          (currentTrackIndex.value + trackList.length - 1) % trackList.length,
        );
        break;
      case PlayMode.LOOP:
        // 单曲循环时不改变当前播放索引
        break;
      case PlayMode.RANDOM:
        MusicStore.setCurrentIndex(
          getRandomIndex(trackList.length, currentTrackIndex.value),
        );
        break;
    }
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
  audio.addEventListener("ended", () => {
    if (playMode.value === PlayMode.LOOP) {
      // 如果是单曲循环, 重新播放当前歌曲
      play();
    } else {
      // 如果不是单曲循环, 播放下一曲
      nextTrack();
    }
  });

  const addTrackAndPlay = () => {
    // 更新当前音轨索引为最新添加的音轨
    MusicStore.setCurrentIndex(MusicStore.trackList.length - 1);
    play();
  };
  // 修改当前的播放模式
  const changePlayMode = () => {
    const PlayModeMessage: Record<number, string> = {
      0: "顺序播放",
      1: "单曲循环",
      2: "随机播放",
    };

    // 循环切换播放模式
    playMode.value = (playMode.value + 1) % 3;
    // 显示当前播放模式的提示信息
    const currentModeMessage = PlayModeMessage[playMode.value];
    messagePro(200, `当前播放模式：${currentModeMessage}`);
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
    changePlayMode, //修改当前的播放模式
    playMode, //修改当前的播放状态
  };
}
