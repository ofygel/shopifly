'use client'

import { useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion as m, AnimatePresence } from 'framer-motion'

const items = [
  { id: '1', name: 'Black Velvet Top', price: 3400, imageUrl: '/images/new/velvet-top.jpg' },
  { id: '2', name: 'Buttoned Dress', price: 5600, imageUrl: '/images/new/buttoned-dress.jpg' },
  { id: '3', name: 'Lace Gown', price: 6200, imageUrl: '/images/new/lace-gown.jpg' },
  // ... добавь остальные
]

export default function NewArrivalsOverlay({ onClose }: { onClose: () => void }) {
  const railRef = useRef<HTMLDivElement>(null)

  // Пролистывание
  const scrollBy = (dx: number) => railRef.current?.scrollBy({ left: dx, behavior: 'smooth' })

  // Закрытие по Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      <m.div
        key="bg"
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      <m.section
        key="modal"
        className="fixed inset-0 z-50 flex flex-col items-center py-16 px-4 overflow-auto"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="w-full max-w-screen-xl space-y-8">
          <header className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-5xl font-medium tracking-tight">Новинки</h1>
              <p className="text-lg/7 text-zinc-300 max-w-2xl mt-2">
                Capsule Collection: <span className="italic">Black Muse</span> — 12 новинок<br />
                Коллекция вдохновлена викторианской элегантностью и мрачной эстетикой.
              </p>
            </div>
            <button
              aria-label="Закрыть"
              onClick={onClose}
              className="rounded-full border border-zinc-400/60 p-2 hover:bg-white/5 transition"
            >
              <X size={18} />
            </button>
          </header>
          <div className="relative w-full py-2">
            <button
              aria-label="Назад"
              onClick={() => scrollBy(-320)}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-30 rounded-full border border-zinc-400/60 p-2 bg-neutral-900/40 hover:bg-white/10"
            >
              <ChevronLeft size={18} />
            </button>
            <div
              ref={railRef}
              className="pl-1 pr-1 md:px-12 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
            >
              {items.map((p, i) => (
                <article
                  key={p.id}
                  className={[
                    'snap-start flex-shrink-0 bg-neutral-900/80 rounded-xl shadow-lg overflow-hidden',
                    i === 0 ? 'w-80 h-[500px]' : 'w-64 h-[420px]',
                    'group'
                  ].join(' ')}
                >
                  <div className="relative h-full flex flex-col">
                    <div className="relative flex-1 overflow-hidden">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-zinc-800/70 text-zinc-200 text-[11px] px-2 py-1 rounded">
                        Новинка
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-xl font-medium">{p.name}</h3>
                      <p className="text-lg">₸{p.price.toLocaleString('ru-KZ')}</p>
                      <button
                        className="mt-2 w-full text-left border border-zinc-300/80 text-zinc-200 px-4 py-2 rounded
                                flex items-center justify-between hover:bg-white/5 transition"
                      >
                        Смотреть коллекцию
                        <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <button
              aria-label="Вперёд"
              onClick={() => scrollBy(320)}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-30 rounded-full border border-zinc-400/60 p-2 bg-neutral-900/40 hover:bg-white/10"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </m.section>
    </AnimatePresence>
  )
}
