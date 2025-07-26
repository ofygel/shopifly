'use client'

import { createContext, useContext, useMemo, useState } from 'react'

export type CartItem = {
  id: number | string
  name: string
  price: number
  qty: number
  image?: string
}

type CartContextType = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  remove: (id: CartItem['id']) => void
  updateQty: (id: CartItem['id'], qty: number) => void
  clear: () => void
  count: number
  total: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const add: CartContextType['add'] = (item, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(x => x.id === item.id)
      if (i === -1) return [...prev, { ...item, qty }]
      const copy = [...prev]
      copy[i].qty += qty
      return copy
    })
  }

  const remove: CartContextType['remove'] = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQty: CartContextType['updateQty'] = (id, qty) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)))
  }

  const clear = () => setItems([])

  const { count, total } = useMemo(() => {
    return {
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((s, i) => s + i.price * i.qty, 0),
    }
  }, [items])

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, clear, count, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
