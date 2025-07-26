"use client";

import BackButton from '@/components/BackButton'
import { ProductGrid } from '@/components/ProductGrid'
import { products } from '@/data/products'

export default function CatalogPage() {
  return (
    <main className="relative">
      <BackButton />

      <div className="container mx-auto py-10 px-6 bg-black/40 backdrop-blur-md rounded-2xl mt-20">
        <h1 className="text-3xl font-bold text-white mb-6">Каталог</h1>
        <ProductGrid products={products} />
      </div>
    </main>
  )
}
