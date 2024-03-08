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

// 分页
export interface pages {
  offset?: number | string;
  limit?: number | string;
  cat?: string | string[];
}

// 搜索参数的接口
export interface SearchParams {
  kw?: string;
  offset?: number;
  type?: number | string;
}

export interface VideoSearchParams {
  name: string;
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
  code: number;
  message: string;
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

//用户歌单params
export interface userPlayListParams {
  id?: number | string;
  offset?: number;
  limit?: number;
}

//用户歌单实体类
export interface userPlayListPOJO extends code {
  playlist: [];
}

//MV视频评论
export interface CommentMVParams extends pages {
  id: string | number;
}

//MV视频评论POJO
export interface CommentMVPOJO {
  comments: CommentMV[];
  hotComments: CommentMV[];
  total: number;
}

export interface CommentMV {
  id: number | string;
  commentId?: number | string;
  content: string;
  timeStr: string;
  likedCount: string | number;
  user: {
    avatarUrl: string;
    nickname: string;
  };
  ipLocation: {
    location: string;
  };
}
// 歌手描述
export interface artistDescModel {
  topicData: [];
  introduction: [];
  code: number;
  count: number;
  briefDesc: string;
}
