import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import PublishView from '../views/PublishView.vue'
import ChatListView from '../views/ChatListView.vue'
import ChatDetailView from '../views/ChatDetailView.vue'
import ProfileView from '../views/ProfileView.vue'
import VerificationView from '../views/VerificationView.vue'
import AdminView from '../views/AdminView.vue'
import SearchView from '../views/SearchView.vue'
import ErrandsView from '../views/ErrandsView.vue'
import FreeZoneView from '../views/FreeZoneView.vue'
import ForumView from '../views/ForumView.vue'
import NotificationView from '../views/NotificationView.vue'
import SecurityView from '../views/SecurityView.vue'
import NotificationsSettingsView from '../views/NotificationsSettingsView.vue'
import SettingsView from '../views/SettingsView.vue'
import HelpView from '../views/HelpView.vue'
import WalletView from '../views/WalletView.vue'
import OrdersView from '../views/OrdersView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetailView },
  { path: '/publish', name: 'Publish', component: PublishView },
  { path: '/chats', name: 'ChatList', component: ChatListView },
  { path: '/chat/:id', name: 'ChatDetail', component: ChatDetailView },
  { path: '/profile', name: 'Profile', component: ProfileView },
  { path: '/verification', name: 'Verification', component: VerificationView },
  { path: '/admin', name: 'Admin', component: AdminView },
  { path: '/search', name: 'Search', component: SearchView },
  { path: '/errands', name: 'Errands', component: ErrandsView },
  { path: '/free', name: 'FreeZone', component: FreeZoneView },
  { path: '/forum', name: 'Forum', component: ForumView },
  { path: '/notifications', name: 'Notification', component: NotificationView },
  { path: '/orders', name: 'Orders', component: OrdersView },
  { path: '/favorites', name: 'Favorites', component: HomeView },
  { path: '/history', name: 'History', component: HomeView },
  { path: '/wallet', name: 'Wallet', component: WalletView },
  { path: '/security', name: 'Security', component: SecurityView },
  { path: '/notifications-settings', name: 'NotificationsSettings', component: NotificationsSettingsView },
  { path: '/help', name: 'Help', component: HelpView },
  { path: '/settings', name: 'Settings', component: SettingsView },
  { path: '/my-products', name: 'MyProducts', component: HomeView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const appEl = document.getElementById('app')
  if (appEl) {
    appEl.classList.add('page-transition-out')
    setTimeout(() => {
      next()
      setTimeout(() => {
        if (appEl) {
          appEl.classList.remove('page-transition-out')
          appEl.classList.add('page-transition-in')
          setTimeout(() => {
            appEl.classList.remove('page-transition-in')
          }, 300)
        }
      }, 50)
    }, 200)
  } else {
    next()
  }
})

export default router