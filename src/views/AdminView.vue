<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-500 to-primary-600">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button class="p-2 rounded-full hover:bg-white/20 transition-colors">
            <ArrowLeft class="w-5 h-5 text-white" />
          </button>
          <h1 class="font-bold text-lg text-white">管理后台</h1>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <User class="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>

    <main class="pt-16 px-4 py-4">
      <div class="grid grid-cols-2 gap-3 mb-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-2xl font-bold text-primary-500">1,234</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">用户总数</p>
            </div>
            <div class="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-xl flex items-center justify-center">
              <Users class="w-6 h-6 text-primary-500" />
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-2xl font-bold text-orange-500">567</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">商品总数</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 dark:bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Package class="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-2xl font-bold text-blue-500">89</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">待审核</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Clock class="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-2xl font-bold text-purple-500">¥12,345</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">交易额</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
              <DollarSign class="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-4">
        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <BarChart3 class="w-5 h-5 text-gray-400" />
          数据统计
        </h3>
        <div class="space-y-4">
          <div>
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-500 dark:text-gray-400">用户增长</span>
              <span class="text-primary-500">+12.5%</span>
            </div>
            <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" style="width: 75%"></div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-500 dark:text-gray-400">商品增长</span>
              <span class="text-green-500">+8.3%</span>
            </div>
            <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style="width: 62%"></div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="text-gray-500 dark:text-gray-400">订单增长</span>
              <span class="text-orange-500">+15.7%</span>
            </div>
            <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" style="width: 88%"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm mb-4">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <ClipboardList class="w-5 h-5 text-gray-400" />
            待审核商品
          </h3>
          <button class="text-sm text-primary-500">查看全部</button>
        </div>
        <div class="space-y-3">
          <div 
            v-for="product in pendingProducts" 
            :key="product.id"
            class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <img :src="product.images[0]" :alt="product.title" class="w-16 h-16 rounded-lg object-cover" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{{ product.title }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">¥{{ product.price }}</p>
            </div>
            <div class="flex gap-2">
              <button class="px-3 py-1.5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg text-xs font-medium">
                通过
              </button>
              <button class="px-3 py-1.5 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-xs font-medium">
                拒绝
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-gray-400" />
            举报列表
          </h3>
          <button class="text-sm text-primary-500">查看全部</button>
        </div>
        <div class="space-y-3">
          <div 
            v-for="report in reports" 
            :key="report.id"
            class="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-500/10 rounded-xl"
          >
            <div class="w-10 h-10 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle class="w-5 h-5 text-red-500" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{{ report.content }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">用户举报</p>
            </div>
            <button class="px-3 py-1.5 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium">
              处理
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ArrowLeft,
  User,
  Users,
  Package,
  Clock,
  DollarSign,
  BarChart3,
  ClipboardList,
  AlertTriangle,
} from 'lucide-vue-next'

const pendingProducts = ref([
  { id: '1', title: 'iPhone 14 Pro Max', price: 5999, images: ['https://neeko-copilot.bytedance.net/api/text_to_image?prompt=iPhone%2014%20Pro%20Max%20smartphone&image_size=square'] },
  { id: '2', title: 'MacBook Pro 14寸', price: 12999, images: ['https://neeko-copilot.bytedance.net/api/text_to_image?prompt=MacBook%20Pro%2014%20inch%20laptop&image_size=square'] },
  { id: '3', title: 'AirPods Pro 2', price: 1899, images: ['https://neeko-copilot.bytedance.net/api/text_to_image?prompt=AirPods%20Pro%202%20earbuds&image_size=square'] },
])

const reports = ref([
  { id: '1', content: '该商品涉嫌虚假宣传，图片与实物不符' },
  { id: '2', content: '卖家态度恶劣，拒绝沟通' },
])
</script>