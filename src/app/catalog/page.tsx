'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/ui';
import ProductDetailsModal from '@/components/modals/ProductDetailsModal';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/product';

// Моковые товары
const products: Product[] = [
  {
    id: "1",
    name: "Викторианское кружевное платье",
    description: "Элегантное платье с ручной вышивкой и кружевными вставками",
    price: 12500,
    originalPrice: 15000,
    discount: 17,
    imageUrl: "/images/products/dress1.jpg",
    category: "Платья",
    color: "Чёрный",
    sizes: ["XS", "S", "M", "L"],
    isNew: true
  },
  {
    id: "2",
    name: "Кожаные ботинки на шнуровке",
    description: "Стильные кожаные ботинки на устойчивом каблуке",
    price: 8900,
    imageUrl: "/images/products/boots.jpg",
    videoUrl: "/images/products/boots.mp4",
    category: "Обувь",
    color: "Коричневый",
    sizes: ["S", "M", "L"],
    isNew: false
  },
  {
    id: "3",
    name: "Шёлковый жакет с вышивкой",
    description: "Утончённый жакет из натурального шёлка с ручной вышивкой",
    price: 7600,
    originalPrice: 9500,
    discount: 20,
    imageUrl: "/images/products/jacket.jpg",
    category: "Верхняя одежда",
    color: "Бордовый",
    sizes: ["M", "L", "XL"]
  },
  {
    id: "4",
    name: "Кожаный рюкзак",
    description: "Стильный рюкзак из натуральной кожи",
    price: 6500,
    imageUrl: "/images/products/backpack.jpg",
    category: "Аксессуары",
    color: "Чёрный"
  },
  {
    id: "5",
    name: "Шёлковая блуза с жабо",
    description: "Элегантная блуза из натурального шёлка с кружевными манжетами",
    price: 5400,
    imageUrl: "/images/products/blouse.jpg",
    category: "Блузы",
    color: "Белый",
    sizes: ["XS", "S", "M"]
  },
  {
    id: "6",
    name: "Юбка-карандаш с высокой талией",
    description: "Классическая юбка-карандаш из шерстяной ткани",
    price: 4800,
    imageUrl: "/images/products/skirt.jpg",
    category: "Юбки",
    color: "Серый",
    sizes: ["S", "M"]
  },
  {
    id: "7",
    name: "Кожаный ремень с пряжкой",
    description: "Ремень из натуральной кожи с металлической пряжкой",
    price: 3200,
    imageUrl: "/images/products/belt.jpg",
    category: "Аксессуары",
    color: "Коричневый"
  },
  {
    id: "8",
    name: "Шёлковый шарф с принтом",
    description: "Лёгкий шарф из натурального шёлка с цветочным принтом",
    price: 2800,
    imageUrl: "/images/products/scarf.jpg",
    category: "Аксессуары",
    color: "Зелёный"
  }
];

// Категории и размеры
const categories = [
  "Платья", "Блузы", "Юбки", "Верхняя одежда", "Обувь", "Аксессуары"
];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = ['Чёрный', 'Белый', 'Красный', 'Синий', 'Зелёный', 'Коричневый', 'Бордовый', 'Золотой'];

// Цвета для кнопок
const getColorHex = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    'Чёрный': '#000000',
    'Белый': '#FFFFFF',
    'Красный': '#FF0000',
    'Синий': '#0000FF',
    'Зелёный': '#00FF00',
    'Коричневый': '#964B00',
    'Бордовый': '#800020',
    'Золотой': '#FFD700'
  };
  return colorMap[colorName] || '#CCCCCC';
};

export default function CatalogPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Фильтрация товаров
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategories.length === 0 ||
      (product.category && selectedCategories.includes(product.category));
    const sizeMatch = selectedSizes.length === 0 ||
      (product.sizes && product.sizes.some(size => selectedSizes.includes(size)));
    const colorMatch = selectedColors.length === 0 ||
      (product.color && selectedColors.includes(product.color));
    const searchMatch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return categoryMatch && sizeMatch && colorMatch && searchMatch;
  });

  // Управление фильтрами
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className="relative min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Левая панель фильтра */}
        <div className="container mx-auto px-4 py-8 grid lg:grid-cols-[260px_1fr] gap-8">
          <motion.div
            className="bg-black/25 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="text-xl font-bold text-white mb-6">Фильтр</h2>
            {/* Категории */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-2">Категории</h3>
              <div className="flex flex-col gap-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="accent-rose-600 h-4 w-4"
                    />
                    <span className="text-gray-200">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Размеры */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-2">Размер</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      selectedSizes.includes(size)
                        ? 'bg-rose-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    } transition-colors`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            {/* Цвета */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-2">Цвет</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColors.includes(color)
                        ? 'border-rose-500 ring-2 ring-rose-500'
                        : 'border-gray-700 hover:border-gray-400'
                    } transition-all`}
                    style={{ backgroundColor: getColorHex(color) }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedCategories([]);
                setSelectedSizes([]);
                setSelectedColors([]);
              }}
              className="w-full py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold mt-2"
            >
              Сбросить фильтры
            </button>
          </motion.div>

          {/* Правая часть — Каталог товаров */}
          <motion.div
            className="bg-black/10 rounded-2xl p-6 border border-white/10"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.33 }}
          >
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-rose-500 text-white' : 'bg-white/10 text-gray-200 hover:bg-white/20'}`}
                  aria-label="Сетка"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor">
                    <rect x="1" y="1" width="7" height="7" rx="1" />
                    <rect x="12" y="1" width="7" height="7" rx="1" />
                    <rect x="1" y="12" width="7" height="7" rx="1" />
                    <rect x="12" y="12" width="7" height="7" rx="1" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-rose-500 text-white' : 'bg-white/10 text-gray-200 hover:bg-white/20'}`}
                  aria-label="Список"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor">
                    <line x1="4" y1="6" x2="16" y2="6" strokeWidth="2" />
                    <line x1="4" y1="10" x2="16" y2="10" strokeWidth="2" />
                    <line x1="4" y1="14" x2="16" y2="14" strokeWidth="2" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                placeholder="Поиск…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 bg-white/20 placeholder-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition text-sm"
              />
            </div>

            {/* Сетка товаров */}
            <div className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'}`}>
              {filteredProducts.map(product => (
  <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
            {/* Если ничего не найдено */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 text-white text-xl font-bold">
                Товары не найдены
              </div>
            )}
          </motion.div>
        </div>

        {/* Глобальное модальное окно деталей товара */}
        <ProductDetailsModal />
      </motion.div>
    </AnimatePresence>
  );
}
