<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-sm">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <button class="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" @click="goBack">
          <ArrowLeft class="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h1 class="font-bold text-lg text-gray-800 dark:text-gray-200">发布商品</h1>
        <button 
          class="px-4 py-1.5 bg-primary-500 text-white rounded-full text-sm font-medium transition-all hover:bg-primary-600 active:scale-95"
          :disabled="!canSubmit"
          :class="canSubmit ? '' : 'opacity-50 cursor-not-allowed'"
          @click="submitProduct"
        >
          发布
        </button>
      </div>
    </header>

    <main class="pt-16 px-4 py-4 space-y-4">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <ImageIcon class="w-5 h-5 text-gray-400" />
          上传图片
        </h3>
        <div class="flex gap-3 flex-wrap">
          <div 
            v-for="(image, index) in images" 
            :key="index"
            class="relative w-24 h-24 rounded-xl overflow-hidden"
          >
            <img :src="image" :alt="`图片${index + 1}`" class="w-full h-full object-cover" />
            <button 
              class="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              @click="removeImage(index)"
            >
              <X class="w-4 h-4 text-white" />
            </button>
          </div>
          <button 
            v-if="images.length < 9" 
            class="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-1 hover:border-primary-500 transition-colors"
            @click="addImage"
          >
            <Plus class="w-6 h-6 text-gray-400" />
            <span class="text-xs text-gray-400">添加图片</span>
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <FileText class="w-5 h-5 text-gray-400" />
          商品标题
        </h3>
        <input 
          v-model="form.title" 
          type="text" 
          class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="请输入商品标题" 
          maxlength="50"
        />
        <p class="text-xs text-gray-400 mt-1 text-right">{{ form.title.length }}/50</p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <Tags class="w-5 h-5 text-gray-400" />
          商品分类
        </h3>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="category in categories" 
            :key="category.id"
            class="px-4 py-2 rounded-full text-sm transition-all" 
            :class="form.category === category.name 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'"
            @click="form.category = category.name"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <DollarSign class="w-5 h-5 text-gray-400" />
          商品价格
        </h3>
        <div class="flex items-center gap-3">
          <span class="text-2xl text-gray-400">¥</span>
          <input 
            v-model="form.price" 
            type="number" 
            class="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500 text-xl"
            placeholder="0.00"
          />
          <div class="flex items-center gap-2">
            <input 
              v-model="form.originalPrice" 
              type="number" 
              class="w-32 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="原价"
            />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <Star class="w-5 h-5 text-gray-400" />
          成色选择
        </h3>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="condition in conditions" 
            :key="condition"
            class="px-4 py-2 rounded-full text-sm transition-all" 
            :class="form.condition === condition 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'"
            @click="form.condition = condition"
          >
            {{ condition }}
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <MapPin class="w-5 h-5 text-gray-400" />
          校区选择
        </h3>
        <select 
          v-model="form.campus" 
          class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">请选择校区</option>
          <option v-for="campus in campuses" :key="campus" :value="campus">
            {{ campus }}
          </option>
        </select>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
        <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <AlignLeft class="w-5 h-5 text-gray-400" />
          商品描述
        </h3>
        <textarea 
          v-model="form.description" 
          rows="4" 
          class="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          placeholder="请描述商品的详细信息..."
          maxlength="500"
        ></textarea>
        <p class="text-xs text-gray-400 mt-1 text-right">{{ form.description.length }}/500</p>
      </div>
    </main>

    <Transition name="fade">
      <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center max-w-sm w-full animate-bounce-in">
          <div class="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle class="w-10 h-10 text-green-500" />
          </div>
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">发布成功</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">您的商品已成功发布，等待审核</p>
          <div class="flex gap-3">
            <button 
              class="flex-1 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              @click="continuePublish"
            >
              继续发布
            </button>
            <button 
              class="flex-1 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors"
              @click="goToHome"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import {
  ArrowLeft,
  Image as ImageIcon,
  X,
  Plus,
  FileText,
  Tags,
  DollarSign,
  Star,
  MapPin,
  AlignLeft,
  CheckCircle,
} from 'lucide-vue-next'
import { categories, campuses, p } from '../data/mockData'

const router = useRouter()
const productStore = useProductStore()

const images = ref<string[]>([])
const showSuccessModal = ref(false)

const conditions = ['全新', '九成新', '八成新', '七成新', '五成新', '其他']

const form = ref({
  title: '',
  category: '',
  price: '',
  originalPrice: '',
  condition: '',
  campus: '',
  description: '',
})

const canSubmit = computed(() => {
  return form.value.title && 
         form.value.category && 
         form.value.price && 
         form.value.condition && 
         form.value.campus
})

const goBack = () => {
  router.back()
}

const addImage = () => {
  if (images.value.length < 9) {
    const dummyImage = p(form.value.title || '商品图片')
    images.value.push(dummyImage)
  }
}

const removeImage = (index: number) => {
  images.value.splice(index, 1)
}

const submitProduct = () => {
  if (!canSubmit.value) return
  
  const newProduct = {
    id: Date.now().toString(),
    title: form.value.title,
    description: form.value.description,
    price: Number(form.value.price),
    originalPrice: form.value.originalPrice ? Number(form.value.originalPrice) : undefined,
    images: images.value.length > 0 ? images.value : [p(form.value.title)],
    category: form.value.category,
    condition: form.value.condition,
    campus: form.value.campus,
    views: 0,
    likes: 0,
    wants: 0,
    isCollected: false,
    isLiked: false,
    seller: productStore.products[0].seller,
    tags: form.value.title.split(' ').slice(0, 3),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  
  productStore.addProduct(newProduct)
  showSuccessModal.value = true
}

const continuePublish = () => {
  showSuccessModal.value = false
  images.value = []
  form.value = {
    title: '',
    category: '',
    price: '',
    originalPrice: '',
    condition: '',
    campus: '',
    description: '',
  }
}

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.05);
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
  animation: bounce-in 0.5s ease-out;
}
</style>