<script setup lang="ts">
import axios from 'axios'
import { ElNotification } from 'element-plus'
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import 'highlight.js/styles/github-dark.css' // 可随个人喜好更换主题
const chatStore = useChatStore()

const {
  conversations,
  activeConversationId,
  modelSelect,
  apiBaseUrl,
  apiToken,
} = storeToRefs(chatStore)
const dialogVisible = ref<boolean>(false)
const modelList = ref<string[]>([])
const newMessage = ref<string>('')
const hoveredIndex = ref<number>(-1)

// 发送消息的函数
const sendMessage = async () => {
  if (!newMessage.value) return // 如果输入框为空，直接返回。

  const userMessage: Message = {
    role: 'user',
    content: newMessage.value,
  }

  // 将用户消息添加到当前会话
  chatStore.conversations[chatStore.activeConversationId].messages.push(
    userMessage
  )

  const requestData = JSON.stringify({
    model: chatStore.modelSelect,
    messages: chatStore.conversations[chatStore.activeConversationId].messages,
    stream: true,
  })

  try {
    const response = await fetch(
      `${chatStore.apiBaseUrl}/v1/chat/completions`,
      {
        method: 'POST',
        headers: {
          Authorization: chatStore.apiToken,
          'Content-Type': 'application/json',
        },
        body: requestData,
      }
    )

    // 错误抛出
    if (!response.ok) {
      response.json().then(({ error }) => {
        const { message, code } = error
        ElNotification({
          title: 'HTTP 错误！状态:',
          message: `${code} - ${message}`,
          type: 'error',
        })
        throw new Error(`HTTP 错误！状态: ${code} - ${message}`)
      })
    }

    const reader = response.body?.getReader()
    const decoder = new TextDecoder('utf-8')

    // 为助手的响应添加一个空的系统消息
    const systemMessage: Message = { role: 'system', content: '' }
    conversations.value[activeConversationId.value].messages.push(systemMessage)

    // 处理流式数据
    await processStreamedData(reader, decoder)
  } catch (error) {
    console.error('发送消息时出错:', error)
  } finally {
    newMessage.value = '' // 清空输入框
  }
}

const processStreamedData = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  decoder: TextDecoder
) => {
  while (true) {
    const { done, value } = await reader.read()
    if (done) break // 读取完毕时退出循环

    const chunk = decoder.decode(value, { stream: true })
    const chunks = chunk.split('\n').filter((line) => line.trim() !== '')

    for (const line of chunks) {
      if (line.startsWith('data: ')) {
        const jsonString = line.substring(6).trim() // 去掉 'data: ' 前缀
        if (jsonString && jsonString !== '[DONE]') {
          try {
            const jsonResponse = JSON.parse(jsonString)
            const content = jsonResponse.choices[0]?.delta?.content || ''
            const length =
              conversations.value[activeConversationId.value].messages.length
            conversations.value[activeConversationId.value].messages[
              length - 1
            ].content += content
          } catch (error) {
            console.error('解析 JSON 时出错:', error)
          }
        }
      }
    }
  }
}

const openSettingsDialog = () => {
  dialogVisible.value = true // 打开设置对话框
}

const saveSettings = () => {
  dialogVisible.value = false // 关闭对话框
  // Update the store with new values
  chatStore.setApiBaseUrl(apiBaseUrl.value)
  chatStore.setApiToken(apiToken.value)
}
// 创建新的聊天会话
const createNewChat = () => {
  chatStore.addConversation()
}

// 删除会话的函数
const deleteChat = (index: number) => {
  chatStore.deleteConversation(index)
}

// 创建具有代码高亮功能的 MarkdownIt 实例
const md = new MarkdownIt({
  highlight: function (str, lang) {
    const buttonHTML = `<button class="absolute top-2 right-2 " onclick="copyToClipboard(\`${str}\`)">复制代码</button>`

    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          buttonHTML +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        )
      } catch (__) {
        /* empty */
      }
    }
    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    )
  },
})
// 定义返回 HTML 函数
const marked = (texttomake: string) => {
  let parsedHtml = ''
  parsedHtml = md.render(texttomake)
  parsedHtml = parsedHtml.replace(
    /<a\s+([^>]*\s+)?href="([^"]*\.m3u8)"\s*([^>]*)>/g,
    '<a $1href="#/video?videoUrl=$2&videoType=application/x-mpegURL" $3>'
  )
  parsedHtml = parsedHtml.replace(/<a /g, '<a target="_blank" ')
  return parsedHtml
}

// 复制到剪贴板的函数
window.copyToClipboard = function (code) {
  navigator.clipboard
    .writeText(code)
    .then(() => {
      ElNotification({
        title: '复制成功',
        message: '代码已复制到剪贴板',
        type: 'success',
      })
    })
    .catch((err) => {
      console.error('复制失败:', err)
      ElNotification({
        title: '复制失败',
        message: '无法复制代码',
        type: 'error',
      })
    })
}

// Fetch models on mount

onMounted(() => {
  axios
    .get(`${chatStore.apiBaseUrl}/v1/models`, {
      headers: {
        Authorization: chatStore.apiToken,
      },
    })
    .then((res) => {
      modelList.value = res.data.data
    })
    .catch((error) => {
      console.error('获取模型列表时出错:', error)
    })
})
</script>

<template>
  <div class="flex flex-1 h-full">
    <div
      class="bg-white border-r border-gray-200 w-72 flex flex-col transition-all duration-300 ease-in-out translate-x-0 md:translate-x-0 md:static absolute z-10 h-full"
    >
      <div class="p-4 border-b">
        <button
          @click="createNewChat"
          class="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full justify-start bg-purple-600 hover:bg-purple-700 text-white"
        >
          <icon-material-symbols-light:add-circle-outline-rounded />
          New Chat
        </button>
      </div>
      <div class="relative overflow-auto flex-1">
        <div class="h-full w-full rounded-[inherit]">
          <div style="min-width: 100%; display: table">
            <div
              :class="`p-3 text-sm cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${activeConversationId === index ? 'bg-purple-100 text-purple-800' : 'duration-200 text-gray-700'} flex items-center gap-2`"
              v-for="(item, index) in conversations"
              :key="item.id"
              @click="chatStore.activeConversationId = index"
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
      <header class="bg-white border-b p-4 flex items-center justify-between">
        <div class="flex items-center">
          <h1 class="text-xl font-semibold text-gray-800">General Questions</h1>
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
      <div class="relative overflow-hidden flex-1 p-4 bg-[#F9FAFB]">
        <div class="h-full w-full rounded-[inherit] overflow-auto">
          <div style="min-width: 100%; display: table">
            <div
              v-if="conversations[activeConversationId].messages.length === 0"
              class="text-center p-4"
            >
              <p class="text-gray-500">开始聊天，输入你的问题...</p>
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
                    :class="`text-sm p-3 rounded-lg ${item.role === 'system' ? 'bg-white border border-gray-200 text-gray-800' : 'bg-purple-600 text-white'}`"
                  >
                    <p class="mb-1" v-html="marked(item.content)"></p>
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
      <div class="p-4 bg-white">
        <div class="flex items-center">
          <el-input
            size="large"
            placeholder="Type your message here..."
            v-model="newMessage"
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
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <icon-iconoir:send-diagonal />
          </button>
          <button
            @click="openSettingsDialog"
            class="ml-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <icon-tabler:settings />
          </button>
        </div>
      </div>
    </div>
    <!-- 设置对话框 -->
    <el-dialog title="API 设置" v-model="dialogVisible">
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
        <el-button type="primary" @click="saveSettings">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
