<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between px-4 py-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <Leaf :size="20" class="text-white" />
          </div>
          <span class="text-lg font-bold text-gray-900 dark:text-white">青柠集市管理后台</span>
        </div>
        <div class="flex items-center gap-2">
          <button 
            @click="userStore.toggleDarkMode"
            class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
          >
            <Moon v-if="!userStore.darkMode" :size="20" class="text-gray-600" />
            <Sun v-else :size="20" class="text-amber-500" />
          </button>
          <div class="w-8 h-8 rounded-full overflow-hidden">
            <img :src="userStore.currentUser.avatar" :alt="userStore.currentUser.nickname" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 hidden lg:block">
        <div class="space-y-1">
          <button 
            v-for="item in menuItems" 
            :key="item.key"
            @click="currentMenu = item.key"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
            :class="currentMenu === item.key ? 'bg-primary-500 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'"
          >
            <component :is="item.icon" :size="20" />
            <span>{{ item.label }}</span>
          </button>
        </div>
      </div>

      <div class="flex-1 p-4">
        <div v-if="currentMenu === 'dashboard'" class="space-y-4">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card">
              <div class="flex items-center justify-between mb-2">
                <span class="text-gray-500 dark:text-gray-400">总用户数</span>
                <Users :size="24" class="text-primary-500" />
              </div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ statistics.totalUsers.toLocaleString() }}</div>
              <div class="text-xs text-green-500 mt-1">+12% 较上周</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card">
              <div class="flex items-center justify-between mb-2">
                <span class="text-gray-500 dark:text-gray-400">商品数量</span>
                <Package :size="24" class="text-orange-500" />
              </div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ statistics.totalProducts.toLocaleString() }}</div>
              <div class="text-xs text-green-500 mt-1">+8% 较上周</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card">
              <div class="flex items-center justify-between mb-2">
                <span class="text-gray-500 dark:text-gray-400">订单数量</span>
                <ShoppingBag :size="24" class="text-blue-500" />
              </div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ statistics.totalOrders.toLocaleString() }}</div>
              <div class="text-xs text-green-500 mt-1">+15% 较上周</div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card">
              <div class="flex items-center justify-between mb-2">
                <span class="text-gray-500 dark:text-gray-400">交易额</span>
                <TrendingUp :size="24" class="text-green-500" />
              </div>
              <div class="text-3xl font-bold text-gray-900 dark:text-white">¥{{ statistics.totalRevenue.toLocaleString() }}</div>
              <div class="text-xs text-green-500 mt-1">+22% 较上周</div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-gray-900 dark:text-white">用户增长趋势</h3>
                <select class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                  <option>近7天</option>
                  <option>近30天</option>
                  <option>近90天</option>
                </select>
              </div>
              <div class="h-48">
                <Line :data="userChartData" :options="chartOptions" />
              </div>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-gray-900 dark:text-white">订单统计</h3>
                <select class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                  <option>近7天</option>
                  <option>近30天</option>
                  <option>近90天</option>
                </select>
              </div>
              <div class="h-48">
                <Bar :data="orderChartData" :options="chartOptions" />
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card">
            <h3 class="font-bold text-gray-900 dark:text-white mb-4">商品分类统计</h3>
            <div class="h-48">
              <Doughnut :data="categoryChartData" :options="doughnutOptions" />
            </div>
          </div>
        </div>

        <div v-if="currentMenu === 'users'" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gray-900 dark:text-white">用户管理</h3>
            <div class="flex items-center gap-2">
              <input 
                v-model="searchQuery"
                type="text"
                placeholder="搜索用户..."
                class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
              />
              <button class="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm">添加用户</button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200 dark:border-gray-700">
                  <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">用户信息</th>
                  <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">学校</th>
                  <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">信誉积分</th>
                  <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">认证状态</th>
                  <th class="text-left py-3 px-4 text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in filteredUsers" :key="user.id" class="border-b border-gray-100 dark:border-gray-700">
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full overflow-hidden">
                        <img :src="user.avatar" :alt="user.nickname" class="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div class="font-medium text-gray-900 dark:text-white">{{ user.nickname }}</div>
                        <div class="text-sm text-gray-500">{{ user.studentId }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-300">{{ user.school }}</td>
                  <td class="py-3 px-4 text-gray-600 dark:text-gray-300">{{ user.creditScore }}</td>
                  <td class="py-3 px-4">
                    <span 
                      class="px-2 py-1 rounded-full text-xs"
                      :class="user.isVerified ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'"
                    >
                      {{ user.isVerified ? '已认证' : '未认证' }}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <button class="px-3 py-1 text-sm text-blue-500 hover:text-blue-600">详情</button>
                    <button class="px-3 py-1 text-sm text-red-500 hover:text-red-600 ml-2">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="currentMenu === 'products'" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gray-900 dark:text-white">商品管理</h3>
            <div class="flex items-center gap-2">
              <input 
                v-model="productSearch"
                type="text"
                placeholder="搜索商品..."
                class="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
              />
              <select class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                <option>全部</option>
                <option>待审核</option>
                <option>已通过</option>
                <option>已下架</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              v-for="product in filteredProducts" 
              :key="product.id"
              class="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden"
            >
              <img :src="product.images[0]" :alt="product.title" class="w-full h-24 object-cover" />
              <div class="p-3">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ product.title }}</h4>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-orange-500 font-bold">¥{{ product.price }}</span>
                  <span class="text-xs text-gray-500">{{ product.views }}浏览</span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                  <button class="flex-1 py-1.5 bg-primary-500 text-white text-xs rounded-lg">通过</button>
                  <button class="flex-1 py-1.5 bg-red-500 text-white text-xs rounded-lg">拒绝</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="currentMenu === 'reports'" class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gray-900 dark:text-white">举报管理</h3>
            <select class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              <option>全部</option>
              <option>待处理</option>
              <option>已处理</option>
              <option>已驳回</option>
            </select>
          </div>
          <div class="space-y-3">
            <div 
              v-for="report in reports" 
              :key="report.id"
              class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
            >
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">举报ID: {{ report.id }}</div>
                  <div class="text-sm text-gray-500">原因: {{ report.reason }}</div>
                </div>
                <span 
                  class="px-3 py-1 rounded-full text-xs"
                  :class="getReportStatusClass(report.status)"
                >
                  {{ getReportStatusText(report.status) }}
                </span>
              </div>
              <div class="flex items-center gap-2 mt-3">
                <button class="px-4 py-2 bg-primary-500 text-white text-sm rounded-lg">查看详情</button>
                <button class="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-lg">标记已处理</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Leaf, Moon, Sun, Users, Package, ShoppingBag, TrendingUp, LayoutDashboard, UserCircle, Tag, AlertTriangle } from 'lucide-vue-next'
import { Line, Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { useUserStore } from '../stores/userStore'
import { useProductStore } from '../stores/productStore'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler)

const userStore = useUserStore()
const productStore = useProductStore()

const currentMenu = ref('dashboard')
const searchQuery = ref('')
const productSearch = ref('')

const menuItems = [
  { key: 'dashboard', label: '数据概览', icon: LayoutDashboard },
  { key: 'users', label: '用户管理', icon: UserCircle },
  { key: 'products', label: '商品管理', icon: Tag },
  { key: 'reports', label: '举报管理', icon: AlertTriangle },
]

const statistics = {
  totalUsers: 12580,
  totalProducts: 35680,
  totalOrders: 8920,
  totalRevenue: 2685000
}

const userChartData = {
  labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  datasets: [{
    label: '新增用户',
    data: [120, 190, 150, 230, 210, 320, 280],
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    fill: true,
    tension: 0.4
  }]
}

const orderChartData = {
  labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  datasets: [{
    label: '订单数量',
    data: [80, 120, 95, 140, 110, 180, 160],
    backgroundColor: '#22c55e'
  }]
}

const categoryChartData = {
  labels: ['数码产品', '教材书籍', '宿舍神器', '美妆护肤', '衣服鞋子', '其他'],
  datasets: [{
    data: [35, 25, 15, 12, 10, 3],
    backgroundColor: ['#f97316', '#22c55e', '#8b5cf6', '#ec4899', '#3b82f6', '#6b7280']
  }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: 'rgba(0,0,0,0.05)' } }
  }
}

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'right' as const }
  }
}

const reports = [
  { id: 'R001', reason: '虚假信息', status: 'pending' },
  { id: 'R002', reason: '商品与描述不符', status: 'pending' },
  { id: 'R003', reason: '违规商品', status: 'reviewed' },
  { id: 'R004', reason: '骚扰信息', status: 'resolved' },
]

const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) return userStore.usersList.slice(0, 10)
  const query = searchQuery.value.toLowerCase()
  return userStore.usersList.filter(u => 
    u.nickname.toLowerCase().includes(query) ||
    u.school.toLowerCase().includes(query)
  ).slice(0, 10)
})

const filteredProducts = computed(() => {
  if (!productSearch.value.trim()) return productStore.products.slice(0, 8)
  const query = productSearch.value.toLowerCase()
  return productStore.products.filter(p => 
    p.title.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query)
  ).slice(0, 8)
})

const getReportStatusClass = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-600'
    case 'reviewed': return 'bg-blue-100 text-blue-600'
    case 'resolved': return 'bg-green-100 text-green-600'
    case 'rejected': return 'bg-gray-100 text-gray-600'
    default: return 'bg-gray-100 text-gray-600'
  }
}

const getReportStatusText = (status: string) => {
  switch (status) {
    case 'pending': return '待处理'
    case 'reviewed': return '审核中'
    case 'resolved': return '已处理'
    case 'rejected': return '已驳回'
    default: return status
  }
}
</script>