<script setup lang="ts">
import { computed } from 'vue'
import { useViewportStore } from '../stores/viewport'

const visible = defineModel<boolean>('visible', { default: false })

const viewportStore = useViewportStore()
const isMobile = computed(() => viewportStore.current.id === 'mobile')
// 平板與電腦版固定 680px；手機符合容器寬度
const drawerWidth = computed(() =>
  viewportStore.current.id === 'mobile' ? `${viewportStore.current.width}px` : '680px',
)

interface Coupon {
  id: number
  discount: string
  name: string
  description: string
  tagText: string
  tagType: 'danger' | 'info' | 'secondary'
  expiry: string
  disabled?: boolean
}

const coupons: Coupon[] = [
  {
    id: 1,
    discount: '折100',
    name: '滿千折百優惠券（滿1000元使用）',
    description: '活動訂單滿 $1000 現折 $100',
    tagText: '適用範圍（直播場次）：我是直播場次-2025-12-24',
    tagType: 'danger',
    expiry: '有效期限至 2026.01.20 23:00',
  },
  {
    id: 2,
    discount: '50%',
    name: '滿千五折（滿1000元使用）',
    description: '活動訂單滿 $1000 打5折',
    tagText: '適用範圍(粉絲團貼文)：我是粉絲團貼文-2025-12-24',
    tagType: 'info',
    expiry: '有效期限至 2026.01.20 23:00',
  },
  {
    id: 3,
    discount: '折300',
    name: '滿三千折三百（滿3000元使用）',
    description: '常客單筆滿 $3000 現折 $300',
    tagText: '適用範圍：全站',
    tagType: 'secondary',
    expiry: '有效期限至 2026.01.20 23:00',
  },
]
</script>

<template>
  <Drawer
    v-model:visible="visible"
    position="bottom"
    header="可使用優惠券"
    :style="{ width: drawerWidth, maxWidth: '100vw', left: 0, right: 0, margin: '0 auto', height: 'auto', maxHeight: '80vh' }"
  >
    <!-- Coupon list（卡片樣式比照結帳頁） -->
    <div class="max-w-[680px] mx-auto flex flex-col gap-3">
      <div
        v-for="coupon in coupons"
        :key="coupon.id"
        class="flex border border-[#e2e8f0] rounded-[10px]"
      >
        <!-- Amount block -->
        <div
          class="shrink-0 flex items-center justify-center rounded-l-[10px] bg-[#ede9fe]"
          :class="isMobile ? 'w-[76px] gap-1 px-2 py-3' : 'w-[140px] gap-2 px-3 py-4'"
        >
          <i v-if="!isMobile" class="pi pi-gift text-[22px]" style="color: var(--primary)" />
          <span
            class="font-bold"
            :class="isMobile ? 'text-[18px]' : 'text-[24px]'"
            style="color: var(--primary)"
          >{{ coupon.discount }}</span>
        </div>

        <!-- Detail block -->
        <div class="flex-1 min-w-0 flex flex-col gap-1" :class="isMobile ? 'px-3 py-3' : 'px-4 py-4'">
          <p class="font-medium text-[15px] text-[#334155]">{{ coupon.name }}</p>
          <p class="text-[13px] text-[#475569]">{{ coupon.description }}</p>
          <span class="self-start px-2 py-0.5 rounded text-[12px] break-words" style="background: #fce7f3; color: #be185d">{{ coupon.tagText }}</span>
          <p class="text-[12px] text-[#64748b] mt-1">{{ coupon.expiry }}</p>
        </div>
      </div>
    </div>
  </Drawer>
</template>
