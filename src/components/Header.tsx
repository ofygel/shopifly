'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import MobileMenuPanel from '@/components/panels/MobileMenuPanel'
import { useUIStore } from '@/store/ui'
import { useFavorites } from '@/store/favorites'
import { useCart } from '@/store/cart'

export default function Header() {
  const setOpen = useUIStore((s) => s.setOpenPanel)
  const favCount = useFavorites((s) => s.items.length)
  const cartCount = useCart((s) => s.count)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [mobileOpen])

  return (
    <LazyMotion features={domAnimation}>
      <m.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-x-0 top-0 z-50 backdrop-blur bg-neutral-900/80 text-white h-14 shadow-lg"
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/" onClick={() => setOpen(null)} className="font-bold text-xl">
            SHOPIFLY
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button onClick={() => setOpen('favorites')} className="relative">
              Избранное
              {favCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </button>
            <button onClick={() => setOpen('contacts')}>Контакты</button>
            <button onClick={() => setOpen('profile')}>Профиль</button>
            <button onClick={() => setOpen('cart')} className="relative" aria-label="Корзина">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          <button className="md:hidden" onClick={() => setMobileOpen((p) => !p)}>
            ☰
          </button>

          <MobileMenuPanel
            isOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
            onModalToggle={setOpen}
            cartItemsCount={cartCount}
            favoritesCount={favCount}
          />
        </div>
      </m.header>
    </LazyMotion>
  )
}
