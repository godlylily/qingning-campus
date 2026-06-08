<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800">
      <div class="px-4 py-3">
        <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
          <Search :size="18" class="text-gray-400" />
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="搜索商品、用户、话题..."
            class="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            autofocus
          />
          <button 
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center"
          >
            <X :size="14" class="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
      
      <div class="px-4 pb-3">
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <button 
            v-for="tag in hotTags" 
            :key="tag"
            @click="searchQuery = tag"
            class="flex-shrink-0 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <div class="px-4 py-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-gray-900 dark:text-white">搜索结果</h3>
        <span class="text-sm text-gray-500">{{ searchResults.length }}件商品</span>
      </div>
      
      <div v-if="searchResults.length > 0" class="grid grid-cols-2 gap-3">
        <ProductCard 
          v-for="product in searchResults" 
          :key="product.id" 
          :product="product"
          @click="goToDetail(product)"
        />
      </div>
      
      <div v-else class="text-center py-16">
        <div class="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <Search :size="40" class="text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">未找到相关商品</h3>
        <p class="text-gray-500 dark:text-gray-400">试试其他关键词吧</p>
      </div>
    </div>

    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, X } from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'
import ProductCard from '../components/ProductCard.vue'
import { useProductStore } from '../stores/productStore'

const productStore = useProductStore()

const searchQuery = ref('')

const hotTags = [
  '考研资料', '教材书籍', '数码产品', '宿舍神器', 
  '美妆护肤', '自行车', '游戏设备', '体育用品'
]

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) {
    return productStore.products.slice(0, 10)
  }
  const query = searchQuery.value.toLowerCase()
  return productStore.products.filter(p => 
    p.title.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  )
})

const goToDetail = (product: any) => {
  productStore.incrementViews(product.id)
  window.location.href = `/product/${product.id}`
}
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>