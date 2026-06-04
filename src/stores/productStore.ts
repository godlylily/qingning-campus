import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '../types'
import { products as initialProducts } from '../data/mockData'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>(initialProducts)
  const favorites = ref<string[]>([])
  const likedProducts = ref<string[]>([])
  const cart = ref<Product[]>([])
  const searchQuery = ref('')
  const selectedCategory = ref('all')

  const filteredProducts = computed(() => {
    let result = products.value
    
    if (selectedCategory.value !== 'all') {
      result = result.filter(p => p.category === selectedCategory.value)
    }
    
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )
    }
    
    return result
  })

  const favoriteProducts = computed(() => {
    return products.value.filter(p => favorites.value.includes(p.id))
  })

  const toggleFavorite = (productId: string) => {
    const index = favorites.value.indexOf(productId)
    if (index === -1) {
      favorites.value.push(productId)
    } else {
      favorites.value.splice(index, 1)
    }
  }

  const toggleLike = (productId: string) => {
    const index = likedProducts.value.indexOf(productId)
    const product = products.value.find(p => p.id === productId)
    
    if (index === -1) {
      likedProducts.value.push(productId)
      if (product) product.likes++
    } else {
      likedProducts.value.splice(index, 1)
      if (product && product.likes > 0) product.likes--
    }
  }

  const addToCart = (product: Product) => {
    cart.value.push(product)
  }

  const removeFromCart = (productId: string) => {
    const index = cart.value.findIndex(p => p.id === productId)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  const addProduct = (product: Product) => {
    products.value.unshift(product)
  }

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    const index = products.value.findIndex(p => p.id === productId)
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...updates }
    }
  }

  const deleteProduct = (productId: string) => {
    const index = products.value.findIndex(p => p.id === productId)
    if (index !== -1) {
      products.value.splice(index, 1)
    }
  }

  const incrementViews = (productId: string) => {
    const product = products.value.find(p => p.id === productId)
    if (product) {
      product.views++
    }
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const setCategory = (category: string) => {
    selectedCategory.value = category
  }

  return {
    products,
    favorites,
    likedProducts,
    cart,
    searchQuery,
    selectedCategory,
    filteredProducts,
    favoriteProducts,
    toggleFavorite,
    toggleLike,
    addToCart,
    removeFromCart,
    addProduct,
    updateProduct,
    deleteProduct,
    incrementViews,
    setSearchQuery,
    setCategory
  }
})