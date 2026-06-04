<template>
  <div 
    class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-card cursor-pointer transition-all duration-300 hover:shadow-medium hover:-translate-y-1.5 group"
    @click="$emit('click')"
  >
    <div class="relative overflow-hidden">
      <img 
        :src="product.images[0]" 
        :alt="product.title" 
        class="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div class="absolute top-2 left-2 flex flex-wrap gap-1">
        <span 
          v-for="tag in product.tags.slice(0, 2)" 
          :key="tag"
          class="px-2 py-0.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-300 rounded-full"
        >
          {{ tag }}
        </span>
      </div>
      <div 
        v-if="product.originalPrice" 
        class="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full"
      >
        {{ Math.round((1 - product.price / product.originalPrice) * 100) }}%
      </div>
      <div 
        class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2"
        :class="product.isCollected ? '' : 'opacity-0 group-hover:opacity-100'"
      >
        <button 
          class="w-full py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
          @click.stop="toggleCollect"
        >
          <Heart :class="['w-4 h-4', product.isCollected ? 'fill-white' : '']" />
          {{ product.isCollected ? '已收藏' : '收藏' }}
        </button>
      </div>
    </div>
    <div class="p-3">
      <h3 class="font-medium text-gray-800 dark:text-gray-200 text-sm line-clamp-2 mb-2">
        {{ product.title }}
      </h3>
      <div class="flex items-center gap-1 mb-2">
        <span class="text-xs text-gray-400">{{ product.campus }}</span>
        <span class="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
        <span class="text-xs text-gray-400">{{ product.condition }}</span>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-baseline gap-1">
          <span class="text-primary-500 font-bold">¥{{ product.price }}</span>
          <span 
            v-if="product.originalPrice" 
            class="text-xs text-gray-400 line-through"
          >
            ¥{{ product.originalPrice }}
          </span>
        </div>
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <span class="flex items-center gap-1">
            <Eye class="w-3 h-3" />
            {{ product.views }}
          </span>
          <span class="flex items-center gap-1">
            <Heart class="w-3 h-3" />
            {{ product.likes }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heart, Eye } from 'lucide-vue-next'
import type { Product } from '../types'
import { useProductStore } from '../stores/productStore'

const props = defineProps<{
  product: Product
}>()

defineEmits<{
  click: []
}>()

const productStore = useProductStore()

const toggleCollect = () => {
  productStore.toggleCollect(props.product.id)
}
</script>