'use client'

import Link from 'next/link'
import { useUIStore } from '@/store/ui'
import { m, LazyMotion, domAnimation } from 'framer-motion'

export default function Header() {
  const open = useUIStore((s) => s.openPanel)

  return (
    <LazyMotion features={domAnimation}>
      <m.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-neutral-900/30 text-white"
      >
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg tracking-wide">
            SHOPIFLY
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <Link href="/catalog" className="hover:text-white/80">Каталог</Link>
            <button onClick={() => open('favorites')} className="hover:text-white/80">Избранное</button>
            <button onClick={() => open('profile')} className="hover:text-white/80">Профиль</button>
            <button onClick={() => open('contacts')} className="hover:text-white/80">Контакты</button>
            <button
              onClick={() => open('cart')}
              className="relative hover:text-white/80"
              aria-label="Корзина"
            >
              🛒
            </button>
          </nav>

          {/* MOBILE BURGER */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => open('menu')}
            aria-label="Открыть меню"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </m.header>
    </LazyMotion>
  )
}
