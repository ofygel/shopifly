'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'
import QuickViewModal from './QuickViewModal'
import { Product } from '@/types/product'

interface Props {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {
  // Если открытие QuickView идёт через store — этот блок не нужен:
  // const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          // onQuickView — не нужен, так как обработчик берётся из стора внутри ProductCard
        />
      ))}
    </div>
  )
}
