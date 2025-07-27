'use client'
import { FC } from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { useUIStore } from '@/store/ui'

type View =
  | 'home'
  | 'catalog'
  | 'new'
  | 'favorites'
  | 'contacts'
  | 'profile'
  | 'cart'

interface HeaderProps {
  activeView: View
  onNav: (view: View) => void
}

const Header: FC<HeaderProps> = ({ activeView, onNav }) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-x-0 top-0 z-50 backdrop-blur bg-neutral-900/30 text-white"
      >
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNav('home')}
            className="font-bold text-lg tracking-wide cursor-pointer focus:outline-none"
          >
            SHOPIFLY
          </button>
          <nav className="flex items-center gap-6 text-sm">
            <button
              type="button"
              className="text-neutral-300 hover:text-white/80 cursor-pointer"
              onClick={() => onNav('favorites')}
            >
              Избранное
            </button>
            <button
              type="button"
              className="text-neutral-300 hover:text-white/80 cursor-pointer"
              onClick={() => onNav('contacts')}
            >
              Контакты
            </button>
            <button
              type="button"
              className="hover:text-white/80 cursor-pointer"
              onClick={() => onNav('profile')}
            >
              Профиль
            </button>
            <button
              type="button"
              className="relative hover:text-white/80 cursor-pointer"
              onClick={() => onNav('cart')}
              aria-label="Корзина"
            >
              🛒
            </button>
          </nav>
          <button
            type="button"
            className="lg:hidden p-2 -mr-2 cursor-pointer"
            aria-label="Открыть меню"
            // Можно добавить обработчик мобильного меню позже
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </m.header>
    </LazyMotion>
  )
}

export default Header
