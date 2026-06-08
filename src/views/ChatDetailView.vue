<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <div class="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800">
      <div class="flex items-center justify-between px-4 py-3">
        <button 
          @click="goBack"
          class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
        >
          <ArrowLeft :size="20" class="text-gray-600 dark:text-gray-300" />
        </button>
        <div class="flex items-center gap-3">
          <div class="relative">
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img :src="chatUser?.avatar" :alt="chatUser?.nickname" class="w-full h-full object-cover" />
            </div>
            <span v-if="chatUser?.online" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
          </div>
          <div>
            <div class="font-bold text-gray-900 dark:text-white">{{ chatUser?.nickname }}</div>
            <div class="text-xs text-gray-500">{{ chatUser?.online ? '在线' : '离线' }}</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Phone :size="18" class="text-gray-600 dark:text-gray-300" />
          </button>
          <button class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <MoreVertical :size="18" class="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </div>

    <div class="flex-1 px-4 py-4 overflow-y-auto space-y-4" ref="messagesContainer">
      <div 
        v-for="(message, index) in messages" 
        :key="message.id"
        class="flex gap-3"
        :class="message.isSent ? 'justify-end' : 'justify-start'"
      >
        <div 
          v-if="!message.isSent"
          class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
        >
          <img :src="chatUser?.avatar" :alt="chatUser?.nickname" class="w-full h-full object-cover" />
        </div>
        <div 
          class="max-w-[75%] px-4 py-3 rounded-2xl"
          :class="message.isSent ? 'bg-primary-500 text-white rounded-tr-md' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-md shadow-sm'"
        >
          <div v-if="message.type === 'product'" class="flex items-center gap-3">
            <img :src="message.content.image" :alt="message.content.title" class="w-16 h-16 rounded-lg object-cover" />
            <div>
              <div class="text-sm font-medium truncate" :class="message.isSent ? 'text-white' : 'text-gray-900 dark:text-white'">
                {{ message.content.title }}
              </div>
              <div class="text-xs mt-1" :class="message.isSent ? 'text-white/70' : 'text-gray-500'">
                ¥{{ message.content.price }}
              </div>
            </div>
          </div>
          <div v-else class="text-sm" :class="message.isSent ? 'text-white' : 'text-gray-900 dark:text-white'">
            {{ message.content }}
          </div>
          <div 
            class="text-xs mt-1 text-right"
            :class="message.isSent ? 'text-white/70' : 'text-gray-400'"
          >
            {{ message.time }}
          </div>
        </div>
      </div>
    </div>

    <div class="sticky bottom-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 p-4">
      <div class="flex items-center gap-2">
        <button class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <Paperclip :size="20" class="text-gray-600 dark:text-gray-300" />
        </button>
        <button class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <Smile :size="20" class="text-gray-600 dark:text-gray-300" />
        </button>
        <input 
          v-model="inputMessage"
          type="text"
          placeholder="输入消息..."
          class="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          @keyup.enter="sendMessage"
        />
        <button 
          @click="sendMessage"
          :disabled="!inputMessage.trim()"
          class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
          :class="inputMessage.trim() ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'"
        >
          <Send :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { ArrowLeft, Phone, MoreVertical, Paperclip, Smile, Send } from 'lucide-vue-next'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const inputMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const chatId = window.location.pathname.split('/').pop() || ''

const chatUser = computed(() => {
  const chat = userStore.chats.find(c => c.id === chatId)
  return chat?.user
})

const messages = computed(() => {
  const chat = userStore.chats.find(c => c.id === chatId)
  return chat?.messages || []
})

const goBack = () => {
  window.history.back()
}

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  const newMessage = {
    id: Date.now().toString(),
    content: inputMessage.value,
    type: 'text',
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    isSent: true
  }
  
  userStore.addMessage(chatId, newMessage)
  inputMessage.value = ''
  
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}
</script>