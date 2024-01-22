// 歌词行的类型定义
export interface LyricLine {
  time: number; // 时间，以秒为单位
  lrc?: string; // 原文歌词
}

// 双语歌词行的类型定义
export interface BilingualLyricLine extends LyricLine {
  tlyric?: string; // 翻译后的歌词文本
}
