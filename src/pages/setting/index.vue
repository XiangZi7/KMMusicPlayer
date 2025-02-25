<script setup lang="ts">
import { qualityList, languageOptions } from '@/utils/enum'
import { useDark, useToggle } from '@vueuse/core'

const { volume, setVolume } = useAudioPlayer()
const theme = themeStore()
const audio = AudioStore()
const setting = settingStore()

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)
const toggleMode = () => {
  theme.setDark(!isDark.value)
  toggleDark()
}
</script>
<template>
  <div class="p-4">
    <div class="grid gap-6">
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6">
          <h3 class="text-2xl font-semibold leading-none tracking-tight">
            常规设置
          </h3>
        </div>
        <div class="p-6 pt-0 grid gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <icon-material-symbols:language />
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="language"
                >语言</label
              >
            </div>
            <el-select
              v-model="setting.language"
              placeholder="请选择语言"
              class="w-48"
              @change="(val: any) => setting.setSettingStore('language', val)"
            >
              <el-option
                v-for="option in languageOptions"
                :key="option.id"
                :label="option.label"
                :value="option.id"
              />
            </el-select>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <icon-material-symbols:lyrics-outline />
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="show-lyrics"
                >显示歌词</label
              >
            </div>
            <el-switch disabled />
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <icon-mdi:weather-night />
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="dark-mode"
                >暗黑模式</label
              >
            </div>
            <el-switch v-model="theme.isDark" @change="toggleMode" />
          </div>
        </div>
      </div>
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6">
          <h3 class="text-2xl font-semibold leading-none tracking-tight">
            音频设置
          </h3>
        </div>
        <div class="p-6 pt-0 grid gap-4">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <icon-ic:baseline-volume-up />
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="volume"
                  >音量</label
                >
              </div>
              <span>{{ volume }} %</span>
            </div>
            <el-slider v-model="volume" :max="100" @change="setVolume" />
          </div>
          <div class="flex items-center justify-between">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="audio-quality"
              >音频质量</label
            >
            <el-select
              v-model="audio.quality"
              @change="(val: any) => audio.setAudioStore('quality', val)"
              placeholder="请选择音频质量"
              class="w-48"
            >
              <el-option
                v-for="option in qualityList"
                :key="option.id"
                :label="option.label"
                :value="option.id"
              />
            </el-select>
          </div>
          <div class="flex items-center justify-between">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="auto-play"
              >自动播放</label
            >
            <el-switch disabled />
          </div>
        </div>
      </div>
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div class="flex flex-col space-y-1.5 p-6">
          <h3 class="text-2xl font-semibold leading-none tracking-tight">
            其他设置
          </h3>
        </div>
        <div class="p-6 pt-0 grid gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <icon-ic:outline-notifications-active />
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="notifications"
                >通知</label
              >
            </div>
            <el-switch disabled />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
