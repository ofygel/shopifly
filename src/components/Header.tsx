'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import { products } from '@/data/products'
import { Product } from '@/types/product'
import ProfileModal from './modals/ProfileModal'
import ContactsModal from './modals/ContactsModal'
import CartModal from './modals/CartModal'
import MobileMenu from './modals/MobileMenu'
import FavoritesModal from './modals/FavoritesModal'
import ProductDetails from './ProductDetails'

function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  useEffect(() => {
    // Загружаем избранное только на клиенте
    const storedIds = localStorage.getItem('favoriteIds')
    setFavoriteIds(storedIds ? JSON.parse(storedIds) : [])
  }, [])

  useEffect(() => {
    // Сохраняем при изменении
    localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds))
  }, [favoriteIds])

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id), 
    [favoriteIds]
  )

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds(ids => 
      ids.includes(id) 
        ? ids.filter(_id => _id !== id) 
        : [...ids, id]
    )
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavoriteIds(ids => ids.filter(_id => _id !== id))
  }, [])

  return { 
    favoriteIds, 
    isFavorite, 
    toggleFavorite, 
    removeFavorite 
  }
}

export default function Header() {
  const [activeModal, setActiveModal] = useState<
    'favorites' | 'contacts' | 'profile' | 'cart' | null
  >(null)
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAdmin] = useState(true)
  const [activeProductId, setActiveProductId] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<Product[]>([])

  const { 
    favoriteIds, 
    isFavorite, 
    toggleFavorite, 
    removeFavorite 
  } = useFavorites()

  const favorites = products.filter(p => 
    favoriteIds.includes(String(p.id))
  )

  const activeProduct = activeProductId
    ? products.find(p => String(p.id) === activeProductId)
    : null

  // Блокировка скролла
  useEffect(() => {
    const shouldBlock = activeModal || isMobileMenuOpen || activeProductId
    document.body.style.overflow = shouldBlock ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [activeModal, isMobileMenuOpen, activeProductId])

  // Добавление в корзину
  const addToCart = useCallback((product: Product) => {
    setCartItems(items => [...items, product])
  }, [])

  // Удаление из корзины
  const removeFromCart = useCallback((id: string) => {
    setCartItems(items => items.filter(item => 
      String(item.id) !== id
    ))
  }, [])

  // Обработчик открытия продукта
  const handleProductClick = useCallback((id: string) => {
    setActiveProductId(id)
    setActiveModal(null)
  }, [])

  // Анимации
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { scale: 0.95, y: 20, opacity: 0 },
    visible: { 
      scale: 1, 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300 
      } 
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-x-0 top-0 z-50 backdrop-blur bg-neutral-900/80 text-white h-14 shadow-lg"
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link 
            href="/" 
            className="font-bold text-xl tracking-wider focus:outline-none"
            onClick={() => setActiveModal(null)}
          >
            SHOPIFLY
          </Link>

          {/* Десктоп навигация */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button 
              onClick={() => setActiveModal('favorites')}
              className={`relative transition-colors ${
                activeModal === 'favorites' 
                  ? 'text-white' 
                  : 'text-neutral-300 hover:text-white/80'
              }`}
            >
              Избранное
              {favoriteIds.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favoriteIds.length}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setActiveModal('contacts')}
              className={`transition-colors ${
                activeModal === 'contacts' 
                  ? 'text-white' 
                  : 'text-neutral-300 hover:text-white/80'
              }`}
            >
              Контакты
            </button>
            
            <button 
              onClick={() => setActiveModal('profile')}
              className={`transition-colors ${
                activeModal === 'profile' 
                  ? 'text-white' 
                  : 'text-neutral-300 hover:text-white/80'
              }`}
            >
              Профиль
            </button>
            
            <button
              onClick={() => setActiveModal('cart')}
              className="relative text-xl transition-transform hover:scale-110"
              aria-label="Корзина"
            >
              🛒
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </nav>

          {/* Мобильный бургер меню */}
          <button 
            className="md:hidden text-white z-60"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Меню"
          >
            <div className="space-y-1 w-6">
              <m.span 
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 7 }
                }}
                className="block h-0.5 bg-white"
              ></m.span>
              <m.span 
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                className="block h-0.5 bg-white"
              ></m.span>
              <m.span 
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -7 }
                }}
                className="block h-0.5 bg-white"
              ></m.span>
            </div>
          </button>
        </div>

        {/* Мобильное меню */}
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onModalToggle={setActiveModal}
          cartItemsCount={cartItems.length}
          favoritesCount={favoriteIds.length}
        />

        {/* Модальные окна */}
        <AnimatePresence>
          {activeModal === 'favorites' && (
            <FavoritesModal 
              favorites={favorites}
              onClose={() => setActiveModal(null)}
              onProductClick={handleProductClick}
              removeFavorite={removeFavorite}
            />
          )}
          
          {activeModal === 'contacts' && (
            <ContactsModal 
              onClose={() => setActiveModal(null)}
            />
          )}
          
          {activeModal === 'profile' && (
            <ProfileModal 
              isAdmin={isAdmin}
              onClose={() => setActiveModal(null)}
            />
          )}
          
          {activeModal === 'cart' && (
            <CartModal 
              cartItems={cartItems}
              onClose={() => setActiveModal(null)}
              onProductClick={handleProductClick}
              removeFromCart={removeFromCart}
            />
          )}
        </AnimatePresence>

        {/* Детали продукта */}
        <AnimatePresence>
          {activeProduct && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
            >
              <m.div
                initial={{ scale: 0.96, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 40 }}
                transition={{ type: 'spring', stiffness: 160, damping: 20 }}
                className="relative max-w-4xl w-full max-h-[90vh] overflow-auto"
              >
                <ProductDetails
                  product={activeProduct}
                  onClose={() => setActiveProductId(null)}
                  isFavorite={isFavorite(String(activeProduct.id))}
                  onToggleFavorite={() => 
                    toggleFavorite(String(activeProduct.id))
                  }
                  onAddToCart={() => addToCart(activeProduct)}
                />
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </m.header>
    </LazyMotion>
  )
}