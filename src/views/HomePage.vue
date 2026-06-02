<script setup lang="ts">
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import CategoryTabs from '../components/CategoryTabs.vue'
import BannerCarousel from '../components/BannerCarousel.vue'
import AnnouncementSection from '../components/AnnouncementSection.vue'
import ThemeBanner from '../components/ThemeBanner.vue'
import ProductGrid from '../components/ProductGrid.vue'
import ThemeHallCarousel from '../components/ThemeHallCarousel.vue'
import ThemeHallFlashSale from '../components/ThemeHallFlashSale.vue'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen" style="background: var(--page-bg)">
    <NavBar />
    <CategoryTabs />

    <main class="max-w-[80rem] mx-auto" style="padding: var(--page-pad-y) var(--page-pad-x)">
      <div class="flex flex-col" style="gap: var(--stack-gap)">
        <BannerCarousel />
        <AnnouncementSection />

        <!-- 主題館展示方式 1：輪播 -->
        <section class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-2 group cursor-pointer" @click="router.push('/theme')">
              <span class="w-1 h-5 rounded-full" style="background: var(--primary)" />
              <h2 class="text-lg font-bold text-[#334155] group-hover:underline">秋冬童裝主題館</h2>
            </button>
            <Tag value="輪播圖" severity="info" />
            <Tag value="精簡商品卡" severity="secondary" />
          </div>
          <ThemeHallCarousel />
        </section>

        <!-- 主題館展示方式 2：限時搶購 -->
        <section class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-2 group cursor-pointer" @click="router.push('/theme')">
              <span class="w-1 h-5 rounded-full" style="background: var(--primary)" />
              <h2 class="text-lg font-bold text-[#334155] group-hover:underline">秋冬童裝主題館</h2>
            </button>
            <Tag value="限時搶購" severity="info" />
            <Tag value="標準商品卡" severity="secondary" />
          </div>
          <ThemeHallFlashSale />
        </section>

        <!-- 主題館展示方式 3：主題 banner -->
        <section class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-2 group cursor-pointer" @click="router.push('/theme')">
              <span class="w-1 h-5 rounded-full" style="background: var(--primary)" />
              <h2 class="text-lg font-bold text-[#334155] group-hover:underline">秋冬童裝主題館</h2>
            </button>
            <Tag value="標準商品卡" severity="secondary" />
          </div>
          <ThemeBanner name="秋冬童裝主題館" />
          <ProductGrid />
        </section>

        <!-- 主題館展示方式 4：主題 banner（簡易版商品卡） -->
        <section class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-2 group cursor-pointer" @click="router.push('/theme')">
              <span class="w-1 h-5 rounded-full" style="background: var(--primary)" />
              <h2 class="text-lg font-bold text-[#334155] group-hover:underline">秋冬童裝主題館</h2>
            </button>
            <Tag value="精簡商品卡" severity="secondary" />
          </div>
          <ThemeBanner name="秋冬童裝主題館" />
          <ProductGrid simple />
        </section>
      </div>
    </main>
  </div>
</template>
