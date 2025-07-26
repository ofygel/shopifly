export type Product = {
  id: number
  name: string
  price: number
  image: string
  category: string
  tags?: string[]
}

export const products: Product[] = [
  { id: 1, name: 'Платье атласное', price: 12900, image: '/images/banner-summer.jpg', category: 'Платья', tags: ['Новинка'] },
  { id: 2, name: 'Топ шелковый', price: 6900, image: '/images/banner-capsule.jpg', category: 'Топы', tags: ['XS–XXL'] },
  // ...добавишь позже свои
]
