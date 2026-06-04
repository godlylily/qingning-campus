<template>
  <div class="animate-pulse">
    <div v-if="type === 'product'" class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
      <div class="w-full h-40 bg-gray-200 dark:bg-gray-700"></div>
      <div class="p-3 space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div class="flex items-center justify-between">
          <div class="h-5 bg-primary-200 dark:bg-primary-500/30 rounded w-16"></div>
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        </div>
      </div>
    </div>

    <div v-else-if="type === 'user'" class="flex items-center gap-3 p-3">
      <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      <div class="flex-1 space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>

    <div v-else-if="type === 'banner'" class="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>

    <div v-else-if="type === 'text'" class="space-y-2">
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/5"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'product' | 'user' | 'banner' | 'text'
}>()
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>