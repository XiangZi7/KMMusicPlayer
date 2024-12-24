import {
  SearchParams,
  ResultRes,
  ResultData,
  PlaylistDetailResponse,
  CommentMVParams,
  Params,
  CheckQR,
  CommentResponse,
  SearchResult,
  MVAllParams,
  MVAllResponse,
  ArtistTopListResponse,
  TopListResponse,
  MVRankingResponse
} from './interface';

import { LyricsResponse } from '@/utils/parseLyrics';
import { httpGet } from '@/utils/http';

// 计算分页
const calculatePagination = (params: Params, defaultLimit = 30) => {
  const limit = params.limit || defaultLimit
  const offset = ((params.offset || 1) - 1) * limit
  return { limit, offset }
}

// 创建查询字符串
const createQueryString = (params: Record<string, any>): string => {
  return new URLSearchParams(Object.entries(params).filter(([_, v]) => v != null)).toString();
};

// 搜索歌曲
export const cloudsearch = ({ kw = '', offset = 0, type = 1, limit = 20 }: SearchParams) => {
  const { limit: calculatedLimit, offset: calculatedOffset } = calculatePagination({ limit, offset });
  return httpGet<ResultRes>('cloudsearch', { keywords: kw, limit: calculatedLimit, offset: calculatedOffset, type });
};

// 获取音乐连接
export const urlV1 = (id: number | string) => httpGet<{ data: { url: string }[] }>(`song/url/v1?id=${id}&level=exhigh`);

// 获取歌单详情
export const playlistDetail = (id: number | string) => httpGet<PlaylistDetailResponse>(`/playlist/detail?id=${id}`);

// 获取 MV 数据
export const mvDetail = (mvid: number | string) => httpGet<ResultData>(`/mv/detail?mvid=${mvid}`);

// MV 评论
export const commentMV = <T>(params: CommentMVParams) => {
  const { limit, offset } = calculatePagination(params);
  return httpGet<T>(`/comment/mv?id=${params.id}&limit=${limit}&offset=${offset}`);
};

// 获取 MV URL
export const mvUrl = (id: number | string) => httpGet<ResultData>(`/mv/url?id=${id}`);

// 获取用户歌单
export const userPlaylist = <T>(params: Params) => {
  const { limit, offset } = calculatePagination(params);
  return httpGet<T>(`/user/playlist?uid=${params.id}&limit=${limit}&offset=${offset}`);
};

// 获取热门歌单
export const topPlaylist = (params: Params) => {
  const { limit, offset } = calculatePagination(params, 10);
  return httpGet<{ playlists: [] }>(`/top/playlist?limit=${limit}&offset=${offset}&cat=${params.cat}`);
};

// 获取歌单分类
export const playlistCatList = () => httpGet<{ sub: [] }>('/playlist/catlist');

// 获取歌词
export const lyric = (id: number | string) => httpGet<LyricsResponse>(`/lyric?id=${id}`);

// 二维码 key 生成接口
export const loginQrKey = () => httpGet<ResultData>('/login/qr/key');

// 二维码生成接口
export const loginQrCreate = (key: string) => httpGet<ResultData>(`/login/qr/create?key=${encodeURIComponent(key)}&qrimg=true`);

// 二维码检测扫码状态接口
export const loginQrCheck = (key: string) => httpGet<CheckQR>(`/login/qr/check?key=${encodeURIComponent(key)}`);

// 登录状态
export const loginStatus = () => httpGet<ResultData>('/login/status');

// 退出登录
export const logout = () => httpGet('/logout');

// 歌单评论
export const commentPlaylist = (params: CommentMVParams) => {
  const { limit, offset } = calculatePagination(params);
  return httpGet<CommentResponse>(`/comment/playlist?id=${params.id}&limit=${limit}&offset=${offset}`);
};

// 喜欢音乐
export const likeMusic = (id: number) => httpGet(`/like?id=${id}`);

// 歌曲评论
export const commentMusic = (params: CommentMVParams) => {
  const { limit, offset } = calculatePagination(params);
  return httpGet<CommentResponse>(`/comment/music?id=${params.id}&limit=${limit}&offset=${offset}`);
};

// 默认搜索关键词
export const searchDefault = () => httpGet<ResultData<SearchResult>>('/search/default');

// 获取相似歌单
export const similarPlaylists = <T>(id: number | string) => httpGet<T>(`/simi/mv?mvid=${id}`);

// 封装获取所有 MV 的接口
export const getAllMV = (params: MVAllParams = {}) => {
  const { area = '', type = '', order = '上升最快', limit = 30, offset = 0 } = params;
  const query = createQueryString({
    area,
    type,
    order,
    limit,
    offset: ((offset || 1) - 1) * limit, // 偏移计算
  });

  return httpGet<MVAllResponse>(`/mv/all?${query}`);
};

// 动漫搜索
export const aniSearch = <T>({ kw = '', type = '' }: { kw: string; type: string }) => {
  const query = createQueryString({ kw, type });
  return httpGet<T>(`/animation/search?${query}`);
};

// 动漫播放地址的 API 函数
export const aniPlay = <T>({ id, type, ep }: { id: number | string | undefined; type: string; ep?: number | string }) => {
  const query = createQueryString({
    id: id ?? '', // 如果 id 为 undefined 则使用空字符串
    type,
    ...(ep !== undefined ? { ep } : {}), // 有 ep 时才添加
  });

  return httpGet<T>(`/animation/play?${query}`);
};

// 获取轮播图
export const banner = <T>() => httpGet<T>('/banner');

// 最新专辑
export const albumNewest = <T>() => httpGet<T>('/album/newest');
// 所有榜单
export const topList = () => httpGet<TopListResponse>('/toplist');
// 获取歌手榜
export const getArtistTopList = (type?: number) => {
  const query = createQueryString({ type });
  return httpGet<ArtistTopListResponse>(`/toplist/artist?${query}`);
};
// 封装获取 MV 排行的接口
export const getMVRanking = (params: {
  limit?: number;
  area?: '内地' | '港台' | '欧美' | '日本' | '韩国';
  offset?: number; // 默认值为 0
} = {}) => {
  const { limit = 30, area = "欧美", offset = 0 } = params; // 设置默认值
  const query = createQueryString({ limit, area, offset });
  return httpGet<MVRankingResponse>(`/top/mv?${query}`);
};
