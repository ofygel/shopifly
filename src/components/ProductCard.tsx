import React from 'react'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  viewMode: 'grid' | 'list'
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString('ru-RU') + ' ₽'
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 flex flex-col sm:flex-row gap-4 hover:bg-black/40 transition-colors border border-white/10">
        <div className="bg-gray-700 border-2 border-dashed rounded-xl w-16 h-16 sm:w-24 sm:h-24" />
        
        <div className="flex-grow">
          <h3 className="text-white font-medium">{product.name}</h3>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-pink-500 font-bold text-lg">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discount && (
              <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}
          </div>
          <div className="mt-2 text-gray-400 text-sm">
            <p>Категория: {product.category}</p>
            <p>Размеры: {product.sizes?.join(', ')}</p>
            <p>Цвет: {product.color}</p>
          </div>
        </div>
      </div>
    )
  }

  // Режим сетки
  return (
    <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 flex flex-col hover:bg-black/40 transition-colors border border-white/10">
      <div className="relative">
        <div className="bg-gray-700 border-2 border-dashed rounded-xl w-full h-48" />
        
        {product.discount && (
          <div className="absolute top-2 right-2 bg-pink-500 text-white text-sm font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-white font-medium">{product.name}</h3>
        
        <div className="flex items-center gap-3 mt-2">
          <span className="text-pink-500 font-bold text-lg">
            {formatPrice(product.price)}
          </span>
          
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        <div className="mt-3 text-gray-400 text-sm">
          <p>Размеры: {product.sizes?.join(', ')}</p>
          <p>Цвет: {product.color}</p>
        </div>
        
        <button className="mt-4 w-full py-2 bg-white/10 text-white hover:bg-white/20 rounded-md transition-colors">
          Подробнее
        </button>
      </div>
    </div>
  )
}

export default ProductCard