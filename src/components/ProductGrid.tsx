// Полный файл src/components/ProductGrid.tsx
'use client'

import { useState } from 'react'
import { ProductCard } from './ProductCard'
import { QuickViewModal } from './QuickViewModal'
import { Product } from '@/types/product'

interface Props {
  products: Product[]
}

export function ProductGrid({ products }: Props) {
  const [quick, setQuick] = useState<Product | null>(null)
  const [count, setCount] = useState(8) // изначально показываем 8 плиток

  const shown = products.slice(0, count)

  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={setQuick} />
        ))}
      </div>

      {count < products.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCount((c) => c + 4)}
            className="
              px-6 py-3
              bg-white/20 text-white
              rounded-full backdrop-blur-sm
              hover:bg-white/30 transition
            "
          >
            Показать ещё
          </button>
        </div>
      )}

      {quick && <QuickViewModal product={quick} onClose={() => setQuick(null)} />}
    </>
  )
}
