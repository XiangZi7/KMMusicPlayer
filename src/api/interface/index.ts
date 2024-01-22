export interface code {
  code: string | number;
}

export interface msg {
  msg: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends code {
  data?: T;
}

export interface ResultRes<T = any> extends code {
  result?: T;
}

// 搜索
export interface ResSearch {
  result: {
    songs: [];
    playlists: [];
    mvs: [];
    songCount: number;
    playlistCount: number;
    mvCount: number;
  };
}
// 歌词
export interface Reslyric<T = any> extends code {
  klyric: T;
  lrc: T;
  tlyric: T;
}

//搜索动漫
export interface ResVideoSearch extends code, msg, ResultData {
  count: 11;
}

// 检查二维码
export interface checkQR extends code {
  cookie: string;
  message: string;
}

//每日歌单
export interface ResRecommendResource extends code {
  recommend: [];
  featureFirst: boolean;
  haveRcmdSongs: boolean;
}

//我的歌单
export interface ResUserPlaylist extends code {
  playlist: [];
  more: boolean;
}

//歌单详情
export interface ResPlaylistDetail extends code {
  playlist: [];
  privileges: [];
}
