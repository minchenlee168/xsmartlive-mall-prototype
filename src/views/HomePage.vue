<script setup lang="ts">
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import CategoryTabs from '../components/CategoryTabs.vue'
import BannerCarousel from '../components/BannerCarousel.vue'
import AnnouncementSection from '../components/AnnouncementSection.vue'
import ThemeBanner from '../components/ThemeBanner.vue'
import FlashSaleBar from '../components/FlashSaleBar.vue'
import ThemeHallProducts from '../components/ThemeHallProducts.vue'

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

        <!-- 主題館類型 1：標準（Banner） -->
        <section class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-2 group cursor-pointer" @click="router.push('/theme')">
              <span class="w-1 h-5 rounded-full" style="background: var(--primary)" />
              <h2 class="text-lg font-bold text-[#334155] transition-colors group-hover:text-[color:var(--primary)]">秋冬童裝主題館</h2>
            </button>
            <span class="text-xs text-[#94a3b8]">（主題館類型：標準・標準商品卡）</span>
          </div>
          <ThemeBanner name="秋冬童裝主題館" />
          <ThemeHallProducts />
          <div class="flex justify-center">
            <Button
              label="查看更多"
              icon="pi pi-angle-down"
              icon-pos="right"
              outlined
              rounded
              class="w-full max-w-[22.5rem]"
              @click="router.push('/theme')"
            />
          </div>
        </section>

        <!-- 主題館類型 1b：標準（精簡商品卡） -->
        <section class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-2 group cursor-pointer" @click="router.push('/theme')">
              <span class="w-1 h-5 rounded-full" style="background: var(--primary)" />
              <h2 class="text-lg font-bold text-[#334155] transition-colors group-hover:text-[color:var(--primary)]">秋冬童裝主題館</h2>
            </button>
            <span class="text-xs text-[#94a3b8]">（主題館類型：標準・精簡商品卡・自動輪播）</span>
          </div>
          <ThemeBanner name="秋冬童裝主題館" />
          <ThemeHallProducts simple autoplay />
          <div class="flex justify-center">
            <Button
              label="查看更多"
              icon="pi pi-angle-down"
              icon-pos="right"
              outlined
              rounded
              class="w-full max-w-[22.5rem]"
              @click="router.push('/theme')"
            />
          </div>
        </section>

        <!-- 主題館類型 2：限時搶購（倒數 bar） -->
        <section class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-2 group cursor-pointer" @click="router.push('/theme?type=flash')">
              <span class="w-1 h-5 rounded-full" style="background: var(--primary)" />
              <h2 class="text-lg font-bold text-[#334155] transition-colors group-hover:text-[color:var(--primary)]">秋冬童裝主題館</h2>
            </button>
            <span class="text-xs text-[#94a3b8]">（主題館類型：限時搶購・標準商品卡）</span>
          </div>
          <FlashSaleBar />
          <ThemeHallProducts />
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
        </section>

        <!-- 主題館類型 2b：限時搶購（精簡商品卡） -->
        <section class="flex flex-col gap-3">
          <div class="flex items-center gap-2">
            <button class="flex items-center gap-2 group cursor-pointer" @click="router.push('/theme?type=flash')">
              <span class="w-1 h-5 rounded-full" style="background: var(--primary)" />
              <h2 class="text-lg font-bold text-[#334155] transition-colors group-hover:text-[color:var(--primary)]">秋冬童裝主題館</h2>
            </button>
            <span class="text-xs text-[#94a3b8]">（主題館類型：限時搶購・精簡商品卡・自動輪播）</span>
          </div>
          <FlashSaleBar />
          <ThemeHallProducts simple autoplay />
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
        </section>
      </div>
    </main>
  </div>
</template>
