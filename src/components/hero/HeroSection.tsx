import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

// Тип продукта
export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  discount?: number;
  sizes?: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
  order: number;
};

// Тип плитки-«highlight» на главной
export type Highlight = {
  id: string;
  images: string[];
  title?: string;
  badge?: string;
  link?: string;
  intervalMs?: number;
};

// Тип контакта
export type Contact = {
  id: string;
  type: 'phone' | 'email' | 'address' | string;
  label: string;
  value: string;
};

// Настройки главной страницы
export type HomeSettings = {
  heroTitle?: string;
  heroSubtitle?: string;
  highlights: Highlight[];
  tags?: string[];
};

// Общие настройки приложения
export type Settings = {
  home: HomeSettings;
  contacts: Contact[];
};

// Состояние CMS Store
export type CMSState = {
  products: Product[];
  settings: Settings;
  createProduct: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => Product;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  updateSettings: (patch: Partial<Settings>) => void;
};

export const useCMSStore = create<CMSState>()(
  persist(
    (set, get) => ({
      products: [],
      settings: {
        home: {
          heroTitle: '',
          heroSubtitle: '',
          highlights: [
            {
              id: nanoid(),
              images: [
                '/images/highlights/capsule-1.jpg',
                '/images/highlights/capsule-2.jpg',
                '/images/highlights/capsule-3.jpg',
              ],
              title: 'Capsule Collection',
              badge: 'Новинка',
              link: '/catalog?tag=capsule',
              intervalMs: 5000,
            },
            {
              id: nanoid(),
              images: [
                '/images/highlights/summer-1.jpg',
                '/images/highlights/summer-2.jpg',
                '/images/highlights/summer-3.jpg',
              ],
              title: 'Summer Vibes',
              badge: 'Распродажа',
              link: '/catalog?tag=summer',
              intervalMs: 4000,
            },
          ],
          tags: [],
        },
        contacts: [],
      },

      createProduct: (data) => {
        const timestamp = new Date().toISOString();
        const newItem: Product = {
          ...data,
          id: nanoid(),
          createdAt: timestamp,
          updatedAt: timestamp,
          order: get().products.length,
        };
        set((state) => ({ products: [...state.products, newItem] }));
        return newItem;
      },

      updateProduct: (id, patch) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({ products: state.products.filter((p) => p.id !== id) })),

      duplicateProduct: (id) => {
        const src = get().products.find((p) => p.id === id);
        if (!src) return;
        const timestamp = new Date().toISOString();
        const copy: Product = {
          ...src,
          id: nanoid(),
          createdAt: timestamp,
          updatedAt: timestamp,
          order: get().products.length,
        };
        set((state) => ({ products: [...state.products, copy] }));
      },

      updateSettings: (patch) =>
        set((state) => ({ settings: { ...state.settings, ...patch } })),
    }),
    {
      name: 'shopifly-cms',
      version: 1,
    }
  )
);

export { useCMSStore as useCMS };