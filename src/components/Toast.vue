<template>
  <Transition name="toast">
    <div 
      v-if="visible" 
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] flex items-center gap-3 px-5 py-3 bg-gray-900/90 dark:bg-gray-800/95 backdrop-blur-md rounded-full shadow-2xl"
    >
      <component :is="icon" :class="['w-5 h-5', iconColor]" />
      <span class="text-white dark:text-gray-200 font-medium">{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-vue-next'

defineProps<{
  visible: boolean
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
}>()

const props = defineProps<{
  visible: boolean
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
}>()

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const colors = {
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400',
}

const icon = computed(() => icons[props.type || 'info'])
const iconColor = computed(() => colors[props.type || 'info'])
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}

.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
</style>