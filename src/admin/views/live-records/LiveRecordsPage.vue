<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import PostListTable, { type OrderPost } from '@/admin/views/live-order/components/PostListTable.vue'

/**
 * 收單紀錄頁：顯示所有貼文收單（含準備中 / 收單中 / 已結束 / 全部）。
 * 直接重用 PostListTable，操作邏輯與直播收單一致（檢視得標清單 / 商品清單 / 結束or開始收單）。
 */

const toast = useToast()

const posts = ref<OrderPost[]>([
  {
    id: 9001,
    name: '貼文2026/02/10',
    orderCount: 120,
    salesAmount: 405,
    createdAt: '2026-02-01 22:00',
    orderingPeriod: '2026-03-02 23:59',
    createdBy: '酒伍二漆',
    status: 'ended',
    products: [
      { id: 91001, name: '寶寶連身包屁衣', keyword: 'A1', price: 199, stock: 50, sold: 32 },
      { id: 91002, name: '嬰兒抗 UV 遮陽帽', keyword: 'A2', price: 150, stock: 30, sold: 18 },
    ],
  },
  {
    id: 9002,
    name: '貼文2026/06/12',
    orderCount: 58,
    salesAmount: 16240,
    createdAt: '2026-06-12 09:30',
    orderingPeriod: '2026-06-15 23:59',
    createdBy: '管理員 A',
    status: 'ongoing',
    products: [
      {
        id: 92001, name: '女童碎花連衣裙', keyword: 'B1', price: 320, stock: 40, sold: 22,
        specs: [
          { name: '110cm', stock: 20, sold: 12, price: 320 },
          { name: '120cm', stock: 20, sold: 10, price: 320 },
        ],
      },
      { id: 92002, name: '男童純棉長袖上衣', keyword: 'B2', price: 280, stock: 50, sold: 14 },
    ],
  },
  {
    id: 9003,
    name: '貼文2026/06/14',
    orderCount: 0,
    salesAmount: 0,
    createdAt: '2026-06-14 18:00',
    orderingPeriod: '2026-06-20 23:59',
    createdBy: '管理員 B',
    status: 'ready',
    products: [],
  },
])

function onDeletePost(id: number): void {
  posts.value = posts.value.filter(p => p.id !== id)
  toast.removeAllGroups()
  toast.add({ severity: 'success', summary: '已刪除貼文', life: 1500 })
}
function onBatchDeletePosts(ids: number[]): void {
  const idSet = new Set(ids)
  posts.value = posts.value.filter(p => !idSet.has(p.id))
  toast.removeAllGroups()
  toast.add({ severity: 'success', summary: `已刪除 ${ids.length} 筆貼文`, life: 1500 })
}
function onViewPostWinners(id: number): void {
  toast.removeAllGroups()
  toast.add({ severity: 'info', summary: `檢視貼文 ${id} 的得標清單`, life: 1500 })
}
function onViewPostProducts(id: number): void {
  toast.removeAllGroups()
  toast.add({ severity: 'info', summary: `檢視貼文 ${id} 的商品清單`, life: 1500 })
}
/** 切換貼文收單狀態：ready → ongoing → ended。 */
function onTogglePostStatus(id: number): void {
  const post = posts.value.find(p => p.id === id)
  if (!post) return
  if (post.status === 'ready') {
    post.status = 'ongoing'
    toast.add({ severity: 'success', summary: `已開始「${post.name}」收單`, life: 1500 })
  } else if (post.status === 'ongoing') {
    post.status = 'ended'
    toast.add({ severity: 'info', summary: `已結束「${post.name}」收單`, life: 1500 })
  }
}
function onPickPost(): void {
  toast.add({ severity: 'info', summary: '請至貼文收單頁選擇貼文後再來收單紀錄查看', life: 2500 })
}
</script>

<template>
  <div class="flex flex-col gap-4 flex-1 min-h-0">
    <PostListTable
      :posts="posts"
      :can-pick-post="true"
      @delete="onDeletePost"
      @batch-delete="onBatchDeletePosts"
      @view-winners="onViewPostWinners"
      @view-products="onViewPostProducts"
      @toggle-status="onTogglePostStatus"
      @pick-post="onPickPost"
    />
  </div>
</template>
