'use client'

import Panel from '@/components/panels/Panel'
import { useUIStore } from '@/store/ui'
import { motion } from 'framer-motion'
import { useCart } from '@/context/cart'

export default function CartPanel() {
  const isOpen = useUIStore((s) => s.isOpen('cart'))
  const closePanel = useUIStore((s) => s.closePanel)

  const {
    items = [],
    total = 0,
    removeItem,
    updateQty,
    clearCart,
  } = (useCart() as any) || {}

  const hasItems = Array.isArray(items) && items.length > 0

  return (
    <Panel
      name="cart"
      className="bg-neutral-900 text-white"
      width={860}
      onClose={() => closePanel('cart')}
    >
      <h2 className="text-2xl font-semibold mb-6">Ваша корзина</h2>

      {!hasItems && (
        <div className="text-white/70">Корзина пуста</div>
      )}

      {hasItems && (
        <div className="flex flex-col gap-4">
          <div className="space-y-4 overflow-y-auto pr-2 max-h-[60vh]">
            {items.map((it: any) => (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 bg-white/5 rounded-xl p-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {it.image && (
                  <img
                    src={it.image}
                    alt={it.name}
                    className="w-20 h-24 object-cover rounded-md"
                  />
                )}
                <div className="flex-1">
                  <div className="font-semibold">{it.name}</div>
                  {it.price != null && (
                    <div className="text-white/70 text-sm mt-1">{it.price} ₸</div>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      className="px-2 py-1 bg-white/10 rounded"
                      onClick={() =>
                        updateQty?.(it.id, Math.max(1, (it.qty || 1) - 1))
                      }
                    >
                      –
                    </button>
                    <span>{it.qty || 1}</span>
                    <button
                      className="px-2 py-1 bg-white/10 rounded"
                      onClick={() =>
                        updateQty?.(it.id, (it.qty || 1) + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="text-white/60 hover:text-white text-sm"
                  onClick={() => removeItem?.(it.id)}
                >
                  Удалить
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-lg font-semibold">
            <span>Итого:</span>
            <span>{total} ₸</span>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              className="flex-1 bg-white text-black rounded-full py-3 font-semibold hover:bg-gray-100"
              onClick={() => {
                console.log('Перейти к оформлению')
                closePanel('cart')
              }}
            >
              Оформить заказ
            </button>
            <button
              className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-sm"
              onClick={() => clearCart?.()}
            >
              Очистить
            </button>
          </div>
        </div>
      )}
    </Panel>
  )
}
