// src/types/product.ts
export interface Product {
  id: string
  name: string
  price: number      // в тенге
  imageUrl: string   // путь от public/, например "/images/p1.jpg"
  discount?: number  // процент скидки
  sizes?: string[]   // доступные размеры
  description?: string
  isNew?: boolean    // новинка
}
