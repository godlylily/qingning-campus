<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
          <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 class="font-bold text-lg text-gray-800 dark:text-gray-200">校园认证</h1>
      </div>
    </header>

    <main class="pt-16 px-4 py-8">
      <div v-if="!isVerified" class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div class="text-center mb-6">
            <div class="w-20 h-20 bg-primary-100 dark:bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap class="w-10 h-10 text-primary-500" />
            </div>
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">学生认证</h2>
            <p class="text-gray-500 dark:text-gray-400 mt-2">完成认证后可享受更多权益</p>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">学校</label>
              <select 
                v-model="form.school" 
                class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">请选择学校</option>
                <option v-for="campus in campuses" :key="campus" :value="campus">
                  {{ campus }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">学号</label>
              <input 
                v-model="form.studentId" 
                type="text" 
                class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="请输入学号"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">真实姓名</label>
              <input 
                v-model="form.realName" 
                type="text" 
                class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="请输入真实姓名"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">上传学生证（选填）</label>
              <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-primary-500 transition-colors cursor-pointer">
                <Upload class="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p class="text-gray-500 dark:text-gray-400 text-sm">点击上传学生证照片</p>
                <p class="text-gray-400 text-xs mt-1">支持 JPG、PNG 格式</p>
              </div>
            </div>
          </div>

          <button 
            class="w-full mt-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            @click="submitVerification"
          >
            提交认证
          </button>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
          <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <Shield class="w-5 h-5 text-gray-400" />
            认证权益
          </h3>
          <ul class="space-y-2">
            <li class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle class="w-4 h-4 text-primary-500" />
              获得认证标识，增加可信度
            </li>
            <li class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle class="w-4 h-4 text-primary-500" />
              优先获得平台推荐
            </li>
            <li class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle class="w-4 h-4 text-primary-500" />
              享受专属优惠活动
            </li>
            <li class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckCircle class="w-4 h-4 text-primary-500" />
              参与校园活动优先资格
            </li>
          </ul>
        </div>
      </div>

      <div v-else class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm text-center">
        <div class="w-24 h-24 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
          <CheckCircle class="w-12 h-12 text-green-500" />
        </div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">认证成功</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-6">您已完成校园认证，享受专属权益</p>
        <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-500 dark:text-gray-400">认证学校</span>
            <span class="font-medium text-gray-800 dark:text-gray-200">{{ form.school }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-500 dark:text-gray-400">学号</span>
            <span class="font-medium text-gray-800 dark:text-gray-200">{{ form.studentId }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowLeft,
  GraduationCap,
  Upload,
  Shield,
  CheckCircle,
} from 'lucide-vue-next'
import { campuses } from '../data/mockData'

const router = useRouter()

const isVerified = ref(false)

const form = ref({
  school: '',
  studentId: '',
  realName: '',
})

const goBack = () => {
  router.back()
}

const submitVerification = () => {
  if (!form.value.school || !form.value.studentId || !form.value.realName) {
    return
  }
  
  isVerified.value = true
}
</script>

<style scoped>
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-bounce-in {
  animation: bounce-in 0.6s ease-out;
}
</style>