import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

// Тип товара
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

// Тип плитки слайд-шоу на главной странице
export type Highlight = {
  id: string;
  images: string[];
  title?: string;      // заголовок
  badge?: string;      // бейдж (например, «Новинка»)
  link?: string;       // ссылка при клике
  intervalMs?: number; // интервал смены кадра в мс
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
};

// Состояние CMS
export type CMSState = {
  products: Product[];
  settings: Settings;
  createProduct: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => Product;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  updateSettings: (patch: Partial<Settings>) => void;
};

// Хранилище Zustand с персистом в localStorage
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

// Экспорт alias для удобства импорта
export { useCMSStore as useCMS };