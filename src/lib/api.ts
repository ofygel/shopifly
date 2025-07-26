// src/lib/api.ts
import { Product } from '@/types/product'

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('/api/products', { next: { revalidate: 60 } })
  if (!res.ok) {
    throw new Error('Не удалось загрузить каталог')
  }
  return res.json()
}
