<script setup lang="ts">
import MobileHomeComponent from '@/layout/mobile/index.vue'
import PcHomeComponent from '@/layout/pc/index.vue'
const isMobile = ref(useDeviceType())
</script>
<template>
  <component :is="isMobile ? MobileHomeComponent : PcHomeComponent" />
</template>
