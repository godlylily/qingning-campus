export interface User {
  id: string
  nickname: string
  avatar: string
  school: string
  studentId: string
  creditScore: number
  isVerified: boolean
  online: boolean
  createdAt: string
}

export interface Product {
  id: string
  title: string
  description: string
  price: number
  originalPrice: number
  images: string[]
  category: string
  condition: string
  campus: string
  views: number
  likes: number
  wants: number
  isCollected: boolean
  isLiked: boolean
  seller: User
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export interface ChatMessage {
  id: string
  content: string
  senderId: string
  time: string
}

export interface Chat {
  id: string
  user: User
  lastMessage: string
  unreadCount: number
  lastTime: string
  messages: ChatMessage[]
}

export interface ForumPost {
  id: string
  type: 'normal' | 'activity'
  title: string
  content: string
  images?: string[]
  likes: number
  comments: number
  shares: number
  time: string
  user: User
  activityTitle?: string
  activityTime?: string
  activityLocation?: string
}

export interface Errand {
  id: string
  content: string
  from: string
  to: string
  reward: number
  status: string
  user: User
}

export interface Notification {
  id: string
  type: 'like' | 'comment' | 'order' | 'system' | 'trade' | 'message'
  title: string
  content: string
  timestamp: string
  isRead: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  product: Product
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'
  quantity: number
  totalPrice: number
  createdAt: string
  updatedAt: string
}