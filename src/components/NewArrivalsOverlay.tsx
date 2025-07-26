// src/components/NewArrivalsOverlay.tsx
'use client'

import { FC } from 'react'
import Image from 'next/image'
import { Product } from '@/types/product'
import products from '@/data/products'
import { useUIStore } from '@/store/ui'

interface Props {
  onClose: () => void
}

const NewArrivalsOverlay: FC<Props> = ({ onClose }) => {
  // отбираем только товары с флагом isNew = true
  const newItems: Product[] = products.filter(p => p.isNew)

  // для Quick View
  const openQuickView = useUIStore(s => s.openQuickView)

  return (
    <div
      className="fixed inset-0 z-20 flex flex-col items-center
                 bg-black/60 backdrop-blur-md text-white p-6 overflow-auto
                 animate-fadeIn"
    >
      <button
        onClick={onClose}
        className="self-end mb-4 text-3xl leading-none"
        aria-label="Закрыть"
      >
        ×
      </button>

      <h2 className="text-4xl font-medium mb-2">Новинки</h2>
      <p className="max-w-xl text-center mb-6">
        Capsule Collection: Black Muse — {newItems.length} новинок.<br/>
        Новая коллекция вдохновлена викторианской элегантностью и мрачной эстетикой.
      </p>

      <div className="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {newItems.map(product => (
          <div key={product.id} className="relative group rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />

            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-cover transition-transform group-hover:scale-105 rounded"
            />

            {product.isNew && (
              <div className="absolute top-3 left-3 bg-white/80 text-black text-xs uppercase px-2 py-1 rounded">
                Новинка
              </div>
            )}
            {(product.discount ?? 0) > 0 && (
              <div className="absolute top-3 right-3 bg-red-600 text-white text-sm px-2 py-1 rounded">
                -{product.discount}%
              </div>
            )}

            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 space-y-1">
              <h3 className="text-white text-lg font-medium">{product.name}</h3>
              <span className="text-white">{product.price.toLocaleString()} ₸</span>
              <button
                onClick={() => openQuickView(product)}
                className="mt-2 w-full bg-white/20 text-white text-sm py-1 rounded"
              >
                Быстрый просмотр
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewArrivalsOverlay
