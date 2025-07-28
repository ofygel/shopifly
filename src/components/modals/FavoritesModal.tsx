// src/components/modals/FavoritesModal.tsx
import { m } from 'framer-motion'
import { Product } from '@/types/product'

interface FavoritesModalProps {
  favorites: Product[]
  onClose: () => void
  onProductClick: (id: string) => void
  removeFavorite: (id: string) => void
}

export default function FavoritesModal({
  favorites,
  onClose,
  onProductClick,
  removeFavorite
}: FavoritesModalProps) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <m.div
        initial={{ scale: 0.96, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 40 }}
        transition={{ type: 'spring', stiffness: 160, damping: 20 }}
        className="relative max-w-2xl w-full bg-neutral-900 p-6 rounded-2xl shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Избранное</h2>
          <button 
            onClick={onClose} 
            className="text-neutral-500 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>
        
        {favorites.length === 0 ? (
          <div className="text-neutral-400 text-center py-10">
            Нет избранных товаров
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto">
            {favorites.map(product => (
              <div 
                key={product.id} 
                className="flex items-center gap-4 bg-neutral-800 rounded-xl p-4 hover:bg-neutral-750 transition-colors"
              >
                <div className="w-20 h-20 flex-shrink-0 bg-neutral-700 rounded-lg flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-neutral-400 text-sm">Нет фото</span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{product.name}</div>
                  <div className="text-sm text-neutral-400">†{product.price}</div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button
                    className="text-rose-500 hover:text-rose-300 transition-colors"
                    title="Удалить из избранного"
                    onClick={() => removeFavorite(String(product.id))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  <button
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-700 rounded-lg text-white font-medium text-xs"
                    onClick={() => {
                      onClose()
                      onProductClick(String(product.id))
                    }}
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </m.div>
    </m.div>
  )
}