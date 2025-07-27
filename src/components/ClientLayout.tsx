// src/components/ClientLayout.tsx
'use client'

import { useState } from 'react'
import Header from './Header'
import HomeView from '@/views/HomeView'
import CatalogView from '@/views/CatalogView'
import NewArrivalsOverlay from './NewArrivalsOverlay'

export default function ClientLayout() {
  const [view, setView] = useState<'home' | 'catalog' | 'new'>('home')

  return (
    <div className={`app ${view === 'new' ? 'new-active' : ''}`}>
      <Header activeView={view} onNav={setView} />

      <main className="relative z-0 pt-16">
        {view === 'home' && <HomeView />}
        {view === 'catalog' && <CatalogView />}
      </main>

      {view === 'new' && (
        <NewArrivalsOverlay onClose={() => setView('home')} />
      )}
    </div>
  )
}
