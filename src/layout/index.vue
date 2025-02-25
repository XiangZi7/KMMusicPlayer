<script setup lang="ts">
import Header from './components/header/index.vue'
import Aside from './components/aside/index.vue'
import Main from './components/main/index.vue'
import Footer from './components/footer/index.vue'
import BG from './components/bg/index.vue'
import { AudioPlayer } from '@/hooks/useAudioPlayer'

provide('audioPlayer', AudioPlayer())
</script>
<template>
  <BG />
  <div class="absolute w-full flex flex-col h-full p-10 z-10">
    <div
      class="w-full flex flex-col h-full rounded-2xl overflow-hidden bg-themeBgColor backdrop-blur-lg"
    >
      <Header />
      <div class="flex flex-1 overflow-hidden">
        <Aside />
        <Main />
      </div>
      <Footer />
    </div>
  </div>
</template>
