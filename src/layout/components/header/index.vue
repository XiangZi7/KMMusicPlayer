<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Avatar from './components/avatar.vue'
const route = useRoute()
const router = useRouter()
const currentIcon = ref('material-symbols:wb-sunny-outline-rounded')
const theme = themeStore()
import { useDark, useToggle } from '@vueuse/core'

const searchText = ref('')

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

// 初始化时根据 store 设置图标
watch(
  () => theme.isDark,
  (newValue) => {
    currentIcon.value = newValue
      ? 'mdi:weather-night'
      : 'material-symbols:wb-sunny-outline-rounded'
  },
  { immediate: true }
)

// 赋值到搜索框
watch(
  () => route.query,
  (newValue) => {
    if (newValue.query) {
      searchText.value = newValue.query as string
    }
  },
  { immediate: true }
)
</script>
<template>
  <header class="px-4 py-2 border-b flex items-center">
    <div class="flex relative w-60">
      <button class="btn btn1" />
      <button class="btn btn2" />
      <button class="btn btn3" />
    </div>
    <el-button text circle @click="router.back()">
      <Icon icon="material-symbols:arrow-back-ios" />
    </el-button>
    <el-button text circle @click="router.forward()">
      <Icon icon="material-symbols:arrow-forward-ios" />
    </el-button>
    <!-- 开源地址 -->
    <a
      href="https://github.com/your-repo"
      target="_blank"
      class="ml-4 bg-hoverMenuBg text-sm flex items-center gap-2 p-2 rounded-lg"
    >
      <Icon icon="mdi:github" class="text-xl" />
      GitHub
    </a>
    <!-- 输入框和头像 -->
    <div class="ml-auto flex items-center gap-3">
      <div class="relative mr-6">
        <Icon
          icon="mdi:magnify"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        <input
          v-model="searchText"
          type="text"
          class="w-64 text-sm pl-8 pr-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 focus:w-80"
          placeholder="搜索..."
          @keyup.enter="router.push('/search?query=' + searchText)"
        />
      </div>
      <button @click="toggleMode">
        <Icon class="text-xl" :icon="currentIcon" />
      </button>
      <Avatar />
    </div>
  </header>
</template>

<style scoped>
.btn {
  height: 15px;
  width: 15px;
  margin: 5px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn1 {
  background: #fac536;
}

.btn1::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 10%;
  opacity: 0;
  background: #222;
  transition: 300ms;
}

.btn1:hover::before {
  opacity: 1;
  top: 50%;
}

.btn2 {
  background: #39ea49;
}

.btn2::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 45%;
  height: 45%;
  opacity: 0;
  background: #222;
  transition: 300ms;
}

.btn2::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  width: 15%;
  height: 80%;
  opacity: 0;
  background: #39ea49;
  transition: 300ms;
}

.btn2:hover::before,
.btn2:hover::after {
  opacity: 1;
  top: 50%;
}

.btn3 {
  background: #f25056;
}

.btn3::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  width: 15%;
  height: 50%;
  opacity: 0;
  background: #222;
  transition: 300ms;
}

.btn3::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 15%;
  opacity: 0;
  height: 50%;
  background: #222;
  transition: 300ms;
}

.btn3:hover::before,
.btn3:hover::after {
  opacity: 1;
  top: 50%;
}
</style>
