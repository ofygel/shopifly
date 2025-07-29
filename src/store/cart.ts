import { create } from 'zustand'
import type { Product } from '@/types/product'

// Описание одной позиции в корзине
export interface CartItem {
  product: Product
  size?: string
  quantity: number
}

// Состояние и методы корзины
interface CartState {
  items: CartItem[]
  add: (product: Product, size?: string, quantity?: number) => void
  remove: (productId: string, size?: string) => void
  clear: () => void
  count: number
  total: number
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  count: 0,
  total: 0,
  add: (product, size, quantity = 1) =>
    set((state) => {
      // ищем товар с таким же id и размером
      const existing = state.items.find(
        (i) => i.product.id === product.id && i.size === size
      )
      let items
      if (existing) {
        items = state.items.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      } else {
        items = [...state.items, { product, size, quantity }]
      }
      return {
        items,
        count: items.reduce((sum, i) => sum + i.quantity, 0),
        total: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      }
    }),
  remove: (productId, size) =>
    set((state) => {
      const items = state.items.filter(
        (i) => !(i.product.id === productId && i.size === size)
      )
      return {
        items,
        count: items.reduce((sum, i) => sum + i.quantity, 0),
        total: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      }
    }),
  clear: () => ({ items: [], count: 0, total: 0 }),
}))
