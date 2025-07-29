'use client'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useUIStore } from '@/store/ui'
import { useFavorites } from '@/store/favorites'
import { FavItem } from '@/store/favorites'
import { X, Trash2, Share2 } from 'lucide-react'

export default function FavoritesPanel() {
  const open = useUIStore(s => s.openPanel === 'favorites')
  const setOpen = useUIStore(s => s.setOpenPanel)
  const setSelectedProduct = useUIStore(s => s.setSelectedProduct)
  const { items, remove, clear } = useFavorites()

  // Приводим FavItem к Product с запасом (заполнить обязательные поля-заглушки если чего-то не хватает)
  const handleProductClick = (fav: FavItem) => {
    setSelectedProduct({
      id: fav.id,
      name: fav.name,
      price: fav.price,
      imageUrl: fav.image ?? '',
      // ниже — заглушки
      description: '',
      category: '',
      color: '',
      sizes: [],
      isNew: false,
      isSoldOut: false,
      isExclusive: false,
      discount: 0
    })
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
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">Избранное</h2>
              <button 
                onClick={() => setOpen(null)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex justify-between mb-6">
                <button
                  onClick={clear}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Trash2 size={18} />
                  <span>Удалить все</span>
                </button>
                <button className="flex items-center gap-2 text-gray-700">
                  <Share2 size={18} />
                  <span>Поделиться</span>
                </button>
              </div>
              
              {items.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  Нет избранных товаров
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((fav: FavItem) => (
                    <div 
                      key={fav.id}
                      className="flex justify-between items-center py-3 border-b"
                      onClick={() => handleProductClick(fav)}
                    >
                      <div>
                        <h3 className="font-medium">{fav.name}</h3>
                        <p className="text-lg font-semibold">₸{fav.price.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          remove(fav.id)
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  )
}
