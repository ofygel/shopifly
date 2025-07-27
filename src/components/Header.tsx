'use client'
import { FC } from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { useUIStore } from '@/store/ui'

interface HeaderProps {
  activeView: 'home' | 'catalog' | 'new'
  onNav: (view: 'home' | 'catalog' | 'new') => void
}

const Header: FC<HeaderProps> = ({ activeView, onNav }) => {
  const openPanel = useUIStore(s => s.openPanel)
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
              onClick={() => onNav('catalog')}
              className={`cursor-pointer ${activeView==='catalog'?'text-white':'text-neutral-300'}`}
            >Каталог</button>
            <button
              type="button"
              onClick={() => onNav('new')}
              className={`cursor-pointer ${activeView==='new'?'text-white':'text-neutral-300'}`}
            >Новинки</button>
            <a href="/favorites" className="text-neutral-300 hover:text-white/80 cursor-pointer">Избранное</a>
            <a href="/contacts" className="text-neutral-300 hover:text-white/80 cursor-pointer">Контакты</a>
            <button type="button" onClick={()=>openPanel('profile')} className="hover:text-white/80 cursor-pointer">Профиль</button>
            <button type="button" onClick={()=>openPanel('cart')} className="relative hover:text-white/80 cursor-pointer" aria-label="Корзина">🛒</button>
          </nav>

          <button
            type="button"
            className="lg:hidden p-2 -mr-2 cursor-pointer"
            onClick={()=>openPanel('menu')}
            aria-label="Открыть меню"
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