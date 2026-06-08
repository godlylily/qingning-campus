<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="sticky top-0 z-50 bg-gradient-to-r from-green-500 to-emerald-500">
      <div class="flex items-center px-4 py-4">
        <button @click="goBack" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft :size="20" class="text-white" />
        </button>
        <h1 class="font-bold text-white text-lg ml-4">账号与安全</h1>
      </div>
    </div>

    <div class="px-4 py-4 space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Shield :size="20" class="text-green-500" />
            </div>
            <div>
              <div class="font-medium text-gray-900 dark:text-white">账号安全等级</div>
              <div class="text-sm text-green-500">高</div>
            </div>
          </div>
          <BadgeCheck :size="24" class="text-green-500" />
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">账号信息</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <User :size="20" class="text-gray-500" />
              <span class="text-gray-900 dark:text-white">用户名</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">{{ userStore.currentUser.nickname }}</span>
              <ChevronRight :size="16" class="text-gray-400" />
            </div>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Phone :size="20" class="text-gray-500" />
              <span class="text-gray-900 dark:text-white">手机号</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">138****8888</span>
              <ChevronRight :size="16" class="text-gray-400" />
            </div>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Mail :size="20" class="text-gray-500" />
              <span class="text-gray-900 dark:text-white">邮箱</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">user@example.com</span>
              <ChevronRight :size="16" class="text-gray-400" />
            </div>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <GraduationCap :size="20" class="text-gray-500" />
              <span class="text-gray-900 dark:text-white">学校</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">{{ userStore.currentUser.school }}</span>
              <ChevronRight :size="16" class="text-gray-400" />
            </div>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <IdCard :size="20" class="text-gray-500" />
              <span class="text-gray-900 dark:text-white">学号</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-500 dark:text-gray-400">{{ userStore.currentUser.studentId }}</span>
              <ChevronRight :size="16" class="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">安全设置</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Lock :size="20" class="text-gray-500" />
              <span class="text-gray-900 dark:text-white">修改密码</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Shield :size="20" class="text-gray-500" />
              <span class="text-gray-900 dark:text-white">登录保护</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-green-500 text-sm">已开启</span>
              <ChevronRight :size="16" class="text-gray-400" />
            </div>
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Eye :size="20" class="text-gray-500" />
              <span class="text-gray-900 dark:text-white">隐私设置</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <History :size="20" class="text-gray-500" />
              <span class="text-gray-900 dark:text-white">登录记录</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">账号操作</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <UserX :size="20" class="text-gray-500" />
              <span class="text-gray-900 dark:text-white">注销账号</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>
        </div>
      </div>
    </div>

    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Shield, BadgeCheck, User, Phone, Mail, GraduationCap, IdCard, Lock, Eye, History, UserX, ChevronRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import BottomTabBar from '../components/BottomTabBar.vue'

const router = useRouter()
const userStore = useUserStore()

const goBack = () => {
  router.back()
}
</script>