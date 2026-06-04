<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
          <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 class="font-bold text-lg text-gray-800 dark:text-gray-200">我的收藏</h1>
      </div>
    </header>

    <main class="pt-16 px-4 py-4">
      <div v-if="favorites.length > 0" class="grid grid-cols-2 gap-3">
        <ProductCard 
          v-for="product in favorites" 
          :key="product.id" 
          :product="product"
          @click="goToDetail(product.id)"
        />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-20">
        <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Heart class="w-10 h-10 text-gray-400" />
        </div>
        <p class="text-gray-500 dark:text-gray-400">暂无收藏</p>
        <p class="text-sm text-gray-400 mt-1">去逛逛，收藏心仪的商品吧</p>
      </div>
    </main>

    <BottomTabBar :active="'profile'" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import {
  ArrowLeft,
  Heart,
} from 'lucide-vue-next'
import ProductCard from '../components/ProductCard.vue'
import BottomTabBar from '../components/BottomTabBar.vue'

const router = useRouter()
const productStore = useProductStore()

const favorites = computed(() => {
  return productStore.products.filter(product => product.isCollected)
})

const goBack = () => {
  window.history.back()
}

const goToDetail = (id: string) => {
  router.push(`/product/${id}`)
}
</script>