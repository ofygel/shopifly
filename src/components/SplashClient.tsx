// Этот файл — чисто клиентский (там можно делать динамический импорт с ssr: false)
'use client'

import dynamic from 'next/dynamic'

const Splash = dynamic(() => import('./Splash'), { ssr: false })

export default function SplashClient() {
  return <Splash />
}
