'use client'

type Props = { onClose: () => void }

const favorites = [
  {
    id: '1',
    name: 'Black Velvet Top',
    image: '/images/new/velvet-top.jpg',
    price: 3400,
  },
  {
    id: '2',
    name: 'Buttoned Dress',
    image: '/images/new/buttoned-dress.jpg',
    price: 5600,
  },
]

export default function FavoritesPage({ onClose }: Props) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center pt-20">
      <h1 className="text-3xl font-bold mb-6">Избранное</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        {favorites.map((p) => (
          <div key={p.id} className="bg-neutral-900 rounded-xl shadow-md overflow-hidden flex flex-col items-center">
            <img src={p.image} alt={p.name} className="w-60 h-60 object-cover" />
            <div className="p-4">
              <div className="font-bold text-lg mb-2">{p.name}</div>
              <div className="text-white/80 mb-2">₸{p.price.toLocaleString('ru-KZ')}</div>
            </div>
          </div>
        ))}
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
