<script setup lang="ts">
import DefaultLayout from '@/layout/index.vue'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/hooks/useTheme'

// 主题颜色
useTheme()

const setting = settingStore()

// init language
const i18n = useI18n()
onMounted(() => {
  let language = setting.language ?? getBrowserLang()
  if (['zh-CN'].includes(language)) {
    language = 'zh'
  }
  i18n.locale.value = language
  setting.setSettingState('language', language)
})

// element language
const locale = computed(() => {
  if (setting.language == 'zh') return zhCn
  if (setting.language == 'en') return en
  return getBrowserLang() == 'zh' ? zhCn : en
})
</script>

<template>
  <el-config-provider :locale="locale">
    <DefaultLayout />
  </el-config-provider>
</template>
