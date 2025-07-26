'use client'

import { Product } from '@/types/product'
import { useUIStore } from '@/store/ui'

export default function ProductTile({ product }: { product: Product }) {
  const open = useUIStore((s) => s.openPanel)
  const cover = product.preview ?? product.images?.[0]

  return (
    <button
      className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white/5"
      onClick={() => open('product', product)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {cover ? (
        <img
          src={cover}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-white/30">
          no-image
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-white text-lg font-semibold leading-snug">
          {product.name}
        </div>
        <div className="text-white/80 text-sm mt-1">
          {product.price.toLocaleString()} ₸
        </div>
      </div>
    </button>
  )
}
