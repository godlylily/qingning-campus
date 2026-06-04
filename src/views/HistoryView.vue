<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
            <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 class="font-bold text-lg text-gray-800 dark:text-gray-200">浏览历史</h1>
        </div>
        <button 
          v-if="history.length > 0"
          class="text-sm text-primary-500 hover:text-primary-600 transition-colors"
          @click="clearHistory"
        >
          清空
        </button>
      </div>
    </header>

    <main class="pt-16 px-4 py-4">
      <div v-if="history.length > 0" class="grid grid-cols-2 gap-3">
        <ProductCard 
          v-for="product in history" 
          :key="product.id" 
          :product="product"
          @click="goToDetail(product.id)"
        />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-20">
        <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Clock class="w-10 h-10 text-gray-400" />
        </div>
        <p class="text-gray-500 dark:text-gray-400">暂无浏览记录</p>
        <p class="text-sm text-gray-400 mt-1">去逛逛，发现心仪的商品吧</p>
      </div>
    </main>

    <BottomTabBar :active="'profile'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowLeft,
  Clock,
} from 'lucide-vue-next'
import ProductCard from '../components/ProductCard.vue'
import BottomTabBar from '../components/BottomTabBar.vue'
import { products } from '../data/mockData'

const router = useRouter()

const history = ref([products[4], products[5], products[6], products[7]])

const goBack = () => {
  window.history.back()
}

const goToDetail = (id: string) => {
  router.push(`/product/${id}`)
}

const clearHistory = () => {
  history.value = []
}
</script>