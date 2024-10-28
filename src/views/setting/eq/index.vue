<script setup lang="ts">
import { MusicPlayer } from '@/hooks/interface'

const { eqSettings, updateEQ } = inject('MusicPlayer') as MusicPlayer
</script>
<template>
  <div
    class="m-4 rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md"
  >
    <div class="flex flex-col space-y-1.5 p-6">
      <h3
        class="whitespace-nowrap tracking-tight text-xl font-bold text-center"
      >
        三段式均衡器(跨域问题，暂时搁浅该功能)
      </h3>
    </div>
    <div class="p-6">
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <label class="text-lg font-medium">低音</label
          ><span class="text-sm font-medium">{{ eqSettings.bass }}dB</span>
        </div>
        <el-slider
          v-model="eqSettings.bass"
          :min="-10"
          :max="10"
          :step="1"
          @change="(value: number) => updateEQ('bass', value)"
          class="w-3/4"
        />
      </div>
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <label class="text-lg font-medium">中音</label
          ><span class="text-sm font-medium">{{ eqSettings.mid }}dB</span>
        </div>
        <el-slider
          v-model="eqSettings.mid"
          :min="-10"
          :max="10"
          :step="1"
          @change="(value: number) => updateEQ('mid', value)"
          class="w-3/4"
        />
      </div>
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <label class="text-lg font-medium">高音</label
          ><span class="text-sm font-medium">{{ eqSettings.treble }}dB</span>
        </div>
        <el-slider
          v-model="eqSettings.treble"
          :min="-10"
          :max="10"
          :step="1"
          @change="(value: number) => updateEQ('treble', value)"
          class="w-3/4"
        />
      </div>
    </div>
  </div>
</template>
