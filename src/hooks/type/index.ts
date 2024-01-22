export interface Track {
  id: string;
  title: string;
  cover: string;
  singer: string;
  // 请添加更多实际需要的字段
}

export interface Lyric {
  lrc: string;
  tlyric: string;
}

export interface MusicPlayerState {
  currentTrackSong: Track;
  currentTime: number;
  duration: number;
  volume: number;
  isPlaying: boolean;
  LyricList: Lyric[];
  currentLyricIndex: number;
  lyricTranslateY: number;
}

export interface MusicPlayerActions {
  // eslint-disable-next-line no-unused-vars
  changeCurrentTime: (time: number) => void;
  // eslint-disable-next-line no-unused-vars
  setVolume: (volume: number) => void;
  play: () => void;
  pause: () => void;
  prevTrack: () => void;
  nextTrack: () => void;
  addTrackAndPlay: () => void;
}

export type MusicPlayer = MusicPlayerState & MusicPlayerActions;
