// src/components/panels/ProductCard.tsx
'use client'

import Image from 'next/image'
import { Product } from '@/types/product'
// Предполагаем, что ваш zustand‑стор экспортирует хук useUIStore
import { useUIStore } from '@/store/ui'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // берём только функцию открытия Quick View
  const openQuickView = useUIStore((s) => s.openQuickView)

  // discount может быть undefined → приводим к числу
  const discount = product.discount ?? 0

  return (
    <div className="relative group rounded-xl overflow-hidden">
      {/* Фон плитки */}
      <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />

      {/* Изображение */}
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={400}
        className="relative w-full h-full object-cover transition-transform group-hover:scale-105"
      />

      {/* Бейдж скидки */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 bg-black/70 text-white text-sm px-2 py-1 rounded">
          -{discount}%
        </div>
      )}

      {/* Плашка с ценой */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3">
        <span className="text-white text-lg font-medium">
          {product.price.toLocaleString()} ₸
        </span>
      </div>

      {/* Кнопка Quick View */}
      <button
        onClick={() => openQuickView(product)}
        className="absolute bottom-3 right-3 p-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition"
        aria-label="Быстрый просмотр"
      >
        {/* Встроенная SVG‑иконка лупы */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx={11} cy={11} r={8} />
          <line x1={21} y1={21} x2={16.65} y2={16.65} />
        </svg>
      </button>
    </div>
  )
}
