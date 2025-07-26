'use client'

import { useEffect, useRef } from 'react'
import HighlightCard from './HighlightCard'
import { Highlight } from '@/store/cms'

type Props = { items: Highlight[] }

export default function HighlightsMobile({ items }: Props) {
  if (!items?.length) return null
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let idx = 0
    const count = items.length
    const gap = parseInt(getComputedStyle(el).gap)
    const interval = setInterval(() => {
      idx = (idx + 1) % count
      const card = el.children[idx] as HTMLElement
      const shift = card.offsetLeft
      el.scrollTo({ left: shift, behavior: 'smooth' })
    }, 4000)
    return () => clearInterval(interval)
  }, [items])

  return (
    <div
      ref={containerRef}
      className="lg:hidden mt-6 -mx-4 px-4 flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar"
    >
      {items.map((item, i) => (
        <div key={item.id} className="snap-start">
          <HighlightCard
            item={item}
            startOffset={i}
            width={200}
            height={300}
          />
        </div>
      ))}
    </div>
  )
}
