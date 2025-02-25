import { defineStore } from 'pinia'
import piniaPersistConfig from '@/stores/helper/persist'
import { conversationsData } from "@/mock";
import { ChatState, Conversation, Message } from "@/stores/interface";
/**
 * chatGPT
 */
export const chatStore = defineStore({
    id: 'chatStore',
    state: (): ChatState => ({
        apiBaseUrl: 'https://api.chatanywhere.tech',
        apiToken: '',
        conversations: conversationsData,
        activeConversationId: 0,
        modelSelect: 'gpt-3.5-turbo',
    }),
    actions: {
        // SetChatState
        setChatState(...args: ObjToKeyValArray<ChatState>) {
            this.$patch({ [args[0]]: args[1] } as Record<string, any>);
        },
        // Add a new conversation
        addConversation() {
            const newConversation: Conversation = {
                id: this.conversations.length + 1,
                messages: [],
            };
            this.conversations.push(newConversation);
            this.activeConversationId = this.conversations.length - 1;
        },
        // Delete a conversation
        deleteConversation(conversationId: number) {
            const index = this.conversations.findIndex((c: Conversation) => c.id === conversationId);
            if (index !== -1) {
                this.conversations.splice(index, 1);
                this.activeConversationId = Math.max(0, this.activeConversationId - 1);
            }
        },
        // Create a message
        createMessage(content: string, role: 'user' | 'system', conversationIndex?: number) {
            const index = conversationIndex !== undefined ? conversationIndex : this.activeConversationId;
            const activeConversation = this.conversations[index];
            if (activeConversation) {
                const messages = activeConversation.messages;
                if (role === 'system') {
                    if (messages.length > 0 && messages[messages.length - 1].role === 'system') {
                        messages[messages.length - 1].content += content;
                    } else {
                        const message: Message = {
                            role: 'system',
                            content: content,
                        };
                        activeConversation.messages.push(message);
                    }
                } else {
                    const message: Message = {
                        role: 'user',
                        content: content,
                    };
                    activeConversation.messages.push(message);
                }
            }
        },
    },
    persist: piniaPersistConfig('ChatStore'),
})