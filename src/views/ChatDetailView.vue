<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
          <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <img 
              :src="chat?.user.avatar" 
              :alt="chat?.user.nickname" 
              class="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h1 class="font-bold text-gray-800 dark:text-gray-200">{{ chat?.user.nickname }}</h1>
              <p class="text-xs text-gray-400">{{ chat?.user.school }} · {{ chat?.user.online ? '在线' : '离线' }}</p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Phone class="w-5 h-5 text-gray-400" />
          </button>
          <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <MoreVertical class="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 pt-16 pb-24 overflow-y-auto">
      <div v-if="chat" class="px-4 py-4 space-y-4">
        <div 
          v-for="(message, index) in chat.messages" 
          :key="message.id"
          class="flex gap-3" 
          :class="message.senderId === 'current' ? 'justify-end' : ''"
        >
          <div v-if="message.senderId !== 'current'" class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img :src="chat.user.avatar" :alt="chat.user.nickname" class="w-full h-full object-cover" />
          </div>
          <div 
            :class="message.senderId === 'current' ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'"
            class="max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm"
            :class="message.senderId === 'current' ? 'rounded-tr-none' : 'rounded-tl-none'"
          >
            <p class="text-sm leading-relaxed">{{ message.content }}</p>
            <p class="text-xs mt-1 opacity-60">{{ message.time }}</p>
          </div>
          <div v-if="message.senderId === 'current'" class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img :src="currentUser.avatar" :alt="currentUser.nickname" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </main>

    <footer class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 safe-area-bottom">
      <div class="flex items-center gap-3">
        <button class="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
          <Smile class="w-5 h-5 text-gray-400" />
        </button>
        <div class="flex-1 relative">
          <textarea 
            v-model="inputMessage" 
            rows="1" 
            class="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm outline-none resize-none focus:ring-2 focus:ring-primary-500 text-gray-800 dark:text-gray-200" 
            placeholder="输入消息..."
            @keydown.enter="sendMessage"
          ></textarea>
        </div>
        <button 
          class="w-10 h-10 rounded-full flex items-center justify-center transition-all" 
          :class="inputMessage.trim() ? 'bg-primary-500 text-white hover:bg-primary-600' : 'bg-gray-200 dark:bg-gray-600 text-gray-400'"
          :disabled="!inputMessage.trim()"
          @click="sendMessage"
        >
          <Send class="w-5 h-5" />
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import {
  ArrowLeft,
  Phone,
  MoreVertical,
  Smile,
  Send,
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const inputMessage = ref('')

const currentUser = computed(() => userStore.currentUser)

const chat = computed(() => {
  return userStore.chats.find(c => c.id === route.params.id)
})

const goBack = () => {
  router.back()
}

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  if (chat.value) {
    const newMessage = {
      id: Date.now().toString(),
      content: inputMessage.value,
      senderId: 'current',
      time: '刚刚',
    }
    chat.value.messages.push(newMessage)
    chat.value.lastMessage = inputMessage.value
    chat.value.lastTime = '刚刚'
    inputMessage.value = ''
  }
}
</script>