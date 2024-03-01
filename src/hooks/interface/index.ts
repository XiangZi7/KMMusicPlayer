// eslint-disable-next-line no-unused-vars
export type QrCallback = (isAuthorized: boolean) => void;

// 登陆状态模型
export interface ResLoginStatus {
  avatarUrl?: string;
  nickname?: string;
  message?: string;
}

//GPT - Hooks

export interface ChatGPTModel {
  // 根据API实际返回的模型属性进行定义
  id: string;
  name: string;
}

export interface SendMessageRequest {
  // 根据API接受的请求数据结构进行定义
  [key: string]: any;
}

export interface DrawImageResponse {
  // 根据AI作画API实际返回的数据结构进行定义
  url: string;
}
