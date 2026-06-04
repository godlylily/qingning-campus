<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
          <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 class="font-bold text-lg text-gray-800 dark:text-gray-200">我的钱包</h1>
      </div>
    </header>

    <main class="pt-16">
      <div class="bg-gradient-to-br from-primary-500 to-primary-600 px-4 pt-8 pb-12 rounded-b-3xl">
        <div class="text-center">
          <p class="text-white/80 text-sm">可用余额</p>
          <p class="text-4xl font-bold text-white mt-2">¥{{ balance }}</p>
          <div class="flex items-center justify-center gap-4 mt-4">
            <button class="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
              充值
            </button>
            <button class="px-6 py-2 bg-white text-primary-500 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
              提现
            </button>
          </div>
        </div>
      </div>

      <div class="px-4 -mt-6 space-y-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div class="grid grid-cols-3">
            <button class="flex flex-col items-center gap-2 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div class="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
                <CreditCard class="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span class="text-xs text-gray-600 dark:text-gray-400">优惠券</span>
              <span class="text-sm font-bold text-gray-800 dark:text-gray-200">3张</span>
            </button>
            <button class="flex flex-col items-center gap-2 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div class="w-10 h-10 bg-orange-100 dark:bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Gift class="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span class="text-xs text-gray-600 dark:text-gray-400">红包</span>
              <span class="text-sm font-bold text-gray-800 dark:text-gray-200">¥8.80</span>
            </button>
            <button class="flex flex-col items-center gap-2 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Ticket class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span class="text-xs text-gray-600 dark:text-gray-400">积分</span>
              <span class="text-sm font-bold text-gray-800 dark:text-gray-200">920分</span>
            </button>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <h3 class="font-medium text-gray-800 dark:text-gray-200">账单明细</h3>
          </div>
          <div class="divide-y divide-gray-100 dark:divide-gray-700">
            <div 
              v-for="record in transactions" 
              :key="record.id"
              class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <div :class="`w-10 h-10 rounded-xl flex items-center justify-center ${record.iconBg}`">
                <component :is="record.icon" :class="`w-5 h-5 ${record.iconColor}`" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ record.title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ record.time }}</p>
              </div>
              <span :class="record.type === 'income' ? 'text-green-500' : 'text-red-500'">
                {{ record.type === 'income' ? '+' : '-' }}¥{{ record.amount }}
              </span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div class="grid grid-cols-4">
            <button class="flex flex-col items-center gap-2 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <Banknote class="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <span class="text-xs text-gray-600 dark:text-gray-400">银行卡</span>
            </button>
            <button class="flex flex-col items-center gap-2 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <Receipt class="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <span class="text-xs text-gray-600 dark:text-gray-400">交易记录</span>
            </button>
            <button class="flex flex-col items-center gap-2 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <WalletIcon class="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <span class="text-xs text-gray-600 dark:text-gray-400">我的资产</span>
            </button>
            <button class="flex flex-col items-center gap-2 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                <Settings class="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </div>
              <span class="text-xs text-gray-600 dark:text-gray-400">支付设置</span>
            </button>
          </div>
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
  CreditCard,
  Gift,
  Ticket,
  Banknote,
  Receipt,
  Wallet as WalletIcon,
  Settings,
  ShoppingBag,
  TrendingUp,
} from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'

const balance = ref(1258.60)

const transactions = ref([
  { id: '1', title: '商品交易收入', time: '2024-01-15 14:30', amount: 2599, type: 'income', icon: TrendingUp, iconBg: 'bg-green-100 dark:bg-green-500/20', iconColor: 'text-green-600 dark:text-green-400' },
  { id: '2', title: '购买商品', time: '2024-01-15 10:20', amount: 128, type: 'expense', icon: ShoppingBag, iconBg: 'bg-red-100 dark:bg-red-500/20', iconColor: 'text-red-600 dark:text-red-400' },
  { id: '3', title: '红包奖励', time: '2024-01-14 20:00', amount: 8.80, type: 'income', icon: Gift, iconBg: 'bg-orange-100 dark:bg-orange-500/20', iconColor: 'text-orange-600 dark:text-orange-400' },
  { id: '4', title: '提现', time: '2024-01-13 16:45', amount: 500, type: 'expense', icon: Banknote, iconBg: 'bg-blue-100 dark:bg-blue-500/20', iconColor: 'text-blue-600 dark:text-blue-400' },
])

const goBack = () => {
  window.history.back()
}
</script>