<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <h1 class="font-bold text-lg text-gray-800 dark:text-gray-200">我的</h1>
        <div class="flex items-center gap-2">
          <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Settings class="w-5 h-5 text-gray-400" />
          </button>
          <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Camera class="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </header>

    <main class="pt-16">
      <div class="bg-gradient-to-br from-primary-500 to-primary-600 px-4 pt-8 pb-16">
        <div class="flex items-center gap-4">
          <div class="relative">
            <img 
              :src="currentUser.avatar" 
              :alt="currentUser.nickname" 
              class="w-20 h-20 rounded-full border-4 border-white/30 object-cover"
            />
            <div class="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
              <span class="w-2 h-2 bg-white rounded-full"></span>
            </div>
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-bold text-white">{{ currentUser.nickname }}</h2>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-white/80 text-sm">{{ currentUser.school }}</span>
              <span v-if="currentUser.isVerified" class="flex items-center gap-1 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                <CheckCircle class="w-3 h-3" />
                已认证
              </span>
            </div>
          </div>
          <button 
            class="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
            @click="goToEditProfile"
          >
            编辑资料
          </button>
        </div>

        <div class="flex items-center justify-around mt-6 bg-white/10 backdrop-blur-sm rounded-2xl py-4">
          <div class="text-center">
            <p class="text-2xl font-bold text-white">920</p>
            <p class="text-white/70 text-xs mt-1">信誉积分</p>
          </div>
          <div class="w-px h-8 bg-white/20"></div>
          <div class="text-center">
            <p class="text-2xl font-bold text-white">12</p>
            <p class="text-white/70 text-xs mt-1">发布商品</p>
          </div>
          <div class="w-px h-8 bg-white/20"></div>
          <div class="text-center">
            <p class="text-2xl font-bold text-white">25</p>
            <p class="text-white/70 text-xs mt-1">收藏</p>
          </div>
          <div class="w-px h-8 bg-white/20"></div>
          <div class="text-center">
            <p class="text-2xl font-bold text-white">89</p>
            <p class="text-white/70 text-xs mt-1">粉丝</p>
          </div>
        </div>
      </div>

      <div class="px-4 -mt-8">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div class="grid grid-cols-4">
            <button 
              v-for="item in quickActions" 
              :key="item.key"
              class="flex flex-col items-center gap-2 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              @click="handleQuickAction(item.key)"
            >
              <div :class="`w-12 h-12 rounded-xl flex items-center justify-center ${item.bgClass}`">
                <component :is="item.icon" :class="`w-6 h-6 ${item.iconClass}`" />
              </div>
              <span class="text-xs text-gray-600 dark:text-gray-400">{{ item.label }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="px-4 mt-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div 
            v-for="(item, index) in menuItems" 
            :key="item.key"
            class="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0"
            @click="handleMenuItemClick(item.key)"
          >
            <div :class="`w-9 h-9 rounded-lg flex items-center justify-center ${item.bgClass}`">
              <component :is="item.icon" :class="`w-5 h-5 ${item.iconClass}`" />
            </div>
            <div class="flex-1">
              <span class="text-gray-800 dark:text-gray-200">{{ item.label }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span v-if="item.badge" class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{{ item.badge }}</span>
              <ChevronRight class="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 mt-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div 
            class="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            @click="toggleDarkMode"
          >
            <div class="w-9 h-9 rounded-lg flex items-center justify-center bg-purple-100 dark:bg-purple-500/20">
              <Moon class="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div class="flex-1">
              <span class="text-gray-800 dark:text-gray-200">夜间模式</span>
            </div>
            <button 
              class="relative w-12 h-7 rounded-full transition-colors" 
              :class="darkMode ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'"
              @click.stop="toggleDarkMode"
            >
              <span 
                class="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform" 
                :class="darkMode ? 'left-6' : 'left-1'"
              ></span>
            </button>
          </div>
        </div>
      </div>

      <div class="px-4 mt-4 pb-8">
        <div class="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-4 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div class="relative">
            <h3 class="text-white font-bold text-lg">青柠AI助手</h3>
            <p class="text-white/80 text-sm mt-1">有什么问题随时问我</p>
            <button 
              class="mt-3 px-4 py-2 bg-white text-orange-500 rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
              @click="openAIHelper"
            >
              立即咨询
            </button>
          </div>
        </div>
      </div>
    </main>

    <BottomTabBar :active="'profile'" />

    <Transition name="slide-up">
      <div v-if="showEditModal" class="fixed inset-0 bg-black/50 z-50 flex items-end" @click="closeEditModal">
        <div class="bg-white dark:bg-gray-800 w-full rounded-t-3xl max-h-[80vh] overflow-y-auto" @click.stop>
          <div class="sticky top-0 bg-white dark:bg-gray-800 px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">编辑资料</h3>
            <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="closeEditModal">
              <X class="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div class="p-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">昵称</label>
              <input 
                v-model="editForm.nickname" 
                type="text" 
                class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="请输入昵称"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">学校</label>
              <div class="relative">
                <input 
                  v-model="searchSchool" 
                  type="text" 
                  class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="搜索学校名称"
                />
                <Search class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <div v-if="searchSchool" class="mt-2 max-h-40 overflow-y-auto bg-gray-50 dark:bg-gray-700 rounded-xl">
                <button 
                  v-for="school in filteredSchools" 
                  :key="school"
                  class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-gray-200"
                  @click="selectSchool(school)"
                >
                  {{ school }}
                </button>
              </div>
              <div v-else class="mt-2 px-4 py-2 text-gray-500 dark:text-gray-400 text-sm">
                当前学校：{{ editForm.school }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">个性签名</label>
              <textarea 
                v-model="editForm.bio" 
                rows="3" 
                class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                placeholder="说说你的个性签名"
              ></textarea>
            </div>
            <button 
              class="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              @click="saveProfile"
            >
              保存修改
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="showAIHelper" class="fixed inset-0 bg-black/50 z-50 flex items-end" @click="closeAIHelper">
        <div class="bg-white dark:bg-gray-800 w-full rounded-t-3xl" @click.stop>
          <div class="sticky top-0 bg-white dark:bg-gray-800 px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <Sparkles class="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 class="font-bold text-gray-800 dark:text-gray-200">青柠AI助手</h3>
                <p class="text-xs text-gray-400">智能问答服务</p>
              </div>
            </div>
            <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="closeAIHelper">
              <X class="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div class="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            <div class="flex gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles class="w-4 h-4 text-white" />
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                <p class="text-sm text-gray-700 dark:text-gray-300">你好！我是青柠AI助手，有什么问题可以问我哦~</p>
              </div>
            </div>
            <div v-for="msg in aiMessages" :key="msg.id" class="flex gap-3" :class="msg.isUser ? 'justify-end' : ''">
              <div v-if="!msg.isUser" class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles class="w-4 h-4 text-white" />
              </div>
              <div :class="msg.isUser ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'" class="rounded-2xl px-4 py-3 max-w-[80%]" :class="msg.isUser ? 'rounded-tr-none' : 'rounded-tl-none'">
                <p class="text-sm">{{ msg.content }}</p>
              </div>
              <div v-if="msg.isUser" class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User class="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </div>
          <div class="p-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex gap-3">
              <input 
                v-model="aiInput" 
                type="text" 
                class="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="输入你的问题..."
                @keyup.enter="sendAIQuestion"
              />
              <button 
                class="w-11 h-11 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                @click="sendAIQuestion"
              >
                <Send class="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import {
  Settings,
  Camera,
  CheckCircle,
  ChevronRight,
  Moon,
  X,
  Search,
  Sparkles,
  User,
  Send,
  ShoppingBag,
  Heart,
  Clock,
  Wallet,
  Shield,
  Bell,
  HelpCircle,
  Settings2,
  FileText,
  Star,
  MapPin,
  MessageSquare,
} from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'
import { campuses } from '../data/mockData'

const router = useRouter()
const userStore = useUserStore()

const currentUser = computed(() => userStore.currentUser)
const darkMode = computed(() => userStore.darkMode)

const showEditModal = ref(false)
const showAIHelper = ref(false)
const searchSchool = ref('')
const aiInput = ref('')

const editForm = ref({
  nickname: currentUser.value.nickname,
  school: currentUser.value.school,
  bio: currentUser.value.bio || '',
})

const aiMessages = ref([
  { id: '1', content: '你好！我是青柠AI助手，有什么问题可以问我哦~', isUser: false },
])

const quickActions = [
  { key: 'orders', icon: ShoppingBag, label: '我的订单', bgClass: 'bg-orange-100 dark:bg-orange-500/20', iconClass: 'text-orange-600 dark:text-orange-400' },
  { key: 'favorites', icon: Heart, label: '我的收藏', bgClass: 'bg-pink-100 dark:bg-pink-500/20', iconClass: 'text-pink-600 dark:text-pink-400' },
  { key: 'history', icon: Clock, label: '浏览历史', bgClass: 'bg-blue-100 dark:bg-blue-500/20', iconClass: 'text-blue-600 dark:text-blue-400' },
  { key: 'wallet', icon: Wallet, label: '我的钱包', bgClass: 'bg-green-100 dark:bg-green-500/20', iconClass: 'text-green-600 dark:text-green-400' },
]

const menuItems = [
  { key: 'security', icon: Shield, label: '账号与安全', bgClass: 'bg-red-100 dark:bg-red-500/20', iconClass: 'text-red-600 dark:text-red-400' },
  { key: 'notifications', icon: Bell, label: '消息通知', bgClass: 'bg-purple-100 dark:bg-purple-500/20', iconClass: 'text-purple-600 dark:text-purple-400', badge: '3' },
  { key: 'help', icon: HelpCircle, label: '帮助与反馈', bgClass: 'bg-cyan-100 dark:bg-cyan-500/20', iconClass: 'text-cyan-600 dark:text-cyan-400' },
  { key: 'settings', icon: Settings2, label: '设置', bgClass: 'bg-gray-100 dark:bg-gray-500/20', iconClass: 'text-gray-600 dark:text-gray-400' },
]

const filteredSchools = computed(() => {
  if (!searchSchool.value) return []
  return campuses.filter(school => 
    school.toLowerCase().includes(searchSchool.value.toLowerCase())
  ).slice(0, 10)
})

const handleQuickAction = (key: string) => {
  const routes: Record<string, string> = {
    orders: '/orders',
    favorites: '/favorites',
    history: '/history',
    wallet: '/wallet',
  }
  router.push(routes[key] || '/')
}

const handleMenuItemClick = (key: string) => {
  const routes: Record<string, string> = {
    security: '/security',
    notifications: '/notifications-settings',
    help: '/help',
    settings: '/settings',
  }
  router.push(routes[key] || '/')
}

const goToEditProfile = () => {
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  searchSchool.value = ''
}

const selectSchool = (school: string) => {
  editForm.value.school = school
  searchSchool.value = ''
}

const saveProfile = () => {
  userStore.updateUserProfile(editForm.value)
  closeEditModal()
}

const toggleDarkMode = () => {
  userStore.toggleDarkMode()
}

const openAIHelper = () => {
  showAIHelper.value = true
}

const closeAIHelper = () => {
  showAIHelper.value = false
}

const sendAIQuestion = () => {
  if (!aiInput.value.trim()) return
  
  aiMessages.value.push({ id: Date.now().toString(), content: aiInput.value, isUser: true })
  aiInput.value = ''
  
  setTimeout(() => {
    aiMessages.value.push({
      id: (Date.now() + 1).toString(),
      content: '感谢您的提问！我正在学习中，目前可以为您提供校园二手交易相关的帮助。如有具体问题，请描述清楚，我会尽力解答。',
      isUser: false,
    })
  }, 1000)
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>