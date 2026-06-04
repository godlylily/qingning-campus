<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 safe-area-bottom">
    <div class="max-w-lg mx-auto flex items-center justify-around py-2">
      <button 
        v-for="item in tabs" 
        :key="item.key"
        class="flex flex-col items-center gap-1 px-4 py-1.5 transition-all duration-300"
        :class="active === item.key ? 'text-primary-500' : 'text-gray-400'"
        @click="navigate(item.key)"
      >
        <div class="relative">
          <component 
            :is="item.icon" 
            class="w-6 h-6 transition-transform duration-300" 
            :class="active === item.key ? 'scale-110' : ''"
          />
          <span 
            v-if="item.badge" 
            class="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
          >
            {{ item.badge }}
          </span>
        </div>
        <span class="text-xs font-medium">{{ item.label }}</span>
        <span 
          v-if="active === item.key" 
          class="absolute bottom-0 w-8 h-0.5 bg-primary-500 rounded-full"
        ></span>
      </button>
      <button 
        class="absolute -top-4 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        @click="goToPublish"
      >
        <Plus class="w-6 h-6 text-white" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  Home,
  Search,
  Plus,
  MessageCircle,
  User,
} from 'lucide-vue-next'

defineProps<{
  active: string
}>()

const router = useRouter()

const tabs = [
  { key: 'home', icon: Home, label: '首页' },
  { key: 'search', icon: Search, label: '发现' },
  { key: 'chat', icon: MessageCircle, label: '消息', badge: '3' },
  { key: 'profile', icon: User, label: '我的' },
]

const navigate = (key: string) => {
  const routes: Record<string, string> = {
    home: '/',
    search: '/search',
    chat: '/chat',
    profile: '/profile',
  }
  router.push(routes[key] || '/')
}

const goToPublish = () => {
  router.push('/publish')
}
</script>