import { Track } from '@/stores/interface'
import { PlayMode } from '@/enum/index'
import { LyricData } from '@/utils/parseLyrics'

// 定义 MusicPlayer 的类型
export interface MusicPlayer {
    currentSong: Ref<Track>;                          // 当前播放的歌曲
    isPlaying: Ref<boolean>;                           // 播放状态
    play: () => void;                                  // 播放音乐
    playNext: () => void;                              // 播放下一首歌曲
    playPrevious: () => void;                          // 播放上一首歌曲
    togglePlayPause: () => void;                      // 切换播放/暂停状态
    playMode: Ref<PlayMode>;                           // 当前播放模式
    setPlayMode: (mode: PlayMode) => void;            // 设置播放模式
    audioElement: Ref<HTMLAudioElement>;               // 音频元素
    currentTime: Ref<number>;                          // 当前播放时间
    duration: Ref<number>;                             // 歌曲总时间
    changeCurrentTime: (currentTime: number) => void; // 改变当前播放时间
    setVolume: (volume: number) => void;              // 设置音量
    playSong: (param: Track) => void;                 // 播放指定的歌曲
    volume: Ref<number>;                               // 当前音量
    lyricsData: Ref<LyricData>;                       // 歌词数据
    Loadlyrics: () => Promise<void>;                   // 加载歌词
    currentLyricIndex: Ref<number>;                   // 当前歌词索引
    scrollStyle: Ref<{ transform: string }>;          // 用于滚动歌词的样式
    eqSettings: Ref<{ bass: number; mid: number; treble: number }>; // EQ 设置
    updateEQ: (band: 'bass' | 'mid' | 'treble', value: number) => void; // 更新EQ的方法
}

// 登陆状态模型
export interface ResLoginStatus {
    avatarUrl?: string;
    nickname?: string;
    message?: string;
}

export type QrCallback = (isAuthorized: boolean) => void;
