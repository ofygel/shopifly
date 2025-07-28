import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || 'M');
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // Дополнительные изображения для галереи
  const galleryImages = [
    product.imageUrl,
    '/images/products/back.jpg',
    '/images/products/details.jpg',
    '/images/products/closeup.jpg'
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleAddToCart = () => {
    // Эффект добавления в корзину
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
      cartBtn.classList.add('animate-ping');
      setTimeout(() => cartBtn.classList.remove('animate-ping'), 500);
    }
  };

  const handleBuyNow = () => {
    // Эффект быстрой покупки
    const buyBtn = document.getElementById('buy-now-btn');
    if (buyBtn) {
      buyBtn.classList.add('ring-2', 'ring-green-500');
      setTimeout(() => buyBtn.classList.remove('ring-2', 'ring-green-500'), 1000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl border border-stone-700 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-stone-400 hover:text-white z-20 p-2 rounded-full hover:bg-stone-800 transition-all"
            aria-label="Закрыть"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8">
            {/* Галерея */}
            <div className="space-y-6">
              <motion.div 
                className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {galleryImages[currentImage] ? (
                  galleryImages[currentImage].endsWith('.mp4') || galleryImages[currentImage].endsWith('.mov') ? (
                    <video 
                      src={galleryImages[currentImage]}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img 
                      src={galleryImages[currentImage]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="bg-stone-800 w-full h-full flex items-center justify-center">
                    <span className="text-stone-500">Изображение отсутствует</span>
                  </div>
                )}
                
                <motion.button 
                  className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-sm text-stone-300 hover:text-rose-500 rounded-full p-3 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-6 w-6 ${isFavorite ? 'text-rose-500 fill-rose-500' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </motion.button>
              </motion.div>
              
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((img, index) => (
                  <motion.div
                    key={index}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${currentImage === index ? 'border-rose-600' : 'border-stone-700'}`}
                    whileHover={{ y: -5 }}
                    onClick={() => setCurrentImage(index)}
                  >
                    {img ? (
                      <img 
                        src={img} 
                        alt={`Вариант ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                    ) : (
                      <div className="bg-stone-800 w-full h-24 flex items-center justify-center">
                        <span className="text-stone-500 text-xs">No image</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Информация о товаре */}
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-stone-100 mb-2">{product.name}</h1>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-stone-100">
                          †{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-stone-500 line-through">
                            †{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {product.discount && (
                        <span className="bg-rose-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-stone-800/50 px-3 py-2 rounded-full">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-stone-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-stone-100 w-8 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-stone-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-stone-400 mb-6">
                  <span>Артикул: {product.id}</span>
                  <span>•</span>
                  <span>Категория: {product.category}</span>
                </div>
              </div>
              
              {/* Выбор размера */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-stone-300 font-medium mb-4 text-lg">Размер</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 rounded-xl transition-all text-lg ${
                          selectedSize === size
                            ? 'bg-gradient-to-r from-rose-700 to-rose-800 text-white font-bold'
                            : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-stone-400 text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Доставка за 2-5 дней</span>
                  </div>
                </div>
              )}
              
              {/* Кнопки действий */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  id="cart-btn"
                  className="flex-1 bg-gradient-to-r from-rose-700 to-rose-800 py-4 font-bold text-stone-100 hover:from-rose-600 hover:to-rose-700 transition-all rounded-xl flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Добавить в корзину
                </motion.button>
                
                <motion.button
                  id="buy-now-btn"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 py-4 font-bold text-white hover:from-emerald-500 hover:to-emerald-600 transition-all rounded-xl flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Оплатить сейчас
                </motion.button>
              </div>
              
              {/* Табы с информацией */}
              <div className="mb-6">
                <div className="border-b border-stone-700 mb-6">
                  <div className="flex space-x-8">
                    {['description', 'specs', 'reviews'].map((tab) => (
                      <button
                        key={tab}
                        className={`pb-3 px-1 font-medium text-lg relative ${
                          activeTab === tab
                            ? 'text-rose-500'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab === 'description' && 'Описание'}
                        {tab === 'specs' && 'Характеристики'}
                        {tab === 'reviews' && 'Отзывы'}
                        {activeTab === tab && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"
                            layoutId="tabIndicator"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'description' && (
                    <div className="space-y-4 text-stone-300">
                      <p>Элегантное викторианское платье из чёрного шёлка, украшенное ручной вышивкой и кружевными вставками. Идеально подходит для особых случаев, создаёт утончённый и загадочный образ.</p>
                      <p>Особенности:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Ручная вышивка золотыми нитями</li>
                        <li>Корсетный лиф с косточками</li>
                        <li>Многослойная юбка с кринолином</li>
                        <li>Кружевные рукава-фонарики</li>
                        <li>Застёжка на шнуровку сзади</li>
                      </ul>
                      <p>Состав: 95% шёлк, 5% эластан. Только профессиональная химчистка.</p>
                    </div>
                  )}
                  
                  {activeTab === 'specs' && (
                    <div className="grid grid-cols-2 gap-4 text-stone-300">
                      <div className="space-y-2">
                        <p className="font-medium">Материал</p>
                        <p>Шёлк, кружево</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">Цвет</p>
                        <p>{product.color}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">Страна производства</p>
                        <p>Италия</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">Уход</p>
                        <p>Только химчистка</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">Сезон</p>
                        <p>Всесезонный</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium">Вес</p>
                        <p>1.2 кг</p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      <div className="bg-stone-800/50 p-4 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-stone-700 rounded-full w-10 h-10 flex items-center justify-center">
                            <span className="text-stone-300 font-bold">А</span>
                          </div>
                          <div>
                            <p className="font-medium text-stone-100">Анна Иванова</p>
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-stone-300">Платье просто волшебное! Качество превосходное, ткань очень приятная к телу. Получила много комплиментов на вечеринке. Размер соответствует.</p>
                      </div>
                      
                      <div className="bg-stone-800/50 p-4 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-stone-700 rounded-full w-10 h-10 flex items-center justify-center">
                            <span className="text-stone-300 font-bold">М</span>
                          </div>
                          <div>
                            <p className="font-medium text-stone-100">Мария Смирнова</p>
                            <div className="flex text-amber-400">
                              {[...Array(4)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-stone-600" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="text-stone-300">Очень красивое платье, но застёжка сзади неудобная - сложно зашнуроваться самостоятельно. Качество ткани отличное.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
              
              {/* Социальные кнопки */}
              <div className="mt-auto pt-4 border-t border-stone-700">
                <p className="text-stone-400 mb-3">Поделиться:</p>
                <div className="flex gap-3">
                  {['vk', 'tg', 'wa', 'pinterest'].map((social) => (
                    <motion.button
                      key={social}
                      className="bg-stone-800 hover:bg-stone-700 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                      whileHover={{ y: -3 }}
                    >
                      <span className="text-stone-300 text-lg font-bold">
                        {social === 'vk' && 'VK'}
                        {social === 'tg' && 'TG'}
                        {social === 'wa' && 'WA'}
                        {social === 'pinterest' && 'P'}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetails;