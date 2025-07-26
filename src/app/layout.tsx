// src/app/layout.tsx
import './globals.css'
import SplashManager from '@/components/SplashManager'
import VideoBg from '@/components/VideoBg'
import Header from '@/components/Header'
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="relative overflow-x-hidden text-white">
        {/* SplashManager сам рендерит Splash и плавно показывает контент */}
        <SplashManager>
          <VideoBg />
          <Providers>
            <Header />
            <main className="relative z-10 pt-16">
              {children}
            </main>
          </Providers>
        </SplashManager>
      </body>
    </html>
  )
}
