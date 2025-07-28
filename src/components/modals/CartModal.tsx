// src/components/modals/CartModal.tsx
import { m } from 'framer-motion'
import { Product } from '@/types/product'

interface CartModalProps {
  cartItems: Product[]
  onClose: () => void
  onProductClick: (id: string) => void
  removeFromCart: (id: string) => void
}

export default function CartModal({
  cartItems,
  onClose,
  onProductClick,
  removeFromCart
}: CartModalProps) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0)
  
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-[60] flex justify-end"
      onClick={onClose}
    >
      <m.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        className="relative h-full w-full max-w-md bg-neutral-900"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
          <h2 className="text-xl font-bold">Корзина</h2>
          <button 
            onClick={onClose} 
            className="text-neutral-500 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          {cartItems.length === 0 ? (
            <div className="text-neutral-400 text-center py-10">
              Корзина пуста
            </div>
          ) : (
            <div className="divide-y divide-neutral-800">
              {cartItems.map(item => (
                <div 
                  key={item.id} 
                  className="p-4 flex items-center gap-4 hover:bg-neutral-850 transition-colors cursor-pointer"
                  onClick={() => {
                    onClose()
                    onProductClick(String(item.id))
                  }}
                >
                  <div className="w-16 h-16 flex-shrink-0 bg-neutral-800 rounded-lg flex items-center justify-center overflow-hidden">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-neutral-400 text-xs">Нет фото</span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{item.name}</div>
                    <div className="text-sm text-neutral-400">†{item.price}</div>
                  </div>
                  
                  <button
                    className="text-rose-500 hover:text-rose-300 transition-colors p-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromCart(String(item.id))
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 p-4">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Итого:</span>
              <span>†{total}</span>
            </div>
            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg transition-colors">
              Оформить заказ
            </button>
          </div>
        )}
      </m.div>
    </m.div>
  )
}