// src/data/products.ts
import { Product } from '@/types/product' // обязательно! (или смотри ниже)

const products: Product[] = [
  { id: '1', name: 'Black Velvet Top',    imageUrl: '/images/1.jpg', price: 3400, discount: 0,  isNew: true  },
  { id: '2', name: 'Black Buttoned Dress',imageUrl: '/images/2.jpg', price: 5600, discount: 15, isNew: true  },
  { id: '3', name: 'Black Lace Gown',     imageUrl: '/images/3.jpg', price: 6200, discount: 0,  isNew: true  },
  { id: '4', name: 'Classic Corset',      imageUrl: '/images/4.jpg', price: 4800, discount: 20, isNew: false },
  // ... остальные товары
]

export default products
