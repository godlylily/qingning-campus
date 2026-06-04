<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <h1 class="font-bold text-lg text-gray-800 dark:text-gray-200">消息</h1>
        <div class="flex items-center gap-2">
          <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Phone class="w-5 h-5 text-gray-400" />
          </button>
          <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Settings class="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </header>

    <main class="pt-16">
      <div class="px-4 py-3">
        <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
          <Search class="w-4 h-4 text-gray-400" />
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索聊天" 
            class="flex-1 bg-transparent text-sm outline-none text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div class="px-4 mb-4">
        <button 
          class="w-full flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          @click="goToNotifications"
        >
          <div class="w-11 h-11 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Bell class="w-5 h-5 text-white" />
          </div>
          <div class="flex-1 text-left">
            <p class="font-medium text-gray-800 dark:text-gray-200">系统通知</p>
            <p class="text-sm text-gray-400">查看系统消息和公告</p>
          </div>
          <div v-if="unreadNotifications > 0" class="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span class="text-xs text-white font-medium">{{ unreadNotifications }}</span>
          </div>
        </button>
      </div>

      <div class="px-4">
        <div class="space-y-2">
          <button 
            v-for="chat in filteredChats" 
            :key="chat.id"
            class="w-full flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            @click="goToChat(chat.id)"
          >
            <div class="relative">
              <img 
                :src="chat.user.avatar" 
                :alt="chat.user.nickname" 
                class="w-12 h-12 rounded-full object-cover"
              />
              <div 
                class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800"
                :class="chat.user.online ? 'bg-green-500' : 'bg-gray-400'"
              ></div>
            </div>
            <div class="flex-1 min-w-0 text-left">
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-800 dark:text-gray-200 truncate">{{ chat.user.nickname }}</span>
                <span class="text-xs text-gray-400">{{ chat.lastTime }}</span>
              </div>
              <p class="text-sm text-gray-400 truncate mt-0.5">{{ chat.lastMessage }}</p>
            </div>
            <div v-if="chat.unreadCount > 0" class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span class="text-xs text-white font-medium">{{ chat.unreadCount }}</span>
            </div>
          </button>
        </div>
      </div>

      <div v-if="filteredChats.length === 0" class="flex flex-col items-center justify-center py-20">
        <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <MessageCircle class="w-10 h-10 text-gray-400" />
        </div>
        <p class="text-gray-500 dark:text-gray-400">暂无聊天记录</p>
        <p class="text-sm text-gray-400 mt-1">去逛逛，发现心仪的商品吧</p>
      </div>
    </main>

    <BottomTabBar :active="'chat'" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import {
  Phone,
  Settings,
  Search,
  Bell,
  MessageCircle,
} from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'

const router = useRouter()
const userStore = useUserStore()

const searchQuery = ref('')

const chats = computed(() => userStore.chats)
const unreadNotifications = computed(() => userStore.unreadNotificationsCount)

const filteredChats = computed(() => {
  if (!searchQuery.value) return chats.value
  const query = searchQuery.value.toLowerCase()
  return chats.value.filter(chat => 
    chat.user.nickname.toLowerCase().includes(query) ||
    chat.lastMessage.toLowerCase().includes(query)
  )
})

const goToChat = (id: string) => {
  router.push(`/chat/${id}`)
}

const goToNotifications = () => {
  router.push('/notifications')
}
</script>