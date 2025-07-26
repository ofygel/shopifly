'use client'

import { Product } from '@/types/product'
import { useUIStore } from '@/store/ui'
import { cn } from '@/lib/cn'

export default function ProductCard({ product }: { product: Product }) {
  const open = useUIStore((s) => s.openPanel)

  return (
    <button
      className="group w-full text-left"
      onClick={() => open('product', product)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.images[0]}
        alt={product.name}
        className="rounded-2xl w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="font-medium">{product.name}</div>
        <div className="text-white/70 text-sm whitespace-nowrap">
          {product.price.toLocaleString()} ₸
        </div>
      </div>
    </button>
  )
}
