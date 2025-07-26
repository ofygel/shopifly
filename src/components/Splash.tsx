'use client'

import { m } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SplashProps {
  /** Длительность показа сплэша (мс) */
  duration?: number
}

export default function Splash({ duration = 5200 }: SplashProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(false), duration)
    return () => clearTimeout(t)
  }, [duration])

  if (!isVisible) return null

  return (
    <m.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, scale: 0.95 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Видео‑фоновый слой */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/splash.mp4"
        autoPlay
        muted
        loop
      />

      {/* Логотип‑заголовок */}
      <m.h1
        className="relative text-white text-5xl md:text-7xl font-bold"
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        SHOPIFLY
      </m.h1>
    </m.div>
  )
}
