<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 pt-16 pb-24 px-4">
      <div class="flex items-center gap-4">
        <div class="relative">
          <div class="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white/30">
            <img :src="currentUser?.avatar || defaultAvatar" :alt="currentUser?.nickname || '用户'" class="w-full h-full object-cover" />
          </div>
          <button class="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center">
            <Camera :size="14" class="text-primary-500" />
          </button>
        </div>
        <div class="flex-1">
          <h1 class="text-xl font-bold text-white">{{ currentUser?.nickname || '青柠用户' }}</h1>
          <div class="flex items-center gap-2 mt-1">
            <span class="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white flex items-center gap-1">
              <BadgeCheck :size="12" />
              {{ currentUser?.school || '未选择学校' }}
            </span>
            <span v-if="currentUser?.online" class="text-xs text-white/80">在线</span>
          </div>
        </div>
        <button @click="showEditProfile = true" class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
          编辑资料
        </button>
      </div>

      <div class="flex items-center justify-around mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-white">{{ userStore.credits || 0 }}</div>
          <div class="text-xs text-white/70 mt-1">信誉积分</div>
        </div>
        <div class="w-px h-10 bg-white/20"></div>
        <div class="text-center">
          <div class="text-2xl font-bold text-white">{{ myProducts.length }}</div>
          <div class="text-xs text-white/70 mt-1">已发布</div>
        </div>
        <div class="w-px h-10 bg-white/20"></div>
        <div class="text-center">
          <div class="text-2xl font-bold text-white">{{ (userStore.favorites || []).length }}</div>
          <div class="text-xs text-white/70 mt-1">收藏</div>
        </div>
        <div class="w-px h-10 bg-white/20"></div>
        <div class="text-center">
          <div class="text-2xl font-bold text-white">{{ completedOrders }}</div>
          <div class="text-xs text-white/70 mt-1">成交</div>
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
          <button @click="goToFavorites" class="flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Heart :size="24" class="text-blue-500" />
            </div>
            <span class="text-xs text-gray-600 dark:text-gray-300">我的收藏</span>
          </button>
          <button @click="goToHistory" class="flex flex-col items-center gap-2">
            <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <History :size="24" class="text-purple-500" />
            </div>
            <span class="text-xs text-gray-600 dark:text-gray-300">浏览记录</span>
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card">
        <button @click="goToWallet" class="w-full flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <Wallet :size="24" class="text-white" />
          </div>
          <div class="flex-1">
            <div class="font-medium text-gray-900 dark:text-white">我的钱包</div>
            <div class="text-sm text-gray-500">余额: ¥0.00</div>
          </div>
          <ChevronRight :size="20" class="text-gray-400" />
        </button>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card">
        <div class="space-y-4">
          <button @click="goToSecurity" class="w-full flex items-center gap-3 py-2">
            <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Shield :size="20" class="text-gray-600 dark:text-gray-300" />
            </div>
            <span class="flex-1 text-left text-gray-900 dark:text-white">账号与安全</span>
            <ChevronRight :size="20" class="text-gray-400" />
          </button>
          <button @click="goToNotifications" class="w-full flex items-center gap-3 py-2">
            <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Bell :size="20" class="text-gray-600 dark:text-gray-300" />
            </div>
            <span class="flex-1 text-left text-gray-900 dark:text-white">消息通知</span>
            <ChevronRight :size="20" class="text-gray-400" />
          </button>
          <button @click="goToHelp" class="w-full flex items-center gap-3 py-2">
            <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <HelpCircle :size="20" class="text-gray-600 dark:text-gray-300" />
            </div>
            <span class="flex-1 text-left text-gray-900 dark:text-white">帮助与反馈</span>
            <ChevronRight :size="20" class="text-gray-400" />
          </button>
          <button @click="goToSettings" class="w-full flex items-center gap-3 py-2">
            <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Settings :size="20" class="text-gray-600 dark:text-gray-300" />
            </div>
            <span class="flex-1 text-left text-gray-900 dark:text-white">设置</span>
            <ChevronRight :size="20" class="text-gray-400" />
          </button>
          <button 
            @click="userStore.toggleDarkMode"
            class="w-full flex items-center gap-3 py-2"
          >
            <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Moon v-if="!userStore.darkMode" :size="20" class="text-gray-600 dark:text-gray-300" />
              <Sun v-else :size="20" class="text-amber-500" />
            </div>
            <span class="flex-1 text-left text-gray-900 dark:text-white">{{ userStore.darkMode ? '日间模式' : '夜间模式' }}</span>
            <div 
              class="w-11 h-6 rounded-full transition-colors duration-300 relative"
              :class="userStore.darkMode ? 'bg-primary-500' : 'bg-gray-300'"
            >
              <div 
                class="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300"
                :class="userStore.darkMode ? 'translate-x-6' : 'translate-x-1'"
              ></div>
            </div>
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card">
        <button @click="goToVerification" class="w-full flex items-center gap-3 py-2">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Award :size="20" class="text-white" />
          </div>
          <span class="flex-1 text-left text-gray-900 dark:text-white">校园认证</span>
          <span v-if="currentUser?.isVerified" class="px-3 py-1 bg-primary-100 text-primary-600 text-xs rounded-full">已认证</span>
          <ChevronRight v-else class="text-gray-400" />
        </button>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-gray-900 dark:text-white">我的发布</h3>
          <ChevronRight :size="20" class="text-gray-400" />
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div 
            v-for="product in myProducts.slice(0, 6)" 
            :key="product.id"
            @click="goToProduct(product.id)"
            class="aspect-square rounded-xl overflow-hidden cursor-pointer"
          >
            <img :src="product.images[0]" :alt="product.title" class="w-full h-full object-cover" />
          </div>
          <button v-if="myProducts.length > 6" @click="goToMyProducts" class="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
            <Plus :size="24" class="text-gray-400" />
          </button>
        </div>
      </div>
    </div>

    <AIAssistant />
    <BottomTabBar />

    <div v-if="showEditProfile" class="fixed inset-0 z-50 flex items-end justify-center bg-black/50" @click.self="showEditProfile = false">
      <div class="w-full max-w-lg bg-white dark:bg-gray-800 rounded-t-3xl p-6 animate-slide-up max-h-[85vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">编辑资料</h2>
          <button @click="showEditProfile = false" class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <X :size="18" class="text-gray-500" />
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="flex justify-center mb-6">
            <div class="relative">
              <div class="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary-100 dark:ring-primary-900">
                <img :src="editForm.avatar" alt="头像" class="w-full h-full object-cover" />
              </div>
              <button class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-500 shadow-lg flex items-center justify-center">
                <Camera :size="16" class="text-white" />
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">昵称</label>
            <input v-model="editForm.nickname" type="text" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">学校</label>
            <div class="relative">
              <input 
                v-model="schoolSearch" 
                type="text" 
                placeholder="搜索学校名称..." 
                class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition"
              />
              <div 
                v-if="schoolSearch && filteredCampuses.length > 0"
                class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow-lg max-h-48 overflow-y-auto"
              >
                <button
                  v-for="campus in filteredCampuses"
                  :key="campus"
                  @click="selectSchool(campus)"
                  class="w-full px-4 py-2 text-left text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  {{ campus }}
                </button>
              </div>
              <div 
                v-else-if="schoolSearch && filteredCampuses.length === 0"
                class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow-lg p-4 text-center text-gray-500"
              >
                未找到学校 "{{ schoolSearch }}"
              </div>
            </div>
            <div v-if="editForm.school" class="mt-2 flex items-center gap-2">
              <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm rounded-full">
                {{ editForm.school }}
              </span>
              <button @click="editForm.school = ''" class="text-gray-400 hover:text-gray-600">
                <X :size="16" />
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">个性签名</label>
            <textarea v-model="editForm.bio" rows="3" class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition resize-none"></textarea>
          </div>

          <button @click="saveProfile" class="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
            保存修改
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted } from 'vue'
import { Camera, BadgeCheck, ChevronRight, Package, Tag, Heart, History, Wallet, Shield, Bell, HelpCircle, Settings, Moon, Sun, Award, Plus, X } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import BottomTabBar from '../components/BottomTabBar.vue'
import AIAssistant from '../components/AIAssistant.vue'
import { useProductStore } from '../stores/productStore'
import { useUserStore } from '../stores/userStore'
import { campuses, generateAvatar } from '../data/mockData'

const router = useRouter()

const productStore = useProductStore()
const userStore = useUserStore()

const defaultAvatar = generateAvatar('用户')

const currentUser = computed(() => userStore.currentUser)

const showEditProfile = ref(false)
const schoolSearch = ref('')
const editForm = reactive({
  nickname: currentUser.value?.nickname || '青柠用户',
  school: currentUser.value?.school || '',
  bio: currentUser.value?.bio || '',
  avatar: currentUser.value?.avatar || defaultAvatar,
})

const filteredCampuses = computed(() => {
  if (!schoolSearch.value.trim()) {
    return campuses.slice(0, 10)
  }
  const query = schoolSearch.value.toLowerCase()
  return campuses.filter(campus => campus.toLowerCase().includes(query)).slice(0, 10)
})

const selectSchool = (campus: string) => {
  editForm.school = campus
  schoolSearch.value = ''
}

const saveProfile = () => {
  if (currentUser.value) {
    userStore.updateUserProfile({
      nickname: editForm.nickname,
      school: editForm.school,
      bio: editForm.bio,
      avatar: editForm.avatar,
    })
  }
  showEditProfile.value = false
}

const goToOrder = (type: string) => {
  router.push(`/orders?type=${type}`)
}

const goToFavorites = () => {
  router.push('/favorites')
}

const goToHistory = () => {
  router.push('/history')
}

const goToWallet = () => {
  router.push('/wallet')
}

const goToSecurity = () => {
  router.push('/security')
}

const goToNotifications = () => {
  router.push('/notifications-settings')
}

const goToHelp = () => {
  router.push('/help')
}

const goToSettings = () => {
  router.push('/settings')
}

const goToVerification = () => {
  router.push('/verification')
}

const goToProduct = (id: string) => {
  router.push(`/product/${id}`)
}

const goToMyProducts = () => {
  router.push('/my-products')
}

onMounted(() => {
  userStore.loadDarkMode()
})

const myProducts = computed(() => {
  if (!currentUser.value || !productStore.products) return []
  return productStore.products.filter(p => p.seller.id === currentUser.value.id)
})

const completedOrders = computed(() => {
  if (!userStore.orders) return 0
  return userStore.orders.filter(o => o.status === 'completed').length
})
</script>
