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

// Тип плитки-«highlight» на главной странице
export type Highlight = {
  id: string;
  images: string[];
  title?: string;
  badge?: string;
  link?: string;
  intervalMs?: number;
};

// Тип контакта для панели контактов
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

// Интерфейс состояния CMS
export interface CMSState {
  products: Product[];
  settings: Settings;
  createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'order'>): Product;
  updateProduct(id: string, patch: Partial<Product>): void;
  deleteProduct(id: string): void;
  duplicateProduct(id: string): void;
  updateSettings(patch: Partial<Settings>): void;
}

// Создание Zustand-хранилища с персистом
export const useCMSStore = create<CMSState>()(
  persist(
    (set, get) => ({
      // Начальные значения
      products: [],
      settings: {
        home: {
          heroTitle: '',
          heroSubtitle: '',
          highlights: [],
          tags: [],
        },
        contacts: [],
      },

      // Действия для продуктов
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

      // Действие для обновления всех настроек
      updateSettings: (patch) =>
        set((state) => ({ settings: { ...state.settings, ...patch } })),
    }),
    {
      name: 'shopifly-cms',
      version: 1,
    }
  )
);

// Экспорт alias для удобного импорта
export { useCMSStore as useCMS };
