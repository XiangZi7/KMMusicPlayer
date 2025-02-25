import { trackModel } from '@/stores/interface'
import { defaultSong } from "@/mock";
import { ElNotification } from "element-plus";
import { PlayMode } from "./interface";
import { urlV1, lyricNew } from "@/api";
interface AudioPlayer {
    isPlaying: Ref<boolean>
    currentTrack: ComputedRef<trackModel>
    currentTime: Ref<number>
    duration: Ref<number>
    volume: Ref<number>;
    currentLyricIndex: Ref<number>;
    audioElement: Ref<HTMLAudioElement | null>
    play: () => void
    pause: () => void
    nextTrack: () => void
    prevTrack: () => void
    seek: (time: number) => void
    togglePlayPause: () => void;
    setVolume: (volume: number) => void;
    setPlayMode: (mode: PlayMode) => void;
    loadTrack: () => Promise<void>;
}

export const AudioPlayer = () => {
    const audioStore = AudioStore()
    const audioElement = ref<HTMLAudioElement | null>(null)
    const isPlaying = ref(false)
    const volume = ref();
    const playMode = ref<PlayMode>('order'); // 默认为顺序播放

    // 当前播放的歌曲
    const currentTrack = computed<trackModel>(() => audioStore.trackList[audioStore.currentSongIndex] || defaultSong)
    const currentTime = ref(0)
    const duration = ref(0)

    // 用于追踪当前歌词索引
    const currentLyricIndex = ref(0)

    currentTrack.value.lyrics?.lyrics

    // 更新当前歌曲歌词索引
    const updateCurrentLyricIndex = (newTime: number = 0) => {
        if (!currentTrack.value.lyrics?.lines) return;

        // 找到当前时间对应的歌词行
        const lyrics = currentTrack.value.lyrics.lines;
        const targetIndex = lyrics.findIndex(
            (line: { time: number; }) => line.time > newTime * 1000
        )
        currentLyricIndex.value =
            targetIndex === -1 ? lyrics.length - 1 : targetIndex - 1
    }

    // 播放音乐
    const play = () => {
        if (audioElement.value) {
            audioElement.value.play()
            isPlaying.value = true
        }
    }
    // 跳转到指定时间
    const seek = (time: number) => {
        if (audioElement.value) {
            audioElement.value.currentTime = time
            currentTime.value = time
        }
    };
    // 暂停音乐
    const pause = () => {
        if (audioElement.value) {
            audioElement.value.pause()
            isPlaying.value = false
        }
    }


    // 播放下一首
    const nextTrack = async () => {
        switch (playMode.value) {
            case 'loop':
                if (audioStore.currentSongIndex < audioStore.trackList.length - 1) {
                    audioStore.currentSongIndex++
                } else {
                    audioStore.currentSongIndex = 0 // 从头开始
                }
                break;
            case 'shuffle':
                audioStore.currentSongIndex = Math.floor(Math.random() * audioStore.trackList.length);
                break;
            case 'single':
                audioElement.value!.currentTime = 0
                break;
            case 'order':
            default:
                if (audioStore.currentSongIndex < audioStore.trackList.length - 1) {
                    audioStore.currentSongIndex++
                } else {
                    audioStore.currentSongIndex = 0 // 从头开始
                }
                break;
        }
        await loadTrack()
        play()
    }

    // 播放上一首
    const prevTrack = async () => {
        switch (playMode.value) {
            case 'loop':
                if (audioStore.currentSongIndex > 0) {
                    audioStore.currentSongIndex--
                } else {
                    audioStore.currentSongIndex = audioStore.trackList.length - 1 // 从尾开始
                }
                break;
            case 'shuffle':
                audioStore.currentSongIndex = Math.floor(Math.random() * audioStore.trackList.length);
                break;
            case 'single':
                audioElement.value!.currentTime = 0
                break;
            case 'order':
            default:
                if (audioStore.currentSongIndex > 0) {
                    audioStore.currentSongIndex--
                } else {
                    audioStore.currentSongIndex = audioStore.trackList.length - 1 // 从尾开始
                }
                break;
        }
        await loadTrack()
        play()
    }


    // 加载当前歌曲
    const loadTrack = async () => {
        // 检查歌曲 URL 
        await checkUrl()
        // 歌词是否存在
        checkLyrics()

        if (audioElement.value) {
            audioElement.value.src = currentTrack.value.url;
            audioElement.value.load();
        }

    };

    // 检查歌曲 URL
    const checkUrl = async () => {
        // 查看歌曲 URL 是否存在
        if (!currentTrack.value.url) {
            // 如果 currentTrack 的 url 不存在，则获取 URL
            const response = await urlV1(currentTrack.value.id);
            const url = response.data[0]?.url; // 获取第一个 URL

            if (!url) return;
            // 更新 trackList 中的对应歌曲的 url
            const trackIndex = audioStore.trackList.findIndex(
                (track: { id: any; }) => track.id === currentTrack.value.id
            );
            if (trackIndex !== -1) {
                audioStore.trackList[trackIndex].url = url; // 更新 URL
            }
        }
        return Promise.resolve();
    }

    // 解析歌词数据
    const checkLyrics = () => {
        // 查看歌词是否存在
        if (!currentTrack.value.lyrics) {
            // 如果 currentTrack 的 lyrics 不存在，则获取歌词
            lyricNew(currentTrack.value.id).then((response) => {
                // 更新 trackList 中的对应歌曲的 url
                const trackIndex = audioStore.trackList.findIndex(
                    (track: { id: any; }) => track.id === currentTrack.value.id
                );
                if (trackIndex !== -1) {
                    audioStore.trackList[trackIndex].lyrics = parseAndMergeLyrics(response); // 更新 URL
                }
            })
        }
    }

    // 更新当前播放时间
    const updateTime = () => {
        if (audioElement.value) {
            currentTime.value = audioElement.value.currentTime
        }
    }

    // 更新总时长
    const onLoadedMetadata = () => {
        if (audioElement.value) {
            duration.value = audioElement.value.duration
        }
    }

    // 切换播放/暂停状态
    const togglePlayPause = () => {
        if (isPlaying.value) {
            pause();
        } else {
            play();
        }
    };

    // 设置音量
    const setVolume = (newVolume: number) => {
        if (audioElement.value) {
            volume.value = newVolume;
            audioStore.setAudioStore('volume', newVolume);
            audioElement.value.volume = newVolume / 100;
        }
    };

    // 设置播放模式
    const setPlayMode = (mode: PlayMode) => {
        playMode.value = mode;
        ElNotification({
            title: '播放模式',
            message: `已切换为 ${mode} 模式`,
            type: 'success',
        })
    };

    // 更新currentLyricIndex
    watch(currentTime, (newTime) => {
        updateCurrentLyricIndex(newTime)
    })

    // 组件挂载时初始化音频元素
    onMounted(() => {
        audioElement.value = new Audio(currentTrack.value.url)
        volume.value = audioStore.volume || 50;
        audioElement.value.volume = volume.value / 100;
        // 歌词是否存在
        checkLyrics()
        // 添加事件监听器
        audioElement.value.addEventListener('timeupdate', updateTime)
        audioElement.value.addEventListener('ended', nextTrack)
        audioElement.value.addEventListener('loadedmetadata', onLoadedMetadata)
    })

    // 组件卸载时移除事件监听器
    onUnmounted(() => {
        if (audioElement.value) {
            audioElement.value.removeEventListener('timeupdate', updateTime)
            audioElement.value.removeEventListener('ended', nextTrack)
            audioElement.value.removeEventListener('loadedmetadata', onLoadedMetadata)
        }
    })



    const audioPlayer: AudioPlayer = {
        isPlaying,
        currentTrack,
        currentTime,
        duration,
        volume,
        currentLyricIndex,
        audioElement,
        play,
        pause,
        nextTrack,
        prevTrack,
        seek,
        togglePlayPause,
        setVolume,
        setPlayMode,
        loadTrack
    };

    return audioPlayer;
};

export const useAudioPlayer = (): AudioPlayer => {
    const audioPlayer = inject<AudioPlayer>('audioPlayer')
    if (!audioPlayer) {
        throw new Error('useAudioPlayer must be used within a provider')
    }
    return audioPlayer
}