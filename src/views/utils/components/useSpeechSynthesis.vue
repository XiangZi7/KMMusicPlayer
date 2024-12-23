<script setup lang="ts">
  import { useSpeechSynthesis } from '@vueuse/core'

  const voice = ref<SpeechSynthesisVoice>(
    undefined as unknown as SpeechSynthesisVoice
  )
  const text = ref('Hello, everyone! Good morning!')
  const pitch = ref(1)
  const rate = ref(1)

  const speech = useSpeechSynthesis(text, {
    voice,
    pitch,
    rate,
  })

  let synth: SpeechSynthesis

  const voices = ref<SpeechSynthesisVoice[]>([])

  onMounted(() => {
    if (speech.isSupported.value) {
      // load at last
      setTimeout(() => {
        synth = window.speechSynthesis
        voices.value = synth.getVoices()
        voice.value = voices.value[0]
      })
    }
  })

  function play() {
    if (speech.status.value === 'pause') {
      console.log('resume')
      window.speechSynthesis.resume()
    } else {
      speech.speak()
    }
  }

  function pause() {
    window.speechSynthesis.pause()
  }

  function stop() {
    speech.stop()
  }
</script>

<template>
  <div class="p-2 bg-gray-50 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
    <div class="flex flex-col space-y-1.5 p-6">
      <h3
        class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight"
      >
        使用语音合成
      </h3>
    </div>
    <div class="p-6">
      <div v-if="!speech.isSupported" class="text-red-600">
        您的浏览器不支持 SpeechSynthesis API，
        <a
          href="https://caniuse.com/mdn-api_speechsynthesis"
          target="_blank"
          class="text-blue-500 underline"
          >更多详情</a
        >
      </div>
      <div v-else>
        <el-form>
          <el-form-item label="朗读文本">
            <el-input v-model="text" placeholder="请输入要朗读的文本" />
          </el-form-item>

          <el-form-item label="语言">
            <el-select v-model="voice" placeholder="选择语言">
              <el-option disabled label="选择语言" value=""></el-option>
              <el-option
                v-for="(voice, i) in voices"
                :key="i"
                :label="`${voice.name} (${voice.lang})`"
                :value="voice"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="音调">
            <el-slider v-model="pitch" :min="0.5" :max="2" :step="0.1" />
          </el-form-item>

          <el-form-item label="朗读速度">
            <el-slider v-model="rate" :min="0.5" :max="2" :step="0.1" />
          </el-form-item>

          <el-form-item>
            <div class="flex space-x-4">
              <el-button
                type="primary"
                :disabled="speech.isPlaying.value"
                @click="play"
              >
                {{ speech.status.value === 'pause' ? '继续' : '朗读' }}
              </el-button>
              <el-button
                type="warning"
                :disabled="!speech.isPlaying.value"
                @click="pause"
              >
                暂停
              </el-button>
              <el-button
                type="danger"
                :disabled="!speech.isPlaying.value"
                @click="stop"
              >
                停止
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
