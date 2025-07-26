'use client'

import { useUIStore, type PanelName } from '@/store/ui'

export default function TopRightMenu() {
  const openPanel = useUIStore((s) => s.openPanel)
  const open = (name: PanelName) => () => openPanel(name)

  return (
    <nav className="hidden md:flex items-center gap-6">
      <button onClick={open('favorites')} className="hover:opacity-80 transition">
        Избранное
      </button>

      <button onClick={open('profile')} className="hover:opacity-80 transition">
        Профиль
      </button>

      <button onClick={open('contacts')} className="hover:opacity-80 transition">
        Контакты
      </button>

      <button onClick={open('cart')} className="hover:opacity-80 transition" aria-label="Корзина">
        🛍️
      </button>
    </nav>
  )
}
