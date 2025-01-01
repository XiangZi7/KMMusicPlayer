<script setup lang="ts">
  import useSpeechSynthesis from './components/useSpeechSynthesis.vue'
  import useCalculator from './components/useCalculator.vue'
</script>
<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <useSpeechSynthesis />
      <useCalculator />
    </div>
  </div>
</template>
