import { ParsedLyrics } from "@/utils/parsedLyrics";
/* UserState */
export interface UserState {
    userInfo: Partial<userModel> // 用户信息
    isLoggedIn: boolean // 是否登录
}
// user
export interface userModel {
    avatarUrl: string // 头像
    nickname: string // 昵称
    userId: number // 用户id
}

/* AudioState*/
export interface AudioState {
    trackList: trackModel[] // 歌曲缓存
    currentSongIndex: number // 当前播放歌曲索引
    volume: number // 音量
    quality: string // 音质
}
export interface trackModel {
    id: string; // 歌曲id
    title: string; // 歌曲名
    artist: string; // 艺术家
    album: string; // 专辑
    cover: string; // 封面
    url: string; // 音频地址
    duration: number; // 时长
    lyrics?: ParsedLyrics; // 歌词
}

/* MenuState */
export interface MenuState {
    menuIndex: string // 当前菜单索引
}

/* SettingState */
export interface SettingState {
    isDrawerCover: boolean // 是否覆盖抽屉
    isOriginalParsed: boolean // 是否解析原文
    isRomaParsed: boolean // 是否解析罗马音
    isTranslatedParsed: boolean // 是否解析翻译
    language: string | null // 当前系统语言
}

/* ThemeState */
export interface ThemeState {
    isDark: boolean // 是否暗黑模式
    primary: string // 主题色
}

/* ChatState */
export interface ChatState {
    apiBaseUrl: string; // API 基础 URL
    apiToken: string; // API 令牌
    conversations: Conversation[]; // 会话数据
    activeConversationId: number; // 当前活动会话 ID
    modelSelect: string; // 模型选择
}

export interface Conversation {
    id: number; // 会话 ID
    messages: Message[]; // 消息数组
}

export interface Message {
    role: 'user' | 'system'; // 消息角色
    content: string; // 消息内容
}