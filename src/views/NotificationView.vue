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
        <h1 class="font-bold text-gray-900 dark:text-white">系统通知</h1>
        <button 
          v-if="hasUnread"
          @click="markAllAsRead"
          class="text-sm text-primary-500"
        >
          全部已读
        </button>
        <div v-else class="w-10"></div>
      </div>
    </div>

    <div class="px-4 py-4 space-y-3">
      <div 
        v-for="notification in notifications" 
        :key="notification.id"
        class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card transition-all duration-300"
        :class="{ 'bg-blue-50 dark:bg-blue-900/20': !notification.isRead }"
      >
        <div class="flex items-start gap-3">
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            :class="getNotificationIconClass(notification.type)"
          >
            <Bell v-if="notification.type === 'system'" :size="20" class="text-white" />
            <ShoppingCart v-else-if="notification.type === 'trade'" :size="20" class="text-white" />
            <MessageCircle v-else :size="20" class="text-white" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="font-medium text-gray-900 dark:text-white">{{ notification.title }}</span>
              <span class="text-xs text-gray-400">{{ formatTime(notification.timestamp) }}</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ notification.content }}</p>
            <button 
              v-if="!notification.isRead"
              @click="markAsRead(notification.id)"
              class="text-xs text-primary-500 mt-2"
            >
              标记为已读
            </button>
          </div>
        </div>
      </div>

      <div v-if="notifications.length === 0" class="text-center py-12">
        <div class="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Bell :size="40" class="text-gray-300" />
        </div>
        <p class="text-gray-500 dark:text-gray-400">暂无通知</p>
      </div>
    </div>

    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeft, Bell, ShoppingCart, MessageCircle } from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const notifications = computed(() => userStore.notifications)

const hasUnread = computed(() => {
  return notifications.value.some(n => !n.isRead)
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

const getNotificationIconClass = (type: string) => {
  switch (type) {
    case 'system':
      return 'bg-gradient-to-br from-blue-500 to-blue-600'
    case 'trade':
      return 'bg-gradient-to-br from-green-500 to-green-600'
    case 'message':
      return 'bg-gradient-to-br from-primary-500 to-primary-600'
    default:
      return 'bg-gradient-to-br from-gray-500 to-gray-600'
  }
}

const markAsRead = (notificationId: string) => {
  userStore.markNotificationAsRead(notificationId)
}

const markAllAsRead = () => {
  userStore.markAllNotificationsAsRead()
}

const goBack = () => {
  window.history.back()
}
</script>
