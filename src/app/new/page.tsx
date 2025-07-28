'use client'

import React, { useRef, useEffect, useState } from 'react'
import BackButton from '@/components/BackButton'
import { motion, AnimatePresence } from 'framer-motion'

interface Product {
  id: number;
  name: string;
  price: number;
  dayOfWeek?: string;
  code?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export default function NewPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  const newItems: Product[] = [
    {
      id: 1,
      name: "Black Velvet Top",
      price: 3400,
      dayOfWeek: "Воскресенье",
      code: "HOBWHEA",
      mediaUrl: "/images/products/dress1.jpg",
      mediaType: "image"
    },
    {
      id: 2,
      name: "Black Buttoned Dress",
      price: 5600,
      mediaUrl: "/images/products/black-dress.mp4",
      mediaType: "video"
    },
    {
      id: 3,
      name: "Black Lace Gown",
      price: 6200,
      mediaUrl: "/images/products/details.jpg",
      mediaType: "image"
    },
    {
      id: 4,
      name: "Victorian Corset",
      price: 4800,
      mediaUrl: "/images/products/closeup.jpg",
      mediaType: "image"
    },
    {
      id: 5,
      name: "Gothic Long Coat",
      price: 7200,
      mediaUrl: "/images/products/gothic-coat.mp4",
      mediaType: "video"
    }
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const formatPrice = (price: number): string => {
    return '†' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused && carouselRef.current) scroll('right');
    }, 3000);
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const scroll = (dir: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const scrollAmount = clientWidth * 0.8;
    
    if (dir === 'right') {
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;
      el.scrollTo({
        left: isAtEnd ? 0 : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    } else {
      const isAtStart = scrollLeft === 0;
      el.scrollTo({
        left: isAtStart ? scrollWidth : scrollLeft - scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  return (
    <AnimatePresence>
      <motion.div 
        className="relative min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="fixed inset-0 bg-black/70 backdrop-blur-lg z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMounted ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />
        
        <motion.div 
          className="relative z-10 pt-12"
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
          <BackButton />
          
          <div className="container mx-auto py-4 px-6 flex flex-col">
            <div className="mb-4">
              <motion.h1 
                className="text-4xl font-bold text-stone-100 mb-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                НОВИНКИ
              </motion.h1>
              <motion.p 
                className="text-stone-300 font-medium mb-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                Capsule Collection: Black Muse – {newItems.length} новинок
              </motion.p>
              <div className="text-stone-600 text-center my-1">---</div>
              <motion.p 
                className="text-stone-300 max-w-xl text-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Новая коллекция вдохновлена викторианской элегантностью и мрачной эстетикой. Ограниченный тираж.
              </motion.p>
            </div>

            <motion.div 
              className="relative flex-grow flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 z-20 bg-stone-800/70 hover:bg-stone-700/90 rounded-full p-3 transition-all backdrop-blur-sm"
                aria-label="Назад"
              >
                <span className="text-stone-100 text-xl">‹</span>
              </button>
              
              <div
                ref={carouselRef}
                className="flex w-full gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth px-4"
              >
                {newItems.map((item) => (
                  <motion.div 
                    key={item.id} 
                    className="snap-start flex-shrink-0 w-[280px] flex flex-col items-center pb-3 p-4 bg-gradient-to-b from-stone-900/40 to-stone-800/30 backdrop-blur-md border border-stone-700/50 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(100,100,100,0.4)] transition-all"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    {item.dayOfWeek && (
                      <div className="text-center mb-1">
                        <p className="font-bold text-base text-stone-100">{item.dayOfWeek}</p>
                        {item.code && <p className="text-stone-300 text-xs">{item.code}</p>}
                      </div>
                    )}
                    
                    {item.mediaUrl && item.mediaType && (
                      <div className="w-full aspect-[4/5] mb-3 overflow-hidden rounded-md bg-stone-800/50 flex items-center justify-center">
                        {item.mediaType === 'image' ? (
                          <img 
                            src={item.mediaUrl} 
                            alt={item.name} 
                            className="w-full h-full object-contain"
                            style={{ maxHeight: '100%', maxWidth: '100%' }}
                          />
                        ) : (
                          <video 
                            src={item.mediaUrl}
                            className="w-full h-full object-contain"
                            style={{ maxHeight: '100%', maxWidth: '100%' }}
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        )}
                      </div>
                    )}
                    
                    <h3 className="font-bold text-lg text-stone-100 text-center mb-1">
                      {item.name}
                    </h3>
                    
                    <p className="text-xl text-stone-100 font-medium mb-3">
                      {formatPrice(item.price)}
                    </p>
                    
                    <button className="w-full bg-gradient-to-r from-stone-600 to-stone-700 py-2 text-sm font-bold text-stone-100 hover:from-stone-500 hover:to-stone-600 transition-all rounded-md">
                      СМОТРЕТЬ КОЛЛЕКЦИЮ
                    </button>
                    
                    <p className="text-stone-400 text-xs mt-1">
                      Capsule Collection
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 z-20 bg-stone-800/70 hover:bg-stone-700/90 rounded-full p-3 transition-all backdrop-blur-sm"
                aria-label="Вперед"
              >
                <span className="text-stone-100 text-xl">›</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
