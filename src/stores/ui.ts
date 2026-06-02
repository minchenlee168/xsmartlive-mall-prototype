import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const toastVisible = ref(false)
  const toastMessage = ref('')
  let timer: ReturnType<typeof setTimeout> | null = null

  function toast(message: string) {
    toastMessage.value = message
    toastVisible.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { toastVisible.value = false }, 2500)
  }

  // 換頁 loading 狀態（由 router 導航守衛切換）
  const routeLoading = ref(false)
  function setRouteLoading(v: boolean) { routeLoading.value = v }

  return { toastVisible, toastMessage, toast, routeLoading, setRouteLoading }
})
