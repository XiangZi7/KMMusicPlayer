<script setup lang="ts">
import Left from './components/left.vue'
import Right from './components/right.vue'
const RightRef = ref()
// 处理会话点击
function handleConversationClick() {
  RightRef.value.scrollToBottom()
}
</script>
<template>
  <div class="flex h-full">
    <!-- 会话框 -->
    <Left @change="handleConversationClick" />
    <!-- 聊天框 -->
    <Right ref="RightRef" />
  </div>
</template>
