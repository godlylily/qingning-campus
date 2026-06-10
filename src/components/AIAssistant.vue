<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-end justify-end pointer-events-none">
    <div class="pointer-events-auto w-full max-w-md h-[85vh] bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
      <div class="bg-gradient-to-r from-primary-500 via-primary-600 to-green-500 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot :size="24" class="text-white" />
          </div>
          <div>
            <h3 class="text-white font-bold">青柠AI小助手</h3>
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
              <span class="text-white/80 text-xs">在线</span>
            </div>
          </div>
        </div>
        <button @click="closeChat" class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
          <Minus :size="18" class="text-white" />
        </button>
      </div>

      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        <div class="flex items-start gap-3 animate-fade-in">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-green-500 flex items-center justify-center flex-shrink-0">
            <Bot :size="16" class="text-white" />
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[80%]">
            <p class="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
              👋 嗨！我是青柠AI小助手，专为校园生活服务的智能助手！有什么我可以帮你的吗？
            </p>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 animate-fade-in" style="animation-delay: 0.3s;">
          <button 
            v-for="(suggestion, index) in suggestions" 
            :key="index"
            @click="sendSuggestion(suggestion)"
            class="px-3 py-2 bg-white dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-600 transition-all duration-300 active:scale-95"
          >
            {{ suggestion }}
          </button>
        </div>

        <div 
          v-for="(message, index) in messages" 
          :key="index"
          class="flex items-start gap-3 animate-fade-in"
          :class="message.isUser ? 'flex-row-reverse' : ''"
        >
          <div 
            v-if="!message.isUser" 
            class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-green-500 flex items-center justify-center flex-shrink-0"
          >
            <Bot :size="16" class="text-white" />
          </div>
          <div 
            v-else 
            class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary-100"
          >
            <img :src="userStore.currentUser.avatar" :alt="userStore.currentUser.nickname" class="w-full h-full object-cover" />
          </div>
          <div 
            class="max-w-[80%] p-3 rounded-2xl shadow-sm"
            :class="message.isUser ? 'bg-gradient-to-r from-primary-500 to-green-500 text-white rounded-tr-none' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'"
          >
            <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ message.content }}</p>
            <span class="text-xs opacity-60 mt-1 block">{{ message.time }}</span>
          </div>
        </div>

        <div v-if="isTyping" class="flex items-start gap-3 animate-fade-in">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-green-500 flex items-center justify-center flex-shrink-0">
            <Bot :size="16" class="text-white" />
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-3 shadow-sm">
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 0ms;"></span>
              <span class="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 150ms;"></span>
              <span class="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 300ms;"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="flex-1 relative">
            <input 
              v-model="inputMessage"
              @keyup.enter="sendMessage"
              type="text" 
              placeholder="输入你的问题..."
              class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            />
          </div>
          <button 
            @click="sendMessage"
            :disabled="!inputMessage.trim() || isTyping"
            class="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-green-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            <Send :size="20" class="text-white" />
          </button>
        </div>
        <div class="flex items-center justify-center gap-1 mt-3 text-xs text-gray-400">
          <Sparkles :size="12" class="text-primary-500" />
          <span>AI助手仅提供参考信息，请谨慎判断</span>
        </div>
      </div>
    </div>
  </div>

  <button 
    v-if="!isOpen"
    @click="openChat"
    class="fixed bottom-28 right-4 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-green-500 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center animate-bounce-subtle"
    style="animation-duration: 2s;"
  >
    <Bot :size="28" class="text-white" />
    <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
      <span class="text-white text-xs font-bold">1</span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useUserStore } from '../stores/userStore'
import { Bot, Send, Minus, Sparkles } from 'lucide-vue-next'

const userStore = useUserStore()

const isOpen = ref(false)
const inputMessage = ref('')
const isTyping = ref(false)
const messages = ref<Array<{content: string, isUser: boolean, time: string}>>([])

const suggestions = [
  '如何发布商品？',
  '校园跑腿怎么用？',
  '如何进行校园认证？',
  '有哪些闲置可以免费领？'
]

const aiResponses: Record<string, string[]> = {
  '如何发布商品？': [
    '发布商品很简单！🎉\n\n1. 点击底部"发布"按钮\n2. 上传商品图片（最多9张）\n3. 填写商品标题和描述\n4. 选择分类和成色\n5. 设置价格\n6. 点击发布即可！',
    '来，教你快速发布！📱\n\n1. 进入"发布"页面\n2. 拍照或从相册选择商品图片\n3. 填写详细信息\n4. 设定合理价格\n5. 发布后等待买家咨询～'
  ],
  '校园跑腿怎么用？': [
    '校园跑腿是我们的特色功能！🚴\n\n1. 进入"跑腿"专区\n2. 发布跑腿任务（取快递、代买等）\n3. 设置赏金金额\n4. 等待同学接单\n5. 任务完成后确认完成',
    '跑腿功能超方便！✨\n\n可以帮您：\n• 代取快递\n• 代买食堂饭菜\n• 代打印资料\n• 校园跑腿随叫随到！'
  ],
  '如何进行校园认证？': [
    '校园认证让交易更安心！🎓\n\n1. 进入"我的"页面\n2. 点击"校园认证"\n3. 填写学号和学校信息\n4. 上传学生证照片\n5. 等待审核通过\n\n认证成功后会有专属标识哦！',
    '认证步骤：📋\n\n1. 点击头像下方的"校园认证"\n2. 填写真实学籍信息\n3. 上传学生证/一卡通\n4. 审核通过后显示认证标识\n\n认证用户更受信任，交易成功率更高！'
  ],
  '有哪些闲置可以免费领？': [
    '免费专区有很多好物！🎁\n\n1. 点击首页"免费区"\n2. 浏览学长学姐送的闲置\n3. 看到喜欢的就"领取"吧\n4. 联系对方取货\n\n书籍、衣物、小电器...统统免费！',
    '免费专区太香了！💝\n\n• 毕业季免费送专区\n• 教材循环利用\n• 宿舍神器免费领\n• 旧衣物捐赠\n\n既环保又省钱，快去看看吧！'
  ]
}

const defaultResponses = [
  '好的，我来帮你解答！😊 请问你能具体描述一下你的问题吗？',
  '理解你的需求了！🤔 关于这个，我可以给你一些建议，但建议你也咨询一下官方客服获取最准确的信息。',
  '这个问题问得好！💡 让我来帮你分析一下... 建议您可以先查看APP内的相关教程，如有疑问可以联系客服。',
  '感谢你的提问！🙏 关于这个问题，建议你：\n1. 查看相关功能的使用说明\n2. 咨询在线客服\n3. 拨打官方客服热线\n\n我会尽力帮助你的！',
  '很高兴为你解答！🌟 如果还有其他问题，随时问我哦～'
]

const openChat = () => {
  isOpen.value = true
}

const closeChat = () => {
  isOpen.value = false
}

const sendMessage = () => {
  if (!inputMessage.value.trim() || isTyping.value) return

  const userMessage = inputMessage.value.trim()
  messages.value.push({
    content: userMessage,
    isUser: true,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  })
  inputMessage.value = ''

  scrollToBottom()

  isTyping.value = true

  setTimeout(() => {
    isTyping.value = false
    
    let response = ''
    const lowerMsg = userMessage.toLowerCase()
    
    for (const [key, responses] of Object.entries(aiResponses)) {
      if (lowerMsg.includes(key.replace('如何', '').replace('怎么', '').replace('有哪些', ''))) {
        response = responses[Math.floor(Math.random() * responses.length)]
        break
      }
    }
    
    if (!response) {
      response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
    }

    messages.value.push({
      content: response,
      isUser: false,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    })

    scrollToBottom()
  }, 1000 + Math.random() * 1000)
}

const sendSuggestion = (suggestion: string) => {
  inputMessage.value = suggestion
  sendMessage()
}

const scrollToBottom = () => {
  nextTick(() => {
    const container = document.querySelector('.overflow-y-auto')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}
</script>

<style scoped>
@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>