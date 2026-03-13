import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ChatStore {
  messages: ChatMessage[]
  mode: 'brief' | 'explanatory'
  conversationId: string | null
  addMessage: (msg: ChatMessage) => void
  setMode: (mode: 'brief' | 'explanatory') => void
  setConversationId: (id: string | null) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      mode: 'brief',
      conversationId: null,
      addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
      setMode: (mode) => set({ mode }),
      setConversationId: (id) => set({ conversationId: id }),
      clearMessages: () => set({ messages: [], conversationId: null }),
    }),
    { name: 'dlp2026-chat' }
  )
)
