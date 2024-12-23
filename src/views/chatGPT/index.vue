<script setup lang="ts">
  import axios from 'axios'
  import 'highlight.js/styles/github-dark.css'
  import { renderMarkdown } from '@/utils/markdown'
  import { showNotification } from '@/utils/notification'
  // 类型定义
  interface Message {
    role: 'system' | 'user'
    content: string
  }

  interface ModelItem {
    id: string
  }

  interface ApiError {
    error: {
      message: string
      code: string
    }
  }

  // Store 引用
  const chatStore = useChatStore()
  const {
    conversations,
    activeConversationId,
    modelSelect,
    apiBaseUrl,
    apiToken,
  } = storeToRefs(chatStore)

  // 响应式状态
  const dialogVisible = ref<boolean>(false)
  const modelList = ref<ModelItem[]>([])
  const newMessage = ref<string>('')
  const hoveredIndex = ref<number>(-1)
  const chatRef = ref<HTMLElement>()

  /**
   * 滚动聊天底部
   */
  const scrollToBottom = () => {
    nextTick(() => {
      if (chatRef.value) {
        chatRef.value.scrollTop = chatRef.value.scrollHeight
      }
    })
  }
  /**
   * 创建用户消息
   */
  const createUserMessage = (): void => {
    const message: Message = {
      role: 'user',
      content: newMessage.value,
    }
    chatStore.conversations[chatStore.activeConversationId].messages.push(
      message
    )
  }

  /**
   * 处理流式响应数据
   */
  const processStreamResponse = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    decoder: TextDecoder
  ): Promise<void> => {
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter((line) => line.trim())

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonString = line.substring(6).trim()
            if (jsonString && jsonString !== '[DONE]') {
              const jsonResponse = JSON.parse(jsonString)
              const content = jsonResponse.choices[0]?.delta?.content || ''
              const messages =
                conversations.value[activeConversationId.value].messages
              messages[messages.length - 1].content += content
              scrollToBottom()
            }
          }
        }
      }
    } catch (error) {
      console.error('处理流式数据错误:', error)
    }
  }

  /**
   * 发送消息
   */
  const sendMessage = async (): Promise<void> => {
    if (!newMessage.value.trim() || !chatStore.apiToken.trim()) {
      showNotification('提示', '请输入消息内容或填写Token', 'warning')
      return
    }

    createUserMessage()

    try {
      const response = await fetch(
        `${chatStore.apiBaseUrl}/v1/chat/completions`,
        {
          method: 'POST',
          headers: {
            Authorization: chatStore.apiToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: chatStore.modelSelect,
            messages:
              chatStore.conversations[chatStore.activeConversationId].messages,
            stream: true,
          }),
        }
      )

      if (!response.ok) {
        const errorData = (await response.json()) as ApiError
        throw new Error(`${errorData.error.code} - ${errorData.error.message}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder('utf-8')

      conversations.value[activeConversationId.value].messages.push({
        role: 'system',
        content: '',
      })

      await processStreamResponse(
        reader as ReadableStreamDefaultReader<Uint8Array>,
        decoder
      )
    } catch (error) {
      showNotification(
        '发送消息失败',
        error instanceof Error ? error.message : '未知错误'
      )
    } finally {
      newMessage.value = ''
    }
  }

  // 设置相关函数
  const openSettingsDialog = (): void => {
    dialogVisible.value = true
  }

  const handleSettingsSave = (): void => {
    dialogVisible.value = false
    chatStore.setApiBaseUrl(apiBaseUrl.value)
    chatStore.setApiToken(apiToken.value)
  }

  // 会话管理
  const createNewChat = (): void => {
    chatStore.addConversation()
  }

  const deleteChat = (index: number): void => {
    chatStore.deleteConversation(index)
  }

  const changeConversation = (index: number): void => {
    chatStore.activeConversationId = index
    scrollToBottom()
  }

  // 生命周期钩子
  onMounted(async () => {
    if (!chatStore.apiBaseUrl || !chatStore.apiToken) return

    try {
      const { data } = await axios.get(`${chatStore.apiBaseUrl}/v1/models`, {
        headers: { Authorization: chatStore.apiToken },
      })
      modelList.value = data.data
    } catch (error) {
      showNotification('获取模型列表失败', '请检查API配置是否正确')
    }
  })
</script>
<template>
  <div class="flex flex-1 h-full">
    <div
      class="border-r border-gray-200 dark:border-gray-700 w-72 flex flex-col transition-all duration-300 ease-in-out translate-x-0 md:translate-x-0 md:static absolute z-10 h-full"
    >
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          @click="createNewChat"
          class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full justify-start bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800"
        >
          <icon-material-symbols-light:add-circle-outline-rounded />
          New Chat
        </button>
      </div>
      <div class="relative overflow-auto flex-1">
        <div class="h-full w-full rounded-[inherit]">
          <div style="min-width: 100%; display: table">
            <div
              :class="`p-3 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 ${activeConversationId === index ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' : 'duration-200 text-gray-700 dark:text-gray-300'} flex items-center gap-2`"
              v-for="(item, index) in conversations"
              :key="item.id"
              @click="changeConversation(index)"
              @mouseover="hoveredIndex = index"
              @mouseleave="hoveredIndex = -1"
            >
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-1 line-clamp-1">
                  <icon-tabler:brand-wechat />
                  {{
                    item.messages.length > 0 && item.messages[0].content
                      ? item.messages[0].content
                      : '空消息'
                  }}
                </div>
                <button
                  @click.stop="deleteChat(index)"
                  class="ml-2 text-red-500 hover:text-red-700"
                  v-show="hoveredIndex === index"
                >
                  <icon-tabler:trash />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <header
        class="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between"
      >
        <div class="flex items-center">
          <h1 class="text-xl font-semibold text-gray-800 dark:text-gray-200"
            >General Questions</h1
          >
        </div>
        <span
          class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
        >
          <img
            class="aspect-square h-full w-full rounded-full"
            src="@/assets/gthub-avatar.png"
          />
        </span>
      </header>
      <div class="relative overflow-hidden flex-1 p-4">
        <div
          class="h-full w-full rounded-[inherit] overflow-auto"
          ref="chatRef"
        >
          <div style="min-width: 100%; display: table">
            <div
              v-if="conversations[activeConversationId].messages.length === 0"
              class="text-center p-4"
            >
              <p class="text-gray-500 dark:text-gray-400"
                >开始聊天，输入你的问题...</p
              >
            </div>
            <template v-else>
              <div
                :class="`mb-4 flex ${item.role === 'system' ? 'justify-start' : 'justify-end'}`"
                v-for="item in conversations[activeConversationId].messages"
                :key="item.content"
              >
                <div class="flex items-start max-w-[80%]">
                  <span
                    v-if="item.role === 'system'"
                    class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full mt-1 mx-2"
                  >
                    <img
                      class="aspect-square h-full w-full rounded-full"
                      src="@/assets/gthub-avatar.png"
                    />
                  </span>

                  <div
                    :class="`text-sm p-3 rounded-lg ${item.role === 'system' ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200' : 'bg-purple-600 dark:bg-purple-700 text-white'}`"
                  >
                    <p class="mb-1" v-html="renderMarkdown(item.content)"></p>
                  </div>
                  <span
                    v-if="item.role === 'user'"
                    class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full mt-1 mx-2"
                  >
                    <img
                      class="aspect-square h-full w-full rounded-full"
                      src="@/assets/gthub-avatar.png"
                    />
                  </span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="p-4 bg-white dark:bg-gray-800">
        <div class="flex items-center">
          <el-input
            size="large"
            placeholder="Type your message here..."
            v-model="newMessage"
            class="dark:bg-gray-700 dark:text-gray-200"
          >
            <template #append>
              <el-select
                v-model="modelSelect"
                placeholder="Model"
                size="large"
                style="width: 215px"
              >
                <el-option
                  v-for="item in modelList"
                  :key="item.id"
                  :label="item.id"
                  :value="item.id"
                />
              </el-select>
            </template>
          </el-input>
          <button
            @click="sendMessage"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white"
          >
            <icon-iconoir:send-diagonal />
          </button>
          <button
            @click="openSettingsDialog"
            class="ml-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800"
          >
            <icon-tabler:settings />
          </button>
        </div>
      </div>
    </div>
    <!-- 设置对话框 -->
    <el-dialog
      title="API 设置"
      v-model="dialogVisible"
      class="dark:bg-gray-800 dark:text-gray-200"
    >
      <el-input
        v-model="apiBaseUrl"
        class="mb-4"
        placeholder="输入 API 基础地址"
      />
      <el-input
        v-model="apiToken"
        placeholder="输入 API Token"
        type="textarea"
        class="mb-4"
        :rows="2"
      />
      <span class="text-gray-600 text-sm"
        >请确保正确输入 API 地址和 Token。</span
      >
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSettingsSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
