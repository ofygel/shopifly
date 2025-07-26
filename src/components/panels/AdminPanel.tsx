'use client'

import { useState } from 'react'
import { nanoid } from 'nanoid'
import Panel from '@/components/panels/Panel'
import { useUIStore } from '@/store/ui'
import { useCMS } from '@/store/cms'
import { Product } from '@/types/product'

type Tab = 'products' | 'contacts' | 'home'

export default function AdminPanel() {
  useUIStore((s) => s.isOpen('admin'))
  const [tab, setTab] = useState<Tab>('products')

  return (
    <Panel name="admin" width={980} className="bg-neutral-900 text-white" lockScroll>
      <h2 className="text-2xl font-semibold mb-6">Панель управления</h2>

      <div className="flex gap-4 border-b border-white/10 mb-6">
        <button
          onClick={() => setTab('products')}
          className={tab === 'products' ? 'border-b-2 border-white pb-2' : 'pb-2 text_white/70'}
        >
          Товары
        </button>
        <button
          onClick={() => setTab('contacts')}
          className={tab === 'contacts' ? 'border-b-2 border-white pb-2' : 'pb-2 text_white/70'}
        >
          Контакты
        </button>
        <button
          onClick={() => setTab('home')}
          className={tab === 'home' ? 'border-b-2 border-white pb-2' : 'pb-2 text_white/70'}
        >
          Главная
        </button>
      </div>

      {tab === 'products' && <AdminProductsTab />}
      {tab === 'contacts' && <AdminContactsTab />}
      {tab === 'home' && <AdminHomeTab />}
    </Panel>
  )
}

function AdminProductsTab() {
  const { products, createProduct, deleteProduct } = useCMS()

  const empty: Omit<Product, 'id' | 'createdAt'> = {
    name: '',
    price: 0,
    images: [],
    sizes: [],
    description: '',
    shipping: '',
    returns: '',
    tags: [],
    updatedAt: Date.now(),
    order: 0,
    status: 'published',
  }

  const [draft, setDraft] = useState<Omit<Product, 'id' | 'createdAt'>>(empty)

  const onCreate = () => {
    if (!draft.name.trim()) return
    createProduct(draft)
    setDraft(empty)
  }

  return (
    <div className="space-y-10">
      <div className="bg-white/5 rounded-2xl p-4">
        <h3 className="font-semibold mb-4">Добавить товар</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="bg-white/10 rounded px-3 py-2 outline-none"
            placeholder="Название"
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          />
          <input
            className="bg-white/10 rounded px-3 py-2 outline-none"
            placeholder="Цена"
            type="number"
            value={draft.price}
            onChange={(e) => setDraft((d) => ({ ...d, price: Number(e.target.value) }))}
          />
          <input
            className="bg-white/10 rounded px-3 py-2 outline-none col-span-full"
            placeholder="Ссылки на изображения через запятую"
            value={draft.images.join(',')}
            onChange={(e) =>
              setDraft((d) => ({
                ...d,
                images: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
              }))
            }
          />
          <input
            className="bg-white/10 rounded px-3 py-2 outline-none col-span-full"
            placeholder="Размеры (через запятую)"
            value={draft.sizes?.join(',') ?? ''}
            onChange={(e) =>
              setDraft((d) => ({
                ...d,
                sizes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
              }))
            }
          />
          <textarea
            className="bg-white/10 rounded px-3 py-2 outline-none col-span-full"
            placeholder="Описание"
            value={draft.description}
            onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
          />
          <textarea
            className="bg-white/10 rounded px-3 py-2 outline-none col-span-full"
            placeholder="Доставка"
            value={draft.shipping}
            onChange={(e) => setDraft((d) => ({ ...d, shipping: e.target.value }))}
          />
          <textarea
            className="bg-white/10 rounded px-3 py-2 outline-none col-span-full"
            placeholder="Возврат"
            value={draft.returns}
            onChange={(e) => setDraft((d) => ({ ...d, returns: e.target.value }))}
          />
        </div>

        <button
          onClick={onCreate}
          className="mt-4 rounded-full bg-white text-black px-6 py-2 font-semibold hover:bg-gray-100"
        >
          Создать
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Товары ({products.length})</h3>
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
              <img
                src={p.images[0]}
                alt=""
                className="w-16 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <div className="font-medium">{p.name}</div>
                <div className="text-white/60 text-sm">
                  {p.price.toLocaleString()} ₸ • {p.sizes?.join(', ')}
                </div>
              </div>
              <button
                onClick={() => deleteProduct(p.id)}
                className="text-red-400 hover:text-red-300"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AdminContactsTab() {
  const contacts = useCMS((s) => s.settings.contacts)
  const update = useCMS((s) => s.updateContacts)
  const [form, setForm] = useState(contacts)

  const save = () => update(form)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className="bg-white/10 rounded px-3 py-2 outline-none"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="bg-white/10 rounded px-3 py-2 outline-none"
          placeholder="Телефон"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          className="bg-white/10 rounded px-3 py-2 outline-none col-span-full"
          placeholder="Адрес"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <div className="text-sm text_white/70">Соцсети</div>
        {form.socials.map((s, i) => (
          <div key={s.id} className="flex gap-2">
            <input
              className="bg-white/10 rounded px-3 py-2 outline-none w-40"
              placeholder="label"
              value={s.label}
              onChange={(e) => {
                const arr = [...form.socials]
                arr[i] = { ...arr[i], label: e.target.value }
                setForm({ ...form, socials: arr })
              }}
            />
            <input
              className="bg-white/10 rounded px-3 py-2 outline-none flex-1"
              placeholder="url"
              value={s.url}
              onChange={(e) => {
                const arr = [...form.socials]
                arr[i] = { ...arr[i], url: e.target.value }
                setForm({ ...form, socials: arr })
              }}
            />
          </div>
        ))}
        <button
          onClick={() =>
            setForm({
              ...form,
              socials: [...form.socials, { id: nanoid(), label: '', url: '' }],
            })
          }
          className="text-sm text_white/70 hover:text_white"
        >
          + добавить
        </button>
      </div>

      <button
        onClick={save}
        className="mt-4 rounded-full bg-white text-black px-6 py-2 font-semibold hover:bg-gray-100"
      >
        Сохранить
      </button>
    </div>
  )
}

function AdminHomeTab() {
  const home = useCMS((s) => s.settings.home)
  const update = useCMS((s) => s.updateHome)
  const [form, setForm] = useState(home)

  const save = () => update(form)

  return (
    <div className="space-y-4">
      <textarea
        className="bg-white/10 rounded px-3 py-2 outline-none w-full resize-none"
        rows={4}
        value={form.heroTitle}
        onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
        placeholder="Hero title"
      />
      <textarea
        className="bg-white/10 rounded px-3 py-2 outline-none w-full resize-none"
        rows={3}
        value={form.heroSubtitle}
        onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
        placeholder="Hero subtitle"
      />
      <button
        onClick={save}
        className="mt-4 rounded-full bg-white text-black px-6 py-2 font-semibold hover:bg-gray-100"
      >
        Сохранить
      </button>
    </div>
  )
}
