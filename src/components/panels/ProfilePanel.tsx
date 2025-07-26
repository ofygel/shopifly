'use client'

import { useState } from 'react'
import Panel from '@/components/panels/Panel'
import { useUIStore } from '@/store/ui'
import { useAuth } from '@/store/auth'

export default function ProfilePanel() {
  const isOpen = useUIStore((s) => s.isOpen('profile'))
  const open = useUIStore((s) => s.openPanel)
  const { user, loading, login, register, logout } = useAuth()

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'login') {
      await login(email, password)
    } else {
      await register(email, password, name)
    }
  }

  return (
    <Panel name="profile" className="bg-neutral-900 text-white" width={560}>
      {!user ? (
        <>
          <h2 className="text-2xl font-semibold mb-6">
            {mode === 'login' ? 'Войти' : 'Регистрация'}
          </h2>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm text-white/70 mb-1">Имя</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 bg-white/10 outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-white/70 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg px-3 py-2 bg-white/10 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg px-3 py-2 bg-white/10 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black rounded-full py-3 font-semibold hover:bg-gray-100 disabled:opacity-50"
            >
              {loading ? '...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>

          <div className="mt-4 text-sm text-white/70">
            {mode === 'login' ? (
              <>
                Нет аккаунта?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="underline hover:no-underline"
                >
                  Зарегистрируйтесь
                </button>
              </>
            ) : (
              <>
                Уже есть аккаунт?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="underline hover:no-underline"
                >
                  Войдите
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6">Профиль</h2>

          <div className="space-y-2">
            <div>
              <span className="text-white/60">Имя: </span>
              <span className="font-medium">{user.name || '—'}</span>
            </div>
            <div>
              <span className="text-white/60">Email: </span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div>
              <span className="text-white/60">Роль: </span>
              <span className="font-medium">{user.role ?? 'user'}</span>
            </div>
          </div>

          {user.role === 'admin' && (
            <div className="mt-6">
              <button
                onClick={() => open('admin')}
                className="rounded-full bg-white text-black px-6 py-3 font-semibold hover:bg-gray-100"
              >
                Панель управления
              </button>
            </div>
          )}

          <button
            onClick={logout}
            className="mt-6 bg-white/10 hover:bg-white/20 rounded-full py-2 px-4 text-sm"
          >
            Выйти
          </button>
        </>
      )}
    </Panel>
  )
}
