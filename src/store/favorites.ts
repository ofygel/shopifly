'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type FavItem = {
  id: string
  name: string
  image?: string
  price?: number
}

// Переименовали State → FavoritesState и сделали именованный экспорт
export type FavoritesState = {
  items: FavItem[]
  add: (item: FavItem) => void
  remove: (id: string) => void
  clear: () => void
  has: (id: string) => boolean
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) =>
          s.items.find((i) => i.id === item.id) ? s : { items: [...s.items, item] }
        ),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      has: (id) => !!get().items.find((i) => i.id === id),
    }),
    { name: 'favorites' }
  )
)
