<template>
  <div class="app">
    <Transition name="page" mode="out-in">
      <router-view />
    </Transition>
    <AIAssistant />
    <Toast />
    <RippleEffect />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from './stores/userStore'
import AIAssistant from './components/AIAssistant.vue'
import Toast from './components/Toast.vue'
import RippleEffect from './components/RippleEffect.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.loadDarkMode()
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>