/// <reference types="vite/client" />
interface ImportMetaEnv {
  /** 本地开发-端口号 */
  readonly VITE_APP_BASE_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
