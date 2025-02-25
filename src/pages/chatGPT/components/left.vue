<script setup lang="ts">
const chat = chatStore()
const { conversations, activeConversationId } = storeToRefs(chat)

const emit = defineEmits(['change'])

// 处理会话点击
function handleConversationClick(index: number) {
  chat.setChatState('activeConversationId', index)
  emit('change')
}
</script>
<template>
  <aside class="w-64 text-foreground p-4 overflow-hidden border-r">
    <el-button
      type="primary"
      @click="chat.addConversation()"
      class="my-4 w-full"
    >
      新增会话
    </el-button>
    <ul class="overflow-y-auto overflow-x-hidden">
      <li
        class="mb-2 p-2 cursor-pointer flex items-center transition duration-300 hover:bg-hoverMenuBg rounded-lg"
        :class="{ 'bg-hoverMenuBg': index === activeConversationId }"
        v-for="(conversation, index) in conversations"
        :key="conversation.id"
        @click="handleConversationClick(index)"
      >
        <img
          src="@/assets/avatar/Ellipse 43@3x.png"
          alt="Avatar"
          class="w-10 h-10 rounded-full mr-2"
        />
        <div class="w-full">
          <p class="font-bold">会话 {{ conversation.id }}</p>
          <p class="text-sm text-muted-foreground line-clamp-1">
            {{
              conversation.messages[conversation.messages.length - 1]
                ?.content || '暂无消息'
            }}
          </p>
        </div>
      </li>
    </ul>
  </aside>
</template>
