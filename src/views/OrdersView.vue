<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
          <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 class="font-bold text-lg text-gray-800 dark:text-gray-200">我的订单</h1>
      </div>
    </header>

    <main class="pt-16">
      <div class="flex border-b border-gray-200 dark:border-gray-700">
        <button 
          v-for="tab in tabs" 
          :key="tab.key"
          class="flex-1 py-3 text-sm font-medium transition-colors relative" 
          :class="activeTab === tab.key ? 'text-primary-500' : 'text-gray-500 dark:text-gray-400'"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
          <span 
            v-if="activeTab === tab.key" 
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary-500 rounded-full"
          ></span>
        </button>
      </div>

      <div class="px-4 py-4">
        <div v-if="orders.length > 0" class="space-y-4">
          <div 
            v-for="order in orders" 
            :key="order.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
          >
            <div class="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700/50">
              <span class="text-sm text-gray-500 dark:text-gray-400">订单号：{{ order.id }}</span>
              <span :class="getStatusClass(order.status)">{{ order.status }}</span>
            </div>
            <div class="flex gap-3 p-4">
              <img :src="order.product.images[0]" :alt="order.product.title" class="w-20 h-20 rounded-lg object-cover" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{{ order.product.title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">成色：{{ order.product.condition }}</p>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-primary-500 font-bold">¥{{ order.price }}</span>
                  <span class="text-xs text-gray-400">x{{ order.quantity }}</span>
                </div>
              </div>
            </div>
            <div class="flex justify-end gap-2 px-4 pb-4">
              <button 
                v-if="order.status === '待付款'"
                class="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                立即付款
              </button>
              <button 
                v-if="order.status === '待发货'"
                class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                联系卖家
              </button>
              <button 
                v-if="order.status === '待收货'"
                class="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                确认收货
              </button>
              <button 
                v-if="order.status === '已完成'"
                class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                查看评价
              </button>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center py-20">
          <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <Package class="w-10 h-10 text-gray-400" />
          </div>
          <p class="text-gray-500 dark:text-gray-400">暂无订单</p>
          <p class="text-sm text-gray-400 mt-1">去逛逛，发现心仪的商品吧</p>
        </div>
      </div>
    </main>

    <BottomTabBar :active="'profile'" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  ArrowLeft,
  Package,
} from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'
import { products } from '../data/mockData'

const activeTab = ref('all')

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待付款' },
  { key: 'shipped', label: '待发货' },
  { key: 'received', label: '待收货' },
  { key: 'completed', label: '已完成' },
]

const orders = ref([
  { id: '20240115001', product: products[0], price: 128, quantity: 1, status: '待付款' },
  { id: '20240115002', product: products[1], price: 2599, quantity: 1, status: '待发货' },
  { id: '20240115003', product: products[2], price: 68, quantity: 1, status: '待收货' },
  { id: '20240115004', product: products[3], price: 199, quantity: 1, status: '已完成' },
])

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orders.value
  const statusMap: Record<string, string> = {
    pending: '待付款',
    shipped: '待发货',
    received: '待收货',
    completed: '已完成',
  }
  return orders.value.filter(order => order.status === statusMap[activeTab.value])
})

const getStatusClass = (status: string) => {
  const classMap: Record<string, string> = {
    '待付款': 'text-orange-500',
    '待发货': 'text-blue-500',
    '待收货': 'text-green-500',
    '已完成': 'text-gray-400',
  }
  return classMap[status] || 'text-gray-400'
}

const goBack = () => {
  window.history.back()
}
</script>