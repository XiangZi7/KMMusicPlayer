import { SearchParams, ResultRes, ResultData, playlistDetailResponse, CommentMVParams, Params, code, checkQR, CommentResponse } from './interface'
import { LyricsResponse } from '@/utils/parseLyrics'

// 搜索歌曲
// 云搜索函数
export const cloudsearch = (params: SearchParams) => {
    const { kw = "", offset = 0, type = 1, limit = 20 } = params; // 解构并提供默认值

    // 计算 limit 和 offset

    const calculatedOffset = ((offset || 1) - 1) * limit;

    // 进行 HTTP GET 请求
    return httpGet<ResultRes>("cloudsearch", {
        keywords: kw,
        limit: limit,
        offset: calculatedOffset,
        type: type
    });
};
//获取音乐连接
export const urlV1 = (id: number | string) =>
    httpGet<ResultData>(`song/url/v1?id=${id}&level=exhigh`);

//获取歌单详情
export const playlistDetail = (id: number | string) =>
    httpGet<playlistDetailResponse>(`/playlist/detail?id=${id}`);
//获取 mv 数据
export const mvDetail = (mvid: number | string) =>
    httpGet<ResultData>(`/mv/detail?mvid=${mvid}`);
// mv 评论
export const commentMV = <T>(params: CommentMVParams) => {
    const limit = params.limit || 30; // 如果没有提供 limit，默认使用 30
    const offset = ((params.offset || 1) - 1) * 30; // 如果没有提供 offset，默认使用 1
    return httpGet<T>(`/comment/mv?id=${params.id}&limit=${limit}&offset=${offset}`);
};
export const mvUrl = (id: number | string) => httpGet<ResultData>(`/mv/url?id=${id}`);
// 获取用户歌单
export const userPlaylist = <T>(params: Params) =>
    httpGet<T>(
        `/user/playlist?uid=${params.id}&limit=${params.limit || 30}&offset=${((params.offset || 1) - 1) * 30
        }`,
    );
//歌单 ( 网友精选碟 )
export const topPlaylist = (params: Params) =>
    httpGet<{ playlists: [] }>(
        `/top/playlist?limit=${params.limit || 10}&offset=${(((params.offset || 1) as number) - 1) * 30
        }&cat=${params.cat}`,
    );
//歌单分类
export const playlistCatList = () => httpGet<{ sub: [] }>(`/playlist/catlist`);

//获取歌词
export const lyric = (id: number | string) =>
    httpGet<LyricsResponse>(`/lyric?id=${id}`);


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

// 歌单 评论
export const commentPlaylist = (params: CommentMVParams) => {
    const limit = params.limit || 30; // 如果没有提供 limit，默认使用 30
    const offset = ((params.offset || 1) - 1) * 30; // 如果没有提供 offset，默认使用 1
    return httpGet<CommentResponse>(`/comment/playlist?id=${params.id}&limit=${limit}&offset=${offset}`);
}
// 喜欢音乐
export const likeMusic = (id: number) => httpGet(`/like?id=${id}`);
// 歌曲 评论
export const commentMusic = (params: CommentMVParams) => {
    const limit = params.limit || 30; // 如果没有提供 limit，默认使用 30
    const offset = ((params.offset || 1) - 1) * 30; // 如果没有提供 offset，默认使用 1
    return httpGet<CommentResponse>(
        `/comment/music?id=${params.id}&limit=${limit}&offset=${offset}`,
    );
}
