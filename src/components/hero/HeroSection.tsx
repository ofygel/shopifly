'use client'

import Link from 'next/link'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { useCMS } from '@/store/cms'
import HighlightsColumn from './HighlightsColumn'
import HighlightsMobile from './HighlightsMobile'

export default function HeroSection() {
  const home = useCMS((s) => s.settings.home)
  const tags = home.tags ?? []
  const title = home.heroTitle || 'Создай свой стиль\nвместе с нами'
  const subtitle =
    home.heroSubtitle || 'Ощутите уникальную коллекцию женской одежды премиум‑класса'
  const highlights = home.highlights ?? []

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative flex items-start md:items-center md:min-h-[calc(100vh-3.5rem)]">
        <div className="container mx-auto px-4 pt-6 md:pt-12 lg:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_200px] gap-8 items-start">

            {/* Текстовый блок */}
            <div>
              {tags.length > 0 && (
                <m.div
                  className="flex flex-wrap gap-2 mb-6 md:mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-sm backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </m.div>
              )}

              <m.h1
                className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-white max-w-[14ch] whitespace-pre-wrap"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {title}
              </m.h1>

              <m.p
                className="mt-4 md:mt-5 text-white/70 text-base md:text-lg max-w-[48ch]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.03 }}
              >
                {subtitle}
              </m.p>

              <m.div
                className="mt-6 md:mt-8 flex gap-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.06 }}
              >
                <Link
                  href="/catalog"
                  className="px-5 py-2.5 rounded-2xl bg-white text-black font-medium hover:bg-white/90 transition text-base"
                >
                  Каталог
                </Link>
                <Link
                  href="/new"
                  className="px-5 py-2.5 rounded-2xl border border-white/20 text-white/90 hover:bg-white/10 transition text-base"
                >
                  Новинки
                </Link>
              </m.div>
            </div>

            {/* Десктоп‑слайдер хайлайтов */}
            <div className="hidden lg:block">
              <HighlightsColumn items={highlights} />
            </div>
            {/* Мобильный слайдер хайлайтов */}
            <div className="block lg:hidden">
              <HighlightsMobile items={highlights} />
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}
