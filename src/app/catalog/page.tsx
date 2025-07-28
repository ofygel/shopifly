'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/types/product'
import ProductDetails from '@/components/ProductDetails'
// Моковые данные
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

// Категории и цвета
const categories = [
  { id: 'dresses', name: 'Платья' },
  { id: 'tops', name: 'Верх' },
  { id: 'bottoms', name: 'Низ' },
  { id: 'accessories', name: 'Аксессуары' }
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = ['Чёрный', 'Белый', 'Красный', 'Синий', 'Зелёный', 'Коричневый', 'Бордовый', 'Золотой'];

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

// Компонент для быстрого просмотра
const QuickView = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || 'M');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-stone-900/80 backdrop-blur-lg rounded-xl border border-stone-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-white z-10 p-2 rounded-full hover:bg-stone-800 transition-all"
            aria-label="Закрыть"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="flex justify-center items-center">
              {product.imageUrl ? (
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                  {product.imageUrl.endsWith('.mp4') || product.imageUrl.endsWith('.mov') ? (
                    <video 
                      src={product.imageUrl}
                      className="w-full h-full object-contain"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              ) : (
                <div className="bg-stone-800 border border-stone-700 rounded-lg w-full h-[400px] flex items-center justify-center">
                  <span className="text-stone-500">Изображение отсутствует</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-stone-100">{product.name}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    {product.discount && (
                      <span className="bg-rose-700 text-white px-2 py-1 rounded text-sm font-bold">
                        -{product.discount}%
                      </span>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-stone-100">
                        †{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-stone-500 line-through">
                          †{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-stone-300 font-medium mb-2">Размер</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-md transition-all ${
                          selectedSize === size
                            ? 'bg-stone-100 text-stone-900 font-bold'
                            : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.description && (
                <div className="mb-6">
                  <h3 className="text-stone-300 font-medium mb-2">Описание</h3>
                  <p className="text-stone-400">{product.description}</p>
                </div>
              )}

              <div className="mt-auto pt-6">
                <button className="w-full bg-gradient-to-r from-rose-700 to-rose-800 py-3 font-bold text-stone-100 hover:from-rose-600 hover:to-rose-700 transition-all rounded-md">
                  Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Локальный компонент карточки продукта с QuickView
const ProductCard = ({ 
  product, 
  viewMode,
  onQuickView
}: { 
  product: Product; 
  viewMode: 'grid' | 'list';
  onQuickView: (product: Product) => void;
}) => {
  return (
    <motion.div
      className={`${
        viewMode === 'grid' 
          ? 'bg-gradient-to-b from-stone-900/40 to-stone-800/30 backdrop-blur-md border border-stone-700/50 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(100,100,100,0.4)] p-4'
          : 'flex items-start gap-6 p-6 bg-gradient-to-r from-stone-900/40 to-stone-800/30 backdrop-blur-md border border-stone-700/50 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.3)]'
      } transition-all relative group overflow-hidden`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {viewMode === 'grid' ? (
        <>
          <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-4">
            {product.imageUrl ? (
              <>
                {product.imageUrl.endsWith('.mp4') || product.imageUrl.endsWith('.mov') ? (
                  <video 
                    src={product.imageUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <button 
                  onClick={() => onQuickView(product)}
                  className="absolute bottom-4 right-4 bg-stone-900/80 backdrop-blur-sm text-stone-300 hover:text-white hover:bg-stone-800 rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Быстрый просмотр"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="w-full h-full bg-stone-800 flex items-center justify-center">
                <span className="text-stone-500">No image</span>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-bold text-stone-100 mb-1">{product.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-lg text-stone-100 font-medium">
                †{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-stone-500 text-sm line-through">
                  †{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.discount && (
                <span className="ml-auto bg-rose-700 text-white px-2 py-1 rounded text-xs font-bold">
                  -{product.discount}%
                </span>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
            {product.imageUrl ? (
              product.imageUrl.endsWith('.mp4') || product.imageUrl.endsWith('.mov') ? (
                <video 
                  src={product.imageUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <div className="w-full h-full bg-stone-800 flex items-center justify-center">
                <span className="text-stone-500">No image</span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-stone-100 text-lg mb-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg text-stone-100 font-medium">
                    †{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-stone-500 text-sm line-through">
                      †{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discount && (
                    <span className="ml-2 bg-rose-700 text-white px-2 py-1 rounded text-xs font-bold">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                {product.description && (
                  <p className="text-stone-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                )}
              </div>
              
              <button 
                onClick={() => onQuickView(product)}
                className="bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 rounded-full p-2 transition-all"
                aria-label="Быстрый просмотр"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-md text-sm transition-all">
                Добавить в корзину
              </button>
              
              {product.sizes && product.sizes.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-stone-400 text-sm">Размеры:</span>
                  <div className="flex gap-1">
                    {product.sizes.map(size => (
                      <span key={size} className="text-stone-300 text-sm">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default function CatalogPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Исправленная функция фильтрации с явным возвратом true в конце
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
    
    // Если все фильтры пройдены
    return true;
  });

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

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="relative min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Слой фона с анимацией */}
        <motion.div 
          className="fixed inset-0 bg-black/70 backdrop-blur-lg z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMounted ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Основной контент с анимацией */}
        <motion.div 
          className="relative z-10 pt-14"
          initial={{ y: 50, opacity: 0 }}
          animate={{ 
            y: isMounted ? 0 : 50, 
            opacity: isMounted ? 1 : 0 
          }}
          transition={{ 
            duration: 0.7, 
            delay: 0.2,
            ease: [0.16, 0.77, 0.47, 0.97] 
          }}
        >
          {/* Хлебные крошки */}
          <div className="container mx-auto px-6 py-3">
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

          <div className="container mx-auto px-6 py-3 grid lg:grid-cols-[250px_1fr] gap-5 pb-8">
            {/* Левая панель фильтра */}
            <motion.div 
              className="bg-black/20 backdrop-blur-lg rounded-2xl p-5 self-start border border-white/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Фильтр</h2>

              {/* Категории */}
              <div className="mb-5">
                <h3 className="text-white font-medium mb-2">Категории</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={category.id}
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => toggleCategory(category.name)}
                        className="h-4 w-4 accent-rose-500"
                      />
                      <label htmlFor={category.id} className="ml-2 text-gray-300 cursor-pointer hover:text-white transition-colors">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Размеры */}
              <div className="mb-5">
                <h3 className="text-white font-medium mb-2">Размер</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        selectedSizes.includes(size)
                          ? 'bg-rose-500 text-white'
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
                <h3 className="text-white font-medium mb-2">Цвет</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => toggleColor(color)}
                      className={`w-7 h-7 rounded-full border ${
                        selectedColors.includes(color)
                          ? 'border-white ring-2 ring-rose-500'
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
                className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors text-sm"
              >
                Сбросить фильтры
              </button>
            </motion.div>

            {/* Правый блок — товары */}
            <motion.div 
              className="bg-black/20 backdrop-blur-lg rounded-2xl p-5 space-y-5 border border-white/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {/* Тулбар: переключатели вида + поиск */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition ${
                      viewMode === 'grid' 
                        ? 'bg-rose-500' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    aria-label="Плиточный вид"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor">
                      <rect x="1" y="1" width="6" height="6" rx="1" />
                      <rect x="11" y="1" width="6" height="6" rx="1" />
                      <rect x="1" y="11" width="6" height="6" rx="1" />
                      <rect x="11" y="11" width="6" height="6" rx="1" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition ${
                      viewMode === 'list' 
                        ? 'bg-rose-500' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    aria-label="Списочный вид"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor">
                      <line x1="3" y1="5" x2="15" y2="5" strokeWidth="2" />
                      <line x1="3" y1="9" x2="15" y2="9" strokeWidth="2" />
                      <line x1="3" y1="13" x2="15" y2="13" strokeWidth="2" />
                    </svg>
                  </button>
                </div>
                <div className="relative w-full sm:w-56">
                  <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/20 placeholder-gray-400 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition text-sm"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                    🔍
                  </span>
                </div>
              </div>

              {/* Результаты фильтрации */}
              <div className="text-white mb-3 text-sm">
                Найдено товаров: <span className="font-bold">{filteredProducts.length}</span>
              </div>

              {/* Сетка товаров */}
              <motion.div 
                className={`
                  grid gap-4
                  ${viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'}
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                    onQuickView={openQuickView}
                  />
                ))}
              </motion.div>

              {/* Сообщение если ничего не найдено */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                  <h3 className="text-xl text-white font-bold mb-2">Товары не найдены</h3>
                  <p className="text-gray-300 text-sm">
                    Попробуйте изменить параметры фильтра или поиска
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Quick View Modal */}
        {quickViewProduct && (
          <ProductDetails product={quickViewProduct} onClose={closeQuickView} />
       )}
      </motion.div>
    </AnimatePresence>
  )
} 