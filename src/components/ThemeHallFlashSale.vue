<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from './ProductCard.vue'
import FlashSaleBar from './FlashSaleBar.vue'
import { useViewportStore } from '../stores/viewport'
import { products } from '../data/products'

const router = useRouter()

const vp = computed(() => useViewportStore().current.id)
const gridCols = computed(() => ({
  'grid-cols-2': vp.value === 'mobile',
  'grid-cols-3': vp.value === 'tablet',
  'grid-cols-5': vp.value === 'pc',
}))

const saleProducts = products.slice(0, 10)
</script>

<template>
  <div class="flex flex-col gap-4">
    <FlashSaleBar />

    <!-- 商品卡 -->
    <div class="grid gap-3" :class="gridCols">
      <ProductCard
        v-for="p in saleProducts"
        :key="p.id"
        :id="p.id"
        :name="p.name"
        :price="p.price"
        :original="p.original"
        :has-variant="p.hasVariant"
        :stock="p.stock"
        :image="p.image"
      />
    </div>

    <!-- 查看更多 -->
    <div class="flex justify-center">
      <Button
        label="查看更多"
        icon="pi pi-angle-down"
        icon-pos="right"
        outlined
        rounded
        class="w-full max-w-[22.5rem]"
        @click="router.push('/theme?type=flash')"
      />
    </div>
  </div>
</template>
