export interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  discount?: number
  isNew?: boolean
  sizes?: string[]
  description?: string
}