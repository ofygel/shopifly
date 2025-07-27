// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import SplashManager from '@/components/SplashManager'
import VideoBg from '@/components/VideoBg'
import Header from '@/components/Header'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="relative overflow-x-hidden text-white">
        {/* Заставка + видео‑фон */}
        <SplashManager>
          <VideoBg />

          {/* Шапка с навигацией */}
          <Header />

          {/* Основное содержимое страниц */}
          <main className="relative z-0 pt-16">
            {children}
          </main>
        </SplashManager>
      </body>
    </html>
  )
}
