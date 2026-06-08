<template>
  <Teleport to="body">
    <div 
      v-if="ripples.length > 0"
      class="fixed inset-0 pointer-events-none z-[9999]"
    >
      <span 
        v-for="ripple in ripples" 
        :key="ripple.id"
        class="absolute rounded-full bg-primary-500/30 animate-ripple"
        :style="{
          left: ripple.x + 'px',
          top: ripple.y + 'px',
          width: '10px',
          height: '10px',
        }"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const ripples = ref<Array<{id: number, x: number, y: number}>>([])

const addRipple = (x: number, y: number) => {
  const id = Date.now()
  ripples.value.push({ id, x, y })
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== id)
  }, 600)
}

defineExpose({ addRipple })
</script>

<style scoped>
@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(40);
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 0.6s ease-out forwards;
}
</style>