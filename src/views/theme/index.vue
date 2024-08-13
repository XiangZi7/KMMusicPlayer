<script setup lang="ts">
import MaterialSymbolsWbSunnyOutlineRounded from '~icons/material-symbols/wb-sunny-outline-rounded'
import MaterialSymbolsDarkModeOutlineRounded from '~icons/material-symbols/dark-mode-outline-rounded'
import axios from 'axios'
const themeStore = useThemeStore()
const { switchDark, changePrimary } = useTheme()

const state = reactive({
  colorList: [],
})
const { colorList } = toRefs(state)

// 更改主题
const changePrimarys = (e: string) => {
  const resultHex = rgbaToHex(e)
  changePrimary(resultHex)
}

// 更改主题
function changeColor(color: string) {
  themeStore.setPrimary(color)
  changePrimary(color)
}

// 重置
const reset = () => {
  themeStore.setPrimary('#000000')
  changePrimary('#000000')
}
/**
 * Rgba转换hex
 * @param rgba 颜色的字符串
 * @returns 返回处理后的颜色值
 */
function rgbaToHex(rgba: string) {
  const regex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/
  const match = rgba.match(regex)
  if (!match) {
    throw new Error('Invalid RGBA string')
  }
  const r = parseInt(match[1], 10)
  const g = parseInt(match[2], 10)
  const b = parseInt(match[3], 10)
  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  return `#${hex}`
}

onMounted(() => {
  axios({
    method: 'get',
    url: 'https://mock.mengxuegu.com/mock/634f6425369a770d74bbf7b9/example/colorsList',
  }).then(({ data }) => {
    state.colorList = data
  })
})
</script>
<template>
  <div class="w-full">
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-2">黑暗模式</h2>
      <el-switch
        v-model="themeStore.isDark"
        :active-action-icon="MaterialSymbolsWbSunnyOutlineRounded"
        :inactive-action-icon="MaterialSymbolsDarkModeOutlineRounded"
        @change="switchDark"
      />
    </div>
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-2">主题</h2>
      <el-scrollbar height="400px" class="rounded-lg">
        <div class="grid grid-cols-auto-fill gap-4">
          <a
            href="javascript:;"
            v-for="item in colorList"
            :key="item"
            @click="changeColor(item.hex)"
            class="bg-lightblue text-center rounded-md transition-transform duration-200 ease-in-out hover:scale-105"
          >
            <div
              class="w-full h-32 rounded-lg"
              :style="{ backgroundColor: item.hex }"
            ></div>

            <span class="text-sm line-clamp-1 text-gray-600"
              >{{ item.name }}({{ item.pinyin }})</span
            >
          </a>
        </div>
      </el-scrollbar>
    </div>

    <div class="p-4">
      <h2 class="text-lg font-semibold mb-2">自定义</h2>
      <div class="flex items-center space-x-2">
        <el-color-picker
          v-model="themeStore.primary"
          show-alpha
          @change="changePrimarys"
        />
        <el-button color="#000" @click="reset">重置默认</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 定义 grid-cols-auto-fill 的 CSS 类 */
.grid-cols-auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>
