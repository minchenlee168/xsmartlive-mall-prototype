import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface MyOrder {
  id: string
  date: string
  status: string
  total: number
  items: number
}
export interface Transaction {
  date: string
  method: string
  orderId: string
  amount: number
}

export const useOrdersStore = defineStore('orders', () => {
  const myOrders = ref<MyOrder[]>([
    { id: 'SO20260512001', date: '2026-05-12', status: '已出貨', total: 1936, items: 3 },
    { id: 'SO20260430017', date: '2026-04-30', status: '已完成', total: 688, items: 1 },
    { id: 'SO20260418009', date: '2026-04-18', status: '已完成', total: 1290, items: 2 },
  ])
  const transactions = ref<Transaction[]>([
    { date: '2026-05-12', method: '線上信用卡', orderId: 'SO20260512001', amount: 1936 },
    { date: '2026-04-30', method: 'ATM 轉帳', orderId: 'SO20260430017', amount: 688 },
    { date: '2026-04-18', method: '貨到付款', orderId: 'SO20260418009', amount: 1290 },
  ])

  let seq = 100
  // 結帳完成後同步寫入：我的訂單 + 交易記錄查詢
  function placeOrder(o: { total: number; items: number; method: string; date: string }) {
    seq += 1
    const id = `SO${o.date.replace(/-/g, '')}${String(seq).padStart(3, '0')}`
    myOrders.value.unshift({ id, date: o.date, status: '處理中', total: o.total, items: o.items })
    transactions.value.unshift({ date: o.date, method: o.method, orderId: id, amount: o.total })
    return id
  }

  return { myOrders, transactions, placeOrder }
})
