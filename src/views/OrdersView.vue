<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="sticky top-0 z-50 bg-gradient-to-r from-green-500 to-emerald-500">
      <div class="flex items-center px-4 py-4">
        <button @click="goBack" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft :size="20" class="text-white" />
        </button>
        <h1 class="font-bold text-white text-lg ml-4">我的订单</h1>
      </div>
    </div>

    <div class="px-4 py-4">
      <div class="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button 
          v-for="tab in tabs" 
          :key="tab.key"
          @click="currentTab = tab.key"
          :class="currentTab === tab.key ? 'bg-green-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'"
          class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="space-y-4">
        <div 
          v-for="order in filteredOrders" 
          :key="order.id"
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden"
        >
          <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">订单号: {{ order.id }}</span>
            <span :class="['text-sm font-medium', getStatusColor(order.status)]">{{ getStatusText(order.status) }}</span>
          </div>
          
          <div class="p-4">
            <div class="flex gap-3">
              <img :src="order.image" :alt="order.productName" class="w-20 h-20 rounded-xl object-cover" />
              <div class="flex-1">
                <div class="font-medium text-gray-900 dark:text-white mb-1">{{ order.productName }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ order.seller }}</div>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-bold text-green-500">¥ {{ order.price }}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">x1</span>
                </div>
              </div>
            </div>
          </div>

          <div class="px-4 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2">
            <button class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg text-sm">
              查看详情
            </button>
            <button 
              v-if="order.status === 'pending'"
              class="px-4 py-2 bg-green-500 text-white rounded-lg text-sm"
            >
              确认收货
            </button>
            <button 
              v-if="order.status === 'completed'"
              class="px-4 py-2 border border-green-500 text-green-500 rounded-lg text-sm"
            >
              再次购买
            </button>
          </div>
        </div>
      </div>
    </div>

    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { p } from '../data/mockData'
import BottomTabBar from '../components/BottomTabBar.vue'

const router = useRouter()
const currentTab = ref('all')

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待付款' },
  { key: 'paid', label: '待发货' },
  { key: 'shipped', label: '待收货' },
  { key: 'completed', label: '已完成' },
]

const orders = ref([
  {
    id: '20240115001',
    productName: '考研英语真题全套',
    image: p('考研资料'),
    seller: '上岸学姐',
    price: '89.00',
    status: 'shipped',
    date: '2024-01-15'
  },
  {
    id: '20240114002',
    productName: '无线蓝牙耳机',
    image: p('耳机'),
    seller: '数码达人',
    price: '159.00',
    status: 'completed',
    date: '2024-01-14'
  },
  {
    id: '20240113003',
    productName: '台灯一个',
    image: p('台灯'),
    seller: '热心同学',
    price: '45.00',
    status: 'pending',
    date: '2024-01-13'
  },
  {
    id: '20240112004',
    productName: '笔记本电脑包',
    image: p('包包'),
    seller: '大四学长',
    price: '68.00',
    status: 'paid',
    date: '2024-01-12'
  },
])

const filteredOrders = computed(() => {
  if (currentTab.value === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === currentTab.value)
})

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: '待付款',
    paid: '待发货',
    shipped: '待收货',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status] || status
}

const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    pending: 'text-orange-500',
    paid: 'text-blue-500',
    shipped: 'text-green-500',
    completed: 'text-gray-500',
    cancelled: 'text-red-500'
  }
  return colorMap[status] || 'text-gray-500'
}

const goBack = () => {
  router.back()
}
</script>