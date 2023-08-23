import request from './request'


export const cloudsearch = (params) => request.get(`cloudsearch?keywords=${params.keywords}&limit=${params.limit}&offset=${params.offset}&type=${params.type}`);
//获取音乐连接
export const songUrl = (params) => request.get(`song/url/v1?id=${params.id}&level=exhigh`);
//获取歌词
//获取歌曲信息
export const getdetailApi = (params) => request.get(`song/detail?ids=${params.id}`);
//获取热门评论
export const getcommentApi = (params) => request.get(`comment/hot?type=0&id=${params.id}`);
//MV
export const mvUrl = (params) => request.get(`mv/url?id=${params.id}`);
//获取歌单 ( 网友精选碟 )
export const songPlaylist = (params) => request.get(`top/playlist?limit=${params.limit}&offset=${params.offset}`);
// 获取MV评论
export const commentMV = (params) => request.get(`/comment/mv?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)
//推荐新音乐
export const newMusic = () => request.get(`/personalized/newsong`);
// 最新mv
export const newMV = () => request.get(`/mv/first`);
export const mvDetail = (id) => request.get(`/mv/detail?mvid=${id}`);
//热门电台
export const getRadio = (params) => request.get(`/dj/hot?limit=${params.limit}&offset=${params.offset}`);
//下载歌曲
export const getsongurl = (params) => request.get(`/song/download/url?id=${params.id}`);
//歌单详情
export const playListDetail = (id) => request.get(`/playlist/detail?id=${id}`);
//歌单评论
export const commentDetail = (params) => request.get(`/comment/playlist?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)
//榜单
export const getlead = () => request.get("/toplist");
//歌手榜单
export const getsingerlis = (params) => request.get(`/toplist/artist?type=${params.type}`)
//获取歌手专辑
export const getsingerapi = (params) => request.get(`artist/album?id=${params.id}&limit=${params.limit}&offset=${params.offset}`)
// 刷新登录
export const getrefresh = () => request.get("/login/refresh")
// 退出登录
export const logout = () => request.get("/logout")
// 获取账号信息
// export const getuserinfo = () => request.post("/user/account")
//用户登录
export const userlogin = (data) => request.post("login/cellphone", data)
//状态
export const loginStatus = () => request.post("login/status")
//注销
export const userlogout = () => request.post("logout")
// 获取用户歌单
export const userPlaylist = (data) => request.post(`/user/playlist?uid=${data}`)
//每日歌单
export const getdaylist = () => request.get("recommend/resource")
//每日歌曲
export const recommendSongs = () => request.get("recommend/songs")
//获取验证码
export const getuserverion = (data) => request.post("captcha/sent", data)
// 生成二维码的key
export const createKey = () => request.post("/login/qr/key")
// 生成二维码
export const createQR = (data) => request.post("/login/qr/create", data)
// 检查二维码
export const checkKey = (data) => request.post("/login/qr/check", data)
// 获取歌词
export const lyric = (id) => request.get(`/lyric?id=${id}`)
// 歌曲评论
export const commentMusic = (params) => request.get(`/comment/music`, { params })
// 动漫搜索
export const videoSearch = (params) => request.post(`/video/search`, params)
// 获取动漫Url
export const videoUrl = (params) => request.post(`/video/chapter`, params)

