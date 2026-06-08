<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="sticky top-0 z-50 bg-gradient-to-r from-green-500 to-emerald-500">
      <div class="flex items-center px-4 py-4">
        <button @click="goBack" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft :size="20" class="text-white" />
        </button>
        <h1 class="font-bold text-white text-lg ml-4">我的钱包</h1>
      </div>
    </div>

    <div class="px-4 py-4 space-y-4">
      <div class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 shadow-card">
        <div class="text-white/80 text-sm mb-2">账户余额</div>
        <div class="text-white text-4xl font-bold mb-4">¥ 1,280.00</div>
        <div class="flex gap-3">
          <button class="flex-1 py-3 bg-white/20 text-white rounded-xl font-medium">
            充值
          </button>
          <button class="flex-1 py-3 bg-white/20 text-white rounded-xl font-medium">
            提现
          </button>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-3">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card text-center">
          <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">¥ 5,680</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">总收入</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card text-center">
          <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">¥ 4,400</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">总支出</div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card text-center">
          <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">12</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">交易次数</div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">交易记录</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <ArrowDownLeft :size="20" class="text-green-500" />
              </div>
              <div>
                <div class="text-gray-900 dark:text-white">出售商品收入</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">2024-01-15 14:30</div>
              </div>
            </div>
            <div class="text-green-500 font-medium">+ ¥ 280.00</div>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <ArrowUpRight :size="20" class="text-red-500" />
              </div>
              <div>
                <div class="text-gray-900 dark:text-white">购买商品支出</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">2024-01-14 10:20</div>
              </div>
            </div>
            <div class="text-red-500 font-medium">- ¥ 150.00</div>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <ArrowDownLeft :size="20" class="text-green-500" />
              </div>
              <div>
                <div class="text-gray-900 dark:text-white">充值成功</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">2024-01-13 09:00</div>
              </div>
            </div>
            <div class="text-green-500 font-medium">+ ¥ 500.00</div>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <ArrowUpRight :size="20" class="text-red-500" />
              </div>
              <div>
                <div class="text-gray-900 dark:text-white">提现成功</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">2024-01-12 16:45</div>
              </div>
            </div>
            <div class="text-red-500 font-medium">- ¥ 300.00</div>
          </div>
        </div>
      </div>
    </div>

    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowDownLeft, ArrowUpRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import BottomTabBar from '../components/BottomTabBar.vue'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>