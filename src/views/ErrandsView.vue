<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="sticky top-0 z-50 bg-gradient-to-r from-orange-500 to-red-500">
      <div class="flex items-center justify-between px-4 py-4">
        <button 
          @click="goBack"
          class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ArrowLeft :size="20" class="text-white" />
        </button>
        <h1 class="font-bold text-white text-lg">校园跑腿</h1>
        <div class="w-10"></div>
      </div>
    </div>

    <div class="px-4 py-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-gray-900 dark:text-white">我要发布</h3>
        </div>
        <div class="grid grid-cols-4 gap-3">
          <button 
            v-for="service in services" 
            :key="service.type"
            @click="selectService(service.type)"
            class="flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300"
            :class="selectedService === service.type ? 'bg-orange-100 dark:bg-orange-900/30' : 'bg-gray-100 dark:bg-gray-700'"
          >
            <div 
              class="w-12 h-12 rounded-xl flex items-center justify-center"
              :class="selectedService === service.type ? 'bg-orange-500' : 'bg-gray-400'"
            >
              <component :is="service.icon" :size="24" class="text-white" />
            </div>
            <span class="text-xs text-gray-600 dark:text-gray-300">{{ service.label }}</span>
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card mt-4">
        <h3 class="font-bold text-gray-900 dark:text-white mb-4">填写需求</h3>
        <div class="space-y-4">
          <div>
            <label class="text-sm text-gray-500 dark:text-gray-400 mb-2 block">需求内容</label>
            <textarea 
              v-model="form.content"
              rows="3"
              placeholder="请描述你的需求..."
              class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            ></textarea>
          </div>
          <div>
            <label class="text-sm text-gray-500 dark:text-gray-400 mb-2 block">取货地点</label>
            <input 
              v-model="form.from"
              type="text"
              placeholder="例如：图书馆二楼"
              class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label class="text-sm text-gray-500 dark:text-gray-400 mb-2 block">送达地点</label>
            <input 
              v-model="form.to"
              type="text"
              placeholder="例如：男生宿舍3号楼"
              class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label class="text-sm text-gray-500 dark:text-gray-400 mb-2 block">悬赏金额</label>
            <div class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl">
              <span class="px-4 text-gray-400">¥</span>
              <input 
                v-model="form.reward"
                type="number"
                placeholder="0.00"
                class="flex-1 px-2 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <button 
        @click="submitOrder"
        :disabled="!canSubmit"
        class="w-full mt-4 py-4 rounded-xl font-medium transition-all duration-300"
        :class="canSubmit ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'"
      >
        发布需求
      </button>
    </div>

    <div class="px-4 py-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-gray-900 dark:text-white">正在进行的跑腿</h3>
        <span class="text-sm text-orange-500">查看全部</span>
      </div>
      <div class="space-y-3">
        <div 
          v-for="order in errands" 
          :key="order.id"
          class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card"
        >
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full overflow-hidden">
                <img :src="order.user.avatar" :alt="order.user.nickname" class="w-full h-full object-cover" />
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ order.user.nickname }}</span>
            </div>
            <span class="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">{{ order.status }}</span>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ order.content }}</p>
          <div class="flex items-center justify-between text-xs text-gray-500">
            <div class="flex items-center gap-2">
              <MapPin :size="14" />
              <span>{{ order.from }} → {{ order.to }}</span>
            </div>
            <span class="text-orange-500 font-bold">¥{{ order.reward }}</span>
          </div>
        </div>
      </div>
    </div>

    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeft, ShoppingBag, Coffee, Package, MessageSquare, MapPin } from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'
import { generateAvatar } from '../data/mockData'

const services = [
  { type: 'food', label: '外卖代取', icon: Coffee },
  { type: 'shopping', label: '超市代购', icon: ShoppingBag },
  { type: 'express', label: '快递代拿', icon: Package },
  { type: 'other', label: '其他', icon: MessageSquare },
]

const selectedService = ref('food')

const form = ref({
  content: '',
  from: '',
  to: '',
  reward: ''
})

const errands = ref([
  {
    id: '1',
    content: '帮忙取一下外卖，在南门菜鸟驿站',
    from: '南门菜鸟驿站',
    to: '男生宿舍5号楼',
    reward: 5,
    status: '进行中',
    user: {
      nickname: '热心小哥',
      avatar: generateAvatar('热心小哥')
    }
  },
  {
    id: '2',
    content: '帮买一杯奶茶，送到图书馆',
    from: '学校奶茶店',
    to: '图书馆',
    reward: 3,
    status: '待接单',
    user: {
      nickname: '奶茶爱好者',
      avatar: generateAvatar('奶茶爱好者')
    }
  }
])

const canSubmit = computed(() => {
  return form.value.content.trim() !== '' && 
         form.value.from.trim() !== '' && 
         form.value.to.trim() !== '' && 
         form.value.reward !== ''
})

const goBack = () => {
  window.history.back()
}

const selectService = (type: string) => {
  selectedService.value = type
}

const submitOrder = () => {
  if (!canSubmit.value) return
  alert('跑腿订单发布成功！')
}
</script>