// spa.tsx
'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import HomeView from '@/views/HomeView'
import CatalogView from '@/views/CatalogView'
import CartView from '@/views/CartView'
import CheckoutView from '@/views/CheckoutView'

type View = 'home' | 'catalog' | 'cart' | 'checkout'
type SpaCtxType = { view: View; setView: (v: View) => void }

const SpaCtx = createContext<SpaCtxType | null>(null)

export function SpaProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('home')
  return <SpaCtx.Provider value={{ view, setView }}>{children}</SpaCtx.Provider>
}

export function useSpa() {
  const ctx = useContext(SpaCtx)
  if (!ctx) throw new Error('useSpa must be used inside <SpaProvider>')
  return ctx
}

export function SPA() {
  const { view } = useSpa()

  useEffect(() => {
    console.log('SPA view ->', view)
  }, [view])

  return (
    <>
      {/* dev-бейдж — потом удалишь */}
      <div className="fixed bottom-2 left-2 z-[9999] px-2 py-1 bg-black/70 text-white text-xs rounded">
        view: {view}
      </div>

      {view === 'catalog' && <CatalogView />}
      {view === 'cart' && <CartView />}
      {view === 'checkout' && <CheckoutView />}
      {view === 'home' && <HomeView />}
    </>
  )
}
