// src/components/Header.tsx
'use client'

import Link from 'next/link'
import { m, LazyMotion, domAnimation } from 'framer-motion'

export default function Header() {
  return (
    <LazyMotion features={domAnimation}>
      <m.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-x-0 top-0 z-50 backdrop-blur bg-neutral-900/30 text-white"
      >
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg tracking-wide focus:outline-none">
            SHOPIFLY
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            <Link href="/favorites" className="text-neutral-300 hover:text-white/80">
              Избранное
            </Link>
            <Link href="/contacts" className="text-neutral-300 hover:text-white/80">
              Контакты
            </Link>
            <Link href="/profile" className="text-neutral-300 hover:text-white/80">
              Профиль
            </Link>
            <Link
              href="/cart"
              aria-label="Корзина"
              className="relative text-neutral-300 hover:text-white/80"
            >
              🛒
            </Link>
          </nav>
        </div>
      </m.header>
    </LazyMotion>
  )
}
