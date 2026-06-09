<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useViewportStore } from '../stores/viewport'
import { useCartStore } from '../stores/cart'
import { useUiStore } from '../stores/ui'
import { products } from '../data/products'

const props = defineProps<{
  id: number
  name: string
  price: number
  original: number
  hasVariant?: boolean
  stock?: number
  image?: string
  hideActions?: boolean
  /** 簡易版：不顯示數量選擇器與「還剩X件」，仍保留 CTA 按鈕 */
  simple?: boolean
  /** 來源標記（如 'theme'）— 帶進商品頁 query，供麵包屑顯示「返回」 */
  from?: string
}>()

const router = useRouter()
const cart = useCartStore()
const ui = useUiStore()

const qty = ref(1)
const vp = computed(() => useViewportStore().current.id)
const isPC = computed(() => vp.value === 'pc')

// 規格選項取自商品目錄
const sizes = computed(() => products.find(p => p.id === props.id)?.sizes ?? [])

// 選擇規格彈窗狀態
const specDialogOpen = ref(false)
const dialogSize = ref('')

function goDetail() {
  router.push({ path: `/product/${props.id}`, query: props.from ? { from: props.from } : {} })
}

function addToCart(spec: string, n: number) {
  cart.addItem({ id: props.id, name: props.name, price: props.price, original: props.original, image: props.image }, spec, n)
  ui.toast('已加入購物車')
}

function onPrimaryAction(e: MouseEvent) {
  e.stopPropagation()
  if (props.hasVariant) {
    // 有規格 → 跳彈窗選規格；數量沿用卡片上選的數量
    dialogSize.value = sizes.value[0] ?? ''
    specDialogOpen.value = true
  } else {
    addToCart('預設', qty.value)
  }
}

function confirmSpecAdd() {
  if (sizes.value.length && !dialogSize.value) return
  addToCart(dialogSize.value || '預設', qty.value)
  specDialogOpen.value = false
}
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06)] flex flex-col gap-2 p-2 w-full h-full cursor-pointer hover:shadow-md transition-shadow"
    @click="goDetail"
  >
    <!-- Product image -->
    <div class="aspect-[332/320] w-full bg-gray-100 overflow-hidden" :class="isPC ? 'rounded-[8px]' : 'rounded-[6px]'">
      <img v-if="image" :src="image" :alt="name" class="w-full h-full object-cover" />
      <div v-else class="w-full h-full flex flex-col items-center justify-center gap-1.5">
        <i class="pi pi-hammer text-gray-300" :class="isPC ? 'text-4xl' : 'text-3xl'" />
        <span class="text-gray-400" :class="isPC ? 'text-sm' : 'text-[10px]'">圖片施工中</span>
      </div>
    </div>

    <!-- Product info -->
    <div class="flex flex-col flex-1 px-1 pt-1" :class="isPC ? 'gap-2 px-2 pt-2' : 'gap-1'">
      <!-- Title -->
      <p class="text-[#020617] font-medium leading-normal line-clamp-2 text-[1rem]">
        {{ name }}
      </p>

      <!-- Price -->
      <div class="flex flex-col gap-1">
        <span class="text-[#64748b] line-through" :class="isPC ? 'text-base' : 'text-xs'">NTD ${{ original }}</span>
        <span class="text-[#f43f5e] font-semibold" :class="isPC ? 'text-2xl' : 'text-base'">
          <span class="text-xs font-normal">NTD</span> ${{ price }}
        </span>
      </div>

      <!-- Quantity + CTA -->
      <div v-if="!hideActions" class="flex flex-col mt-auto" :class="isPC ? 'gap-2' : 'gap-1'">
        <!-- Quantity selector -->
        <div v-if="!simple" class="flex flex-col gap-1" @click.stop>
          <div class="flex items-center" :class="isPC ? 'gap-4' : 'gap-2'">
            <span class="text-[#334155]" :class="isPC ? 'text-sm' : 'text-sm'">數量</span>
            <InputNumber
              v-model="qty"
              :min="1"
              show-buttons
              button-layout="horizontal"
              increment-button-icon="pi pi-plus"
              decrement-button-icon="pi pi-minus"
              class="qty-stepper"
              :class="{ 'is-sm': !isPC }"
            />
          </div>
          <span class="text-[#334155]" :class="isPC ? 'text-sm' : 'text-xs'">還剩{{ stock ?? 11 }}件</span>
        </div>

        <!-- CTA Button — 一律「加入購物車」；有規格者點擊跳彈窗選規格 -->
        <button
          class="w-full flex items-center justify-center font-medium transition-colors"
          :class="isPC
            ? 'gap-2 px-4 py-3 rounded-lg text-base'
            : 'gap-1 px-3 min-h-[44px] py-2 rounded-lg text-sm'"
          style="background: var(--primary-bg); border: 1px solid var(--primary); color: #fff"
          @mouseover="(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--primary-hover-bg)' }"
          @mouseleave="(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--primary-bg)' }"
          @click="onPrimaryAction"
        >
          <i class="pi pi-cart-plus" :class="isPC ? 'text-sm' : 'text-xl'" />
          <span v-if="isPC">加入購物車</span>
        </button>
      </div>
    </div>
  </div>

  <!-- 選擇規格彈窗 -->
  <Dialog
    v-model:visible="specDialogOpen"
    modal
    header="選擇商品規格"
    :draggable="false"
    dismissable-mask
    :style="{ width: '360px', maxWidth: '90vw' }"
  >
    <div class="flex flex-col gap-4">
      <!-- 商品圖 + 名稱 -->
      <div class="flex gap-3">
        <div class="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
          <img v-if="image" :src="image" :alt="name" class="w-full h-full object-cover" />
          <i v-else class="pi pi-hammer text-gray-300 text-xl" />
        </div>
        <div class="flex-1 min-w-0 flex flex-col gap-1">
          <p class="font-semibold text-[#334155] line-clamp-2 text-base">{{ name }}</p>
          <span class="font-bold text-lg" style="color: var(--primary)">${{ price }}</span>
        </div>
      </div>

      <!-- 規格 -->
      <div v-if="sizes.length" class="flex flex-col gap-2">
        <span class="text-sm font-medium text-[#334155]">規格</span>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="s in sizes"
            :key="s"
            type="button"
            class="px-4 min-h-[44px] rounded-md border text-sm transition-colors"
            :style="dialogSize === s
              ? { borderColor: 'var(--primary)', color: 'var(--primary)', background: 'color-mix(in srgb, var(--primary) 8%, transparent)' }
              : { borderColor: '#e2e8f0', color: '#334155', background: '#fff' }"
            @click="dialogSize = s"
          >{{ s }}</button>
        </div>
      </div>
    </div>

    <template #footer>
      <Button label="取消" severity="secondary" outlined @click="specDialogOpen = false" />
      <Button label="加入購物車" icon="pi pi-cart-plus" :disabled="!!sizes.length && !dialogSize" @click="confirmSpecAdd" />
    </template>
  </Dialog>
</template>
