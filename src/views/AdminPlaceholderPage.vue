<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-5 px-4" style="background: var(--page-bg)">
    <div class="w-20 h-20 rounded-full bg-[#f1f5f9] flex items-center justify-center">
      <i class="pi pi-hammer text-4xl text-gray-400" />
    </div>
    <div class="text-center flex flex-col gap-1">
      <h1 class="text-2xl font-bold text-[#334155]">商城後台</h1>
      <p class="text-sm" style="color: var(--text-muted)">後台系統開發中，敬請期待</p>
    </div>
    <Button label="返回首頁" icon="pi pi-arrow-left" outlined @click="router.push('/')" />
  </div>
</template>
