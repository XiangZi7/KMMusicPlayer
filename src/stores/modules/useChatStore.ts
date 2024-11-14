import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'

/**
 * chat
 */
// Chat Store
export const useChatStore = defineStore({
  id: 'useChatStore',
  state: () => ({
    apiBaseUrl: 'https://api.chatanywhere.tech',
    apiToken: '',
    conversations: [
      {
        id: 1,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
          },
        ],
      },
    ],
    activeConversationId: 0,
    modelSelect: '',
  }),
  actions: {
    setApiBaseUrl(url: string) {
      this.apiBaseUrl = url
    },
    setApiToken(token: string) {
      this.apiToken = token
    },
    addConversation() {
      const newChatId = this.conversations.length + 1
      this.conversations.push({ id: newChatId, messages: [] })
      this.activeConversationId = this.conversations.length - 1
    },
    deleteConversation(index: number) {
      if (this.conversations.length === 1) {
        this.conversations = []
        this.activeConversationId = -1 // or null
      } else {
        this.conversations.splice(index, 1)
        if (this.activeConversationId >= index) {
          this.activeConversationId = Math.max(0, this.activeConversationId - 1)
        }
      }
    },
  },
  persist: piniaPersistConfig('ChatStore'),
})
