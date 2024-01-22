import { StateTree } from "pinia";

export interface Track {
  id: string;
  title: string;
  singer: string;
  album: string;
  cover: string;
  source: string;
  time: number;
  mv: string;
  Lyric?: {
    lrc?: string;
    tlyric?: string;
  };
}

export interface MusicState extends StateTree {
  count: number;
  trackList: Track[];
  currentIndex: number;
}

export interface userModel {
  avatarUrl?: string;
  nickname?: string;
  userId?: number;
}
export interface UserState {
  userInfo: userModel;
}

// setting
export interface SettingState {
  loadLyric: boolean;
}

// 使用 IThemeConfig 接口
export interface ThemeState {
  primary: string;
  isDark: boolean;
}
