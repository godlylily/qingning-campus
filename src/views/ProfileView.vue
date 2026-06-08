<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 pt-16 pb-24 px-4">
      <div class="flex items-center gap-4">
        <div class="relative">
          <div class="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white/30">
            <img :src="userStore.currentUser.avatar" :alt="userStore.currentUser.nickname" class="w-full h-full object-cover" />
          </div>
          <button class="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center">
            <Camera :size="14" class="text-primary-500" />
          </button>
        </div>
        <div class="flex-1">
          <h1 class="text-xl font-bold text-white">{{ userStore.currentUser.nickname }}</h1>
          <div class="flex items-center gap-2 mt-1">
            <span class="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white flex items-center gap-1">
              <BadgeCheck :size="12" />
              {{ userStore.currentUser.school }}
            </span>
            <span v-if="userStore.currentUser.online" class="text-xs text-white/80">在线</span>
          </div>
        </div>
        <button @click="showEditProfile = true" class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
          编辑资料
        </button>
      </div>

      <div class="flex items-center justify-around mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-white">{{ userStore.credits }}</div>
          <div class="text-xs text-white/70 mt-1">信誉积分</div>
        </div>
        <div class="w-px h-10 bg-white/20"></div>
        <div class="text-center">
          <div class="text-2xl font-bold text-white">{{ userStore.salesCount }}</div>
          <div class="text-xs text-white/70 mt-1">已售商品</div>
        </div>
        <div class="w-px h-10 bg-white/20"></div>
        <div class="text-center">
          <div class="text-2xl font-bold text-white">{{ userStore.boughtCount }}</div>
          <div class="text-xs text-white/70 mt-1">已购商品</div>
        </div>
        <div class="w-px h-10 bg-white/20"></div>
        <div class="text-center">
          <div class="text-2xl font-bold text-white">{{ userStore.followerCount }}</div>
          <div class="text-xs text-white/70 mt-1">粉丝</div>
        </div>
      </div>
    </div>

    <div class="px-4 -mt-16 space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-gray-900 dark:text-white">快捷功能</h3>
          <ChevronRight :size="20" class="text-gray-400" />
        </div>
        <div class="grid grid-cols-4 gap-4">
          <button @click="goToOrder('bought')" class="flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Package :size="24" class="text-orange-500" />
            </div>
            <span class="text-xs text-gray-600 dark:text-gray-300">我买到的</span>
          </button>
          <button @click="goToOrder('sold')" class="flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Tag :size="24" class="text-green-500" />
            </div>
            <span class="text-xs text-gray-600 dark:text-gray-300">我卖出的</span>
          </button>
          <button @click="goToOrders('pending')" class="flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Clock :size="24" class="text-blue-500" />
            </div>
            <span class="text-xs text-gray-600 dark:text-gray-300">待评价</span>
          </button>
          <button @click="goToOrders('refund')" class="flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <RotateCcw :size="24" class="text-red-500" />
            </div>
            <span class="text-xs text-gray-600 dark:text-gray-300">退款售后</span>
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-gray-900 dark:text-white">我的收藏</h3>
          <ChevronRight :size="20" class="text-gray-400" />
        </div>
        <div class="grid grid-cols-4 gap-3">
          <div 
            v-for="product in userStore.favorites.slice(0, 4)" 
            :key="product.id"
            class="w-full aspect-square rounded-xl overflow-hidden"
          >
            <img :src="product.images[0]" :alt="product.title" class="w-full h-full object-cover" />
          </div>
          <button class="w-full aspect-square rounded-xl bg-gray-100 dark:bg-gray-700 flex flex-col items-center justify-center gap-1">
            <Plus :size="20" class="text-gray-400" />
            <span class="text-xs text-gray-500">查看全部</span>
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <button @click="goToWallet" class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                <Wallet :size="20" class="text-yellow-500" />
              </div>
              <span class="text-gray-900 dark:text-white">我的钱包</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-orange-500 font-bold">¥{{ userStore.wallet }}</span>
              <ChevronRight :size="16" class="text-gray-400" />
            </div>
          </button>
          <button @click="goToSecurity" class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Shield :size="20" class="text-green-500" />
              </div>
              <span class="text-gray-900 dark:text-white">账号与安全</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </button>
          <button @click="goToSettings" class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Settings :size="20" class="text-gray-600" />
              </div>
              <span class="text-gray-900 dark:text-white">设置</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </button>
          <button @click="goToHelp" class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <HelpCircle :size="20" class="text-blue-500" />
              </div>
              <span class="text-gray-900 dark:text-white">帮助与反馈</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="showEditProfile" class="fixed inset-0 z-50 flex items-end justify-center bg-black/50" @click.self="showEditProfile = false">
      <div class="w-full bg-white dark:bg-gray-800 rounded-t-3xl p-6 animate-slide-up">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-bold text-gray-900 dark:text-white">编辑资料</h3>
          <button @click="showEditProfile = false" class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <X :size="18" class="text-gray-600" />
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="text-sm text-gray-500 dark:text-gray-400 mb-2 block">昵称</label>
            <input 
              v-model="editForm.nickname"
              type="text"
              class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label class="text-sm text-gray-500 dark:text-gray-400 mb-2 block">个性签名</label>
            <input 
              v-model="editForm.signature"
              type="text"
              placeholder="输入个性签名..."
              class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button class="w-full py-3 bg-primary-500 text-white rounded-xl font-medium">
            保存修改
          </button>
        </div>
      </div>
    </div>

    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Camera,
  BadgeCheck,
  Package,
  Tag,
  Clock,
  RotateCcw,
  ChevronRight,
  Plus,
  Wallet,
  Shield,
  Settings,
  HelpCircle,
  X
} from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const showEditProfile = ref(false)

const editForm = ref({
  nickname: userStore.currentUser.nickname,
  signature: ''
})

const goToOrder = (type: string) => {
  window.location.href = `/orders?type=${type}`
}

const goToOrders = (type: string) => {
  window.location.href = `/orders?type=${type}`
}

const goToWallet = () => {
  window.location.href = '/wallet'
}

const goToSecurity = () => {
  window.location.href = '/security'
}

const goToSettings = () => {
  window.location.href = '/settings'
}

const goToHelp = () => {
  window.location.href = '/help'
}
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>