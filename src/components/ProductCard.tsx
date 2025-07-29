// src/components/ProductCard.tsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '@/types/product'
import { useUIStore } from '@/store/ui'

interface ProductCardProps {
  product: Product
  viewMode: 'grid' | 'list'
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const setSelectedProduct = useUIStore(s => s.setSelectedProduct)

  const formatPrice = (price: number): string => (
    '†' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  )

  // Открыть модалку по клику на карточку
  const openProductModal = () => setSelectedProduct(product)

  // Открыть модалку по кнопке (и не всплывать вверх)
  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedProduct(product)
  }

  // LIST view
  if (viewMode === 'list') {
    return (
      <motion.div
        className="flex items-start gap-4 sm:gap-6 p-4 sm:p-5 bg-gradient-to-r from-stone-900/40 to-stone-800/30 backdrop-blur-md border border-stone-700/50 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(100,100,100,0.3)] transition-all cursor-pointer"
        whileHover={{ y: -3 }}
        onClick={openProductModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
          {product.videoUrl ? (
            <video 
              src={product.videoUrl}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-stone-800 flex items-center justify-center">
              <span className="text-stone-500 text-xs">No image</span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-stone-100 text-base sm:text-lg mb-1">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg text-stone-100 font-medium">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-stone-500 text-sm line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discount && (
                  <span className="ml-2 bg-rose-700 text-white px-2 py-1 rounded text-xs font-bold">
                    -{product.discount}%
                  </span>
                )}
              </div>
              {product.description && (
                <p className="text-stone-400 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleAction}
              className="bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-md text-sm transition-all"
            >
              Подробнее
            </button>
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-stone-400 text-sm">Размеры:</span>
                <div className="flex gap-1">
                  {product.sizes.map(size => (
                    <span key={size} className="text-stone-300 text-sm">{size}</span>
                  ))}
                </div>
              </div>
            )}
            {product.color && (
              <div className="flex items-center gap-2">
                <span className="text-stone-400 text-sm">Цвет:</span>
                <span className="text-stone-300 text-sm">{product.color}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  // GRID view
  return (
    <motion.div
      className="bg-gradient-to-b from-stone-900/40 to-stone-800/30 backdrop-blur-md border border-stone-700/50 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(100,100,100,0.3)] p-4 transition-all relative group overflow-hidden cursor-pointer"
      whileHover={{ y: -5 }}
      onClick={openProductModal}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-3">
        {product.videoUrl ? (
          <video 
            src={product.videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-stone-800 flex items-center justify-center">
            <span className="text-stone-500 text-xs">No image</span>
          </div>
        )}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-rose-700 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
      </div>
      <div className="mb-2">
        <h3 className="font-bold text-stone-100 text-base mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg text-stone-100 font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-stone-500 text-sm line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {product.sizes && product.sizes.slice(0, 3).map(size => (
          <span key={size} className="text-stone-400 text-xs bg-stone-800/50 px-2 py-1 rounded">{size}</span>
        ))}
        {product.sizes && product.sizes.length > 3 && (
          <span className="text-stone-500 text-xs">+{product.sizes.length - 3}</span>
        )}
      </div>
      <button
        onClick={handleAction}
        className="w-full py-2 bg-gradient-to-r from-stone-600 to-stone-700 text-stone-100 hover:from-stone-500 hover:to-stone-600 rounded-md transition-all text-sm"
      >
        Подробнее
      </button>
    </motion.div>
  )
}

export default ProductCard
