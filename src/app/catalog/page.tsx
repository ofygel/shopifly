'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/types/product'

// Моковые данные товаров с добавленным imageUrl
const products: Product[] = [
  {
    id: "1",
    name: "Викторианское платье",
    imageUrl: "/images/products/dress1.jpg",
    price: 5600,
    originalPrice: 7300,
    discount: 25,
    category: "Платья",
    sizes: ["S", "M", "L"],
    color: "Чёрный"
  },
  {
    id: "2",
    name: "Кружевной топ",
    imageUrl: "/images/products/top1.jpg",
    price: 4200,
    originalPrice: 6100,
    discount: 10,
    category: "Верх",
    sizes: ["XS", "S"],
    color: "Белый"
  },
  {
    id: "3",
    name: "Кожаная юбка",
    imageUrl: "/images/products/skirt1.jpg",
    price: 4800,
    originalPrice: 6100,
    discount: 10,
    category: "Низ",
    sizes: ["S", "M"],
    color: "Коричневый"
  },
  {
    id: "4",
    name: "Шёлковый жакет",
    imageUrl: "/images/products/jacket1.jpg",
    price: 7200,
    originalPrice: 8000,
    discount: 5,
    category: "Верх",
    sizes: ["M", "L"],
    color: "Бордовый"
  },
  {
    id: "5",
    name: "Готическое платье",
    imageUrl: "/images/products/dress2.jpg",
    price: 6900,
    originalPrice: 9200,
    discount: 15,
    category: "Платья",
    sizes: ["S", "M"],
    color: "Чёрный"
  },
  {
    id: "6",
    name: "Бархатные брюки",
    imageUrl: "/images/products/pants1.jpg",
    price: 5300,
    originalPrice: 6200,
    discount: 15,
    category: "Низ",
    sizes: ["S", "M", "L"],
    color: "Тёмно-синий"
  },
  {
    id: "7",
    name: "Корсетный топ",
    imageUrl: "/images/products/top2.jpg",
    price: 3800,
    originalPrice: 4800,
    discount: 20,
    category: "Верх",
    sizes: ["XS", "S"],
    color: "Чёрный"
  },
  {
    id: "8",
    name: "Парчовая юбка",
    imageUrl: "/images/products/skirt2.jpg",
    price: 6100,
    originalPrice: 7600,
    discount: 20,
    category: "Низ",
    sizes: ["S", "M"],
    color: "Золотой"
  }
];

// Категории фильтров
const categories = [
  { id: 'dresses', name: 'Платья' },
  { id: 'tops', name: 'Верх' },
  { id: 'bottoms', name: 'Низ' },
  { id: 'accessories', name: 'Аксессуары' }
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = ['Чёрный', 'Белый', 'Красный', 'Синий', 'Зелёный', 'Коричневый', 'Бордовый', 'Золотой'];

// Вспомогательная функция для цветов
const getColorHex = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    'Чёрный': '#000000',
    'Белый': '#ffffff',
    'Красный': '#ff0000',
    'Синий': '#0000ff',
    'Зелёный': '#00ff00',
    'Коричневый': '#a52a2a',
    'Бордовый': '#800020',
    'Золотой': '#ffd700'
  };
  return colorMap[colorName] || '#cccccc';
};

export default function CatalogPage() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Фильтрация товаров
  const filteredProducts = products.filter(product => {
    // Фильтр по категории
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category ?? "")) {
      return false;
    }
    // Фильтр по размеру
    if (selectedSizes.length > 0) {
      const productSizes = product.sizes || [];
      const hasSize = selectedSizes.some(size => productSizes.includes(size));
      if (!hasSize) return false;
    }
    // Фильтр по цвету
    if (selectedColors.length > 0 && !selectedColors.includes(product.color ?? "")) {
      return false;
    }
    // Фильтр по поиску
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Обработчики фильтров
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
    <div className="min-h-screen pt-20 bg-black/30 backdrop-blur-sm">
      {/* Хлебные крошки */}
      <div className="container mx-auto px-6 py-4">
        <nav className="text-gray-300 text-sm">
          <span 
            className="cursor-pointer hover:text-white transition-colors"
            onClick={() => router.push('/')}
          >
            Главная
          </span>
          <span className="mx-2">/</span>
          <span className="text-white">Каталог</span>
        </nav>
      </div>

      <div className="container mx-auto px-6 py-4 grid lg:grid-cols-[250px_1fr] gap-6 pb-10">
        {/* Левая панель фильтра */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-5 self-start border border-white/10">
          <h2 className="text-xl font-bold text-white mb-5">Фильтр</h2>

          {/* Категории */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Категории</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category.id}
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => toggleCategory(category.name)}
                    className="h-4 w-4 accent-pink-500"
                  />
                  <label htmlFor={category.id} className="ml-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Размеры */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Размер</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1 rounded-md ${
                    selectedSizes.includes(size)
                      ? 'bg-pink-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  } transition-colors`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Цвета */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Цвет</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => toggleColor(color)}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColors.includes(color)
                      ? 'border-white ring-2 ring-pink-500'
                      : 'border-gray-600 hover:border-gray-400'
                  } transition-all`}
                  style={{ backgroundColor: getColorHex(color) }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Сброс фильтров */}
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedSizes([]);
              setSelectedColors([]);
            }}
            className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>

        {/* Правый блок — товары */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 space-y-6 border border-white/10">
          {/* Тулбар: переключатели вида + поиск */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-3">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition ${
                  viewMode === 'grid' 
                    ? 'bg-pink-500' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                aria-label="Плиточный вид"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor">
                  <rect x="2" y="2" width="6" height="6" rx="1" />
                  <rect x="12" y="2" width="6" height="6" rx="1" />
                  <rect x="2" y="12" width="6" height="6" rx="1" />
                  <rect x="12" y="12" width="6" height="6" rx="1" />
                </svg>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition ${
                  viewMode === 'list' 
                    ? 'bg-pink-500' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                aria-label="Списочный вид"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor">
                  <line x1="4" y1="6" x2="16" y2="6" strokeWidth="2" />
                  <line x1="4" y1="12" x2="16" y2="12" strokeWidth="2" />
                  <line x1="4" y1="18" x2="16" y2="18" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/20 placeholder-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                🔍
              </span>
            </div>
          </div>

          {/* Результаты фильтрации */}
          <div className="text-white mb-4">
            Найдено товаров: <span className="font-bold">{filteredProducts.length}</span>
          </div>

          {/* Сетка товаров */}
          <div 
            className={`
              grid gap-6
              ${viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'}
            `}
          >
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Сообщение если ничего не найдено */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-xl text-white font-bold mb-2">В каталоге пока нет товаров</h3>
              <p className="text-gray-300">
                Попробуйте изменить параметры фильтра или поиска
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}