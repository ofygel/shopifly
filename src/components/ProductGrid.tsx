'use client'

import { Product } from '@/types/product'
import ProductCard from './ProductCard'

interface Props {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode="grid"   // <-- Обязательно добавь этот проп
        />
      ))}
    </div>
  )
}
