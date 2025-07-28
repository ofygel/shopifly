// src/components/FilterPanel.tsx
'use client'

export default function FilterPanel() {
  return (
    <aside className="w-60 bg-black/40 backdrop-blur-md rounded-2xl p-6 space-y-5">
      <h2 className="text-xl font-semibold text-white">Фильтр</h2>
      <ul className="space-y-4 text-white/80">
        <li className="cursor-pointer hover:text-white">Категории</li>
        <li className="cursor-pointer hover:text-white">Цена</li>
        <li className="cursor-pointer hover:text-white">Размер</li>
      </ul>
    </aside>
  )
}
