// src/components/QuickViewModal.tsx
'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Product } from '@/types/product'

interface Props {
  product: Product
  onClose: () => void
}

export function QuickViewModal({ product, onClose }: Props) {
  const tabs = ['Описание', 'Доставка', 'Возврат'] as const
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Описание')
  const [mounted, setMounted] = useState(false)

  // гарантируем, что sizes — это всегда массив
  const sizes = product.sizes ?? []

  // включаем портал только на клиенте
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  return createPortal(
    <div
      className="
        fixed inset-0 z-50
        bg-black/60 backdrop-blur-md
        flex justify-center items-start
        overflow-auto p-4
      "
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="
          relative bg-white/10 backdrop-blur-lg
          rounded-2xl shadow-xl
          flex flex-col md:flex-row
          max-w-5xl w-full mx-auto my-10
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/** ========== ЛЕВАЯ ЧАСТЬ: КАРТИНКА ========== */}
        <div className="flex-shrink-0 p-4 flex justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="
              rounded-lg
              max-w-[45vw] max-h-[80vh]
              object-contain
            "
          />
          {product.discount! > 0 && (
            <span className="absolute top-6 left-6 bg-black/70 text-white text-sm px-2 py-1 rounded">
              -{product.discount}% 
            </span>
          )}
        </div>

        {/** ========== ПРАВАЯ ЧАСТЬ: КОНТЕНТ ========== */}
        <div className="relative flex-1 p-6 text-white flex flex-col">
          {/** Кнопка закрыть */}
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute top-4 right-4 text-white text-2xl leading-none"
          >
            &times;
          </button>

          {/** Название + цена */}
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-2xl mb-4">{product.price.toLocaleString()} ₸</p>

          {/** Размеры */}
          {sizes.length > 0 && (
            <div className="flex gap-2 mb-6">
              {sizes.map((s) => (
                <button
                  key={s}
                  className="border border-white rounded px-4 py-2 hover:bg-white/20 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/** Добавить в корзину */}
          <button className="w-full bg-white text-black py-3 rounded-lg font-medium mb-6">
            Добавить в корзину
          </button>

          {/** Табы */}
          <nav className="flex gap-6 border-b border-white/30 mb-4">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`
                  pb-2 transition ${
                    activeTab === t
                      ? 'border-b-2 border-white'
                      : 'border-b-2 border-transparent'
                  }
                `}
              >
                {t}
              </button>
            ))}
          </nav>

          {/** Контент таба */}
          <div className="text-sm flex-1 overflow-auto">
            {activeTab === 'Описание' && <p>{product.description}</p>}
            {activeTab === 'Доставка' && (
              <p>Информация о сроках и условиях доставки.</p>
            )}
            {activeTab === 'Возврат' && (
              <p>Возврат возможен в течение 14 дней с момента покупки.</p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
