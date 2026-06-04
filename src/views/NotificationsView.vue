<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
          <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 class="font-bold text-lg text-gray-800 dark:text-gray-200">系统通知</h1>
      </div>
    </header>

    <main class="pt-16 px-4 py-4">
      <div class="space-y-3">
        <div 
          v-for="notification in notifications" 
          :key="notification.id"
          class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
        >
          <div class="flex items-start gap-3">
            <div :class="`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${notification.iconBg}`">
              <component :is="notification.icon" :class="`w-5 h-5 ${notification.iconColor}`" />
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-800 dark:text-gray-200">{{ notification.title }}</span>
                <span class="text-xs text-gray-400">{{ notification.time }}</span>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ notification.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="notifications.length === 0" class="flex flex-col items-center justify-center py-20">
        <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Bell class="w-10 h-10 text-gray-400" />
        </div>
        <p class="text-gray-500 dark:text-gray-400">暂无系统通知</p>
      </div>
    </main>

    <BottomTabBar :active="'chat'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ArrowLeft,
  Bell,
  Gift,
  ShoppingBag,
  CheckCircle,
  AlertCircle,
} from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'

const notifications = ref([
  { id: '1', icon: Gift, title: '新人礼包', content: '恭喜您成为青柠校园用户，获得10元新人红包！', time: '5分钟前', iconBg: 'bg-red-100 dark:bg-red-500/20', iconColor: 'text-red-600 dark:text-red-400' },
  { id: '2', icon: ShoppingBag, title: '订单发货', content: '您购买的商品已发货，快递单号：SF1234567890', time: '30分钟前', iconBg: 'bg-orange-100 dark:bg-orange-500/20', iconColor: 'text-orange-600 dark:text-orange-400' },
  { id: '3', icon: CheckCircle, title: '商品审核通过', content: '您发布的商品已通过审核，正在展示中', time: '1小时前', iconBg: 'bg-green-100 dark:bg-green-500/20', iconColor: 'text-green-600 dark:text-green-400' },
  { id: '4', icon: AlertCircle, title: '交易提醒', content: '您的交易已完成，请及时评价卖家', time: '2小时前', iconBg: 'bg-yellow-100 dark:bg-yellow-500/20', iconColor: 'text-yellow-600 dark:text-yellow-400' },
  { id: '5', icon: Bell, title: '平台公告', content: '青柠校园新版本上线，新增校园跑腿功能', time: '1天前', iconBg: 'bg-blue-100 dark:bg-blue-500/20', iconColor: 'text-blue-600 dark:text-blue-400' },
])

const goBack = () => {
  window.history.back()
}
</script>