// Убираем здесь весь dynamic – теперь SplashClient сам отвечает за ssr:false
import './globals.css'
import { Providers } from './providers'
import VideoBg from '@/components/VideoBg'
import Header from '@/components/Header'
import SplashClient from '@/components/SplashClient'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="relative overflow-x-hidden text-white">
        {/* теперь рендерим клиент‑компонент */}
        <SplashClient />

        <VideoBg />
        <Providers>
          <Header />
          <main className="relative z-10 pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
