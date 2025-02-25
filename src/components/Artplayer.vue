<script setup lang="ts">
import Artplayer from 'artplayer'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    default: '',
  },
  theme: {
    type: String,
    default: '#7E22CE',
  },
})

const artRef = ref()

const option: Artplayer['Option'] = {
  container: '.artplayer-app',
  url: '',
  autoSize: true,
  poster: props.poster,
  theme: props.theme,
  flip: true,
  setting: true,
  playbackRate: true,
  aspectRatio: true,
  screenshot: true,
  hotkey: true,
}

const art = ref<Artplayer>()

onMounted(() => {
  art.value = new Artplayer(option)
})

watch(
  () => props.src,
  (val) => {
    if (val) {
      if (!art.value) return
      art.value.url = val
      art.value.poster = props.poster
    }
  }
)
</script>
<template>
  <div ref="artRef" class="artplayer-app aspect-video" />
</template>
