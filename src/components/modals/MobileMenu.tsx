// src/components/modals/MobileMenu.tsx
import { m } from 'framer-motion'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onModalToggle: (modal: 'favorites' | 'contacts' | 'profile' | 'cart') => void
  cartItemsCount: number
  favoritesCount: number
}

export default function MobileMenu({ 
  isOpen, 
  onClose,
  onModalToggle,
  cartItemsCount,
  favoritesCount
}: MobileMenuProps) {
  const handleClick = (modal: 'favorites' | 'contacts' | 'profile' | 'cart') => {
    onModalToggle(modal)
    onClose()
  }
  
  return (
    <m.div
      initial={{ opacity: 0, height: 0 }}
      animate={isOpen ? { 
        opacity: 1, 
        height: 'auto',
        transition: { duration: 0.3 }
      } : { 
        opacity: 0, 
        height: 0,
        transition: { duration: 0.3 }
      }}
      className="md:hidden fixed inset-x-0 top-14 bg-neutral-900 z-50 shadow-xl overflow-hidden"
    >
      <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
        <button 
          onClick={() => handleClick('favorites')}
          className="text-left py-3 border-b border-neutral-800 text-lg flex justify-between items-center"
        >
          <span>Избранное</span>
          {favoritesCount > 0 && (
            <span className="bg-rose-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
        </button>
        
        <button 
          onClick={() => handleClick('contacts')}
          className="text-left py-3 border-b border-neutral-800 text-lg"
        >
          Контакты
        </button>
        
        <button 
          onClick={() => handleClick('profile')}
          className="text-left py-3 border-b border-neutral-800 text-lg"
        >
          Профиль
        </button>
        
        <button
          onClick={() => handleClick('cart')}
          className="text-left py-3 flex justify-between items-center text-lg"
        >
          <span>Корзина</span>
          {cartItemsCount > 0 && (
            <span className="bg-rose-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </button>
      </div>
    </m.div>
  )
}