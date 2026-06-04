<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
          <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 class="font-bold text-lg text-gray-800 dark:text-gray-200">设置</h1>
      </div>
    </header>

    <main class="pt-16 px-4 py-4 space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
              <Moon class="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <span class="text-gray-800 dark:text-gray-200">夜间模式</span>
              <p class="text-xs text-gray-400 mt-0.5">跟随系统</p>
            </div>
          </div>
          <button 
            class="relative w-12 h-7 rounded-full transition-colors" 
            :class="darkMode ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'"
            @click="toggleDarkMode"
          >
            <span 
              class="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform" 
              :class="darkMode ? 'left-6' : 'left-1'"
            ></span>
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h3 class="font-medium text-gray-800 dark:text-gray-200">通用设置</h3>
        </div>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <button 
            v-for="item in generalItems" 
            :key="item.key"
            class="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
            @click="handleSettingClick(item.key)"
          >
            <div :class="`w-9 h-9 rounded-lg flex items-center justify-center ${item.bgClass}`">
              <component :is="item.icon" :class="`w-5 h-5 ${item.iconClass}`" />
            </div>
            <div class="flex-1">
              <span class="text-gray-800 dark:text-gray-200">{{ item.label }}</span>
              <p v-if="item.subtitle" class="text-xs text-gray-400 mt-0.5">{{ item.subtitle }}</p>
            </div>
            <ChevronRight class="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h3 class="font-medium text-gray-800 dark:text-gray-200">账号管理</h3>
        </div>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <button 
            v-for="item in accountItems" 
            :key="item.key"
            class="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
            @click="handleSettingClick(item.key)"
          >
            <div :class="`w-9 h-9 rounded-lg flex items-center justify-center ${item.bgClass}`">
              <component :is="item.icon" :class="`w-5 h-5 ${item.iconClass}`" />
            </div>
            <div class="flex-1">
              <span class="text-gray-800 dark:text-gray-200">{{ item.label }}</span>
            </div>
            <ChevronRight class="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h3 class="font-medium text-gray-800 dark:text-gray-200">其他</h3>
        </div>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <button 
            v-for="item in otherItems" 
            :key="item.key"
            class="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
            @click="handleSettingClick(item.key)"
          >
            <div :class="`w-9 h-9 rounded-lg flex items-center justify-center ${item.bgClass}`">
              <component :is="item.icon" :class="`w-5 h-5 ${item.iconClass}`" />
            </div>
            <div class="flex-1">
              <span class="text-gray-800 dark:text-gray-200">{{ item.label }}</span>
            </div>
            <ChevronRight class="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div class="text-center py-4">
        <p class="text-sm text-gray-400">青柠校园集市 v1.0.0</p>
        <p class="text-xs text-gray-400 mt-1">让校园生活更美好</p>
      </div>
    </main>

    <BottomTabBar :active="'profile'" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  ArrowLeft,
  ChevronRight,
  Moon,
  Globe,
  Bell,
  Palette,
  Shield,
  User,
  CreditCard,
  Cloud,
  HelpCircle,
  Info,
} from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const darkMode = computed(() => userStore.darkMode)

const generalItems = [
  { key: 'language', icon: Globe, label: '语言', subtitle: '简体中文', bgClass: 'bg-blue-100 dark:bg-blue-500/20', iconClass: 'text-blue-600 dark:text-blue-400' },
  { key: 'notifications', icon: Bell, label: '消息通知', bgClass: 'bg-green-100 dark:bg-green-500/20', iconClass: 'text-green-600 dark:text-green-400' },
  { key: 'theme', icon: Palette, label: '主题', bgClass: 'bg-purple-100 dark:bg-purple-500/20', iconClass: 'text-purple-600 dark:text-purple-400' },
]

const accountItems = [
  { key: 'profile', icon: User, label: '编辑资料', bgClass: 'bg-primary-100 dark:bg-primary-500/20', iconClass: 'text-primary-600 dark:text-primary-400' },
  { key: 'security', icon: Shield, label: '账号安全', bgClass: 'bg-red-100 dark:bg-red-500/20', iconClass: 'text-red-600 dark:text-red-400' },
  { key: 'payment', icon: CreditCard, label: '支付设置', bgClass: 'bg-orange-100 dark:bg-orange-500/20', iconClass: 'text-orange-600 dark:text-orange-400' },
]

const otherItems = [
  { key: 'storage', icon: Cloud, label: '存储空间', bgClass: 'bg-cyan-100 dark:bg-cyan-500/20', iconClass: 'text-cyan-600 dark:text-cyan-400' },
  { key: 'help', icon: HelpCircle, label: '帮助与反馈', bgClass: 'bg-pink-100 dark:bg-pink-500/20', iconClass: 'text-pink-600 dark:text-pink-400' },
  { key: 'about', icon: Info, label: '关于我们', bgClass: 'bg-gray-100 dark:bg-gray-500/20', iconClass: 'text-gray-600 dark:text-gray-400' },
]

const goBack = () => {
  window.history.back()
}

const toggleDarkMode = () => {
  userStore.toggleDarkMode()
}

const handleSettingClick = (key: string) => {
  console.log('Clicked:', key)
}
</script>