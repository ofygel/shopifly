// src/components/NewArrivalsOverlay.tsx
'use client'

import { FC } from 'react'
import { m } from 'framer-motion'
import Carousel from './Carousel'
import products from '@/data/products'
import { useUIStore } from '@/store/ui'
import { Product } from '@/types/product'

interface Props {
  onClose: () => void
}

const NewArrivalsOverlay: FC<Props> = ({ onClose }) => {
  const newItems: Product[] = products.filter(p => p.isNew)
  const openQuickView = useUIStore(s => s.openQuickView)

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-20 flex flex-col items-center 
                 bg-black/60 backdrop-blur-md overflow-auto p-6"
    >
      {/* Кнопка закрытия */}
      <button
        onClick={onClose}
        aria-label="Закрыть новинки"
        className="self-end text-3xl text-white p-2 rounded hover:bg-white/20 transition"
      >
        ×
      </button>

      {/* Заголовок */}
      <h2 className="text-4xl font-semibold text-white mb-2">
        Новинки
      </h2>
      <p className="text-center text-neutral-300 mb-6 max-w-xl">
        Capsule Collection: Black Muse — {newItems.length} новинок.<br/>
        Викторианская элегантность и мрачная эстетика.
      </p>

      {/* Плавная карусель */}
      <div className="w-full max-w-screen-xl">
        <Carousel
          items={newItems.map(item => ({
            ...item,
            onClick: () => openQuickView(item) // передаём Quick View внутрь Carousel
          }))}
        />
      </div>
    </m.div>
  )
}

export default NewArrivalsOverlay
