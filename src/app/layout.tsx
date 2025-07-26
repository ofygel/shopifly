import './globals.css'
import SplashManager from '@/components/SplashManager'
import VideoBg from '@/components/VideoBg'
import AppWrapper from '@/components/AppWrapper'
import ClientLayout from '@/components/ClientLayout'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="relative overflow-x-hidden text-white">
        <SplashManager>
          <VideoBg />
          <AppWrapper>
            <ClientLayout>
              {children}
            </ClientLayout>
          </AppWrapper>
        </SplashManager>
      </body>
    </html>
  )
}
