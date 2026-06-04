<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
          <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 class="font-bold text-lg text-gray-800 dark:text-gray-200">帮助与反馈</h1>
      </div>
    </header>

    <main class="pt-16 px-4 py-4 space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h3 class="font-medium text-gray-800 dark:text-gray-200">常见问题</h3>
        </div>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="px-4 py-3.5"
          >
            <div 
              class="flex items-start gap-3 cursor-pointer" 
              @click="toggleFaq(index)"
            >
              <div :class="`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${faq.expanded ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`">
                <component :is="faq.expanded ? ChevronDown : ChevronRight" class="w-4 h-4" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ faq.question }}</p>
                <Transition name="expand">
                  <p v-if="faq.expanded" class="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                    {{ faq.answer }}
                  </p>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h3 class="font-medium text-gray-800 dark:text-gray-200">帮助中心</h3>
        </div>
        <div class="grid grid-cols-2">
          <button 
            v-for="item in helpItems" 
            :key="item.key"
            class="flex flex-col items-center gap-2 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            @click="handleHelpClick(item.key)"
          >
            <div :class="`w-12 h-12 rounded-xl flex items-center justify-center ${item.bgClass}`">
              <component :is="item.icon" :class="`w-6 h-6 ${item.iconClass}`" />
            </div>
            <span class="text-xs text-gray-600 dark:text-gray-400">{{ item.label }}</span>
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h3 class="font-medium text-gray-800 dark:text-gray-200">意见反馈</h3>
        </div>
        <div class="p-4">
          <textarea 
            v-model="feedback" 
            rows="4" 
            class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            placeholder="请描述您遇到的问题或建议..."
          ></textarea>
          <button 
            class="w-full mt-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            @click="submitFeedback"
          >
            提交反馈
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <h3 class="font-medium text-gray-800 dark:text-gray-200">联系我们</h3>
        </div>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <button 
            v-for="item in contactItems" 
            :key="item.key"
            class="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
          >
            <div :class="`w-9 h-9 rounded-lg flex items-center justify-center ${item.bgClass}`">
              <component :is="item.icon" :class="`w-5 h-5 ${item.iconClass}`" />
            </div>
            <div class="flex-1">
              <span class="text-gray-800 dark:text-gray-200">{{ item.label }}</span>
              <p class="text-xs text-gray-400 mt-0.5">{{ item.subtitle }}</p>
            </div>
            <ChevronRight class="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div class="text-center py-4">
        <p class="text-sm text-gray-400">版本号：v1.0.0</p>
        <p class="text-xs text-gray-400 mt-1">青柠校园集市 - 让校园生活更美好</p>
      </div>
    </main>

    <BottomTabBar :active="'profile'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  FileText,
  Phone,
  Mail,
  MessageCircle,
  Headphones,
  Info,
} from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'

const feedback = ref('')

const faqs = ref([
  { question: '如何发布商品？', answer: '您可以点击底部导航栏的"+"按钮，进入发布页面，按照提示填写商品信息并上传图片，确认无误后点击发布即可。', expanded: false },
  { question: '如何联系卖家？', answer: '在商品详情页点击"联系卖家"按钮，即可进入聊天界面与卖家沟通。', expanded: false },
  { question: '交易如何保障？', answer: '我们提供担保交易服务，买家付款后资金将由平台暂存，确认收货后再打给卖家，保障双方权益。', expanded: false },
  { question: '如何申请退款？', answer: '在订单详情页点击"申请退款"，填写退款原因并上传相关凭证，等待卖家或平台处理。', expanded: false },
  { question: '账号如何注销？', answer: '在设置页面找到"账号安全"，选择"注销账号"，按照提示操作即可。请注意，注销后数据将无法恢复。', expanded: false },
])

const helpItems = [
  { key: 'guide', icon: HelpCircle, label: '使用指南', bgClass: 'bg-primary-100 dark:bg-primary-500/20', iconClass: 'text-primary-600 dark:text-primary-400' },
  { key: 'rules', icon: FileText, label: '平台规则', bgClass: 'bg-blue-100 dark:bg-blue-500/20', iconClass: 'text-blue-600 dark:text-blue-400' },
  { key: 'privacy', icon: Headphones, label: '隐私政策', bgClass: 'bg-green-100 dark:bg-green-500/20', iconClass: 'text-green-600 dark:text-green-400' },
  { key: 'about', icon: Info, label: '关于我们', bgClass: 'bg-purple-100 dark:bg-purple-500/20', iconClass: 'text-purple-600 dark:text-purple-400' },
]

const contactItems = [
  { key: 'phone', icon: Phone, label: '客服热线', subtitle: '400-123-4567', bgClass: 'bg-green-100 dark:bg-green-500/20', iconClass: 'text-green-600 dark:text-green-400' },
  { key: 'mail', icon: Mail, label: '邮箱地址', subtitle: 'support@qingning.com', bgClass: 'bg-blue-100 dark:bg-blue-500/20', iconClass: 'text-blue-600 dark:text-blue-400' },
  { key: 'chat', icon: MessageCircle, label: '在线客服', subtitle: '工作日 9:00-21:00', bgClass: 'bg-primary-100 dark:bg-primary-500/20', iconClass: 'text-primary-600 dark:text-primary-400' },
]

const goBack = () => {
  window.history.back()
}

const toggleFaq = (index: number) => {
  faqs.value[index].expanded = !faqs.value[index].expanded
}

const handleHelpClick = (key: string) => {
  console.log('Clicked:', key)
}

const submitFeedback = () => {
  if (!feedback.value.trim()) return
  console.log('Feedback:', feedback.value)
  feedback.value = ''
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 100px;
}
</style>