'use client'

import { m, LazyMotion, domAnimation } from 'framer-motion'
import Link from 'next/link'
import { useUIStore } from '@/store/ui'

export default function MobileMenuPanel() {
  const isOpen = useUIStore((s) => s.isOpen('menu'))
  const close = useUIStore((s) => s.closePanel)

  return (
    <LazyMotion features={domAnimation}>
      {isOpen && (
        <m.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overlay */}
          <m.div
            className="absolute inset-0 bg-black/50"
            onClick={() => close('menu')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Side panel */}
          <m.div
            className="relative bg-neutral-900 text-white w-3/4 max-w-xs h-full p-6"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => close('menu')}
              aria-label="Закрыть меню"
            >
              ×
            </button>

            <nav className="flex flex-col gap-4 mt-8 text-lg">
              <Link href="/catalog"   onClick={() => close('menu')}>Каталог</Link>
              <Link href="/favorites" onClick={() => close('menu')}>Избранное</Link>
              <Link href="/profile"   onClick={() => close('menu')}>Профиль</Link>
              <Link href="/contacts"  onClick={() => close('menu')}>Контакты</Link>
              <button onClick={() => close('menu')} className="text-left">Корзина</button>
            </nav>
          </m.div>
        </m.div>
      )}
    </LazyMotion>
  )
}
