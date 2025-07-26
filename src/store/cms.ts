"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

// === Types ===
export interface Product {
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
}

export interface Highlight {
  id: string;
  images: string[];      // пути к изображениям слайда
  title?: string;        // заголовок плитки
  badge?: string;        // бейдж (например, «Новинка»)
  link?: string;         // ссылка при клике
  intervalMs?: number;   // интервал смены кадра
}

export interface Contact {
  id: string;
  type: 'phone' | 'email' | 'address' | string;
  label: string;
  value: string;
}

export interface HomeSettings {
  heroTitle?: string;
  heroSubtitle?: string;
  highlights: Highlight[];
  tags: string[];
}

export interface Settings {
  home: HomeSettings;
  contacts: Contact[];
}

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

// === Store Initialization ===
export const useCMSStore = create<CMSState>()(
  persist(
    (set, get) => ({
      // --- Initial state ---
      products: [],
      settings: {
        home: {
          heroTitle: 'Создай свой стиль вместе с нами',
          heroSubtitle: 'Коллекция женской одежды с акцентом на качество и комфорт.',
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
              badge: 'Акция',
              link: '/catalog?tag=summer',
              intervalMs: 4000,
            },
          ],
          tags: ['Новинки', 'Распродажа'],
        },
        contacts: [
          {
            id: nanoid(),
            type: 'phone',
            label: 'Телефон',
            value: '+7 (727) 123-45-67',
          },
          {
            id: nanoid(),
            type: 'email',
            label: 'Email',
            value: 'info@shopifly.kz',
          },
          {
            id: nanoid(),
            type: 'address',
            label: 'Адрес',
            value: 'г. Алматы, ул. Достык, 123',
          },
        ],
      },

      // --- Actions ---
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

// Экспорт alias
export { useCMSStore as useCMS };