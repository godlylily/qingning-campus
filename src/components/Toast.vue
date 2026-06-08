<template>
  <Teleport to="body">
    <Transition name="toast">
      <div 
        v-if="visible"
        class="fixed top-20 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg"
        :class="[
          type === 'success' ? 'bg-green-500 text-white' : '',
          type === 'error' ? 'bg-red-500 text-white' : '',
          type === 'warning' ? 'bg-orange-500 text-white' : '',
          type === 'info' ? 'bg-blue-500 text-white' : '',
        ]"
      >
        <CheckCircle v-if="type === 'success'" :size="18" />
        <XCircle v-else-if="type === 'error'" :size="18" />
        <AlertTriangle v-else-if="type === 'warning'" :size="18" />
        <Info v-else :size="18" />
        <span class="text-sm font-medium">{{ message }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-vue-next'

const props = defineProps<{
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}>()

const emit = defineEmits(['close'])

const visible = ref(false)

watch(() => props.message, (newMessage) => {
  if (newMessage) {
    visible.value = true
    setTimeout(() => {
      visible.value = false
      emit('close')
    }, props.duration || 2000)
  }
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>