'use client'

type Props = { onClose: () => void }

export default function ProfilePanel({ onClose }: Props) {
  // Здесь можно позже реализовать вход/выход, имя пользователя и т.д.
  return (
    <div className="fixed inset-0 z-[99] bg-black/60 flex items-center justify-center">
      <div className="bg-neutral-900 rounded-xl p-8 w-[340px] max-w-full text-center shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Профиль</h2>
        <p className="text-white/70 mb-8">Войдите в аккаунт для управления заказами и избранным.</p>
        <button
          className="mt-2 px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}
