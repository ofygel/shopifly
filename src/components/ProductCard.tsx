import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  viewMode: 'grid' | 'list'
  onQuickView?: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  viewMode,
  onQuickView 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const formatPrice = (price: number): string => {
    return '†' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onQuickView) {
      onQuickView(product)
    }
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        className="flex items-start gap-4 sm:gap-6 p-4 sm:p-5 bg-gradient-to-r from-stone-900/40 to-stone-800/30 backdrop-blur-md border border-stone-700/50 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(100,100,100,0.3)] transition-all"
        whileHover={{ y: -3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
          {product.imageUrl ? (
            product.imageUrl.match(/\.(mp4|mov|webm)$/i) ? (
              <video 
                src={product.imageUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )
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
            
            {onQuickView && (
              <button 
                onClick={handleQuickView}
                className={`bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 rounded-full p-2 transition-all ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Быстрый просмотр"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button className="bg-rose-700 hover:bg-rose-800 text-white px-4 py-2 rounded-md text-sm transition-all">
              Добавить в корзину
            </button>
            
            {product.sizes && product.sizes.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-stone-400 text-sm">Размеры:</span>
                <div className="flex gap-1">
                  {product.sizes.map(size => (
                    <span key={size} className="text-stone-300 text-sm">
                      {size}
                    </span>
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

  // Режим сетки
  return (
    <motion.div
      className="bg-gradient-to-b from-stone-900/40 to-stone-800/30 backdrop-blur-md border border-stone-700/50 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(100,100,100,0.3)] p-4 transition-all relative group overflow-hidden"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-3">
        {product.imageUrl ? (
          <>
            {product.imageUrl.match(/\.(mp4|mov|webm)$/i) ? (
              <video 
                src={product.imageUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
            {onQuickView && (
              <button 
                onClick={handleQuickView}
                className={`absolute bottom-2 right-2 bg-stone-900/80 backdrop-blur-sm text-stone-300 hover:text-white hover:bg-stone-700 rounded-full p-2 transition-all ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Быстрый просмотр"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            )}
          </>
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
        <h3 className="font-bold text-stone-100 text-base mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-lg text-stone-100 font-medium">
            {formatPrice(product.price)}
          </span>
          
          {product.originalPrice && (
            <span className="text-stone-500 text-sm line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {product.sizes && product.sizes.slice(0, 3).map(size => (
          <span key={size} className="text-stone-400 text-xs bg-stone-800/50 px-2 py-1 rounded">
            {size}
          </span>
        ))}
        {product.sizes && product.sizes.length > 3 && (
          <span className="text-stone-500 text-xs">+{product.sizes.length - 3}</span>
        )}
      </div>
      
      <button className="w-full py-2 bg-gradient-to-r from-stone-600 to-stone-700 text-stone-100 hover:from-stone-500 hover:to-stone-600 rounded-md transition-all text-sm">
        {onQuickView ? "Подробнее" : "СМОТРЕТЬ КОЛЛЕКЦИЮ"}
      </button>
    </motion.div>
  )
}

export default ProductCard