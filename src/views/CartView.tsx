'use client'
import { useCart } from '@/context/cart'
import Image from 'next/image'

export default function CartView() {
  const { items, remove, updateQty, total } = useCart()

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>

      {items.length === 0 ? (
        <div className="opacity-70">Корзина пуста.</div>
      ) : (
        <>
          <ul className="space-y-4">
          {items.map(item => (
            <li key={item.id} className="flex gap-4 p-4 bg-white/5 rounded-xl items-center">
              {item.image && (
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md object-cover" />
              )}
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="opacity-70">{item.price} ₸</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={e => updateQty(item.id, Math.max(1, Number(e.target.value)))}
                  className="w-16 bg-white/10 rounded-md text-center"
                />
                <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-300">×</button>
              </div>
            </li>
          ))}
          </ul>

          <div className="mt-8 text-right">
            <div className="text-lg mb-4">Итого: <b>{total} ₸</b></div>
          </div>
        </>
      )}
    </section>
  )
}
