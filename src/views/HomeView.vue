<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
      :class="scrolled ? 'bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm' : 'bg-gradient-to-b from-primary-500 to-primary-600'"
    >
      <div class="max-w-lg mx-auto px-4 py-3">
        <div class="flex items-center gap-3">
          <div class="flex-1">
            <div class="flex items-center gap-2 bg-white/90 dark:bg-gray-700 rounded-full px-4 py-2 shadow-sm">
              <Search class="w-4 h-4 text-gray-400" />
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="搜索商品、用户、话题..." 
                class="flex-1 bg-transparent text-sm outline-none text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
                @keyup.enter="handleSearch"
              />
            </div>
          </div>
          <button class="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
            <Bell class="w-5 h-5 text-white" />
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>

    <main class="pt-20">
      <div class="relative overflow-hidden">
        <div class="flex transition-transform duration-500 ease-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div 
            v-for="banner in banners" 
            :key="banner.id"
            class="w-full flex-shrink-0 px-4"
          >
            <div 
              class="relative rounded-2xl overflow-hidden h-32 sm:h-40" 
              :class="`bg-gradient-to-br ${banner.gradient}`"
            >
              <div class="absolute inset-0 flex items-center justify-between p-4">
                <div>
                  <div class="inline-block bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full mb-2">
                    {{ banner.tag }}
                  </div>
                  <h3 class="text-white font-bold text-lg sm:text-xl">{{ banner.title }}</h3>
                  <p class="text-white/80 text-sm">{{ banner.subtitle }}</p>
                </div>
                <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Zap class="w-8 h-8 text-white" />
                </div>
              </div>
              <div v-if="banner.badge" class="absolute top-3 right-3">
                <span class="inline-flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  <Sparkles class="w-3 h-3" />
                  {{ banner.badge }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center gap-2 mt-3">
          <span 
            v-for="(_, index) in banners" 
            :key="index"
            class="w-2 h-2 rounded-full transition-all duration-300" 
            :class="currentSlide === index ? 'bg-primary-500 w-6' : 'bg-gray-300 dark:bg-gray-600'"
          ></span>
        </div>
      </div>

      <div class="px-4 mt-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <AlertCircle class="w-4 h-4 text-white" />
              </div>
              <span class="font-medium text-gray-800 dark:text-gray-200">校园公告</span>
            </div>
            <button class="text-xs text-primary-500 flex items-center gap-1">
              更多 <ChevronRight class="w-4 h-4" />
            </button>
          </div>
          <div class="space-y-2">
            <div 
              v-for="announcement in announcements" 
              :key="announcement.id"
              class="flex items-start gap-2 text-sm"
            >
              <span 
                class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                :class="announcement.priority === 'high' ? 'bg-red-500' : 'bg-primary-500'"
              ></span>
              <div class="flex-1 min-w-0">
                <p class="text-gray-800 dark:text-gray-200 truncate">{{ announcement.title }}</p>
                <p class="text-gray-400 text-xs mt-0.5">{{ announcement.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 mt-4">
        <div class="flex items-center justify-between mb-3">
          <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200">分类导航</h2>
          <button class="text-sm text-primary-500">查看全部</button>
        </div>
        <div class="grid grid-cols-5 gap-3">
          <button 
            v-for="category in categories" 
            :key="category.id"
            class="flex flex-col items-center gap-2 p-2 rounded-xl transition-transform hover:scale-105 active:scale-95"
            @click="goToSearch(category.name)"
          >
            <div :class="`w-12 h-12 rounded-xl flex items-center justify-center ${category.color}`">
              <component :is="getIcon(category.icon)" class="w-6 h-6" />
            </div>
            <span class="text-xs text-gray-600 dark:text-gray-400">{{ category.name }}</span>
          </button>
        </div>
      </div>

      <div class="px-4 mt-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <Flame class="w-5 h-5 text-orange-500" />
            <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200">热门推荐</h2>
          </div>
          <button class="text-sm text-primary-500 flex items-center gap-1">
            更多 <ChevronRight class="w-4 h-4" />
          </button>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <ProductCard 
            v-for="product in hotProducts" 
            :key="product.id" 
            :product="product"
            @click="goToDetail(product.id)"
          />
        </div>
      </div>

      <div class="px-4 mt-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <TrendingUp class="w-5 h-5 text-red-500" />
            <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200">校园热榜</h2>
          </div>
          <button class="text-sm text-primary-500 flex items-center gap-1">
            完整榜单 <ChevronRight class="w-4 h-4" />
          </button>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div 
            v-for="(item, index) in hotList" 
            :key="index"
            class="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
          >
            <span 
              class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              :class="index < 3 ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'"
            >
              {{ index + 1 }}
            </span>
            <div class="flex-1 min-w-0">
              <p class="text-gray-800 dark:text-gray-200 text-sm truncate">{{ item.title }}</p>
              <p class="text-gray-400 text-xs mt-0.5">{{ item.hot }}人在讨论</p>
            </div>
            <ArrowUpRight class="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div class="px-4 mt-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <Heart class="w-5 h-5 text-pink-500" />
            <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200">猜你喜欢</h2>
          </div>
          <button class="text-sm text-primary-500 flex items-center gap-1">
            换一批 <RefreshCw class="w-4 h-4" />
          </button>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <ProductCard 
            v-for="product in recommendProducts" 
            :key="product.id" 
            :product="product"
            @click="goToDetail(product.id)"
          />
        </div>
      </div>

      <div class="px-4 mt-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <Users class="w-5 h-5 text-blue-500" />
            <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200">附近同学</h2>
          </div>
          <button class="text-sm text-primary-500 flex items-center gap-1">
            查看更多 <ChevronRight class="w-4 h-4" />
          </button>
        </div>
        <div class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div 
            v-for="user in nearbyUsers" 
            :key="user.id"
            class="flex flex-col items-center gap-2 flex-shrink-0"
          >
            <div class="relative">
              <img 
                :src="user.avatar" 
                :alt="user.nickname" 
                class="w-14 h-14 rounded-full object-cover border-2 border-primary-500"
              />
              <div class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <span class="text-xs text-gray-600 dark:text-gray-400 truncate w-14 text-center">{{ user.nickname }}</span>
            <span class="text-xs text-gray-400">{{ user.school }}</span>
          </div>
        </div>
      </div>

      <div class="px-4 mt-6 pb-8">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <Tag class="w-5 h-5 text-purple-500" />
            <h2 class="font-bold text-lg text-gray-800 dark:text-gray-200">校园认证专区</h2>
          </div>
          <span class="text-xs bg-primary-500/10 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full">
            安全可靠
          </span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <ProductCard 
            v-for="product in verifiedProducts" 
            :key="product.id" 
            :product="product"
            @click="goToDetail(product.id)"
          />
        </div>
      </div>
    </main>

    <BottomTabBar :active="'home'" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import {
  Search,
  Bell,
  Zap,
  AlertCircle,
  ChevronRight,
  BookOpen,
  Bookmark,
  Home,
  Smartphone,
  Gamepad2,
  Bike,
  Sparkles,
  Shirt,
  Music,
  Dumbbell,
  Flame,
  TrendingUp,
  Heart,
  RefreshCw,
  Users,
  Tag,
  ArrowUpRight,
} from 'lucide-vue-next'
import ProductCard from '../components/ProductCard.vue'
import BottomTabBar from '../components/BottomTabBar.vue'
import { categories, operationBanners, campusAnnouncements } from '../data/mockData'

const router = useRouter()
const productStore = useProductStore()

const searchQuery = ref('')
const scrolled = ref(false)
const currentSlide = ref(0)
let slideTimer: number | null = null

const banners = operationBanners.slice(0, 4)
const announcements = campusAnnouncements.slice(0, 3)

const hotProducts = computed(() => {
  return [...productStore.products].sort((a, b) => b.likes - a.likes).slice(0, 4)
})

const recommendProducts = computed(() => {
  return [...productStore.products].sort(() => Math.random() - 0.5).slice(0, 4)
})

const verifiedProducts = computed(() => {
  return productStore.products.filter(p => p.seller.isVerified).slice(0, 4)
})

const nearbyUsers = computed(() => {
  return productStore.products.map(p => p.seller).filter((u, i, arr) => arr.findIndex(v => v.id === u.id) === i).slice(0, 6)
})

const hotList = [
  { title: '期末复习攻略分享', hot: 3241 },
  { title: '食堂三楼麻辣香锅测评', hot: 2890 },
  { title: '考研经验交流贴', hot: 2345 },
  { title: '宿舍好物推荐', hot: 1987 },
  { title: '校园音乐节阵容公布', hot: 1876 },
]

const iconMap: Record<string, any> = {
  BookOpen,
  Bookmark,
  Home,
  Smartphone,
  Gamepad2,
  Bike,
  Sparkles,
  Shirt,
  Music,
  Dumbbell,
}

const getIcon = (iconName: string) => {
  return iconMap[iconName] || Package
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}

const goToSearch = (category: string) => {
  router.push({ path: '/search', query: { q: category } })
}

const goToDetail = (id: string) => {
  router.push(`/product/${id}`)
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

const startSlideTimer = () => {
  slideTimer = window.setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % banners.length
  }, 4000)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  startSlideTimer()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (slideTimer) {
    clearInterval(slideTimer)
  }
})
</script>