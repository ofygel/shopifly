// src/app/layout.tsx
import './globals.css'
import SplashManager from '@/components/SplashManager'
import VideoBg from '@/components/VideoBg'
import AppWrapper from '@/components/AppWrapper'
import ClientLayout from '@/components/ClientLayout'

export default function RootLayout() {
  return (
    <html lang="ru">
      <body className="relative overflow-x-hidden text-white">
        <SplashManager>
          <VideoBg />
          <AppWrapper>
            <ClientLayout />
          </AppWrapper>
        </SplashManager>
      </body>
    </html>
  )
}
