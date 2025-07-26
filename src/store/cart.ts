'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  id: string
  name: string
  price: number
  qty: number
  image?: string
  size?: string
}

type CartState = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  remove: (id: string, size?: string) => void
  updateQty: (id: string, size: string | undefined, qty: number) => void
  clear: () => void
  count: number
  total: number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (item, qty = 1) =>
        set((s) => {
          const key = (i: CartItem) => i.id + '|' + (i.size ?? '')
          const ex = s.items.find((i) => key(i) === key({ ...item, qty }))
          if (ex) {
            ex.qty += qty
            return { items: [...s.items] }
          }
          return { items: [...s.items, { ...item, qty }] }
        }),

      remove: (id, size) =>
        set((s) => ({
          items: s.items.filter((i) => !(i.id === id && i.size === size)),
        })),

      updateQty: (id, size, qty) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.id === id && i.size === size ? { ...i, qty: Math.max(1, qty) } : i
          ),
        })),

      clear: () => set({ items: [] }),

      get count() {
        return get().items.reduce((acc, i) => acc + i.qty, 0)
      },
      get total() {
        return get().items.reduce((acc, i) => acc + i.price * i.qty, 0)
      },
    }),
    { name: 'cart' }
  )
)
