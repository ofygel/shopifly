'use client'

import Image from 'next/image'
import { Product } from '@/types/product'

interface Props {
  product: Product
  onQuickView: (p: Product) => void
}

export function ProductCard({ product, onQuickView }: Props) {
  // показываем скидку только если >0
  const hasDiscount = typeof product.discount === 'number' && product.discount > 0

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative cursor-pointer rounded-2xl overflow-hidden bg-black/30 backdrop-blur-sm border border-white/10 hover:shadow-2xl transition-shadow"
    >
      {hasDiscount && (
        <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          -{product.discount}%
        </span>
      )}

      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={400}
        className="object-cover w-full h-60 md:h-72"
      />

      <div className="p-2 flex justify-between items-center bg-black/50 backdrop-blur-xs">
        <span className="font-medium text-white">
          {product.price.toLocaleString()} ₸
        </span>
        <button
          aria-label="Quick view"
          className="opacity-0 group-hover:opacity-100 transition-opacity text-white"
        >
          🔍
        </button>
      </div>
    </div>
  )
}
