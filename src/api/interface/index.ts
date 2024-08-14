// 搜索参数的接口
export interface SearchParams {
    kw?: string;
    offset?: number;
    limit?: number;
    type?: number | string;
}

export interface code {
    code: number;
}


// 请求响应参数（包含data）
export interface ResultData<T = any> extends code {
    data?: T;
}

export interface ResultRes<T = any> extends code {
    result: T;
}

// 搜索
// 歌曲的实体类型
export interface Song {
    name: string;
    id: number;
    pst: number;
    t: number;
    al: {
        id: number;
        name: string;
        picUrl: string; // 或者 picUrl
    };
    ar: Array<{
        id: number;
        name: string;
        tns: string[];
        alias: string[];
    }>;
    dt: number; //歌曲时长
    mv: number | null; // MV ID
    // 针对其他字段您可以继续添加
}

// 质量控制提醒类型
interface QcReminder {
    qcReminderPart: string;
    highLight: boolean;
}

// 查询重写信息类型
interface QueryRewriteInfo {
    type: string;
    keyword: string;
    rewriteQuery: string;
}

// 主结果类型
export interface cloudsearchResult {
    searchQcReminder: {
        qcReminderChannel: string;
        qcReminders: Array<QcReminder>;
    };
    queryRewriteInfo: QueryRewriteInfo;
    songs: Song[];
}

// 定义 Playlist 和 Creator 接口
interface Creator {
    nickname: string;
    userId: number;
    userType: number;
    avatarUrl: string | null;
    authStatus: number;
    expertTags: string | null;
    // 这里可以添加更多的属性，如果需要
}

interface Playlist {
    id: number;
    name: string;
    action: null;
    actionType: null;
    bookCount: number;
    coverImgUrl: string;
    creator: Creator;
    description: string;
    highQuality: boolean;
    officialTags: null | string;
    playCount: number;
    recommendText: null | string;
    score: null | number;
    specialType: number;
    subscribed: boolean;
    trackCount: number;
    userId: number;
}

// 定义包含 playlists 的整体结构
export interface PlaylistsResponse {
    playlistCount: number;
    playlists: Playlist[];
}

interface User {
    defaultAvatar: boolean;
    province: number;
    authStatus: number;
    followed: boolean;
    gender: number;
    nickname: string;
    city: number;
    birthday: number;
    remarkName: null | string;
    signature: string;
    userId: number;
    userType: number;
    vipType: number;
    avatarImgId: number;
    avatarImgIdStr: string;
    avatarUrl: string;
    backgroundImgId: number;
    backgroundImgIdStr: string;
    backgroundUrl: string;
}

interface playlistDetail {
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
    detailDescription: string;
    subscribedCount: number;
    subscribed: boolean;
    subscribers: User[];
    createTime: string;
    commentCount: number
}

export interface playlistDetailResponse {
    code: number;
    fromUserCount: number;
    fromUsers: null | any;
    playlist: playlistDetail;
}


export interface CommentMVParams {
    id: number | string;            // MV ID
    limit?: number;       // 可选，默认值为 30
    offset?: number;      // 可选，默认值为 1
}


export interface Params {
    id?: number | string;  // 用户 ID
    limit?: number;        // 可选，默认值为 30
    offset?: number;       // 可选，默认值为 1
    cat?: string | []      // 用于精选歌单的
}

// 歌词
export interface Reslyric extends code {
    tlyric: { lyric: string };
    lrc: { lyric: string };
    romalrc: {
        lyric: string
    }
}
// 检查二维码
export interface checkQR extends code {
    cookie: string;
    message: string;
}

// 定义 PlaylistTrack 类型，以便表示每一首歌曲的相关信息
interface PlaylistTrack {
    id: number; // 曲目ID
    name: string; // 曲目名
    ar: Array<{ id: number; name: string }>; // 艺术家信息，可能包含多个艺术家
    al: { id: number; name: string; picUrl: string }; // 专辑信息
    // 其他曲目相关的属性...
}

// 定义 PlaylistCreator 类型，以便表示创建者的信息
interface PlaylistCreator {
    defaultAvatar: boolean;
    province: number;
    authStatus: number;
    followed: boolean;
    // 其他创建者相关的属性（如头像 URL）
}

// 定义 Playlist 类型，以便表示整个歌单的结构
export interface userPlaylistRes {
    id: number; // 歌单ID
    name: string; // 歌单名称
    coverImgUrl: string; // 封面图 URL
    subscribers: Array<any>; // 订阅者列表，可以进一步细化
    subscribed: boolean; // 是否订阅
    creators: PlaylistCreator[]; // 创建者信息
    tracks: PlaylistTrack[] | null; // 包含的曲目，可能为空
    playCount: number; // 播放次数
    description: string | null; // 歌单描述
}



interface CommentUser {
    locationInfo: any; // 根据实际情况定义更具体的类型
    liveInfo: any; // 根据实际情况定义更具体的类型
    anonym: number;
    avatarDetail: any; // 根据实际情况定义更具体的类型
    userType: number;
    avatarUrl: string;
    nickname: string;
    userId: number;
    commonIdentity?: any; // 根据实际情况定义更具体的类型
    expertTags?: any; // 根据实际情况定义更具体的类型
    followed: boolean;
    mutual: boolean;
    remarkName?: string; // 可选
    socialUserId?: any; // 根据实际情况定义更具体的类型
}

interface IpLocation {
    ip: string | null;
    location: string;
    userId: number;
}

export interface Comment {
    user: CommentUser;
    beReplied: any[]; // 根据实际情况定义更具体的类型
    commentId: number;
    commentLocationType: number;
    content: string;
    contentResource: any; // 根据实际情况定义更具体的类型
    decoration: any; // 根据实际情况定义更具体的类型
    expressionUrl: string | null;
    grade: any; // 根据实际情况定义更具体的类型
    ipLocation: IpLocation;
    ip: string | null;
    location: string;
    liked: boolean;
    likedCount: number;
    medal?: any; // 根据实际情况定义更具体的类型
    detailPage: string;
    wearPic: string;
    needDisplayTime: boolean;
    owner: boolean;
    parentCommentId: number;
    pendantData?: any; // 根据实际情况定义更具体的类型
    repliedMark?: any; // 根据实际情况定义更具体的类型
    richContent?: any; // 根据实际情况定义更具体的类型
    showFloorComment?: any; // 根据实际情况定义更具体的类型
    status: number;
    time: number; // 时间戳
    timeStr: string;
}

export interface CommentResponse {
    cnum: number;
    code: number;
    commentBanner: any | null; // 根据实际情况定义更具体的类型
    comments: Comment[];
}