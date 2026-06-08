<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="sticky top-0 z-50 bg-gradient-to-r from-green-500 to-emerald-500">
      <div class="flex items-center px-4 py-4">
        <button @click="goBack" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft :size="20" class="text-white" />
        </button>
        <h1 class="font-bold text-white text-lg ml-4">消息通知</h1>
      </div>
    </div>

    <div class="px-4 py-4 space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">通知设置</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <MessageSquare :size="20" class="text-blue-500" />
              <div>
                <div class="text-gray-900 dark:text-white">消息通知</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">接收新消息提醒</div>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.message" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <ShoppingBag :size="20" class="text-orange-500" />
              <div>
                <div class="text-gray-900 dark:text-white">订单通知</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">订单状态变更提醒</div>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.order" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Heart :size="20" class="text-red-500" />
              <div>
                <div class="text-gray-900 dark:text-white">互动通知</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">点赞、评论、收藏提醒</div>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.interaction" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Tag :size="20" class="text-green-500" />
              <div>
                <div class="text-gray-900 dark:text-white">活动通知</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">平台活动、优惠提醒</div>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.activity" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Bell :size="20" class="text-purple-500" />
              <div>
                <div class="text-gray-900 dark:text-white">系统通知</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">系统公告、安全提醒</div>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.system" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">免打扰设置</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Moon :size="20" class="text-gray-500" />
              <div>
                <div class="text-gray-900 dark:text-white">夜间免打扰</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">22:00 - 08:00 不接收通知</div>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.nightMode" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Clock :size="20" class="text-gray-500" />
              <div>
                <div class="text-gray-900 dark:text-white">免打扰时段</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">自定义免打扰时间</div>
              </div>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">通知方式</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Smartphone :size="20" class="text-gray-500" />
              <div>
                <div class="text-gray-900 dark:text-white">推送通知</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">接收推送消息</div>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.push" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Mail :size="20" class="text-gray-500" />
              <div>
                <div class="text-gray-900 dark:text-white">邮件通知</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">接收邮件提醒</div>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.email" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>
      </div>
    </div>

    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, MessageSquare, ShoppingBag, Heart, Tag, Bell, Moon, Clock, Smartphone, Mail, ChevronRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import BottomTabBar from '../components/BottomTabBar.vue'

const router = useRouter()

const settings = ref({
  message: true,
  order: true,
  interaction: true,
  activity: true,
  system: true,
  nightMode: false,
  push: true,
  email: false
})

const goBack = () => {
  router.back()
}
</script>