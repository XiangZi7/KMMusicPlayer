<script setup lang="ts">
import axios from 'axios'
import { useTheme } from '@/hooks/useTheme'
const { changePrimary } = useTheme()
// 定义颜色列表的类型
interface ColorItem {
  hex: string
  name: string
  pinyin: string
}
const theme = themeStore()

const colorList = ref<ColorItem[]>([])
onMounted(() => {
  axios({
    method: 'get',
    url: 'https://mock.mengxuegu.com/mock/634f6425369a770d74bbf7b9/example/colorsList',
  }).then(({ data }: { data: ColorItem[] }) => {
    colorList.value = data
  })
})

// 更改主题
const changePrimarys = (e: string) => {
  const resultHex = rgbaToHex(e)
  console.log('🚀 => resultHex:', resultHex)
  changePrimary(resultHex)
}
</script>
<template>
  <div class="p-4">
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">颜色方案</h2>
      <el-scrollbar height="400px" class="rounded-lg">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          <a
            href="javascript:;"
            v-for="item in colorList"
            :key="item.name"
            @click="changePrimary(item.hex)"
            class="text-center rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <div
              class="w-full h-32 rounded-lg"
              :style="{ backgroundColor: item.hex }"
            ></div>
            <span class="text-sm line-clamp-1 text-gray-600 dark:text-gray-300">
              {{ item.name }} ({{ item.pinyin }})
            </span>
          </a>
        </div>
      </el-scrollbar>
    </div>
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">自定义颜色</h2>
      <div class="flex items-center gap-2">
        <el-color-picker
          v-model="theme.primary"
          show-alpha
          @change="changePrimarys"
        />
        <el-input v-model="theme.primary" class="!w-24" />
        <el-button type="primary" @click="changePrimary('')"
          >重置默认</el-button
        >
      </div>
    </div>
    <div class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">预览</h2>
      <div
        class="grid gap-4 p-4 rounded-lg border bg-background text-foreground"
      >
        <el-button type="primary">Primary</el-button>
        <el-button type="primary" plain>Primary</el-button>
        <el-button type="primary" round>Primary</el-button>
        <div class="flex items-center gap-2">
          <el-switch />
          飞行模式
        </div>
        <p class="text-sm text-primary">
          这是一段示例文本，用于展示当前主题下的文字外观。
        </p>
      </div>
    </div>
  </div>
</template>
