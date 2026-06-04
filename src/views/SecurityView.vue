<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
          <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 class="font-bold text-lg text-gray-800 dark:text-gray-200">账号与安全</h1>
      </div>
    </header>

    <main class="pt-16 px-4 py-4 space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div 
          v-for="(item, index) in securityItems" 
          :key="item.key"
          class="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0"
          @click="handleItemClick(item.key)"
        >
          <div :class="`w-9 h-9 rounded-lg flex items-center justify-center ${item.bgClass}`">
            <component :is="item.icon" :class="`w-5 h-5 ${item.iconClass}`" />
          </div>
          <div class="flex-1">
            <span class="text-gray-800 dark:text-gray-200">{{ item.label }}</span>
            <p v-if="item.subtitle" class="text-xs text-gray-400 mt-0.5">{{ item.subtitle }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="item.status" :class="item.status === '已绑定' ? 'text-green-500' : 'text-orange-500'" class="text-sm">
              {{ item.status }}
            </span>
            <ChevronRight class="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div 
          v-for="(item, index) in settingsItems" 
          :key="item.key"
          class="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0"
          @click="handleItemClick(item.key)"
        >
          <div :class="`w-9 h-9 rounded-lg flex items-center justify-center ${item.bgClass}`">
            <component :is="item.icon" :class="`w-5 h-5 ${item.iconClass}`" />
          </div>
          <div class="flex-1">
            <span class="text-gray-800 dark:text-gray-200">{{ item.label }}</span>
          </div>
          <ChevronRight class="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div class="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <AlertTriangle class="w-5 h-5 text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-white font-medium">账号安全提醒</h3>
            <p class="text-white/80 text-sm">请定期检查账号安全设置，保护您的账号安全</p>
          </div>
        </div>
      </div>
    </main>

    <BottomTabBar :active="'profile'" />
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeft,
  ChevronRight,
  AlertTriangle,
  Lock,
  Smartphone,
  Mail,
  Fingerprint,
  Shield,
  Eye,
  Key,
  AlertCircle,
} from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'

const securityItems = [
  { key: 'password', icon: Lock, label: '修改密码', subtitle: '建议定期更换密码', bgClass: 'bg-red-100 dark:bg-red-500/20', iconClass: 'text-red-600 dark:text-red-400' },
  { key: 'phone', icon: Smartphone, label: '绑定手机', status: '已绑定', bgClass: 'bg-blue-100 dark:bg-blue-500/20', iconClass: 'text-blue-600 dark:text-blue-400' },
  { key: 'email', icon: Mail, label: '绑定邮箱', status: '已绑定', bgClass: 'bg-green-100 dark:bg-green-500/20', iconClass: 'text-green-600 dark:text-green-400' },
  { key: 'fingerprint', icon: Fingerprint, label: '指纹登录', status: '未设置', bgClass: 'bg-purple-100 dark:bg-purple-500/20', iconClass: 'text-purple-600 dark:text-purple-400' },
]

const settingsItems = [
  { key: 'devices', icon: Shield, label: '登录设备管理', bgClass: 'bg-cyan-100 dark:bg-cyan-500/20', iconClass: 'text-cyan-600 dark:text-cyan-400' },
  { key: 'privacy', icon: Eye, label: '隐私设置', bgClass: 'bg-pink-100 dark:bg-pink-500/20', iconClass: 'text-pink-600 dark:text-pink-400' },
  { key: 'authorization', icon: Key, label: '第三方授权', bgClass: 'bg-yellow-100 dark:bg-yellow-500/20', iconClass: 'text-yellow-600 dark:text-yellow-400' },
  { key: 'risk', icon: AlertCircle, label: '风险检测', bgClass: 'bg-orange-100 dark:bg-orange-500/20', iconClass: 'text-orange-600 dark:text-orange-400' },
]

const goBack = () => {
  window.history.back()
}

const handleItemClick = (key: string) => {
  console.log('Clicked:', key)
}
</script>