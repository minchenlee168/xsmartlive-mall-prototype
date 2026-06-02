<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import CategoryTabs from '../components/CategoryTabs.vue'
import ThemeBanner from '../components/ThemeBanner.vue'
import ProductCard from '../components/ProductCard.vue'
import { useViewportStore } from '../stores/viewport'
import { products } from '../data/products'

const router = useRouter()

const vp = computed(() => useViewportStore().current.id)
const gridCols = computed(() => ({
  'grid-cols-2': vp.value === 'mobile',
  'grid-cols-3': vp.value === 'tablet',
  'grid-cols-5': vp.value === 'pc',
}))

// 主題館的完整商品清單 — 原型用既有資料重複堆疊出較長的列表，方便展示無限捲動
const feed = Array.from({ length: 5 }, (_, page) =>
  products.map((p) => ({ ...p, key: `${p.id}-${page}` })),
).flat()

const PAGE_SIZE = 10
const visibleCount = ref(PAGE_SIZE)
const loading = ref(false)
const visibleProducts = computed(() => feed.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < feed.length)

const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

function loadMore() {
  if (loading.value || !hasMore.value) return
  loading.value = true
  // 模擬非同步載入延遲
  setTimeout(() => {
    visibleCount.value = Math.min(visibleCount.value + PAGE_SIZE, feed.length)
    loading.value = false
  }, 800)
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) loadMore()
  }, { rootMargin: '200px' })
  if (sentinel.value) observer.observe(sentinel.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="min-h-screen" style="background: var(--page-bg)">
    <NavBar />
    <CategoryTabs />

    <main class="max-w-[80rem] mx-auto" style="padding: var(--page-pad-y) var(--page-pad-x)">
      <div class="flex flex-col" style="gap: var(--stack-gap)">

        <!-- Breadcrumb -->
        <nav class="flex items-center gap-[0.4375rem] text-sm py-1">
          <button class="text-[#64748b] hover:text-[color:var(--primary)] transition-colors" @click="router.push('/')">
            <i class="pi pi-home text-xs" />
          </button>
          <i class="pi pi-chevron-right text-[0.625rem] text-[#94a3b8]" />
          <span style="color: var(--primary)" class="font-medium">秋冬童裝主題館</span>
        </nav>

        <!-- Title -->
        <div class="flex items-center gap-2">
          <span class="w-1 h-5 rounded-full" style="background: var(--primary)" />
          <h1 class="text-lg font-bold text-[#334155]">秋冬童裝主題館</h1>
        </div>

        <ThemeBanner name="秋冬童裝主題館" />

        <div class="flex flex-col gap-4">
          <div class="grid gap-3" :class="gridCols">
            <ProductCard
              v-for="p in visibleProducts"
              :key="p.key"
              :id="p.id"
              :name="p.name"
              :price="p.price"
              :original="p.original"
              :has-variant="p.hasVariant"
              :stock="p.stock"
              :image="p.image"
            />
          </div>

          <!-- 無限捲動：捲到底部觸發載入，載入中顯示 loading -->
          <div ref="sentinel" class="flex items-center justify-center h-[6.25rem] @lg:h-[7.5rem]">
            <div
              v-if="loading"
              class="w-10 h-10 @lg:w-12 @lg:h-12 rounded-full animate-spin"
              style="border: 0.25rem solid var(--primary-200); border-top-color: var(--primary)"
            />
            <p v-else-if="!hasMore" class="text-sm text-[#94a3b8]">沒有更多商品了</p>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>
