export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  imageUrl: string;
  images?: string[];         // ← добавить!
  category?: string;
  color?: string;
  sizes?: string[];
  isNew?: boolean;
  isSoldOut?: boolean;       // ← добавить!
  isExclusive?: boolean;     // ← добавить!
  videoUrl?: string;         // ← добавить!
}