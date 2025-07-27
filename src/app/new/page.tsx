'use client'

import React, { useRef, useEffect, useState } from 'react'
import BackButton from '@/components/BackButton'

interface Product {
  id: number;
  name: string;
  price: number;
  dayOfWeek?: string;
  code?: string;
}

export default function NewPage() {
  // Моковые данные товаров
  const newItems: Product[] = [
    {
      id: 1,
      name: "Black Velvet Top",
      price: 3400,
      dayOfWeek: "Воскресенье",
      code: "HOBWHEA"
    },
    {
      id: 2,
      name: "Black Buttoned Dress",
      price: 5600
    },
    {
      id: 3,
      name: "Black Lace Gown",
      price: 6200
    },
    {
      id: 4,
      name: "Victorian Corset",
      price: 4800
    },
    {
      id: 5,
      name: "Gothic Long Coat",
      price: 7200
    }
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Форматирование цены
  const formatPrice = (price: number): string => {
    return '†' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Автоматическая прокрутка
  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused) scroll('right');
    }, 2000);
  };

  // Обработчики паузы при взаимодействии
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Прокрутка карусели
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

  // Инициализация
  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  return (
    <div className="relative min-h-screen">
      {/* Слой затемнения и размытия поверх видео-фона */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-0" />
      
      {/* Контент страницы */}
      <div className="relative z-10 pt-20">
        <BackButton />
        
        <div className="container mx-auto py-10 px-6 flex flex-col">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-stone-100 mb-2">НОВИНКИ</h1>
            <p className="text-stone-300 font-medium mb-2">
              Capsule Collection: Black Muse – {newItems.length} новинок
            </p>
            <div className="text-stone-600 text-center my-3">---</div>
            <p className="text-stone-300 max-w-xl">
              Новая коллекция вдохновлена викторианской элегантностью и мрачной эстетикой. Ограниченный тираж.
            </p>
          </div>

          <div 
            className="relative flex-grow flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Кнопки навигации */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 z-20 bg-stone-800/70 hover:bg-stone-700/90 rounded-full p-3 transition-all backdrop-blur-sm"
              aria-label="Назад"
            >
              <span className="text-stone-100 text-xl">‹</span>
            </button>
            
            {/* Карусель */}
            <div
              ref={carouselRef}
              className="flex w-full gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth px-4"
            >
              {newItems.map((item) => (
                <div 
                  key={item.id} 
                  className="snap-start flex-shrink-0 w-[300px] flex flex-col items-center pb-4 p-6 bg-gradient-to-b from-stone-900/40 to-stone-800/30 backdrop-blur-md border border-stone-700/50 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:shadow-[0_0_35px_rgba(100,100,100,0.4)] transition-all"
                >
                  {/* Дополнительная информация */}
                  {item.dayOfWeek && (
                    <div className="text-center mb-2">
                      <p className="font-bold text-lg text-stone-100">{item.dayOfWeek}</p>
                      {item.code && <p className="text-stone-300 text-sm">{item.code}</p>}
                    </div>
                  )}
                  
                  {/* Название товара */}
                  <h3 className="font-bold text-xl text-stone-100 text-center mb-2">
                    {item.name}
                  </h3>
                  
                  {/* Цена */}
                  <p className="text-2xl text-stone-100 font-medium mb-4">
                    {formatPrice(item.price)}
                  </p>
                  
                  {/* Кнопка */}
                  <button className="w-full bg-gradient-to-r from-stone-600 to-stone-700 py-3 font-bold text-stone-100 hover:from-stone-500 hover:to-stone-600 transition-all rounded-md">
                    СМОТРЕТЬ КОЛЛЕКЦИЮ
                  </button>
                  
                  {/* Подпись */}
                  <p className="text-stone-400 text-sm mt-2">
                    Capsule Collection
                  </p>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 z-20 bg-stone-800/70 hover:bg-stone-700/90 rounded-full p-3 transition-all backdrop-blur-sm"
              aria-label="Вперед"
            >
              <span className="text-stone-100 text-xl">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}