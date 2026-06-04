<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
          <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 class="font-bold text-lg text-gray-800 dark:text-gray-200">消息通知</h1>
      </div>
    </header>

    <main class="pt-16 px-4 py-4 space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h3 class="font-medium text-gray-800 dark:text-gray-200">推送通知</h3>
        </div>
        <div 
          v-for="(item, index) in notificationItems" 
          :key="item.key"
          class="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div class="flex items-center gap-3">
            <div :class="`w-9 h-9 rounded-lg flex items-center justify-center ${item.bgClass}`">
              <component :is="item.icon" :class="`w-5 h-5 ${item.iconClass}`" />
            </div>
            <div>
              <span class="text-gray-800 dark:text-gray-200">{{ item.label }}</span>
              <p v-if="item.subtitle" class="text-xs text-gray-400 mt-0.5">{{ item.subtitle }}</p>
            </div>
          </div>
          <button 
            class="relative w-12 h-7 rounded-full transition-colors" 
            :class="item.enabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'"
            @click="toggleNotification(item.key)"
          >
            <span 
              class="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform" 
              :class="item.enabled ? 'left-6' : 'left-1'"
            ></span>
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h3 class="font-medium text-gray-800 dark:text-gray-200">消息类型</h3>
        </div>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <button 
            v-for="(item, index) in messageTypes" 
            :key="item.key"
            class="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
            @click="handleMessageTypeClick(item.key)"
          >
            <div :class="`w-9 h-9 rounded-lg flex items-center justify-center ${item.bgClass}`">
              <component :is="item.icon" :class="`w-5 h-5 ${item.iconClass}`" />
            </div>
            <div class="flex-1">
              <span class="text-gray-800 dark:text-gray-200">{{ item.label }}</span>
              <p class="text-xs text-gray-400 mt-0.5">{{ item.count }} 条未读</p>
            </div>
            <ChevronRight class="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h3 class="font-medium text-gray-800 dark:text-gray-200">通知设置</h3>
        </div>
        <div 
          v-for="(item, index) in settingsItems" 
          :key="item.key"
          class="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <span class="text-gray-800 dark:text-gray-200">{{ item.label }}</span>
          <button 
            class="relative w-12 h-7 rounded-full transition-colors" 
            :class="item.enabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'"
            @click="toggleSetting(item.key)"
          >
            <span 
              class="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform" 
              :class="item.enabled ? 'left-6' : 'left-1'"
            ></span>
          </button>
        </div>
      </div>
    </main>

    <BottomTabBar :active="'profile'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ArrowLeft,
  ChevronRight,
  Bell,
  MessageSquare,
  ShoppingBag,
  Heart,
  Gift,
  Megaphone,
} from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'

const notificationItems = ref([
  { key: 'push', icon: Bell, label: '推送通知', subtitle: '接收应用推送消息', enabled: true, bgClass: 'bg-primary-100 dark:bg-primary-500/20', iconClass: 'text-primary-600 dark:text-primary-400' },
  { key: 'sound', icon: Bell, label: '声音', subtitle: '通知声音提醒', enabled: true, bgClass: 'bg-blue-100 dark:bg-blue-500/20', iconClass: 'text-blue-600 dark:text-blue-400' },
  { key: 'vibration', icon: Bell, label: '振动', subtitle: '通知振动提醒', enabled: false, bgClass: 'bg-green-100 dark:bg-green-500/20', iconClass: 'text-green-600 dark:text-green-400' },
])

const messageTypes = ref([
  { key: 'chat', icon: MessageSquare, label: '聊天消息', count: 5, bgClass: 'bg-blue-100 dark:bg-blue-500/20', iconClass: 'text-blue-600 dark:text-blue-400' },
  { key: 'order', icon: ShoppingBag, label: '订单消息', count: 2, bgClass: 'bg-orange-100 dark:bg-orange-500/20', iconClass: 'text-orange-600 dark:text-orange-400' },
  { key: 'favorite', icon: Heart, label: '收藏动态', count: 0, bgClass: 'bg-pink-100 dark:bg-pink-500/20', iconClass: 'text-pink-600 dark:text-pink-400' },
  { key: 'gift', icon: Gift, label: '红包消息', count: 1, bgClass: 'bg-red-100 dark:bg-red-500/20', iconClass: 'text-red-600 dark:text-red-400' },
  { key: 'system', icon: Megaphone, label: '系统通知', count: 3, bgClass: 'bg-purple-100 dark:bg-purple-500/20', iconClass: 'text-purple-600 dark:text-purple-400' },
])

const settingsItems = ref([
  { key: 'night', label: '夜间免打扰', enabled: false },
  { key: 'preview', label: '显示消息预览', enabled: true },
])

const goBack = () => {
  window.history.back()
}

const toggleNotification = (key: string) => {
  const item = notificationItems.value.find(i => i.key === key)
  if (item) {
    item.enabled = !item.enabled
  }
}

const toggleSetting = (key: string) => {
  const item = settingsItems.value.find(i => i.key === key)
  if (item) {
    item.enabled = !item.enabled
  }
}

const handleMessageTypeClick = (key: string) => {
  console.log('Clicked:', key)
}
</script>