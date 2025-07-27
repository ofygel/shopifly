// src/data/products.ts (или прямо в файле page.tsx)
import type { Product } from '@/types/product'

export const products: Product[] = [
  {
    id: "1",
    name: "Викторианское платье",
    imageUrl: "",
    price: 5600,
    originalPrice: 7300,
    discount: 25,
    category: "Платья",
    sizes: ["S", "M", "L"],
    color: "Чёрный"
  },
  {
    id: "2",
    name: "Кружевной топ",
    imageUrl: "",
    price: 4200,
    originalPrice: 6100,
    discount: 10,
    category: "Верх",
    sizes: ["XS", "S"],
    color: "Белый"
  },
  {
    id: "3",
    name: "Кожаная юбка",
    imageUrl: "",
    price: 4800,
    originalPrice: 6100,
    discount: 10,
    category: "Низ",
    sizes: ["S", "M"],
    color: "Коричневый"
  },
  {
    id: "4",
    name: "Шёлковый жакет",
    imageUrl: "",
    price: 7200,
    originalPrice: 8000,
    discount: 5,
    category: "Верх",
    sizes: ["M", "L"],
    color: "Бордовый"
  },
  {
    id: "5",
    name: "Готическое платье",
    imageUrl: "",
    price: 6900,
    originalPrice: 9200,
    discount: 15,
    category: "Платья",
    sizes: ["S", "M"],
    color: "Чёрный"
  },
  {
    id: "6",
    name: "Бархатные брюки",
    imageUrl: "",
    price: 5300,
    originalPrice: 6200,
    discount: 15,
    category: "Низ",
    sizes: ["S", "M", "L"],
    color: "Тёмно-синий"
  },
  {
    id: "7",
    name: "Корсетный топ",
    imageUrl: "",
    price: 3800,
    originalPrice: 4800,
    discount: 20,
    category: "Верх",
    sizes: ["XS", "S"],
    color: "Чёрный"
  },
  {
    id: "8",
    name: "Парчовая юбка",
    imageUrl: "",
    price: 6100,
    originalPrice: 7600,
    discount: 20,
    category: "Низ",
    sizes: ["S", "M"],
    color: "Золотой"
  }
]
