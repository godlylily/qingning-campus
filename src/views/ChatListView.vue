<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800">
      <div class="flex items-center justify-between px-4 py-3">
        <button 
          @click="goBack"
          class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
        >
          <ArrowLeft :size="20" class="text-gray-600 dark:text-gray-300" />
        </button>
        <h1 class="font-bold text-gray-900 dark:text-white">消息</h1>
        <div class="w-10"></div>
      </div>
      
      <div class="px-4 pb-3">
        <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
          <Search :size="16" class="text-gray-400" />
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="搜索聊天..."
            class="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>
    </div>

    <div class="px-4 py-4 space-y-3">
      <div @click="goToAssistant" class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
          <Bot :size="24" class="text-white" />
        </div>
        <div class="flex-1">
          <div class="font-medium text-gray-900 dark:text-white">青柠助手</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">有问题随时问我~</div>
        </div>
        <ChevronRight :size="20" class="text-gray-400" />
      </div>

      <div @click="goToNotifications" class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <AlertCircle :size="24" class="text-white" />
        </div>
        <div class="flex-1">
          <div class="font-medium text-gray-900 dark:text-white">系统通知</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">您有2条未读通知</div>
        </div>
        <span class="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
      </div>

      <div class="text-xs text-gray-400 px-1">最近聊天</div>

      <div 
        v-for="chat in filteredChats" 
        :key="chat.id"
        @click="goToChat(chat.id)"
        class="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 cursor-pointer transition-all duration-300 hover:shadow-card"
      >
        <div class="relative">
          <div class="w-12 h-12 rounded-full overflow-hidden">
            <img :src="chat.user.avatar" :alt="chat.user.nickname" class="w-full h-full object-cover" />
          </div>
          <span v-if="chat.user.online" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800"></span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <span class="font-medium text-gray-900 dark:text-white truncate">{{ chat.user.nickname }}</span>
            <span class="text-xs text-gray-400">{{ chat.lastTime }}</span>
          </div>
          <div class="flex items-center justify-between mt-1">
            <span class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ chat.lastMessage }}</span>
            <span 
              v-if="chat.unreadCount > 0" 
              class="min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            >
              {{ chat.unreadCount > 99 ? '99+' : chat.unreadCount }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeft, Search, Bot, AlertCircle, ChevronRight } from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const searchQuery = ref('')

const filteredChats = computed(() => {
  if (!searchQuery.value.trim()) {
    return userStore.chats
  }
  const query = searchQuery.value.toLowerCase()
  return userStore.chats.filter(chat => 
    chat.user.nickname.toLowerCase().includes(query) ||
    chat.lastMessage.toLowerCase().includes(query)
  )
})

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  
  if (hours < 1) return '刚刚'
  if (hours < 24) return `${hours}小时前`
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

const goBack = () => {
  window.history.back()
}

const goToChat = (chatId: string) => {
  window.location.href = `/chat/${chatId}`
}

const goToAssistant = () => {
  window.location.href = '/chat/assistant'
}

const goToNotifications = () => {
  window.location.href = '/notifications'
}
</script>