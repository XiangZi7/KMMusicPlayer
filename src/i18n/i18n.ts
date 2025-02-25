// i18n配置
import { createI18n } from 'vue-i18n'
import zhCn from './modules/zh-cn'
import en from './modules/en'
import jp from "./modules/jp";
import ko from "./modules/ko";

// 创建i18n
const i18n = createI18n({
  // Use Composition API, Set to false
  allowComposition: true,
  locale: getBrowserLang(),
  globalInjection: true, // 全局注入,可以直接使用$t
  // 处理报错: Uncaught (in promise) SyntaxError: Not available in legacy mode (at message-compiler.esm-bundler.js:54:19)
  legacy: false,
  messages: {
    zh: zhCn,
    en,
    jp,
    ko,
  },
})

export default i18n
