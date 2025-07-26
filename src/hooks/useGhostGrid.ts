'use client'
import { useEffect, useState } from 'react'

export function useGhostGrid(cardAspect = 4 / 5, min = 12) {
  const [count, setCount] = useState(min)

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      const h = window.innerHeight

      let cols = 1
      if (w >= 1280) cols = 4
      else if (w >= 1024) cols = 3
      else if (w >= 640) cols = 2

      const gap = 24
      const cardW = (w - gap * (cols - 1) - 32) / cols
      const cardH = cardW / (1 / cardAspect)
      const rows = Math.ceil((h - 160) / (cardH + gap))
      const needed = cols * rows

      setCount(Math.max(min, needed))
    }

    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [cardAspect, min])

  return count
}
