'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import { useUIStore } from '@/store/ui'
import { useFavorites, FavoritesState, FavItem } from '@/store/favorites'
import { Product } from '@/types/product'

interface Props {
  product: Product
}

export default function ProductModal({ product }: Props) {
  const closePanel = useUIStore((s) => s.closePanel)
  const openPanel  = useUIStore((s) => s.openPanel)

  // Получаем экшены/селекторы из favorites
  const addFav    = useFavorites((s) => s.add)
  const removeFav = useFavorites((s) => s.remove)
  const inFav     = useFavorites((s) => s.has(product.id))

  const onAddToCart = useCallback(() => {
    openPanel('cart', product)
  }, [openPanel, product])

  const toggleFav = useCallback(() => {
    if (inFav) {
      removeFav(product.id)
    } else {
      const item: FavItem = {
        id:    product.id,
        name:  product.name,
        price: product.price,
        image: product.imageUrl,
      }
      addFav(item)
    }
  }, [inFav, product, addFav, removeFav])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
      onClick={() => closePanel('product')}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-white/10 backdrop-blur-lg rounded-2xl max-w-4xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Фото */}
        <div className="relative w-full h-80 md:h-auto">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain"
          />
          {product.discount! > 0 && (
            <span className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Контент */}
        <div className="p-6 text-white flex flex-col">
          <button
            onClick={() => closePanel('product')}
            aria-label="Закрыть"
            className="absolute top-4 right-4 text-2xl leading-none"
          >
            ×
          </button>

          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-2xl mb-4">{product.price.toLocaleString()} ₸</p>

          {product.sizes?.length ? (
            <div className="flex gap-2 mb-4">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className="border border-white rounded px-4 py-2 hover:bg-white/20 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}

          <div className="flex gap-4 mb-6">
            <button
              onClick={onAddToCart}
              className="flex-1 bg-white text-black py-3 rounded-lg font-medium"
            >
              Добавить в корзину
            </button>
            <button
              onClick={toggleFav}
              aria-label={inFav ? 'Удалить из избранного' : 'Добавить в избранное'}
              className={`px-4 py-3 rounded-lg transition ${
                inFav ? 'bg-red-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {inFav ? '♥' : '♡'}
            </button>
          </div>

          <p className="text-sm flex-1 overflow-auto">{product.description}</p>
        </div>
      </div>
    </div>
  )
}
