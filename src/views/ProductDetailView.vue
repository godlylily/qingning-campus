<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
          <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <div class="flex items-center gap-2">
          <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="toggleFavorite">
            <Heart class="w-5 h-5" :class="isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'" />
          </button>
          <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Share2 class="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </header>

    <main class="pt-16" v-if="product">
      <div class="relative">
        <div class="flex overflow-x-auto scrollbar-hide" @scroll="handleImageScroll">
          <div 
            v-for="(image, index) in product.images" 
            :key="index"
            class="w-full flex-shrink-0"
          >
            <img 
              :src="image" 
              :alt="product.title" 
              class="w-full aspect-square object-cover"
            />
          </div>
        </div>
        <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          <span 
            v-for="(_, index) in product.images" 
            :key="index"
            class="w-1.5 h-1.5 rounded-full transition-all"
            :class="currentImageIndex === index ? 'bg-white w-4' : 'bg-white/60'"
          ></span>
        </div>
        <div class="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
          {{ product.condition }}
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 px-4 py-4 mt-1">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-bold text-red-500">¥{{ product.price }}</span>
              <span v-if="product.originalPrice" class="text-sm text-gray-400 line-through">¥{{ product.originalPrice }}</span>
            </div>
            <h1 class="text-lg font-medium text-gray-800 dark:text-gray-200 mt-2 leading-tight">{{ product.title }}</h1>
          </div>
          <div class="flex items-center gap-1 text-sm text-gray-500">
            <Eye class="w-4 h-4" />
            <span>{{ formatNumber(product.views) }}</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 mt-3">
          <span 
            v-for="tag in product.tags" 
            :key="tag"
            class="px-2 py-1 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs rounded-full"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 px-4 py-3 mt-2">
        <div class="flex items-center gap-3">
          <img 
            :src="product.seller.avatar" 
            :alt="product.seller.nickname" 
            class="w-12 h-12 rounded-full object-cover"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium text-gray-800 dark:text-gray-200">{{ product.seller.nickname }}</span>
              <span v-if="product.seller.isVerified" class="flex items-center gap-0.5 bg-primary-500/10 text-primary-500 text-xs px-1.5 py-0.5 rounded">
                <CheckCircle class="w-3 h-3" />
                已认证
              </span>
            </div>
            <p class="text-sm text-gray-500">{{ product.seller.school }} · {{ product.campus }}</p>
          </div>
          <button 
            class="px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium transition-all hover:bg-primary-600 active:scale-95"
            @click="goToChat"
          >
            联系卖家
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 px-4 py-4 mt-2">
        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <FileText class="w-5 h-5 text-gray-400" />
          商品详情
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ product.description }}</p>
      </div>

      <div class="bg-white dark:bg-gray-800 px-4 py-4 mt-2">
        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <MapPin class="w-5 h-5 text-gray-400" />
          交易地点
        </h3>
        <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin class="w-4 h-4 text-primary-500" />
          {{ product.campus }} - {{ product.seller.school }}
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 px-4 py-4 mt-2">
        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <Users class="w-5 h-5 text-gray-400" />
          感兴趣的人
        </h3>
        <div class="flex gap-3">
          <div 
            v-for="user in interestedUsers" 
            :key="user.id"
            class="flex flex-col items-center"
          >
            <img 
              :src="user.avatar" 
              :alt="user.nickname" 
              class="w-10 h-10 rounded-full object-cover"
            />
            <span class="text-xs text-gray-500 mt-1">{{ user.nickname }}</span>
          </div>
        </div>
        <p class="text-xs text-gray-400 mt-3">{{ product.wants }}人想要 · {{ product.likes }}人点赞</p>
      </div>

      <div class="bg-white dark:bg-gray-800 px-4 py-4 mt-2">
        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <MessageCircle class="w-5 h-5 text-gray-400" />
          相关推荐
        </h3>
        <div class="grid grid-cols-2 gap-3">
          <ProductCard 
            v-for="item in relatedProducts" 
            :key="item.id" 
            :product="item"
            @click="goToDetail(item.id)"
          />
        </div>
      </div>
    </main>

    <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3 safe-area-bottom">
      <button class="flex flex-col items-center gap-0.5 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
        <Heart class="w-5 h-5 text-gray-400" />
        <span class="text-xs text-gray-400">收藏</span>
      </button>
      <button class="flex flex-col items-center gap-0.5 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
        <Share2 class="w-5 h-5 text-gray-400" />
        <span class="text-xs text-gray-400">分享</span>
      </button>
      <button class="flex flex-col items-center gap-0.5 px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
        <Flag class="w-5 h-5 text-gray-400" />
        <span class="text-xs text-gray-400">举报</span>
      </button>
      <div class="flex-1 flex gap-2 ml-2">
        <button 
          class="flex-1 py-2.5 border-2 border-primary-500 text-primary-500 rounded-full text-sm font-medium transition-all hover:bg-primary-50 active:scale-95"
          @click="goToChat"
        >
          聊一聊
        </button>
        <button 
          class="flex-1 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-medium transition-all hover:opacity-90 active:scale-95"
          @click="buyNow"
        >
          我想要
        </button>
      </div>
    </div>

    <Transition name="scale">
      <div v-if="showLikedAnimation" class="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
        <div class="like-animation">
          <Heart class="w-20 h-20 text-red-500 fill-red-500" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import {
  ArrowLeft,
  Heart,
  Share2,
  Eye,
  CheckCircle,
  FileText,
  MapPin,
  Users,
  MessageCircle,
  Flag,
} from 'lucide-vue-next'
import ProductCard from '../components/ProductCard.vue'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()

const currentImageIndex = ref(0)
const isFavorite = ref(false)
const showLikedAnimation = ref(false)

const product = computed(() => {
  return productStore.products.find(p => p.id === route.params.id)
})

const interestedUsers = computed(() => {
  if (!product.value) return []
  return productStore.products
    .filter(p => p.id !== product.value?.id)
    .map(p => p.seller)
    .slice(0, 4)
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productStore.products
    .filter(p => p.category === product.value?.category && p.id !== product.value?.id)
    .slice(0, 4)
})

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

const handleImageScroll = (e: Event) => {
  const target = e.target as HTMLElement
  currentImageIndex.value = Math.round(target.scrollLeft / window.innerWidth)
}

const goBack = () => {
  router.back()
}

const toggleFavorite = () => {
  if (product.value) {
    isFavorite.value = !isFavorite.value
    productStore.toggleFavorite(product.value.id)
    
    showLikedAnimation.value = true
    setTimeout(() => {
      showLikedAnimation.value = false
    }, 600)
  }
}

const goToChat = () => {
  if (product.value) {
    router.push(`/chat/${product.value.id}`)
  }
}

const goToDetail = (id: string) => {
  router.push(`/product/${id}`)
}

const buyNow = () => {
  if (product.value) {
    goToChat()
  }
}

onMounted(() => {
  if (product.value) {
    productStore.incrementViews(product.value.id)
    isFavorite.value = productStore.favorites.includes(product.value.id)
  }
})
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>