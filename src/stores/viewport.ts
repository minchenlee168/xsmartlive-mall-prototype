import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Viewport {
  id: 'mobile' | 'tablet' | 'pc'
  label: string
  icon: string
  width: number | null
  /** 限制高度（null = 不限），模擬實機螢幕高度；frame 內容超過會內部 scroll */
  height: number | null
}

export const viewports: Viewport[] = [
  { id: 'mobile', label: '手機', icon: 'pi-mobile',  width: 390,  height: 844  },
  { id: 'tablet', label: '平板', icon: 'pi-tablet',  width: 768,  height: 1024 },
  { id: 'pc',     label: 'PC',   icon: 'pi-desktop', width: null, height: null },
]

export const useViewportStore = defineStore('viewport', () => {
  const current = ref<Viewport>(viewports[2])

  function set(vp: Viewport) {
    current.value = vp
  }

  return { current, viewports, set }
})
