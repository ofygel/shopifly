import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

// Типы товаров
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

// Тип для плиток слайд-шоу на главном экране
export type Highlight = {
  id: string;
  images: string[];
};

export type HomeSettings = {
  heroTitle?: string;
  heroSubtitle?: string;
  highlights: Highlight[];
};

export type Settings = {
  home: HomeSettings;
};

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
            },
            {
              id: nanoid(),
              images: [
                '/images/highlights/summer-1.jpg',
                '/images/highlights/summer-2.jpg',
                '/images/highlights/summer-3.jpg',
              ],
            },
          ],
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

// alias для удобного импорта
export { useCMSStore as useCMS };