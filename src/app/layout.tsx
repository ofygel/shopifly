import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers' // ✅ исправлено
import Header from '@/components/Header'
import VideoBg from '@/components/VideoBg'
import MobileMenuPanel from '@/components/panels/MobileMenuPanel'

export const metadata: Metadata = {
  title: 'Shopifly — женская одежда премиум-класса',
  description: 'Создай свой стиль вместе с нами',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="relative overflow-x-hidden text-white">
        {/* Фиксированное видео на всём сайте */}
        <VideoBg />

        <Providers>
          <Header />
          <MobileMenuPanel />
          {/* Контент поверх видео */}
          <main className="relative z-10 pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
