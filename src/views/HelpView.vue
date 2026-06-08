<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="sticky top-0 z-50 bg-gradient-to-r from-green-500 to-emerald-500">
      <div class="flex items-center px-4 py-4">
        <button @click="goBack" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowLeft :size="20" class="text-white" />
        </button>
        <h1 class="font-bold text-white text-lg ml-4">帮助与反馈</h1>
      </div>
    </div>

    <div class="px-4 py-4 space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">常见问题</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="px-4 py-4">
            <div class="font-medium text-gray-900 dark:text-white mb-2">如何发布商品？</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">点击首页的"+"按钮，填写商品信息、上传图片，即可发布商品。</div>
          </div>

          <div class="px-4 py-4">
            <div class="font-medium text-gray-900 dark:text-white mb-2">如何联系卖家？</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">在商品详情页点击"联系卖家"，即可进入聊天界面与卖家沟通。</div>
          </div>

          <div class="px-4 py-4">
            <div class="font-medium text-gray-900 dark:text-white mb-2">如何完成交易？</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">买卖双方协商后，可以选择线下交易或使用平台担保交易。</div>
          </div>

          <div class="px-4 py-4">
            <div class="font-medium text-gray-900 dark:text-white mb-2">如何申请退款？</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">在订单详情页点击"申请退款"，填写退款原因并提交申请。</div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">联系方式</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <MessageSquare :size="20" class="text-green-500" />
              <div>
                <div class="text-gray-900 dark:text-white">在线客服</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">7x24小时在线</div>
              </div>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Phone :size="20" class="text-blue-500" />
              <div>
                <div class="text-gray-900 dark:text-white">客服电话</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">400-123-4567</div>
              </div>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Mail :size="20" class="text-purple-500" />
              <div>
                <div class="text-gray-900 dark:text-white">客服邮箱</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">support@qingning.com</div>
              </div>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">意见反馈</div>
        </div>
        
        <div class="p-4">
          <textarea 
            v-model="feedback"
            placeholder="请输入您的意见或建议..."
            rows="5"
            class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          ></textarea>
          <button 
            @click="submitFeedback"
            class="w-full mt-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium"
          >
            提交反馈
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div class="font-medium text-gray-900 dark:text-white">更多帮助</div>
        </div>
        
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <BookOpen :size="20" class="text-blue-500" />
              <span class="text-gray-900 dark:text-white">使用指南</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <Video :size="20" class="text-red-500" />
              <span class="text-gray-900 dark:text-white">视频教程</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <FileText :size="20" class="text-green-500" />
              <span class="text-gray-900 dark:text-white">用户协议</span>
            </div>
            <ChevronRight :size="16" class="text-gray-400" />
          </div>

          <div class="flex items-center justify-between px-4 py-4">
            <div class="flex items-center gap-3">
              <ShieldCheck :size="20" class="text-purple-500" />
              <span class="text-gray-900 dark:text-white">隐私政策</span>
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
import { ref } from 'vue'
import { ArrowLeft, MessageSquare, Phone, Mail, BookOpen, Video, FileText, ShieldCheck, ChevronRight } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import BottomTabBar from '../components/BottomTabBar.vue'

const router = useRouter()
const feedback = ref('')

const submitFeedback = () => {
  if (feedback.value.trim()) {
    alert('感谢您的反馈！我们会认真处理。')
    feedback.value = ''
  }
}

const goBack = () => {
  router.back()
}
</script>