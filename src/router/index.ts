import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ThemeHallPage from '../views/ThemeHallPage.vue'
import CategoryPage from '../views/CategoryPage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'
import CartPage from '../views/CartPage.vue'
import LoginPage from '../views/LoginPage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'
import SearchPage from '../views/SearchPage.vue'
import MemberCenterPage from '../views/MemberCenterPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ForgotPasswordPage from '../views/ForgotPasswordPage.vue'
import InfoPage from '../views/InfoPage.vue'
import { useUiStore } from '../stores/ui'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage },
    { path: '/theme', component: ThemeHallPage },
    { path: '/category/:tab', component: CategoryPage },
    { path: '/product/:id', component: ProductDetailPage },
    { path: '/cart', component: CartPage },
    { path: '/checkout', component: CheckoutPage },
    { path: '/search', component: SearchPage },
    { path: '/member', component: MemberCenterPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/forgot', component: ForgotPasswordPage },
    { path: '/terms', component: InfoPage },
    { path: '/privacy', component: InfoPage },
    { path: '/help', component: InfoPage },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

// 換頁 loading：切換路徑時顯示載入畫面，最少顯示一小段時間才看得到
let loadingTimer: ReturnType<typeof setTimeout> | null = null
router.beforeEach((to, from) => {
  if (to.path !== from.path) {
    if (loadingTimer) clearTimeout(loadingTimer)
    useUiStore().setRouteLoading(true)
  }
  return true
})
router.afterEach(() => {
  if (loadingTimer) clearTimeout(loadingTimer)
  loadingTimer = setTimeout(() => useUiStore().setRouteLoading(false), 500)
})

export default router
