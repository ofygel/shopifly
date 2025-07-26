'use client'

import Splash from './Splash'

export default function SplashLoader() {
  // Просто рендерим Splash, он сам скроется через 2 сек
  return <Splash duration={2000} />
}
