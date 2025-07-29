'use client'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useUIStore } from '@/store/ui'
import { useCart } from '@/store/cart'
import { Product } from '@/types/product'
import { CartItem } from '@/store/cart'
import { X, ShoppingBag } from 'lucide-react'

export default function CartPanel() {
  const open = useUIStore(s => s.openPanel === 'cart')
  const setOpen = useUIStore(s => s.setOpenPanel)
  const setSelectedProduct = useUIStore(s => s.setSelectedProduct)
  const { items, remove, count, total } = useCart()

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setOpen(null)
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={open ? { opacity: 1 } : { opacity: 0 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 ${open ? 'block' : 'hidden'}`}
      >
        <m.div
          className="absolute inset-0 bg-black/60"
          onClick={() => setOpen(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        
        <m.div
          className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
          initial={{ x: '100%' }}
          animate={open ? { x: 0 } : { x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b p-6">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} />
                <h2 className="text-2xl font-bold">Корзина</h2>
                {count > 0 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                    {count}
                  </span>
                )}
              </div>
              <button 
                onClick={() => setOpen(null)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 h-16 w-16 rounded-full bg-gray-100" />
                  <h3 className="text-xl font-semibold">Корзина пуста</h3>
                  <p className="mt-2 text-gray-500">
                    Добавьте товары, чтобы продолжить покупки
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item: CartItem) => (
                    <div 
                      key={`${item.product.id}-${item.size}`}
                      className="flex cursor-pointer gap-4 border-b pb-6 last:border-0"
                      onClick={() => handleProductClick(item.product)}
                    >
                      <div className="h-24 w-24 flex-shrink-0 bg-gray-100" />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="mt-1 text-lg font-semibold">₸{item.product.price.toLocaleString()}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Размер: {item.size}, Кол-во: {item.quantity}
                          </span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              remove(item.product.id, item.size)
                            }}
                            className="text-sm text-red-500 hover:text-red-700"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {items.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Итого:</span>
                  <span>₸{total.toLocaleString()}</span>
                </div>
                <button className="mt-4 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700">
                  Перейти к оплате
                </button>
              </div>
            )}
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  )
}