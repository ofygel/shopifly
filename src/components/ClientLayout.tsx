// src/components/ClientLayout.tsx
'use client'

import React, { FC, ReactNode, useState } from 'react'
import Header from './Header'
import NewArrivalsOverlay from './NewArrivalsOverlay'

interface Props { children: ReactNode }

const ClientLayout: FC<Props> = ({ children }) => {
  const [view, setView] = useState<'home' | 'catalog' | 'new'>('home')
  return (
    <div className={view === 'new' ? 'new-active app' : 'app'}>
      <Header activeView={view} onNav={setView} />
      <main className="relative z-0">
        {view === 'home' && children}
        {view === 'catalog' && children /* или ваша CatalogView */}
      </main>
      {view === 'new' && <NewArrivalsOverlay onClose={() => setView('home')} />}
    </div>
  )
}

export default ClientLayout
