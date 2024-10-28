import {
  SearchParams,
  ResultRes,
  ResultData,
  PlaylistDetailResponse,
  CommentMVParams,
  Params,
  checkQR,
  CommentResponse,
  SearchResult,
  MVAllParams,
  MVAllResponse,
} from './interface';
import { LyricsResponse } from '@/utils/parseLyrics'
import { httpGet } from '@/utils/http';

const calculatePagination = (params: Params, defaultLimit = 30) => {
  const limit = params.limit || defaultLimit;
  const offset = ((params.offset || 1) - 1) * limit;
  return { limit, offset };
}

// 搜索歌曲
export const cloudsearch = ({ kw = '', offset = 0, type = 1, limit = 20 }: SearchParams) => {
  const calculatedOffset = ((offset || 1) - 1) * limit;
  return httpGet<ResultRes>('cloudsearch', { keywords: kw, limit, offset: calculatedOffset, type });
}

// 获取音乐连接
export const urlV1 = (id: number | string) => httpGet<ResultData>(`song/url/v1?id=${id}&level=exhigh`);

// 获取歌单详情
export const playlistDetail = (id: number | string) => httpGet<PlaylistDetailResponse>(`/playlist/detail?id=${id}`);

// 获取 MV 数据
export const mvDetail = (mvid: number | string) => httpGet<ResultData>(`/mv/detail?mvid=${mvid}`);

// MV 评论
export const commentMV = <T>(params: CommentMVParams) => {
  const { limit, offset } = calculatePagination(params);
  return httpGet<T>(`/comment/mv?id=${params.id}&limit=${limit}&offset=${offset}`);
}

export const mvUrl = (id: number | string) => httpGet<ResultData>(`/mv/url?id=${id}`);

// 获取用户歌单
export const userPlaylist = <T>(params: Params) => {
  const { limit, offset } = calculatePagination(params);
  return httpGet<T>(`/user/playlist?uid=${params.id}&limit=${limit}&offset=${offset}`);
}

// 歌单 (网友精选碟)
export const topPlaylist = (params: Params) => {
  const { limit, offset } = calculatePagination(params, 10);
  return httpGet<{ playlists: [] }>(`/top/playlist?limit=${limit}&offset=${offset}&cat=${params.cat}`);
}

// 歌单分类
export const playlistCatList = () => httpGet<{ sub: [] }>(`/playlist/catlist`);

// 获取歌词
export const lyric = (id: number | string) => httpGet<LyricsResponse>(`/lyric?id=${id}`);

// 二维码 key 生成接口 
export const loginQrKey = () => httpGet<ResultData>('/login/qr/key');

// 二维码生成接口
export const loginQrCreate = (key: string) => {
  return httpGet<ResultData>(`/login/qr/create?key=${encodeURIComponent(key)}&qrimg=true`);
}

// 二维码检测扫码状态接口
export const loginQrCheck = (key: string) => httpGet<checkQR>(`/login/qr/check?key=${encodeURIComponent(key)}`);

// 登陆状态
export const loginStatus = () => httpGet<ResultData>('/login/status');

// 退出登陆
export const logout = () => httpGet('/logout');

// 歌单 评论
export const commentPlaylist = (params: CommentMVParams) => {
  const { limit, offset } = calculatePagination(params);
  return httpGet<CommentResponse>(`/comment/playlist?id=${params.id}&limit=${limit}&offset=${offset}`);
}

// 喜欢音乐
export const likeMusic = (id: number) => httpGet(`/like?id=${id}`);

// 歌曲 评论
export const commentMusic = (params: CommentMVParams) => {
  const { limit, offset } = calculatePagination(params);
  return httpGet<CommentResponse>(`/comment/music?id=${params.id}&limit=${limit}&offset=${offset}`);
}

// 默认搜索关键词
export const searchDefault = () => httpGet<ResultData<SearchResult>>('/search/default');
// 获取相似歌单
export const similarPlaylists = <T>(id: number | string) => {
  return httpGet<T>(`/simi/mv?mvid=${id}`);
};

// 封装获取所有 MV 的接口
export const getAllMV = (params: MVAllParams = {}) => {
  // 构建请求参数
  const { area, type, order, limit = 30, offset = 0 } = params;

  // 生成查询字符串
  const query = new URLSearchParams({
    area: area || '',
    type: type || '',
    order: order || '上升最快', // 默认排序为上升最快
    limit: limit.toString(), // 将数字转换为字符串
    offset: (((offset || 1) - 1) * limit).toString(), // 将数字转换为字符串
  }).toString();

  // 发送请求并返回结果
  return httpGet<MVAllResponse>(`/mv/all?${query}`);
};
