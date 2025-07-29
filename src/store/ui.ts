// src/store/ui.ts
import { create } from 'zustand'
import type { Product } from '@/types/product'

export type PanelName = 'favorites' | 'cart' | 'profile' | 'contacts'

interface UIState {
  openPanel: PanelName | null
  setOpenPanel: (p: PanelName | null) => void
  isOpen: (panel: PanelName) => boolean
  closePanel: (panel: PanelName) => void

  selectedProduct: Product | null
  setSelectedProduct: (p: Product | null) => void
  closeProduct: () => void

  alert: string | null
  showAlert: (msg: string) => void
  closeAlert: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  openPanel: null,
  setOpenPanel: (p) => set({ openPanel: p }),
  isOpen: (panel) => get().openPanel === panel,
  closePanel: (panel) => set((state) => state.openPanel === panel ? { openPanel: null } : {}),

  selectedProduct: null,
  setSelectedProduct: (p) => set({ selectedProduct: p }),
  closeProduct: () => set({ selectedProduct: null }),

  alert: null,
  showAlert: (msg) => set({ alert: msg }),
  closeAlert: () => set({ alert: null }),
}))
