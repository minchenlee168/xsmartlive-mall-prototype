<script setup lang="ts">
import { computed } from 'vue'
import ProductCard from './ProductCard.vue'
import { useViewportStore } from '../stores/viewport'
import { products } from '../data/products'

const vp = computed(() => useViewportStore().current.id)
// 一次顯示幾張卡（依模擬視窗，非實際 window 寬度，故用 numVisible 綁定）
const perView = computed(() => (vp.value === 'mobile' ? 2 : vp.value === 'tablet' ? 3 : 5))

const items = products.slice(0, 10)
</script>

<template>
  <Carousel
    :value="items"
    :num-visible="perView"
    :num-scroll="1"
    :autoplay-interval="3000"
    circular
  >
    <template #item="{ data }">
      <div class="px-1.5 h-full">
        <ProductCard
          :id="data.id"
          :name="data.name"
          :price="data.price"
          :original="data.original"
          :has-variant="data.hasVariant"
          :stock="data.stock"
          :image="data.image"
          hide-actions
        />
      </div>
    </template>
  </Carousel>
</template>
