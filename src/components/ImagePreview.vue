<template>
  <Transition name="fade">
    <div 
      v-if="visible" 
      class="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center"
      @click="$emit('close')"
    >
      <button 
        class="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        @click="$emit('close')"
      >
        <X class="w-6 h-6 text-white" />
      </button>
      <button 
        v-if="currentIndex > 0"
        class="absolute left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        @click.stop="prev"
      >
        <ChevronLeft class="w-6 h-6 text-white" />
      </button>
      <img 
        :src="images[currentIndex]" 
        :alt="`图片${currentIndex + 1}`" 
        class="max-w-full max-h-[80vh] object-contain"
        @click.stop
      />
      <button 
        v-if="currentIndex < images.length - 1"
        class="absolute right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
        @click.stop="next"
      >
        <ChevronRight class="w-6 h-6 text-white" />
      </button>
      <div class="absolute bottom-8 flex items-center gap-2">
        <span 
          v-for="(_, index) in images" 
          :key="index"
          class="w-2 h-2 rounded-full transition-colors" 
          :class="index === currentIndex ? 'bg-white' : 'bg-white/50'"
        ></span>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  visible: boolean
  images: string[]
}>

defineEmits<{
  close: []
}>()

const currentIndex = ref(0)

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const next = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
  }
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
</style>