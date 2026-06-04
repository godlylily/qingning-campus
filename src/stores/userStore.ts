import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, Chat, Message, Order, Notification } from '../types'
import { users, chats as initialChats, generateAvatar } from '../data/mockData'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User>({
    id: 'user-1',
    nickname: '青柠用户',
    avatar: generateAvatar('青柠用户'),
    school: '清华大学',
    studentId: '202112345',
    creditScore: 920,
    isVerified: true,
    online: true,
    createdAt: new Date().toISOString()
  })

  const usersList = ref<User[]>(users)
  const chats = ref<Chat[]>(initialChats)
  const messages = ref<Message[]>([])
  const notifications = ref<Notification[]>([
    { id: '1', title: '系统公告', content: '平台将于今晚23:00进行系统维护', type: 'system', timestamp: new Date().toISOString(), isRead: false },
    { id: '2', title: '交易提醒', content: '您发布的商品有人想要购买', type: 'trade', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), isRead: false },
    { id: '3', title: '新消息', content: '买家给您发送了消息', type: 'message', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), isRead: true },
  ])

  const orders = ref<Order[]>([])
  
  const credits = ref(920)
  const darkMode = ref(false)
  const collectedProducts = ref<string[]>([])
  const favorites = ref<string[]>(['3', '7', '12', '18'])

  const unreadMessagesCount = computed(() => {
    return chats.value.reduce((sum, chat) => sum + chat.unread, 0)
  })

  const unreadNotificationsCount = computed(() => {
    return notifications.value.filter(n => !n.isRead).length
  })

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    if (darkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode.value))
  }

  const loadDarkMode = () => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      darkMode.value = JSON.parse(saved)
      if (darkMode.value) {
        document.documentElement.classList.add('dark')
      }
    }
  }

  const addNotification = (notification: Notification) => {
    notifications.value.unshift(notification)
  }

  const markNotificationAsRead = (notificationId: string) => {
    const notification = notifications.value.find(n => n.id === notificationId)
    if (notification) {
      notification.isRead = true
    }
  }

  const markAllNotificationsAsRead = () => {
    notifications.value.forEach(n => n.isRead = true)
  }

  const sendMessage = (chatId: string, content: string) => {
    const chat = chats.value.find(c => c.id === chatId)
    if (chat) {
      chat.lastMessage = content
      chat.timestamp = new Date().toISOString()
    }
    
    messages.value.push({
      id: `msg-${Date.now()}`,
      senderId: currentUser.value.id,
      content,
      type: 'text',
      timestamp: new Date().toISOString(),
      isRead: false
    })
  }

  const addOrder = (order: Order) => {
    orders.value.unshift(order)
  }

  const updateCreditScore = (points: number) => {
    credits.value = Math.min(1000, Math.max(0, credits.value + points))
  }

  const updateUserProfile = (updates: Partial<User>) => {
    currentUser.value = { ...currentUser.value, ...updates }
  }

  return {
    currentUser,
    usersList,
    chats,
    messages,
    notifications,
    orders,
    credits,
    darkMode,
    collectedProducts,
    favorites,
    unreadMessagesCount,
    unreadNotificationsCount,
    toggleDarkMode,
    loadDarkMode,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    sendMessage,
    addOrder,
    updateCreditScore,
    updateUserProfile
  }
})