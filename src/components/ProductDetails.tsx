'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  product, 
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || 'M');
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  
  const galleryImages = [
    product.imageUrl,
    '/images/products/back.jpg',
    '/images/products/details.jpg',
    '/images/products/closeup.jpg'
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    if (detailsRef.current) {
      detailsRef.current.scrollTop = 0;
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleAddToCartInternal = () => {
    setShowAddedToCart(true);
    onAddToCart();
    
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
      cartBtn.classList.add('animate-ping');
      setTimeout(() => cartBtn.classList.remove('animate-ping'), 500);
    }
    
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    const buyBtn = document.getElementById('buy-now-btn');
    if (buyBtn) {
      buyBtn.classList.add('ring-2', 'ring-green-500');
      setTimeout(() => buyBtn.classList.remove('ring-2', 'ring-green-500'), 1000);
    }
    
    const successOverlay = document.getElementById('success-overlay');
    if (successOverlay) {
      successOverlay.classList.remove('hidden');
      successOverlay.classList.add('flex');
      
      setTimeout(() => {
        successOverlay.classList.add('opacity-0');
        setTimeout(() => {
          successOverlay.classList.add('hidden');
          onClose();
        }, 500);
      }, 2000);
    }
  };

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
          ref={detailsRef}
          className="relative bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl border border-stone-700 max-w-6xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          transition={{ 
            type: 'spring', 
            damping: 25,
            stiffness: 150,
            mass: 0.8
          }}
          layout
        >
          <motion.button
            onClick={onClose}
            className="absolute top-6 right-6 text-stone-400 hover:text-white z-20 p-2 rounded-full hover:bg-stone-800 transition-all"
            aria-label="Закрыть"
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-8">
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
                    <motion.img 
                      key={currentImage}
                      src={galleryImages[currentImage]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
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
                  onClick={onToggleFavorite}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
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
            
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h1 
                      className="text-3xl font-bold text-stone-100 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {product.name}
                    </motion.h1>
                    <motion.div 
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
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
                        <motion.span 
                          className="bg-rose-700 text-white px-3 py-1 rounded-full text-sm font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 300,
                            delay: 0.6
                          }}
                        >
                          -{product.discount}%
                        </motion.span>
                      )}
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="flex items-center gap-2 bg-stone-800/50 px-3 py-2 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.65 }}
                  >
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-stone-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    >
                      -
                    </button>
                    <span className="text-stone-100 w-8 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-stone-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    >
                      +
                    </button>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="flex items-center gap-3 text-stone-400 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <span>Артикул: {product.id}</span>
                  <span>•</span>
                  <span>Категория: {product.category}</span>
                </motion.div>
              </div>
              
              {product.sizes && product.sizes.length > 0 && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                >
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + parseInt(size) * 0.05 }}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                  
                  <motion.div 
                    className="mt-4 text-stone-400 text-sm flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Доставка за 2-5 дней</span>
                  </motion.div>
                </motion.div>
              )}
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <motion.button
                  id="cart-btn"
                  className="flex-1 bg-gradient-to-r from-rose-700 to-rose-800 py-4 font-bold text-stone-100 hover:from-rose-600 hover:to-rose-700 transition-all rounded-xl flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCartInternal}
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
              </motion.div>
              
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
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
                            initial={false}
                            animate={{ width: "100%" }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <AnimatePresence mode="wait">
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
                          <li className="flex items-start">
                            <motion.span 
                              className="text-rose-500 mr-2"
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              •
                            </motion.span>
                            <span>Ручная вышивка золотыми нитями</span>
                          </li>
                          <li className="flex items-start">
                            <motion.span 
                              className="text-rose-500 mr-2"
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
                            >
                              •
                            </motion.span>
                            <span>Корсетный лиф с косточками</span>
                          </li>
                          <li className="flex items-start">
                            <motion.span 
                              className="text-rose-500 mr-2"
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
                            >
                              •
                            </motion.span>
                            <span>Многослойная юбка с кринолином</span>
                          </li>
                          <li className="flex items-start">
                            <motion.span 
                              className="text-rose-500 mr-2"
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
                            >
                              •
                            </motion.span>
                            <span>Кружевные рукава-фонарики</span>
                          </li>
                          <li className="flex items-start">
                            <motion.span 
                              className="text-rose-500 mr-2"
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ repeat: Infinity, duration: 2, delay: 0.8 }}
                            >
                              •
                            </motion.span>
                            <span>Застёжка на шнуровку сзади</span>
                          </li>
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
                        <motion.div 
                          className="bg-stone-800/50 p-4 rounded-xl"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
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
                        </motion.div>
                        
                        <motion.div 
                          className="bg-stone-800/50 p-4 rounded-xl"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
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
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              
              <motion.div 
                className="mt-auto pt-4 border-t border-stone-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <p className="text-stone-400 mb-3">Поделиться:</p>
                <div className="flex gap-3">
                  {['vk', 'tg', 'wa', 'pinterest'].map((social, index) => (
                    <motion.button
                      key={social}
                      className="bg-stone-800 hover:bg-stone-700 w-12 h-12 rounded-full flex items-center justify-center transition-all"
                      whileHover={{ y: -3 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
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
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        <AnimatePresence>
          {showAddedToCart && (
            <motion.div
              className="fixed top-24 right-10 bg-gradient-to-r from-rose-700 to-rose-800 text-white px-6 py-3 rounded-xl shadow-lg z-[60]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Товар добавлен в корзину!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div 
          id="success-overlay"
          className="hidden fixed inset-0 bg-black/90 backdrop-blur-xl z-[70] flex-col items-center justify-center opacity-100 transition-opacity duration-500"
        >
          <motion.div
            className="text-white text-5xl font-bold mb-8"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 300,
              damping: 15
            }}
          >
            Покупка совершена!
          </motion.div>
          <motion.div
            className="text-2xl text-emerald-400 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Спасибо за ваш заказ
          </motion.div>
          <motion.div
            className="text-8xl text-emerald-500"
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            ✓
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetails;