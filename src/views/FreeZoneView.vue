<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="sticky top-0 z-50 bg-gradient-to-r from-green-500 to-emerald-500">
      <div class="flex items-center justify-between px-4 py-4">
        <button 
          @click="goBack"
          class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ArrowLeft :size="20" class="text-white" />
        </button>
        <h1 class="font-bold text-white text-lg">免费赠送专区</h1>
        <div class="w-10"></div>
      </div>
    </div>

    <div class="px-4 py-4">
      <div class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 text-white">
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
            <Gift :size="32" />
          </div>
          <div>
            <h3 class="font-bold text-xl">免费领取</h3>
            <p class="text-white/80 text-sm">有需要的同学快来领取吧</p>
          </div>
        </div>
        <div class="flex items-center justify-around mt-4">
          <div class="text-center">
            <div class="text-2xl font-bold">28</div>
            <div class="text-xs text-white/70">已送出</div>
          </div>
          <div class="w-px h-10 bg-white/20"></div>
          <div class="text-center">
            <div class="text-2xl font-bold">156</div>
            <div class="text-xs text-white/70">待领取</div>
          </div>
          <div class="w-px h-10 bg-white/20"></div>
          <div class="text-center">
            <div class="text-2xl font-bold">32</div>
            <div class="text-xs text-white/70">今日新增</div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 py-2">
      <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        <button 
          v-for="filter in filters" 
          :key="filter.key"
          @click="currentFilter = filter.key"
          class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
          :class="currentFilter === filter.key ? 'bg-green-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <div class="px-4 py-4">
      <div class="grid grid-cols-2 gap-3">
        <div 
          v-for="(item, index) in freeItems" 
          :key="item.id"
          class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-card cursor-pointer transition-all duration-300 hover:shadow-medium hover:-translate-y-1 animate-slide-up"
          :style="{ animationDelay: `${index * 100}ms` }"
          @click="goToDetail(item)"
        >
          <div class="relative">
            <img :src="item.image" :alt="item.title" class="w-full h-32 object-cover" />
            <div class="absolute top-2 left-2">
              <span class="px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full flex items-center gap-1">
                <Sparkles :size="12" />
                免费
              </span>
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <div class="flex items-center gap-2 text-white text-xs">
                <Eye :size="12" />
                {{ item.views }}
                <MessageCircle :size="12" />
                {{ item.requests }}人想要
              </div>
            </div>
          </div>
          <div class="p-3">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ item.title }}</h3>
            <div class="flex items-center gap-2 mt-2">
              <div class="w-6 h-6 rounded-full overflow-hidden">
                <img :src="item.seller.avatar" :alt="item.seller.nickname" class="w-full h-full object-cover" />
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ item.seller.nickname }}</span>
            </div>
            <div class="flex items-center gap-1 mt-1">
              <MapPin :size="12" class="text-gray-400" />
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ item.location }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 py-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card">
        <h3 class="font-bold text-gray-900 dark:text-white mb-4">我要赠送</h3>
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Gift :size="28" class="text-green-500" />
          </div>
          <div class="flex-1">
            <div class="font-medium text-gray-900 dark:text-white">分享闲置，传递温暖</div>
            <div class="text-sm text-gray-500">将闲置物品免费送给有需要的同学</div>
          </div>
          <button class="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium">
            立即发布
          </button>
        </div>
      </div>
    </div>

    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, Gift, Sparkles, Eye, MessageCircle, MapPin } from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'
import { generateAvatar, p } from '../data/mockData'

const filters = [
  { key: 'all', label: '全部' },
  { key: 'clothes', label: '衣物' },
  { key: 'books', label: '书籍' },
  { key: 'daily', label: '日用品' },
  { key: 'electronics', label: '数码' },
]

const currentFilter = ref('all')

const freeItems = ref([
  {
    id: '1',
    title: '考研英语真题全套',
    image: p('考研资料'),
    views: 128,
    requests: 15,
    location: '图书馆门口',
    seller: {
      nickname: '上岸学姐',
      avatar: generateAvatar('上岸学姐')
    }
  },
  {
    id: '2',
    title: '羽绒服一件',
    image: p('羽绒服'),
    views: 86,
    requests: 8,
    location: '女生宿舍2号楼',
    seller: {
      nickname: '小美',
      avatar: generateAvatar('小美')
    }
  },
  {
    id: '3',
    title: '台灯一个',
    image: p('台灯'),
    views: 64,
    requests: 6,
    location: '教学楼A栋',
    seller: {
      nickname: '热心同学',
      avatar: generateAvatar('热心同学')
    }
  },
  {
    id: '4',
    title: '笔记本电脑包',
    image: p('电脑包'),
    views: 45,
    requests: 4,
    location: '食堂门口',
    seller: {
      nickname: '大四学长',
      avatar: generateAvatar('大四学长')
    }
  }
])

const goBack = () => {
  window.history.back()
}

const goToDetail = (item: any) => {
  alert(`查看 ${item.title} 详情`)
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

.animate-slide-up {
  animation: slideUp 0.4s ease-out forwards;
  opacity: 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>