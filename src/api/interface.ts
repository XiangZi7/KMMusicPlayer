export namespace API {
    // 请求参数接口
    export interface SearchParams {
        kw?: string;
        offset?: number;
        limit?: number;
        type?: number | string; // 可以指定更具体的类型，如果知道有哪些有效值
    }

    // 响应码接口
    export interface Code {
        code: number;
    }

    // 带有可选数据的响应参数
    export interface ResultData<T = any> extends Code {
        data?: T;
    }

    export interface ResultRes<T = unknown> extends Code {
        result: T;
    }

    // 歌曲实体类型
    export interface Song {
        name: string;
        id: number;
        pst: number; // 歌曲状态标识
        t: number; // 歌曲类型标识
        al: AlbumDetails;
        ar: Artist[];
        dt: number; // 歌曲时长（毫秒）
        mv?: number | null; // 可选的MV ID
    }

    interface AlbumDetails {
        id: number;
        name: string;
        picUrl: string;
    }

    // 搜索结果的扩展类型
    export interface songsCloudSearchResult {
        searchQcReminder: string | null; // 搜索提示
        songCount: number; // 歌曲数量
        songs: Song[]; // 歌曲数组
    }

    // 包含MV结果的响应类型
    export interface MVSearchResult {
        mvCount: number; // MV数量
        mvs: MV[]; // MV数组
    }

    // 包含专辑结果的响应类型
    export interface AlbumSearchResult {
        albumCount: number;
        albums: Album[]; // 专辑数组
    }
    // 艺术家类型
    export interface Artist {
        name: string;
        id: number;
        picId: number;
        img1v1Id: number;
        briefDesc: string;
        picUrl: string;
        img1v1Url: string;
        albumSize: number;
        musicSize: number;
        alias: string[];
        topicPerson: number;
        trans: string;
        followed: boolean;
    }

    // 专辑类型
    export interface Album {
        name: string;
        id: number;
        idStr: string;
        type: string; // 例如: EP, 专辑等
        size: number;
        artist: Artist; // 关联的艺术家信息
        songs: any[]; // 曲目（如果需要更详细定义可以创建 Song 类型）
        description: string;
        publishTime: number; // 时间戳
        commentThreadId: string; // 评论线程ID
        isSub: boolean; // 是否订阅
        picId: number;
        picUrl: string; // 专辑封面图
        blurPicUrl: string; // 模糊封面图
        transNames: string[];
    }

    // 播放列表和创建者接口
    export interface Creator {
        nickname: string;
        userId: number;
        userType: number;
        avatarUrl?: string | null; // 可选的头像 URL
        authStatus: number;
        expertTags?: string | null; // 可选的标签
    }

    export interface Playlist {
        id: number;
        name: string;
        coverImgUrl: string;
        creator: Creator;
        description: string;
        highQuality: boolean;
        officialTags?: string | null; // 可选的标签
        playCount: number;
        score?: number | null; // 可选的评分
        specialType: number;
        subscribed: boolean;
        trackCount: number;
        userId: number;
        subscribedCount: number; // 订阅者数量
        updateTime: number; // 时间戳
        playlistCount: number
    }

    // 播放列表回复接口
    export interface PlaylistsResponse {
        playlistCount: number;
        playlists: Playlist[];
    }

    // 用户接口
    export interface User {
        defaultAvatar: boolean;
        province: number;
        authStatus: number;
        followed: boolean;
        gender: number; // 0:未知, 1:男, 2:女
        nickname: string;
        city: number;
        birthday: number; // 时间戳（毫秒）
        signed?: string | null; // 签名，可选
        avatarUrl: string;
    }

    // 播放列表详细信息
    export interface PlaylistDetail {
        id: number;
        name: string;
        coverImgId: number;
        coverImgUrl: string;
        commentThreadId: string;
        creator: User;
        playCount: number;
        trackCount: number;
        tracks: Song[];
        tags: string[];
        description: string;
        detailDescription?: string; // 可选详细描述
        subscribedCount: number;
        subscribers: User[];
        createTime: string; // 创建时间字符串
        commentCount: number;
        shareCount: number;
    }

    export interface PlaylistDetailResponse {
        code: number;
        fromUserCount: number;
        fromUsers?: unknown[] | null; // 根据实际情况定义
        playlist: PlaylistDetail;
    }

    // MV 评论参数
    export interface CommentMVParams {
        id: number | string; // MV ID
        limit?: number; // 可选，默认值为 30
        offset?: number; // 可选，默认值为 1
    }

    // 通用参数接口
    export interface Params {
        id?: number | string; // 用户 ID
        limit?: number; // 可选，默认值为 30
        offset?: number; // 可选，默认值为 1
        before?: number; // 可选，用于分页
        cat?: string | string[]; // 用于精选歌单的分类
        order?: 'new' | 'hot' // 可选 排序方式
    }

    // 歌词接口
    export interface LyricsResponse extends Code {
        klyric: {
            version: number
            lyric: string
        }
        lyric: string
        version: number
        lrc: {
            version: number
            lyric: string // 原歌词
        }
        romalrc: {
            version: number
            lyric: string // 罗马音歌词
        }
        tlyric: {
            version: number
            lyric: string // 翻译歌词
        }
        lyricUser: LyricUser // 提供关于歌词的用户信息
        transUser: LyricUser // 提供关于歌词的用户信息
    }
    interface LyricUser {
        id: number // 用户 ID
        status: number // 状态
        demand: number // 需求
        userid: number // 用户 ID
        nickname: string // 用户昵称
        uptime: number // 更新时间戳
    }
    // 二维码检查接口
    export interface CheckQR extends Code {
        cookie: string;
        message: string;
    }

    // 播放列表曲目类型
    interface PlaylistTrack {
        id: number; // 曲目ID
        name: string; // 曲目名
        ar: Artist[]; // 艺术家信息
        al: AlbumDetails; // 专辑信息
    }

    // 播放列表创建者类型
    interface PlaylistCreator {
        defaultAvatar: boolean;
        province: number;
        authStatus: number;
        followed: boolean;
        // 其他创建者相关的属性
    }

    // 用户歌单响应类型
    export interface UserPlaylistRes {
        id: number; // 歌单ID
        name: string; // 歌单名称
        coverImgUrl: string; // 封面图 URL
        subscribers: unknown[]; // 订阅者列表
        subscribed: boolean; // 是否订阅
        creators: PlaylistCreator[]; // 创建者信息
        tracks?: PlaylistTrack[]; // 包含的曲目
        playCount: number; // 播放次数
        description?: string | null; // 歌单描述
    }

    // 评论用户类型
    interface CommentUser {
        avatarUrl: string;
        userId: number;
        nickname: string;
        followed: boolean;
        // 其他用户信息...
    }

    // IP 地址位置类型
    interface IpLocation {
        ip?: string | null; // IP 可选
        location: string;
        userId: number;
    }

    // 评论类型
    export interface Comment {
        user: CommentUser;
        beReplied: unknown[]; // 被回复的评论
        content: string;
        ipLocation: IpLocation;
        time: number; // 时间戳
        likedCount: number; // 点赞数
        id: number; // 评论ID
        timeStr: string; // 时间字符串
    }

    // 评论响应类型
    export interface CommentResponse {
        cnum: number; // 评论数量
        comments: Comment[];
        total: number; // 总评论数
    }

    // 搜索结果类型
    export interface SearchResult {
        action: number;
        alg: string;
        bizQueryInfo: string; // 可能需要解析为Json
        realKeyword: string;
        searchType: number; // 搜索类型
        showKeyword: string; // 显示的关键词
    }

    // MV 获取参数类型
    export interface MVAllParams {
        area?: string
        type?: string
        order?: string // 排序可选值
        limit?: number; // 取出数量
        offset?: number; // 偏移数量
    }
    // 获取MV列表的响应类型
    export interface MVAllResponse {
        count: number; // MV的总数
        data: MV[]; // MV的数组
    }

    // 新增：歌手榜返回的数据结构
    export interface ArtistTopList {
        albumSize: number; // 专辑数量
        alias: string[]; // 别名数组
        briefDesc?: string; // 简介，可为空
        id: number; // 歌手ID
        img1v1Id: number; // 头像ID
        img1v1Id_str: string; // 头像ID字符串
        img1v1Url: string; // 头像URL
        lastRank: number; // 上一排名
        musicSize: number; // 歌曲数量
        name: string; // 歌手名称
        picId: number; // 图片ID
        picId_str: string; // 图片ID字符串
        picUrl: string; // 图片URL
        score: number; // 排名得分
        topicPerson: number; // 话题人数
        trans?: string; // 其他信息，可为空
    }

    // 歌手排行榜的返回类型
    export interface ArtistTopListResponse {
        type: number; // 数据类型
        updateTime: number; // 更新时间
        code: number; // 状态码
        list: { artists: ArtistTopList[] }; // 包含的歌手数组
    }

    // 定义单个榜单的信息结构
    export interface TopList {
        coverUrl?: string; // 封面图片 URL
        name: string; // 榜单名称
        position: number; // 榜单排序位置
        updateFrequency: string; // 更新频率
        type?: string; // 榜单类型（如 "S"）
        adType?: number; // 广告类型
        anonimous?: boolean; // 是否匿名
        artists?: any[]; // 歌手数组或可能为 null
        backgroundCoverId?: number; // 背景封面 ID
        backgroundCoverUrl?: string | null; // 背景封面 URL
        cloudTrackCount?: number; // 云端曲目数
        commentThreadId?: string; // 评论线程 ID
        coverImgId: number; // 封面图 ID
        coverImgId_str: string; // 封面图 ID（字符串）
        coverImgUrl: string; // 封面图 URL
        createTime: number; // 创建时间
        description: string; // 榜单描述
        englishTitle?: string | null; // 榜单英文标题
        highQuality?: boolean; // 是否为高质量
        id: number; // 榜单 ID
        newImported?: boolean; // 是否新导入
        opRecommend?: boolean; // 是否推荐
        ordered?: boolean; // 是否排序
        playCount: number; // 播放次数
        privacy?: number; // 隐私标识
        subscribedCount?: number; // 订阅人数
        subscribers?: any[]; // 订阅用户数组
        tags?: string[]; // 标签数组
        trackCount: number; // 曲目数量
        trackNumberUpdateTime?: number; // 曲目更新时间
        updateTime: number; // 更新时间
        userId?: number; // 用户 ID
    }

    // 榜单的整体响应类型
    export interface TopListResponse extends Code {
        artistToplist: TopList; // 歌手榜
        list: TopList[]; // 榜单数组
    }

    // 响应数据的主接口定义
    export interface MVDetailResponse {
        code: number;        // 响应码
        data: MV;            // MV 详细信息
    }

    // 音乐视频清晰度设置接口定义
    export interface Bitrate {
        size: number;    // 视频文件大小
        br: number;      // 视频清晰度
        point: number;   // 点数，与清晰度相关
    }

    // MV 功能相关信息接口定义
    export interface MV {
        id: number;
        name: string;
        artistId: number;
        artistName: string;
        artists: Artist[];  // 包含艺人信息的数组
        brs: Bitrate[];     // 可用的清晰度设置
        commentCount: number; // 评论数量
        commentThreadId: string; // 评论线程 ID
        cover: string;       // MV 封面图 URL
        duration: number;    // 时长（毫秒）
        playCount: number;   // 播放次数
        subCount: number;    // 订阅数量
        publishTime: string; // 发布时间
        videoGroup: any[];   // 视频分组（可以进一步定义具体结构）
        desc?: string;       // 描述
        shareCount: number;  // 分享次数
    }

    // MV 排行的单个 MV 信息结构
    export interface MVRanking {
        artistId: number; // 艺术家 ID
        artistName: string; // 艺术家名称
        artists: Array<{ id: number; name: string }>; // 艺术家数组
        briefDesc?: string | null; // 简介，可选
        cover: string; // 封面图 URL
        duration: number; // 时长，单位为秒
        id: number; // MV ID
        lastRank: number; // 上一排名
        mark: number; // 标记
        mv: MV; // MV 的详细信息
        name: string; // MV 名称
        playCount: number; // 播放次数
        score: number; // 排名得分
        subed: boolean; // 是否订阅
    }

    // MV 排行响应类型
    export interface MVRankingResponse extends ResultData {
        hasMore: boolean; // 是否有更多的 MV
        updateTime: number; // 更新时间
        data: MVRanking[]; // MV 排行列表
    }

    // 新歌速递
    export interface TopSongsResponse extends ResultData {
        data: TopSongItem[];
    }
    export interface TopSongItem {
        id: number;
        album: Album;
        artists: Artist[];
        duration: number;
        mvid?: number;
    }

    // 艺术家详情接口
    export interface ArtistResponse {
        artist: Artist;
        code: number;
        hotSongs: Song[];
        more: boolean;
    }

    export interface userPlaylistResponse {
        code: number;
        playlist: Playlist[];
    }

    export interface Artist2Response extends Code {
        artists: Artist[];
    }
    export interface animeResponse extends ResultData {
        data: Anime[]
    }

    export interface Anime {
        id: number
        title: string
        img: string
        rate: number
        year: number
        country: string
        genres?: string[]
    }

    export interface aniPlayResponese extends Code {
        data: DetailList
    }
    // 类型定义
    interface VideoPlay {
        play_data: string
        src_site: string
    }
    interface totalEpisodes {
        title: string
        slug: string
    }

    interface DetailedInfo {
        title: string
        alias?: string
        cast?: string
        country?: string
        director?: string
        genre?: string
        rate?: string
        synopsis?: string
        coverImageUrl?: string
    }

    export interface DetailList {
        detailedInfo: DetailedInfo
        detailInfo: { video_plays: VideoPlay[] }
        totalEpisodes: totalEpisodes[]
    }
}