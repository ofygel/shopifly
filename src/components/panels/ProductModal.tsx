'use client'

import { useState } from 'react'
import Panel from '@/components/panels/Panel'
import { useUIStore } from '@/store/ui'
import { Product } from '@/types/product'
import { useFavorites } from '@/store/favorites'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/cn'

const TABS = [
  { key: 'description', label: 'Описание' },
  { key: 'shipping', label: 'Доставка' },
  { key: 'returns', label: 'Возврат' },
] as const

export default function ProductModal() {
  const isOpen = useUIStore((s) => s.isOpen('product'))
  const product = useUIStore((s) => s.modalProduct as Product | null)
  const close = useUIStore((s) => s.closePanel)

  const { add: addFav, remove: removeFav, has } = useFavorites()
  const inFav = product ? has(product.id) : false

  const addToCart = useCartStore((s) => s.add)

  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['key']>('description')
  const [currentImg, setCurrentImg] = useState(0)
  const [size, setSize] = useState<string | undefined>(undefined)

  if (!isOpen || !product) return null

  const toggleFav = () => {
    if (inFav) removeFav(product.id)
    else addFav({ id: product.id, name: product.name, price: product.price, image: product.images?.[0] })
  }

  const onAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        size,
      },
      1
    )
    close('product')
  }

  return (
    <Panel name="product" width={980} className="max-h-[90vh] bg-neutral-900 text-white">
      <div className="flex flex-col lg:flex-row gap-8 h-full min-h-[60vh]">
        {/* Галерея */}
        <div className="w-full lg:w-[520px] flex-shrink-0">
          <div className="relative w-full aspect-[4/5] bg-white/5 rounded-2xl overflow-hidden">
            <img
              src={product.images[currentImg]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() =>
                    setCurrentImg((i) => (i - 1 + product.images.length) % product.images.length)
                  }
                >
                  ‹
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() => setCurrentImg((i) => (i + 1) % product.images.length)}
                >
                  ›
                </button>
              </>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-2">
              {product.images.map((src: string, idx: number) => (
                <img
                  key={idx}
                  src={src}
                  alt=""
                  className={cn(
                    'w-full aspect-[4/5] object-cover rounded-lg cursor-pointer opacity-70 hover:opacity-100',
                    idx === currentImg && 'ring-2 ring-white opacity-100'
                  )}
                  onClick={() => setCurrentImg(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col min-h-0">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <div className="mt-2 text-xl font-bold">{product.price.toLocaleString()} ₸</div>

          {product.sizes?.length ? (
            <div className="mt-6">
              <div className="mb-2 text-sm text-white/70">Размер</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      'px-4 py-2 rounded-full border border-white/20 hover:bg-white/10',
                      size === s && 'bg-white text-black'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Tabs */}
          <div className="mt-6">
            <div className="flex items-center gap-4 border-b border-white/10">
              {TABS.map((t) => {
                const disabled =
                  (t.key === 'description' && !product.description) ||
                  (t.key === 'shipping' && !product.shipping) ||
                  (t.key === 'returns' && !product.returns)
                if (disabled) return null
                return (
                  <button
                    key={t.key}
                    className={cn(
                      'py-2 text-sm border-b-2 border-transparent hover:border-white/30',
                      activeTab === t.key && 'border-white font-semibold'
                    )}
                    onClick={() => setActiveTab(t.key)}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 text-sm whitespace-pre-wrap leading-relaxed text-white/90 overflow-y-auto pr-2 max-h-[30vh]">
              {activeTab === 'description' && product.description}
              {activeTab === 'shipping' && product.shipping}
              {activeTab === 'returns' && product.returns}
            </div>
          </div>

          {/* Bottom actions */}
          <div className="mt-auto pt-6 flex items-center gap-4">
            <button
              onClick={onAddToCart}
              disabled={!!product.sizes?.length && !size}
              className="flex-1 bg-white text-black rounded-full py-3 font-semibold hover:bg-gray-100 disabled:opacity-50"
            >
              В корзину
            </button>

            <button
              onClick={toggleFav}
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center text-lg',
                inFav ? 'bg-pink-500' : 'bg-white/10 hover:bg-white/20'
              )}
              title={inFav ? 'Убрать из избранного' : 'В избранное'}
            >
              ♥
            </button>
          </div>
        </div>
      </div>
    </Panel>
  )
}
