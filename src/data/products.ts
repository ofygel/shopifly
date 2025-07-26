// src/data/products.ts
import { Product } from '@/types/product'

const products: Product[] = [
  {
    id: 'p1',
    name: 'Black Buttoned Dress',
    price: 5600,
    imageUrl: '/images/p1.jpg',
    discount: 30,
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'Черное платье с пуговицами. Состав: 100% хлопок. Машинная стирка при 30°C.',
    isNew: true,
  },
  {
    id: 'p2',
    name: 'Elegant Blazer',
    price: 7800,
    imageUrl: '/images/p2.jpg',
    discount: 15,
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Элегантный пиджак из вискозы. Подкладка: 100% полиэстер.',
    isNew: true,
  },
  {
    id: 'p3',
    name: 'Silk Scarf Top',
    price: 4200,
    imageUrl: '/images/p3.jpg',
    discount: 0,
    sizes: ['XS', 'S', 'M'],
    description:
      'Топ из натурального шёлка. Ручная стирка.',
    isNew: true,
  },
  {
    id: 'p4',
    name: 'Wide-Leg Trousers',
    price: 6100,
    imageUrl: '/images/p4.jpg',
    discount: 20,
    sizes: ['M', 'L', 'XL'],
    description:
      'Брюки с широкими штанинами. 100% полиэстер.',
    isNew: false,
  },
  {
    id: 'p5',
    name: 'Leather Mini Skirt',
    price: 8900,
    imageUrl: '/images/p5.jpg',
    discount: 25,
    sizes: ['XS', 'S', 'M'],
    description:
      'Мини‑юбка из искусственной кожи. Срок службы 3 года.',
    isNew: false,
  },
  {
    id: 'p6',
    name: 'Denim Jacket',
    price: 7200,
    imageUrl: '/images/p6.jpg',
    discount: 10,
    sizes: ['S', 'M', 'L', 'XL'],
    description:
      'Джинсовая куртка средней длины. 98% хлопок, 2% эластан.',
    isNew: false,
  },
  {
    id: 'p7',
    name: 'Pleated Midi Skirt',
    price: 5300,
    imageUrl: '/images/p7.jpg',
    discount: 0,
    sizes: ['XS', 'S', 'M', 'L'],
    description:
      'Плиссированная миди‑юбка. Легкая ткань.',
    isNew: false,
  },
  {
    id: 'p8',
    name: 'Classic White Shirt',
    price: 4800,
    imageUrl: '/images/p8.jpg',
    discount: 5,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description:
      'Белая рубашка из хлопка. Машинная стирка при 40°C.',
    isNew: false,
  },
]

export default products
