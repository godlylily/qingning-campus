<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-cyan-500">
      <div class="flex items-center justify-between px-4 py-4">
        <button 
          @click="goBack"
          class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ArrowLeft :size="20" class="text-white" />
        </button>
        <h1 class="font-bold text-white text-lg">校园认证</h1>
        <div class="w-10"></div>
      </div>
    </div>

    <div class="px-4 py-6">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card">
        <div class="text-center mb-6">
          <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <GraduationCap :size="40" class="text-white" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">学生认证</h3>
          <p class="text-gray-500 dark:text-gray-400 mt-2">完成认证后可享受更多功能</p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="text-sm text-gray-500 dark:text-gray-400 mb-2 block">学校名称</label>
            <div class="relative">
              <input 
                v-model="form.school"
                type="text"
                placeholder="搜索学校名称"
                class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search :size="18" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <div v-if="showSchoolList" class="mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 max-h-48 overflow-y-auto">
              <button 
                v-for="school in filteredSchools" 
                :key="school"
                @click="selectSchool(school)"
                class="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {{ school }}
              </button>
            </div>
          </div>

          <div>
            <label class="text-sm text-gray-500 dark:text-gray-400 mb-2 block">学号</label>
            <input 
              v-model="form.studentId"
              type="text"
              placeholder="请输入学号"
              class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="text-sm text-gray-500 dark:text-gray-400 mb-2 block">真实姓名</label>
            <input 
              v-model="form.realName"
              type="text"
              placeholder="请输入真实姓名"
              class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="text-sm text-gray-500 dark:text-gray-400 mb-2 block">上传学生证照片</label>
            <div class="grid grid-cols-2 gap-3 mt-2">
              <button 
                v-if="!form.studentCardFront"
                @click="uploadFront"
                class="aspect-[4/3] bg-gray-100 dark:bg-gray-700 rounded-xl flex flex-col items-center justify-center gap-2"
              >
                <Upload :size="24" class="text-gray-400" />
                <span class="text-xs text-gray-500">正面照片</span>
              </button>
              <div v-else class="aspect-[4/3] rounded-xl overflow-hidden">
                <img :src="form.studentCardFront" alt="学生证正面" class="w-full h-full object-cover" />
              </div>
              
              <button 
                v-if="!form.studentCardBack"
                @click="uploadBack"
                class="aspect-[4/3] bg-gray-100 dark:bg-gray-700 rounded-xl flex flex-col items-center justify-center gap-2"
              >
                <Upload :size="24" class="text-gray-400" />
                <span class="text-xs text-gray-500">背面照片</span>
              </button>
              <div v-else class="aspect-[4/3] rounded-xl overflow-hidden">
                <img :src="form.studentCardBack" alt="学生证背面" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <button 
          @click="submitVerification"
          :disabled="!canSubmit"
          class="w-full mt-6 py-4 rounded-xl font-medium transition-all duration-300"
          :class="canSubmit ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'"
        >
          提交认证
        </button>

        <p class="text-xs text-gray-500 text-center mt-4">
          提交后将在1-3个工作日内完成审核
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card mt-4">
        <h3 class="font-bold text-gray-900 dark:text-white mb-3">为什么要认证？</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <ShieldCheck :size="16" class="text-green-500" />
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-300">保障交易安全，建立信任关系</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Star :size="16" class="text-blue-500" />
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-300">获得信誉积分，提升账号等级</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Gift :size="16" class="text-purple-500" />
            </div>
            <span class="text-sm text-gray-600 dark:text-gray-300">解锁更多功能和专属权益</span>
          </div>
        </div>
      </div>
    </div>

    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowLeft, GraduationCap, Search, Upload, ShieldCheck, Star, Gift } from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'

const schools = [
  '清华大学',
  '北京大学',
  '浙江大学',
  '上海交通大学',
  '复旦大学',
  '南京大学',
  '中国人民大学',
  '武汉大学',
  '西安交通大学',
  '华中科技大学',
]

const form = ref({
  school: '',
  studentId: '',
  realName: '',
  studentCardFront: '',
  studentCardBack: ''
})

const showSchoolList = ref(false)

const filteredSchools = computed(() => {
  if (!form.value.school.trim()) return schools
  const query = form.value.school.toLowerCase()
  return schools.filter(s => s.toLowerCase().includes(query))
})

const canSubmit = computed(() => {
  return form.value.school.trim() !== '' && 
         form.value.studentId.trim() !== '' && 
         form.value.realName.trim() !== '' && 
         form.value.studentCardFront !== '' && 
         form.value.studentCardBack !== ''
})

const goBack = () => {
  window.history.back()
}

const selectSchool = (school: string) => {
  form.value.school = school
  showSchoolList.value = false
}

const uploadFront = () => {
  form.value.studentCardFront = 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=student%20ID%20card%20front%20view%20with%20photo%20and%20information&image_size=portrait_4_3'
}

const uploadBack = () => {
  form.value.studentCardBack = 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=student%20ID%20card%20back%20view%20with%20barcode&image_size=portrait_4_3'
}

const submitVerification = () => {
  if (!canSubmit.value) return
  alert('认证申请已提交，请等待审核')
}
</script>