'use client'

import Image from 'next/image'
import { Product } from '@/types/product'

interface Props {
  product: Product
  onQuickView: (p: Product) => void
}

export function ProductCard({ product, onQuickView }: Props) {
  const hasDiscount = typeof product.discount === 'number' && product.discount > 0

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative cursor-pointer rounded-2xl overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 hover:shadow-2xl transition-shadow"
    >
      {/* Значок "Новинка" */}
      {product.isNew && (
        <span className="absolute top-2 right-2 bg-white/80 text-black text-xs uppercase px-2 py-1 rounded z-10">
          Новинка
        </span>
      )}

      {/* Значок скидки */}
      {hasDiscount && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">
          -{product.discount}%
        </span>
      )}

      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={400}
        className="object-cover w-full h-60 md:h-72 transition-transform group-hover:scale-105"
        priority={true}
      />

      <div className="p-4 flex flex-col h-28 justify-between bg-black/50 backdrop-blur-xs">
        <h3 className="text-white text-lg font-medium">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="font-medium text-white">
            {product.price.toLocaleString()} ₸
          </span>
          <button
            aria-label="Quick view"
            onClick={e => { e.stopPropagation(); onQuickView(product) }}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-white"
          >
            🔍
          </button>
        </div>
      </div>
    </div>
  )
}
