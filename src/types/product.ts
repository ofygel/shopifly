export type ProductStatus = 'draft' | 'published' | 'archived'

export type Product = {
  id: string
  name: string
  price: number
  images: string[]
  preview?: string
  sizes?: string[]
  description?: string
  shipping?: string
  returns?: string
  tags?: string[]
  collectionId?: string | null
  slug?: string
  order: number
  status: ProductStatus
  createdAt: number
  updatedAt: number
}
