'use client'

type Props = { onClose: () => void }

export default function ContactsPage({ onClose }: Props) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center pt-20">
      <h1 className="text-3xl font-bold mb-6">Контакты</h1>
      <div className="mb-6 text-white/80">
        <div>Телефон: <a href="tel:+77001234567" className="underline">+7 700 123-45-67</a></div>
        <div>Email: <a href="mailto:info@shopifly.kz" className="underline">info@shopifly.kz</a></div>
        <div>Адрес: Алматы, ул. Абая, 77</div>
      </div>
      <button
        className="mt-6 px-5 py-2.5 rounded-2xl bg-white text-black font-medium hover:bg-white/90 transition text-base"
        onClick={onClose}
      >
        Вернуться на главную
      </button>
    </div>
  )
}
