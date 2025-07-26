// src/components/panels/ProductTile.tsx
'use client'

import Image from 'next/image'
import { Product } from '@/types/product'
import { useUIStore } from '@/store/ui'

interface Props {
  product: Product
}

export default function ProductTile({ product }: Props) {
  const openPanel = useUIStore((s) => s.openPanel)
  // Берём основное изображение напрямую
  const cover = product.imageUrl

  return (
    <button
      onClick={() => openPanel('product', product)}
      className="
        group relative
        flex flex-col items-start
        rounded-2xl overflow-hidden
        focus:outline-none focus:ring-2 focus:ring-white
      "
    >
      {/* Обёртка для картинки */}
      <div className="relative w-full aspect-square bg-gray-800">
        <Image
          src={cover}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {product.discount && product.discount > 0 && (
          <span className="absolute top-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded-lg">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Цена под картинкой */}
      <div className="mt-2 text-white text-lg font-medium">
        {product.price.toLocaleString()} ₸
      </div>
    </button>
  )
}
