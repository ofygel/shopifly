'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/ui';
import type { Product } from '@/types/product';

const ProductDetailsModal = () => {
  const { selectedProduct, closeProduct } = useUIStore();
  const [selectedSize, setSelectedSize] = useState<string>(selectedProduct?.sizes?.[0] || 'M');
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  
  const galleryImages = [
    selectedProduct?.videoUrl || '',
    selectedProduct?.imageUrl || '',
    '/images/products/back.jpg',
    '/images/products/details.jpg',
    '/images/products/closeup.jpg'
  ];

  useEffect(() => {
    if (!selectedProduct) return;
    
    // Сброс состояния при открытии нового продукта
    setSelectedSize(selectedProduct.sizes?.[0] || 'M');
    setCurrentImage(0);
    setQuantity(1);
    setActiveTab('description');
    
    document.body.style.overflow = 'hidden';
    
    if (detailsRef.current) {
      detailsRef.current.scrollTop = 0;
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProduct]);

  const handleAddToCart = () => {
    setShowAddedToCart(true);
    
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
          closeProduct();
        }, 500);
      }, 2000);
    }
  };

  if (!selectedProduct) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeProduct}
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
            onClick={closeProduct}
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
                    <motion.img 
                      key={currentImage}
                      src={galleryImages[currentImage]} 
                      alt={selectedProduct.name}
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
                  onClick={() => setIsFavorite(!isFavorite)}
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
                    <motion.h1 
                      className="text-3xl font-bold text-stone-100 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {selectedProduct.name}
                    </motion.h1>
                    <motion.div 
                      className="flex items-center gap-3 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-stone-100">
                          †{selectedProduct.price.toLocaleString()}
                        </span>
                        {selectedProduct.originalPrice && (
                          <span className="text-stone-500 line-through">
                            †{selectedProduct.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {selectedProduct.discount && (
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
                          -{selectedProduct.discount}%
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
                  <span>Артикул: {selectedProduct.id}</span>
                  <span>•</span>
                  <span>Категория: {selectedProduct.category}</span>
                </motion.div>
              </div>
              
              {/* Выбор размера */}
              {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                >
                  <h3 className="text-stone-300 font-medium mb-4 text-lg">Размер</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct.sizes.map((size) => (
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
              
              {/* Кнопки действий */}
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
              </motion.div>
              
              {/* Табы с информацией */}
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
                    {/* ... (ваши табы с описанием, характеристиками и отзывами) */}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              
              {/* Социальные кнопки */}
              <motion.div 
                className="mt-auto pt-4 border-t border-stone-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <p className="text-stone-400 mb-3">Поделиться:</p>
                <div className="flex gap-3">
                  {/* ... (ваши социальные кнопки) */}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Анимация добавления в корзину */}
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
        
        {/* Анимация успешной покупки */}
        <div 
          id="success-overlay"
          className="hidden fixed inset-0 bg-black/90 backdrop-blur-xl z-[70] flex-col items-center justify-center opacity-100 transition-opacity duration-500"
        >
          {/* ... (ваша анимация успешной покупки) */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetailsModal;