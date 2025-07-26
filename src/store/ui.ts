'use client'

import { create } from 'zustand'

export const PANELS = {
  menu: true,
  cart: true,
  admin: true,
  profile: true,
  contacts: true,
  favorites: true,
  product: true,
  stylebot: true,
} as const

export type PanelName = keyof typeof PANELS

type UIState = {
  open: Partial<Record<PanelName, boolean>>
  modalProduct: any | null
  openPanel: (name: PanelName, payload?: any) => void
  closePanel: (name: PanelName) => void
  togglePanel: (name: PanelName) => void
  isOpen: (name: PanelName) => boolean
  closeAll: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  open: {},
  modalProduct: null,

  openPanel: (name, payload) =>
    set((s) => ({
      open: { ...s.open, [name]: true },
      modalProduct: name === 'product' ? payload : s.modalProduct,
    })),

  closePanel: (name) =>
    set((s) => ({ open: { ...s.open, [name]: false } })),

  togglePanel: (name) =>
    set((s) => ({ open: { ...s.open, [name]: !s.open?.[name] } })),

  isOpen: (name) => !!get().open?.[name],

  closeAll: () => set({ open: {}, modalProduct: null }),
}))
