// src/store/ui.ts
'use client'

import { create } from 'zustand'
import { Product } from '@/types/product'

// Все панели, которыми управляем
export const PANELS = {
  menu: true,
  cart: true,
  admin: true,
  profile: true,
  contacts: true,
  favorites: true,
  product: true,   // панель Quick View
  stylebot: true,
} as const

export type PanelName = keyof typeof PANELS

export interface UIState {
  /** Флаги открытия панелей */
  open: Partial<Record<PanelName, boolean>>
  /** Продукт для Quick View */
  modalProduct: Product | null

  /** Универсальный метод открытия любой панели */
  openPanel: (name: PanelName, payload?: any) => void
  /** Универсальный метод закрытия */
  closePanel: (name: PanelName) => void
  /** Универсальный метод переключения */
  togglePanel: (name: PanelName) => void
  /** Проверить, открыта ли панель */
  isOpen: (name: PanelName) => boolean
  /** Закрыть всё + сбросить modalProduct */
  closeAll: () => void

  /** === Удобные “быстрые” методы для Quick View === */
  openQuickView: (product: Product) => void
  closeQuickView: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  open: {},
  modalProduct: null,

  openPanel: (name, payload) =>
    set((s) => ({
      open:    { ...s.open, [name]: true },
      // если открываем продукт – заносим его в modalProduct
      modalProduct: name === 'product' ? payload ?? null : s.modalProduct,
    })),

  closePanel: (name) =>
    set((s) => ({
      open:    { ...s.open, [name]: false },
      // если закрываем продукт – сбрасываем modalProduct
      modalProduct: name === 'product' ? null : s.modalProduct,
    })),

  togglePanel: (name) => {
    const currently = get().open[name] ?? false
    set((s) => ({
      open: {
        ...s.open,
        [name]: !currently,
      },
      // если переключаем (закрываем) продукт – сбрасываем его
      modalProduct:
        name === 'product' && currently ? null : s.modalProduct,
    }))
  },

  isOpen: (name) => !!get().open[name],

  closeAll: () =>
    set({
      open:         {},
      modalProduct: null,
    }),

  // === новые методы ===
  openQuickView: (product) =>
    // это то же самое, что openPanel('product', product)
    set((s) => ({
      open:         { ...s.open, product: true },
      modalProduct: product,
    })),

  closeQuickView: () =>
    // то же самое, что closePanel('product')
    set((s) => ({
      open:         { ...s.open, product: false },
      modalProduct: null,
    })),
}))
