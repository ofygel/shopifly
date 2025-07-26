'use client'

import Panel from '@/components/panels/Panel'
import { useUIStore } from '@/store/ui'
import { useFavorites } from '@/store/favorites'
import { motion } from 'framer-motion'

export default function FavoritesPanel() {
  const isOpen = useUIStore((s) => s.isOpen('favorites'))
  const { items, remove, clear } = useFavorites()

  return (
    <Panel name="favorites" className="bg-neutral-900 text-white" width={820}>
      <h2 className="text-2xl font-semibold mb-6">Избранное</h2>

      {!items.length && <div className="text-white/70">Пусто</div>}

      {items.length > 0 && (
        <>
          <div className="space-y-4 overflow-y-auto pr-2 max-h-[60vh]">
            {items.map((it) => (
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
                </div>

                <button
                  className="text-white/60 hover:text-white text-sm"
                  onClick={() => remove(it.id)}
                >
                  Удалить
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm"
              onClick={clear}
            >
              Очистить всё
            </button>
          </div>
        </>
      )}
    </Panel>
  )
}
