import { httpGet } from '@/utils/http'
import { API } from '@/api/interface'
// 计算分页
const calculatePagination = (params: API.Params, defaultLimit = 30) => {
  const limit = params.limit || defaultLimit
  const offset = ((params.offset || 1) - 1) * limit
  return { limit, offset }
}

// 创建查询字符串
const createQueryString = (params: Record<string, any>): string => {
  return new URLSearchParams(
    Object.entries(params).filter(([_, v]) => v != null)
  ).toString()
}

// 搜索歌曲
export const cloudsearch = <T>({
  kw = '',
  offset = 0,
  type = 1,
  limit = 20,
}: API.SearchParams) => {
  const { limit: calculatedLimit, offset: calculatedOffset } =
    calculatePagination({ limit, offset })
  return httpGet<API.ResultRes<T>>('cloudsearch', {
    keywords: kw,
    limit: calculatedLimit,
    offset: calculatedOffset,
    type,
  })
}

// 获取音乐连接
export const urlV1 = (id: number | string) => {
  const audio = AudioStore()
  return httpGet<{ data: { url: string }[] }>(`song/url/v1?id=${id}&level=${audio.quality}`)
}

// 获取歌单详情
export const playlistDetail = (id: number | string) =>
  httpGet<API.PlaylistDetailResponse>(`/playlist/detail?id=${id}`)

// 获取 MV 数据
export const mvDetail = (mvid: number | string) =>
  httpGet<API.MVDetailResponse>(`/mv/detail?mvid=${mvid}`)

// MV 评论
export const commentMV = (params: API.CommentMVParams) => {
  const { limit, offset } = calculatePagination(params)
  return httpGet<API.CommentResponse>(
    `/comment/mv?id=${params.id}&limit=${limit}&offset=${offset}`
  )
}

// 获取 MV URL
export const mvUrl = (id: number | string) =>
  httpGet<API.ResultData>(`/mv/url?id=${id}`)

// 获取用户歌单
export const userPlaylist = (params: API.Params) => {
  const { limit, offset } = calculatePagination(params)
  return httpGet<API.userPlaylistResponse>(
    `/user/playlist?uid=${params.id}&limit=${limit}&offset=${offset}`
  )
}

// 获取热门歌单
export const topPlaylist = (params: API.Params) => {
  const { limit, offset } = calculatePagination(params, 10)
  return httpGet<{ playlists: [], total: number }>(
    `/top/playlist?limit=${limit}&offset=${offset}&cat=${params.cat}&order=${params.order}`
  )
}
// 获取精品歌单
export const topPlaylistHighquality = (params: API.Params) => {
  const { limit } = calculatePagination(params, 10)
  return httpGet<{ playlists: [], total: number }>(
    `/top/playlist/highquality?limit=${limit}&cat=${params.cat}&order=${params.order}`
  )
}

// 获取歌单分类
export const playlistCatList = () => httpGet<{ sub: [] }>('/playlist/catlist')

// 获取歌词
export const lyric = (id: number | string) =>
  httpGet<API.LyricsResponse>(`/lyric?id=${id}`)
// 获取歌词
export const lyricNew = (id: number | string) =>
  httpGet<API.LyricsResponse>(`/lyric/new?id=${id}`)

// 二维码 key 生成接口
export const loginQrKey = () =>
  httpGet<API.ResultData<{ unikey: string }>>('/login/qr/key')

// 二维码生成接口
export const loginQrCreate = (key: string) =>
  httpGet<API.ResultData>(
    `/login/qr/create?key=${encodeURIComponent(key)}&qrimg=true`
  )

// 二维码检测扫码状态接口
export const loginQrCheck = (key: string) =>
  httpGet<API.CheckQR>(`/login/qr/check?key=${encodeURIComponent(key)}`)

// 登录状态
export const loginStatus = () => httpGet<API.ResultData>('/login/status')

// 退出登录
export const logout = () => httpGet('/logout')

// 歌单评论
export const commentPlaylist = (params: API.CommentMVParams) => {
  const { limit, offset } = calculatePagination(params)
  return httpGet<API.CommentResponse>(
    `/comment/playlist?id=${params.id}&limit=${limit}&offset=${offset}`
  )
}

// 喜欢音乐
export const likeMusic = (id: number) => httpGet(`/like?id=${id}`)

// 歌曲评论
export const commentMusic = (params: API.CommentMVParams) => {
  const { limit, offset } = calculatePagination(params)
  return httpGet<API.CommentResponse>(
    `/comment/music?id=${params.id}&limit=${limit}&offset=${offset}`
  )
}

// 默认搜索关键词
export const searchDefault = () =>
  httpGet<API.ResultData<API.SearchResult>>('/search/default')

// 获取相似歌单
export const similarPlaylists = <T>(id: number | string) =>
  httpGet<T>(`/simi/mv?mvid=${id}`)

// 封装获取所有 MV 的接口
export const getAllMV = (params: API.MVAllParams = {}) => {
  const {
    area = '',
    type = '',
    order = '上升最快',
    limit = 30,
    offset = 0,
  } = params
  const query = createQueryString({
    area,
    type,
    order,
    limit,
    offset: ((offset || 1) - 1) * limit, // 偏移计算
  })

  return httpGet<API.MVAllResponse>(`/mv/all?${query}`)
}

// 动漫搜索
export const aniSearch = ({
  kw = '',
  type = '',
}: {
  kw: string
  type: string
}) => {
  const query = createQueryString({ kw, type })
  return httpGet<API.animeResponse>(`/animation/search?${query}`)
}

// 动漫播放地址的 API 函数
export const aniPlay = ({
  id,
  type,
  ep,
}: Record<string, string>) => {
  const query = createQueryString({
    id: id ?? '', // 如果 id 为 undefined 则使用空字符串
    type,
    ...(ep !== undefined ? { ep } : {}), // 有 ep 时才添加
  })

  return httpGet<API.aniPlayResponese>(`/animation/play?${query}`)
}

// 获取轮播图
export const banner = <T>() => httpGet<T>('/banner')

// 最新专辑
export const albumNewest = <T>() => httpGet<T>('/album/newest')

// 所有榜单
export const topList = () => httpGet<API.TopListResponse>('/toplist')

// 获取歌手榜
export const getArtistTopList = (type?: number) => {
  const query = createQueryString({ type })
  return httpGet<API.ArtistTopListResponse>(`/toplist/artist?${query}`)
}
// 获取歌手
export const getArtistList = (params: {
  limit?: number
  area?: string
  offset?: number // 默认值为 0
  type: number | string
}
) => {
  const { limit = 30, area = '-1', offset = 0, type } = params // 设置默认值
  const query = createQueryString({ limit, area, offset, type })
  return httpGet<API.Artist2Response>(`/artist/list?${query}`)
}

// 新歌速递
export const getTopSong = (type?: number) => {
  const query = createQueryString({ type })
  return httpGet<API.TopSongsResponse>(`/top/song?${query}`)
}

// // 获取歌手详情
// export const getArtistDetail = (id: string) => {
//   const query = createQueryString({ id })
//   return httpGet<API.ArtistDetailResponse>(`/artist/detail?${query}`)
// }


// // 获取歌手描述
// export const getArtistdesc = (id: string) => {
//   const query = createQueryString({ id })
//   return httpGet<API.ArtistDetailResponse>(`/artist/desc?${query}`)
// }

// // 获取歌手单曲
// export const getArtists = (id: number) => {
//   const query = createQueryString({ id })
//   return httpGet<API.ArtistResponse>(`/artists?${query}`)
// }

// 这个接口就已经获取了全部的歌手信息了
// 获取歌手专辑
export const getArtistsAlbum = (params: { id: string, limit?: number, offset?: number }) => {
  const { limit = 30, offset = 0, id } = params // 设置默认值
  const query = createQueryString({ limit, offset, id })
  return httpGet<API.ArtistResponse>(`/artists/album?${query}`)
}

// 封装获取 MV 排行的接口
export const getMVRanking = (
  params: {
    limit?: number
    area?: '内地' | '港台' | '欧美' | '日本' | '韩国'
    offset?: number // 默认值为 0
  } = {}
) => {
  const { limit = 30, area = '欧美', offset = 0 } = params // 设置默认值
  const query = createQueryString({ limit, area, offset })
  return httpGet<API.MVRankingResponse>(`/top/mv?${query}`)
}


export type { API }