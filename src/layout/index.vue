<script setup lang="ts">
import Header from './components/Header/Header.vue'
import Menu from './components/Menu/Menu.vue'
import Main from './components/Main/Main.vue'
import Footer from './components/Footer/Footer.vue'

const PlayerDrawerRef = ref<{ show: () => void }>()
// 共享播放器状态

provide('MusicPlayer', useMusicPlayer())

const handleShow = () => {
  if (PlayerDrawerRef.value) {
    PlayerDrawerRef.value.show()
  }
}
</script>
<template>
  <div
    class="flex flex-col bg-[#dde2eb] dark:bg-[#333333] h-full w-full items-center justify-center py-6 px-10"
  >
    <div
      class="flex backdrop-blur-lg flex-col justify-center rounded-3xl shadow-xl h-full w-full overflow-hidden bg-white dark:bg-[--el-bg-color]"
    >
      <Header />
      <section class="flex flex-1 overflow-x-hidden">
        <Menu />
        <Main />
      </section>
      <Footer @show="handleShow" />
      <DrawerPlayer ref="PlayerDrawerRef" />
    </div>
  </div>
</template>
