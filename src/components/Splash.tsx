// src/components/Splash.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SplashProps {
  /** длительность всего сплэша в мс (видео + логотип + пауза) */
  duration?: number    // поменяли тип на number
  /** колбэк, когда сплэш окончательно скрыт */
  onFinish: () => void
}

export default function Splash({
  duration = 4000,    // <-- было 6000, стало 4000
  onFinish,
}: SplashProps) {
  const [showLogo, setShowLogo] = useState(false)
  const [hideLogo, setHideLogo] = useState(false)
  const [hideSplash, setHideSplash] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // 1) через 1 с — fade‑in логотипа
    const t1 = setTimeout(() => setShowLogo(true), 1000)
    // 2) через 3 с — fade‑out логотипа
    const t2 = setTimeout(() => setHideLogo(true), 3000)
    // 3) через duration — fade‑out сплэша и возвращаем прокрутку
    const t3 = setTimeout(() => {
      setHideSplash(true)
      document.body.style.overflow = ''
      setTimeout(onFinish, 600)
    }, duration)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      document.body.style.overflow = ''
    }
  }, [duration, onFinish])

  return (
    <AnimatePresence>
      {!hideSplash && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: hideSplash ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          aria-hidden={!hideSplash}
        >
          {/* Видео‑фон */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/splash.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            loop={false}
            style={{ opacity: 0.8 }}
          />

          {/* Логотип */}
          <AnimatePresence>
            {showLogo && !hideLogo && (
              <motion.h1
                className="relative z-10 text-white font-bold text-5xl md:text-7xl"
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(8px)' }}
                transition={{ duration: 1 }}
              >
                SHOPIFLY
              </motion.h1>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
