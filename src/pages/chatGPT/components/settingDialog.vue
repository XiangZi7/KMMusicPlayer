<script setup lang="ts">
const chat = chatStore()

const visible = ref(false)

const state = reactive({
  apiBaseUrl: chat.apiBaseUrl,
  apiToken: chat.apiToken,
})

const { apiBaseUrl, apiToken } = toRefs(state)

// 处理保存设置
function handleSettingsSave() {
  chat.setChatState('apiBaseUrl', apiBaseUrl.value)
  chat.setChatState('apiToken', apiToken.value)
  visible.value = false
}
</script>
<template>
  <el-button class="h-full" type="primary" @click="visible = true">
    <icon-tabler:settings />
  </el-button>
  <el-dialog v-model="visible" :show-close="true" width="500" title="API 设置">
    <div class="mb-4">
      <label for="api-base-url" class="block text-sm font-medium text-gray-700"
        >API 基地址</label
      >
      <input
        type="text"
        v-model="apiBaseUrl"
        class="mt-1 p-2 block w-full border rounded-lg bg-transparent"
        placeholder="https://api.example.com"
      />
    </div>
    <div class="mb-4">
      <label for="api-key" class="block text-sm font-medium text-gray-700"
        >API Key</label
      >
      <input
        type="text"
        v-model="apiToken"
        class="mt-1 p-2 block w-full border rounded-lg bg-transparent"
        placeholder="your-api-key-here"
      />
    </div>
    <template #footer>
      <div class="flex items-center gap-4 justify-end">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleSettingsSave">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>
