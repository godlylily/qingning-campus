<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <div class="sticky top-0 z-50 bg-gradient-to-r from-purple-500 to-pink-500">
      <div class="flex items-center justify-between px-4 py-4">
        <button 
          @click="goBack"
          class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
        >
          <ArrowLeft :size="20" class="text-white" />
        </button>
        <h1 class="font-bold text-white text-lg">校园论坛</h1>
        <button 
          @click="createPost"
          class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
        >
          <Plus :size="20" class="text-white" />
        </button>
      </div>
    </div>

    <div class="px-4 py-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-gray-900 dark:text-white">热门话题</h3>
          <span class="text-sm text-purple-500">更多</span>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <span 
            v-for="topic in hotTopics" 
            :key="topic.id"
            class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-sm rounded-full"
          >
            #{{ topic.name }}
          </span>
        </div>
      </div>
    </div>

    <div class="px-4 py-2">
      <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        <button 
          v-for="tab in tabs" 
          :key="tab.key"
          @click="currentTab = tab.key"
          class="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
          :class="currentTab === tab.key ? 'bg-purple-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="px-4 py-4 space-y-4">
      <div 
        v-for="(post, index) in posts" 
        :key="post.id"
        class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-card animate-slide-up"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="p-4">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img :src="post.user.avatar" :alt="post.user.nickname" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-medium text-gray-900 dark:text-white">{{ post.user.nickname }}</span>
                <span v-if="post.user.isVerified" class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <BadgeCheck :size="12" class="text-white" />
                </span>
              </div>
              <span class="text-xs text-gray-500">{{ post.time }}</span>
            </div>
          </div>
          
          <div class="mb-3">
            <h3 class="font-medium text-gray-900 dark:text-white mb-2">{{ post.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{{ post.content }}</p>
          </div>

          <div v-if="post.images && post.images.length > 0" class="mb-3">
            <div 
              class="grid gap-2"
              :class="post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'"
            >
              <img 
                v-for="(img, idx) in post.images" 
                :key="idx"
                :src="img" 
                :alt="post.title" 
                class="w-full rounded-xl object-cover"
                :class="post.images.length === 1 ? 'h-48' : 'h-28'"
              />
            </div>
          </div>

          <div v-if="post.type === 'activity'" class="mb-3">
            <div class="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Calendar :size="24" class="text-white" />
              </div>
              <div>
                <div class="font-medium text-gray-900">{{ post.activityTitle }}</div>
                <div class="text-xs text-gray-500">{{ post.activityTime }} | {{ post.activityLocation }}</div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
            <button class="flex items-center gap-1 text-gray-500 hover:text-purple-500 transition-colors">
              <Heart :size="18" />
              <span class="text-sm">{{ post.likes }}</span>
            </button>
            <button class="flex items-center gap-1 text-gray-500 hover:text-purple-500 transition-colors">
              <MessageCircle :size="18" />
              <span class="text-sm">{{ post.comments }}</span>
            </button>
            <button class="flex items-center gap-1 text-gray-500 hover:text-purple-500 transition-colors">
              <Share2 :size="18" />
              <span class="text-sm">{{ post.shares }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <BottomTabBar />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeft, Plus, Heart, MessageCircle, Share2, BadgeCheck, Calendar } from 'lucide-vue-next'
import BottomTabBar from '../components/BottomTabBar.vue'
import { generateAvatar, p } from '../data/mockData'

const tabs = [
  { key: 'hot', label: '热门' },
  { key: 'fresh', label: '最新' },
  { key: 'activity', label: '活动' },
  { key: 'lost', label: '失物招领' },
]

const currentTab = ref('hot')

const hotTopics = ref([
  { id: '1', name: '考研加油' },
  { id: '2', name: '期末复习' },
  { id: '3', name: '校园美食' },
  { id: '4', name: '社团招新' },
  { id: '5', name: '校园恋爱' },
  { id: '6', name: '毕业季' },
])

const posts = ref([
  {
    id: '1',
    type: 'normal',
    title: '食堂三楼新开的麻辣香锅太好吃了！',
    content: '今天去试了一下，味道绝了！推荐给大家，记得早点去排队哦',
    images: [p('麻辣香锅')],
    likes: 128,
    comments: 45,
    shares: 23,
    time: '2小时前',
    user: {
      nickname: '干饭达人',
      avatar: generateAvatar('干饭达人'),
      isVerified: true
    }
  },
  {
    id: '2',
    type: 'activity',
    title: '周五晚校园音乐节',
    content: '一年一度的校园音乐节来了！今年阵容超强大，有乐队表演和抽奖环节',
    activityTitle: '校园音乐节',
    activityTime: '本周五 19:00',
    activityLocation: '操场舞台',
    likes: 356,
    comments: 89,
    shares: 156,
    time: '5小时前',
    user: {
      nickname: '学生会',
      avatar: generateAvatar('学生会'),
      isVerified: true
    }
  },
  {
    id: '3',
    type: 'normal',
    title: '图书馆占座问题讨论',
    content: '最近图书馆占座现象越来越严重了，大家怎么看？建议学校出台相关规定',
    images: [],
    likes: 456,
    comments: 234,
    shares: 67,
    time: '昨天',
    user: {
      nickname: '学霸君',
      avatar: generateAvatar('学霸君'),
      isVerified: false
    }
  },
  {
    id: '4',
    type: 'normal',
    title: '宿舍楼下的流浪猫生小猫了！',
    content: '太可爱了，有五只小奶猫，想领养的同学可以联系我',
    images: [
      p('小猫咪'),
      p('猫妈妈')
    ],
    likes: 892,
    comments: 156,
    shares: 234,
    time: '2天前',
    user: {
      nickname: '猫奴小萌',
      avatar: generateAvatar('猫奴小萌'),
      isVerified: false
    }
  }
])

const goBack = () => {
  window.history.back()
}

const createPost = () => {
  alert('发布帖子')
}
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.animate-slide-up {
  animation: slideUp 0.4s ease-out forwards;
  opacity: 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>