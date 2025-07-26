'use client'

import { useUIStore } from '@/store/ui'

export default function StyleBotButton() {
  const open = useUIStore((s) => s.openPanel)
  return (
    <button
      onClick={() => open('stylebot')}
      className="fixed bottom-8 right-8 z-40 rounded-full bg-pink-600 text-white px-5 py-3 shadow-lg hover:bg-pink-700"
    >
      Создай свой стиль
    </button>
  )
}
