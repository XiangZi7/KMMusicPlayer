import request from './request'


// 获取搜索内容信息
export const getMusicInfoApi = (params) => request.get(`cloudsearch?keywords=${params.keywords}&limit=${params.limit}&offset=${params.offset}&type=${params.type}`);
//获取音乐连接
export const playMusicApi = (params) => request.get(`song/url?id=${params.id}`);
//获取歌词
export const getLyricApi = (params) => request.get(`lyric?id=${params.id}`);
//获取歌曲信息
export const getdetailApi = (params) => request.get(`song/detail?ids=${params.id}`);
//获取热门评论
export const getcommentApi = (params) => request.get(`comment/hot?type=0&id=${params.id}`);
//MV
export const getMVApi = (params) => request.get(`mv/url?id=${params.id}`);
//获取歌单 ( 网友精选碟 )
export const getsongList = (params) => request.get(`top/playlist?limit=${params.limit}&offset=${params.offset}`);
// 获取MV评论
export const getcommentMV = (params) => request.get(`/comment/mv?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)
//推荐新音乐
export const getnewmusic = () => request.get(`/personalized/newsong`);
// 最新mv
export const getnewMV = () => request.get(`/mv/first`);
//热门电台
export const getradio = (params) => request.get(`/dj/hot?limit=${params.limit}&offset=${params.offset}`);
//下载歌曲
export const getsongurl = (params) => request.get(`/song/download/url?id=${params.id}`);
//歌单详情
export const getplaylist = (params) => request.get(`/playlist/detail?id=${params.id}`);
//歌单评论
export const getcomment = (params) => request.get(`/comment/playlist?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)
//榜单
export const getlead = () => request.get("/toplist");
//歌手榜单
export const getsingerlis = (params) => request.get(`/toplist/artist?type=${params.type}`)
//获取歌手专辑
export const getsingerapi = (params)=>request.get(`artist/album?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)