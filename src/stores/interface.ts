import { LyricData } from '@/utils/parseLyrics'
export interface themeState {
  language: string
  primary: string
  isDark: string | number | boolean
}

export interface AudioStore {
  trackList: Track[] // 歌曲列表
  currentSongIndex: Number // 当前正在播放的歌曲的索引
}

// 定义单个音轨的接口
export interface Track {
  id: string | number // 歌曲 ID
  title: string // 歌曲标题
  singer: string // 歌手
  album: string // 专辑
  cover: string // 封面图 URL
  source: string // 歌曲源 URL
  time: number // 时长（毫秒）
  mv?: number | string // mvID
  Lyric?: LyricData // 歌词
}

// 菜单
export interface menuState {
  menuIndex: string
}

// 设置
export interface SettingState {
  isOriginalParsed: Boolean
  isTranslatedParsed: Boolean
  isRomaParsed: Boolean
  isDrawerCover: Boolean
}

// 用户

export interface userModel {
  avatarUrl?: string
  nickname?: string
  userId?: number
}
export interface UserState {
  userInfo: userModel
}
