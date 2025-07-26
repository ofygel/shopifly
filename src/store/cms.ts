'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import { Product } from '@/types/product'

export type Contacts = {
  email: string
  phone: string
  address: string
  socials: { id: string; label: string; url: string }[]
}

export type Highlight = {
  id: string
  title: string
  images: string[] 
  badge?: string
  link?: string
  intervalMs?: number
}

export type HomeTexts = {
  heroTitle: string
  heroSubtitle: string
  highlights: Highlight[]
  tags: string[]
}

export type SiteSettings = {
  home: HomeTexts
  contacts: Contacts
}

export type Collection = {
  id: string
  name: string
  slug: string
  order: number
}

type CMSState = {
  __version: number

  products: Product[]
  createProduct: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'order' | 'status'> & Partial<Pick<Product, 'status'>>) => Product
  updateProduct: (id: string, patch: Partial<Product>) => void
  deleteProduct: (id: string) => void
  duplicateProduct: (id: string) => void
  reorderProducts: (idsInNewOrder: string[]) => void
  importProducts: (list: Product[]) => void
  exportProducts: () => Product[]

  collections: Collection[]
  createCollection: (name: string, slug?: string) => Collection
  updateCollection: (id: string, patch: Partial<Collection>) => void
  deleteCollection: (id: string) => void
  reorderCollections: (idsInNewOrder: string[]) => void

  settings: SiteSettings
  updateHome: (patch: Partial<HomeTexts>) => void
  updateContacts: (patch: Partial<Contacts>) => void

  exportAll: () => any
  importAll: (payload: any) => void

  resetDemo: () => void
}

const CURRENT_VERSION = 2

const DEFAULT_SETTINGS: SiteSettings = {
  home: {
    heroTitle: 'Создай свой стиль\nвместе с нами',
    heroSubtitle: 'Ощутите уникальную коллекцию женской одежды премиум-класса',
    tags: ['Платья', 'Топы', 'Sale', 'XS–XXL'],
    highlights: [
  {
    id: nanoid(),
    title: '-30% на лето',
    images: [
      '/images/highlights/summer-1.jpg',
      '/images/highlights/summer-2.jpg',
      '/images/highlights/summer-3.jpg',
    ],
    badge: '-30%',
    link: '/catalog?tag=sale',
    intervalMs: 3500,
  },
  {
    id: nanoid(),
    title: 'Новая капсула',
    images: [
      '/images/highlights/capsule-1.jpg',
      '/images/highlights/capsule-2.jpg',
      '/images/highlights/capsule-3.jpg',
    ],
    link: '/catalog?tag=capsule',
    intervalMs: 4200,
  },
]
  },
  contacts: {
    email: 'support@shopifly.kz',
    phone: '+7 (777) 000-00-00',
    address: 'Алматы, ул. Примерная, 1',
    socials: [
      { id: nanoid(), label: 'Instagram', url: '#' },
      { id: nanoid(), label: 'Telegram', url: '#' },
      { id: nanoid(), label: 'WhatsApp', url: '#' },
    ],
  },
}

export const useCMS = create<CMSState>()(
  persist(
    (set, get) => ({
      __version: CURRENT_VERSION,

      products: [],

      createProduct(data) {
        const now = Date.now()
        const order = (get().products.at(-1)?.order ?? 0) + 1
        const status = data.status ?? 'published'
        const p: Product = {
          ...data,
          id: nanoid(),
          createdAt: now,
          updatedAt: now,
          order,
          status,
        }
        set((s) => ({ products: [p, ...s.products] }))
        return p
      },

      updateProduct(id, patch) {
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, ...patch, updatedAt: Date.now() } : p
          ),
        }))
      },

      deleteProduct(id) {
        set((s) => ({ products: s.products.filter((p) => p.id !== id) }))
      },

      duplicateProduct(id) {
        const src = get().products.find((p) => p.id === id)
        if (!src) return
        const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = src
        get().createProduct({ ...rest, name: `${src.name} (копия)` })
      },

      reorderProducts(ids) {
        const map = new Map(ids.map((id, i) => [id, i + 1]))
        set((s) => ({
          products: s.products
            .map((p) => ({ ...p, order: map.get(p.id) ?? p.order }))
            .sort((a, b) => a.order - b.order),
        }))
      },

      importProducts(list) {
        const now = Date.now()
        const normalized = list.map((p, i) => ({
          ...p,
          id: p.id || nanoid(),
          createdAt: p.createdAt || now + i,
          updatedAt: p.updatedAt || now + i,
          order: typeof p.order === 'number' ? p.order : i + 1,
          status: p.status ?? 'published',
        }))
        set({ products: normalized })
      },

      exportProducts() {
        return get().products
      },

      collections: [],
      createCollection(name, slug) {
        const c: Collection = {
          id: nanoid(),
          name,
          slug: slug ?? toSlug(name),
          order: (get().collections.at(-1)?.order ?? 0) + 1,
        }
        set((s) => ({ collections: [...s.collections, c] }))
        return c
      },
      updateCollection(id, patch) {
        set((s) => ({
          collections: s.collections.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        }))
      },
      deleteCollection(id) {
        set((s) => ({ collections: s.collections.filter((c) => c.id !== id) }))
      },
      reorderCollections(ids) {
        const map = new Map(ids.map((id, i) => [id, i + 1]))
        set((s) => ({
          collections: s.collections
            .map((c) => ({ ...c, order: map.get(c.id) ?? c.order }))
            .sort((a, b) => a.order - b.order),
        }))
      },

      settings: DEFAULT_SETTINGS,
      updateHome(patch) {
        set((s) => ({ settings: { ...s.settings, home: { ...s.settings.home, ...patch } } }))
      },
      updateContacts(patch) {
        set((s) => ({
          settings: { ...s.settings, contacts: { ...s.settings.contacts, ...patch } },
        }))
      },

      exportAll() {
        const { exportAll: _e, importAll: _i, resetDemo: _r, ...rest } = get()
        return { ...rest, __version: CURRENT_VERSION }
      },

      importAll(payload) {
        if (!payload || typeof payload !== 'object') return
        set(() => ({ ...payload }))
      },

      resetDemo() {
        set({
          __version: CURRENT_VERSION,
          products: [],
          collections: [],
          settings: DEFAULT_SETTINGS,
        })
      },
    }),
    {
      name: 'cms',
      version: CURRENT_VERSION,
      migrate: (state: any, v) => {
        if (!state) return state
        if (v < 2) {
          const migrated: any = { ...state }
          migrated.__version = CURRENT_VERSION
          migrated.settings = {
            home: migrated.home ?? DEFAULT_SETTINGS.home,
            contacts: migrated.contacts ?? DEFAULT_SETTINGS.contacts,
          }
          delete migrated.home
          delete migrated.contacts
          return migrated
        }
        return state
      },
    }
  )
)

function toSlug(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}
