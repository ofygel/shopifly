'use client'

import './globals.css'
import { ReactNode } from 'react'

import Providers from './providers'
import SplashManager from '@/components/SplashManager'
import VideoBg from '@/components/VideoBg'
import Header from '@/components/Header'

import FavoritesPanel from '@/components/panels/FavoritesPanel'
import CartPanel from '@/components/panels/CartPanel'
import ProfilePanel from '@/components/panels/ProfilePanel'
import ContactsPanel from '@/components/panels/ContactsPanel'
import ProductDetailsModal from '@/components/modals/ProductDetailsModal'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="relative overflow-x-hidden text-white">
        <Providers>
          <SplashManager>
            <VideoBg />
            <Header />
            {/* Панели */}
            <FavoritesPanel />
            <CartPanel />
            <ProfilePanel />
            <ContactsPanel />
            {/* Модальное окно товара */}
            <ProductDetailsModal />

            <main className="relative z-0 pt-16">{children}</main>
          </SplashManager>
        </Providers>
      </body>
    </html>
  )
}
