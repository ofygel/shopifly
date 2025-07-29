import { create } from 'zustand'

// Товар в избранном
export interface FavItem {
  id: string
  name: string
  price: number
  image: string
}

// Состояние стора
export interface FavoritesState {
  items: FavItem[]
  add: (item: FavItem) => void
  remove: (id: string) => void
  has: (id: string) => boolean
  clear: () => void
}

// Получить из localStorage
function loadFavorites(): FavItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem('favorites')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Сохранить в localStorage
function saveFavorites(items: FavItem[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('favorites', JSON.stringify(items))
  } catch {}
}

export const useFavorites = create<FavoritesState>((set, get) => ({
  items: loadFavorites(),

  add: (item) => set(state => {
    if (state.items.some(f => f.id === item.id)) return state
    const items = [...state.items, item]
    saveFavorites(items)
    return { items }
  }),

  remove: (id) => set(state => {
    const items = state.items.filter(item => item.id !== id)
    saveFavorites(items)
    return { items }
  }),

  has: (id) => get().items.some(item => item.id === id),

  clear: () => set(() => {
    saveFavorites([])
    return { items: [] }
  }),
}))
