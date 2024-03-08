import {
  Reslyric,
  code,
  ResultData,
  ResVideoSearch,
  checkQR,
  ResRecommendResource,
  ResPlaylistDetail,
  ResSearch,
  SearchParams,
  VideoSearchParams,
  userPlayListParams,
  userPlayListPOJO,
  pages,
  CommentMVParams,
  CommentMVPOJO,
  artistDescModel,
} from "./interface";

// 搜索歌曲
export const cloudsearch = (params: SearchParams) =>
  httpGet<ResSearch>(
    `cloudsearch?keywords=${encodeURIComponent(
      params.kw || "",
    )}&limit=30&offset=${((params.offset || 1) - 1) * 30}&type=${
      params.type || 1
    }`,
  );
//获取音乐连接
export const urlV1 = (id: number | string) =>
  httpGet<ResultData>(`song/url/v1?id=${id}&level=exhigh`);
// 搜索动漫
export const videoSearch = (params: VideoSearchParams) =>
  httpGet<ResVideoSearch>(
    `video/search?name=${encodeURIComponent(params.name)}`,
  );
// 查看动漫详情
export const videoChapter = (id: number) =>
  httpGet<ResVideoSearch>(`video/chapter?id=${id}`);
// 1. 二维码 key 生成接口
export const loginQrKey = () => httpGet<ResultData>("/login/qr/key");
// 2. 二维码生成接口
export const loginQrCreate = (key: string) =>
  httpGet<ResultData>(
    `/login/qr/create?key=${encodeURIComponent(key)}&qrimg=true`,
  );
// 3. 二维码检测扫码状态接口
export const loginQrCheck = (key: string) =>
  httpGet<checkQR>(`/login/qr/check?key=${encodeURIComponent(key)}`);
//登陆状态
export const loginStatus = () => httpGet<ResultData>("/login/status");
//退出登陆
export const logout = () => httpGet<code>("/logout");
// 每日推荐
export const recommendSongs = () => httpGet<ResultData>("/recommend/songs");
// 每日歌单
export const recommendResource = () =>
  httpGet<ResRecommendResource>("/recommend/resource");
// 喜欢音乐
export const likeMusic = (id: number) => httpGet(`/like?id=${id}`);
// 获取用户歌单
export const userPlaylist = (params: userPlayListParams) =>
  httpGet<userPlayListPOJO>(
    `/user/playlist?uid=${params.id}&limit=${params.limit || 30}&offset=${
      ((params.offset || 1) - 1) * 30
    }`,
  );
// 获取歌单所有歌曲
export const playlistTrackAll = (params: { id: number; offset?: number }) =>
  httpGet(
    `/playlist/track/all?id=${params.id}&limit=30&offset=${
      ((params.offset || 1) - 1) * 30
    }`,
  );
//获取歌单详情
export const playlistDetail = (id: number) =>
  httpGet<ResPlaylistDetail>(`/playlist/detail?id=${id}`);
//获取歌词
export const lyric = (id: number | string) =>
  httpGet<Reslyric>(`/lyric?id=${id}`);

// 最热MV
export const mvFirst = () => httpGet<ResultData>("/mv/first");
export const mvUrl = (id: number) => httpGet<ResultData>(`/mv/url?id=${id}`);
// 获取用户等级信息
export const userLevel = () => httpGet<ResultData>(`/user/level`);
// 获取账号信息
export const userAccount = () => httpGet<ResultData>(`/user/account`);
//私信和通知接口
export const plCount = () => httpGet<ResultData>(`/pl/count`);
//歌单 ( 网友精选碟 )
export const topPlaylist = (params: pages) =>
  httpGet<{ playlists: [] }>(
    `/top/playlist?limit=30&offset=${
      (((params.offset || 1) as number) - 1) * 30
    }&cat=${params.cat}`,
  );
//歌单分类
export const playlistCatList = () => httpGet<{ sub: [] }>(`/playlist/catlist`);
//获取 mv 数据
export const mvDetail = (mvid: number | string) =>
  httpGet<ResultData>(`/mv/detail?mvid=${mvid}`);
// mv 评论
export const commentMV = (params: CommentMVParams) =>
  httpGet<CommentMVPOJO>(
    `/comment/mv?id=${params.id}&limit=${params.limit || 30}&offset=${
      (((params.offset || 1) as number) - 1) * 30
    }`,
  );
// 歌曲 评论
export const commentMusic = (params: CommentMVParams) =>
  httpGet<CommentMVPOJO>(
    `/comment/music?id=${params.id}&limit=${params.limit || 30}&offset=${
      (((params.offset || 1) as number) - 1) * 30
    }`,
  );
// 歌单 评论
export const commentPlaylist = (params: CommentMVParams) =>
  httpGet<CommentMVPOJO>(
    `/comment/playlist?id=${params.id}&limit=${params.limit || 30}&offset=${
      (((params.offset || 1) as number) - 1) * 30
    }`,
  );
// 所有榜单内容摘要
export const toplistDetail = () => httpGet<ResultData>("/toplist/detail");
// 歌手分类列表
export const artistList = (params: CommentMVParams) =>
  httpGet<{ artists: [] }>(
    `/artist/list?limit=${params.limit || 30}&offset=${
      (((params.offset || 1) as number) - 1) * 30
    }`,
  );
/**
 * @description 歌手详情
 */
// 获取歌手详情
export const artistDetail = (id: number) =>
  httpGet<ResultData>("/artist/detail", {id});
// 获取歌手描述
export const artistDesc = (id: number) =>
  httpGet<artistDescModel>("/artist/desc", {id});
// 获取歌手单曲
export const artists = (id: number) =>
  httpGet<artistDescModel>("/artists", {id});
// 获取歌手 MV
export const artistMv = (id: number) =>
  httpGet<artistDescModel>("/artist/mv", {id});
// 获取歌手专辑
export const artistAlbum = (id: number) =>
  httpGet<artistDescModel>("/artist/album", {id});
