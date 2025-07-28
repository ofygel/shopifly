'use client'

import Link from 'next/link'
import { m, LazyMotion, domAnimation, Variants } from 'framer-motion'
import { useCMS } from '@/store/cms'
import HighlightsColumn from './HighlightsColumn'
import HighlightsMobile from './HighlightsMobile'
import { useEffect, useState } from 'react'

export default function HeroSection() {
  const home = useCMS((s) => s.settings.home)
  const tags = home.tags ?? []
  const titleLines = (home.heroTitle || 'Создай свой стиль\nвместе с нами').split('\n')
  const subtitle = home.heroSubtitle || 'Коллекция женской одежды с акцентом на качество и комфорт.'
  const highlights = home.highlights ?? []
  
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Анимации остаются без изменений
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15 + 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  }

  const tagVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <LazyMotion features={domAnimation}>
      {/* Основные изменения здесь: добавлен padding-top и fixed видео-фон */}
      <section className="relative pt-[3.5rem] min-h-[calc(100dvh-3.5rem)] lg:h-screen lg:overflow-hidden">
        
        {/* Исправленный видео-фон */}
        <div className="fixed inset-0 z-0">
          <video
            src="/videos/fashion-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            onCanPlay={e => e.currentTarget.play().catch(() => {})}
          />
          {/* Градиент с учетом высоты хэдера */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 top-[3.5rem]"></div>
        </div>

        {/* Убран margin-top, так как уже есть padding-top на секции */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center lg:h-full">
            <div className="flex flex-col items-center text-center lg:text-left lg:items-start lg:py-0 py-12">
              {/* Теги */}
              {tags.length > 0 && (
                <m.div
                  className="flex flex-wrap justify-center gap-3 mb-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2
                      }
                    }
                  }}
                >
                  {tags.map((t) => (
                    <m.span
                      key={t}
                      className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm md:text-base backdrop-blur-lg"
                      variants={tagVariants}
                    >
                      {t}
                    </m.span>
                  ))}
                </m.div>
              )}

              {/* Заголовок */}
              <div className="mb-6 md:mb-8">
                {titleLines.map((line, i) => (
                  <m.h1
                    key={i}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={titleVariants}
                    style={{
                      fontWeight: i === 0 ? 800 : 600,
                      textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}
                  >
                    {line}
                  </m.h1>
                ))}
              </div>

              {/* Подзаголовок */}
              <m.p
                className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 md:mb-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.3 + titleLines.length * 0.15, 
                  duration: 0.7 
                }}
              >
                {subtitle}
              </m.p>

              {/* Кнопки */}
              <m.div
                className="flex flex-wrap justify-center gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.4 + titleLines.length * 0.15
                    }
                  }
                }}
              >
                <m.div variants={buttonVariants}>
                  <Link
                    href="/catalog"
                    className="px-8 py-3.5 rounded-2xl bg-white text-black font-bold hover:bg-white/90 transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                  >
                    Каталог
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </m.div>
                
                <m.div variants={buttonVariants}>
                  <Link
                    href="/new"
                    className="px-8 py-3.5 rounded-2xl bg-transparent border-2 border-white text-white hover:bg-white/20 transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                  >
                    Новинки
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </m.div>
              </m.div>
            </div>

            {/* Десктоп-слайдер */}
            {!isMobile && (
              <m.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
              >
                <HighlightsColumn items={highlights} />
              </m.div>
            )}
          </div>

          {/* Мобильный слайдер */}
          {isMobile && (
            <m.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <HighlightsMobile items={highlights} />
            </m.div>
          )}
        </div>

        {/* Декоративные элементы */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
    </LazyMotion>
  )
}