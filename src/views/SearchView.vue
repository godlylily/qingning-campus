<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3">
        <div class="flex items-center gap-3">
          <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
            <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div class="flex-1">
            <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
              <Search class="w-4 h-4 text-gray-400" />
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="搜索商品、用户、话题..." 
                class="flex-1 bg-transparent text-sm outline-none text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
                @keyup.enter="handleSearch"
              />
              <button v-if="searchQuery" class="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors" @click="clearSearch">
                <X class="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="pt-16 px-4 py-4">
      <div v-if="searchQuery" class="space-y-6">
        <div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">搜索结果</h3>
          <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 gap-3">
            <ProductCard 
              v-for="product in filteredProducts" 
              :key="product.id" 
              :product="product"
              @click="goToDetail(product.id)"
            />
          </div>
          <div v-else class="flex flex-col items-center justify-center py-16">
            <div class="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Search class="w-10 h-10 text-gray-400" />
            </div>
            <p class="text-gray-500 dark:text-gray-400">未找到相关商品</p>
            <p class="text-sm text-gray-400 mt-1">试试其他关键词</p>
          </div>
        </div>
      </div>

      <div v-else class="space-y-6">
        <div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">热门搜索</h3>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="keyword in hotKeywords" 
              :key="keyword"
              class="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400 shadow-sm hover:shadow-md transition-shadow"
              @click="searchQuery = keyword"
            >
              {{ keyword }}
            </button>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">搜索历史</h3>
          <div v-if="searchHistory.length > 0" class="flex flex-wrap gap-2">
            <button 
              v-for="(item, index) in searchHistory" 
              :key="index"
              class="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              @click="searchQuery = item"
            >
              <History class="w-3 h-3" />
              {{ item }}
            </button>
          </div>
          <div v-else class="text-center py-4">
            <p class="text-gray-400 text-sm">暂无搜索历史</p>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">推荐商品</h3>
          <div class="grid grid-cols-2 gap-3">
            <ProductCard 
              v-for="product in recommendProducts" 
              :key="product.id" 
              :product="product"
              @click="goToDetail(product.id)"
            />
          </div>
        </div>
      </div>
    </main>

    <BottomTabBar :active="'home'" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import {
  ArrowLeft,
  Search,
  X,
  History,
} from 'lucide-vue-next'
import ProductCard from '../components/ProductCard.vue'
import BottomTabBar from '../components/BottomTabBar.vue'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()

const searchQuery = ref('')
const searchHistory = ref<string[]>(['考研资料', '二手手机', '教材书籍', '宿舍神器'])

const hotKeywords = [
  '考研资料', '二手手机', '教材书籍', '宿舍神器', '数码产品',
  '美妆护肤', '衣服鞋子', '自行车', '乐器', '体育用品'
]

const filteredProducts = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  return productStore.products.filter(product => 
    product.title.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.tags.some(tag => tag.toLowerCase().includes(query))
  )
})

const recommendProducts = computed(() => {
  return [...productStore.products].sort(() => Math.random() - 0.5).slice(0, 4)
})

const goBack = () => {
  router.back()
}

const handleSearch = () => {
  if (searchQuery.value.trim() && !searchHistory.value.includes(searchQuery.value)) {
    searchHistory.value.unshift(searchQuery.value)
    if (searchHistory.value.length > 10) {
      searchHistory.value.pop()
    }
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}

const goToDetail = (id: string) => {
  router.push(`/product/${id}`)
}

onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q as string
  }
})
</script>