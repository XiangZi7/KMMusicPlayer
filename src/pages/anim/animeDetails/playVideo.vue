<script setup>
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
const props = defineProps({
  src: {
    type: [Number, String],
    default: ''
  }
})
const { src } = toRefs(props)
</script>
<template>
  <div class="m-video">
    <video-player autoplay="autoplay" :src="src" controls :loop="true" :volume="0.6" />
  </div>
</template>
<style lang="scss" scoped>
.anthology {
  margin-top: 30px;
}
</style>
