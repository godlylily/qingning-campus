<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="sticky top-0 z-50 bg-gradient-to-r from-green-500 to-emerald-500">
      <div class="flex items-center px-4 py-4">
        <button @click="goBack" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft :size="20" class="text-white" />
        </button>
        <h1 class="font-bold text-white text-lg ml-4">设置</h1>
      </div>
    </div>

    <div class="px-4 py-4 space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">通用设置</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Moon :size="20" class="text-purple-500" />
              <div>
                <div class="text-gray-900 dark:text-white">深色模式</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">切换深色/浅色主题</div>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="darkMode" @change="toggleDarkMode" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Languages :size="20" class="text-blue-500" />
              <div>
                <div class="text-gray-900 dark:text-white">语言</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">简体中文</div>
              </div>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Globe :size="20" class="text-green-500" />
              <div>
                <div class="text-gray-900 dark:text-white">地区</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">中国大陆</div>
              </div>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">隐私与安全</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Shield :size="20" class="text-green-500" />
              <span class="text-gray-900 dark:text-white">账号与安全</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Bell :size="20" class="text-purple-500" />
              <span class="text-gray-900 dark:text-white">消息通知</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Eye :size="20" class="text-blue-500" />
              <span class="text-gray-900 dark:text-white">隐私设置</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">存储与缓存</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <HardDrive :size="20" class="text-gray-500" />
              <div>
                <div class="text-gray-900 dark:text-white">清除缓存</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">已使用 128 MB</div>
              </div>
            </div>
            <button class="text-sm text-blue-500">清除</button>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Download :size="20" class="text-gray-500" />
              <div>
                <div class="text-gray-900 dark:text-white">离线下载</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">管理离线内容</div>
              </div>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">关于</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Info :size="20" class="text-blue-500" />
              <div>
                <div class="text-gray-900 dark:text-white">关于青柠集市</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">版本 1.0.0</div>
              </div>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <FileText :size="20" class="text-gray-500" />
              <span class="text-gray-900 dark:text-white">用户协议</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <ShieldCheck :size="20" class="text-gray-500" />
              <span class="text-gray-900 dark:text-white">隐私政策</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <HelpCircle :size="20" class="text-orange-500" />
              <span class="text-gray-900 dark:text-white">帮助与反馈</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <MessageSquare :size="20" class="text-green-500" />
              <span class="text-gray-900 dark:text-white">联系客服</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>
        </div>
      </div>

      <button class="w-full py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-card text-red-500 font-medium">
        退出登录
      </button>
    </div>

    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowLeft, Moon, Languages, Globe, Shield, Bell, Eye, HardDrive, Download, Info, FileText, ShieldCheck, HelpCircle, MessageSquare, ChevronRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import BottomTabBar from '../components/BottomTabBar.vue'

const router = useRouter()
const userStore = useUserStore()
const darkMode = ref(false)

onMounted(() => {
  darkMode.value = userStore.darkMode
})

const toggleDarkMode = () => {
  userStore.toggleDarkMode()
}

const goBack = () => {
  router.back()
}
</script>