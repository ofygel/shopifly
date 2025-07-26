'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
  id: string
  email: string
  name?: string
  role?: 'user' | 'admin' // ← тип роли
}

type AuthState = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name?: string) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,

      async login(email, password) {
        set({ loading: true })
        await new Promise((r) => setTimeout(r, 600))
        set({
          user: {
            id: '1',
            email,
            name: 'User',
            role: 'admin', // ✅ устанавливаем роль admin
          },
          loading: false,
        })
      },

      async register(email, password, name) {
        set({ loading: true })
        await new Promise((r) => setTimeout(r, 800))
        set({
          user: {
            id: '1',
            email,
            name: name || 'User',
            role: 'admin', // ✅ устанавливаем роль admin
          },
          loading: false,
        })
      },

      logout() {
        set({ user: null })
      },
    }),
    { name: 'auth' }
  )
)
