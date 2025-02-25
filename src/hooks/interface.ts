// 登陆状态模型
export interface ResLoginStatus {
  avatarUrl?: string
  nickname?: string
  message?: string
}

export type QrCallback = (isAuthorized: boolean) => void


export type PlayMode = 'loop' | 'order' | 'shuffle' | 'single';