'use client'

import { create } from 'zustand'

type Role = 'user' | 'bot'
export type Msg = { role: Role; text: string }

export type StyleResult = {
  summary: string
  image?: string
}

type State = {
  messages: Msg[]
  loading: boolean
  result: StyleResult | null
  pushMsg: (role: Role, text: string) => void
  fakeBotAnswer: (prompt: string) => void
  send: (text: string) => void
  saveCurrentStyle: () => void
  chooseAnotherStyle: () => void
  makeOrder: () => void
  resetStyle: () => void
}

export const useStyleBot = create<State>((set, get) => ({
  messages: [],
  loading: false,
  result: null,

  pushMsg: (role, text) =>
    set((s) => ({ messages: [...s.messages, { role, text }] })),

  fakeBotAnswer: (prompt: string) => {
    const botText =
      'готическое платье-корсет чёрного цвета с акцентом на приталенный силуэт. Верх выполнен с декоративной шнуровкой и подплечниками...'
    const summary = `${prompt} → подобран образ в готическом стиле`
    const image =
      'https://images.unsplash.com/photo-1515468381879-40d0ded8100d?q=80&w=800&auto=format&fit=crop'
    set((s) => ({
      messages: [...s.messages, { role: 'bot', text: botText }],
      loading: false,
      result: { summary, image },
    }))
  },

  send: (text: string) => {
    const t = text.trim()
    if (!t || get().loading) return
    get().pushMsg('user', t)
    set({ loading: true })
    setTimeout(() => get().fakeBotAnswer(t), 800)
  },

  saveCurrentStyle: () => {
    console.log('saveCurrentStyle', get().result)
  },

  chooseAnotherStyle: () => {
    set({ result: null })
  },

  makeOrder: () => {
    console.log('makeOrder')
  },

  resetStyle: () => set({ messages: [], loading: false, result: null }),
}))
