'use client'

import { useEffect, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Highlight } from '@/store/cms'
import { cn } from '@/lib/cn'

type Props = {
  item: Highlight
  startOffset?: number
  width?: number
  height?: number
}

export default function HighlightCard({
  item,
  startOffset = 0,
  width = 180,
  height = 280,
}: Props) {
  const total = item.images?.length ?? 0
  const [idx, setIdx] = useState(total ? startOffset % total : 0)

  useEffect(() => {
    if (!total) return
    const it = setInterval(() => {
      setIdx((i) => (i + 1) % total)
    }, item.intervalMs ?? 4000)
    return () => clearInterval(it)
  }, [total, item.intervalMs])

  if (!total) return null

  const Wrapper: any = item.link ? Link : 'div'
  const wrapperProps = item.link ? { href: item.link } : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={cn('relative overflow-hidden rounded-xl bg-white/5 block')}
      style={{ width, height }}
    >
      <AnimatePresence mode="wait">
        <m.img
          key={idx}
          src={item.images[idx]}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      {item.badge && (
        <div className="absolute left-2 top-2 rounded-full bg-black/60 text-white text-sm px-2 py-1">
          {item.badge}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="text-white text-base font-semibold leading-tight drop-shadow-md">
          {item.title}
        </div>
      </div>
    </Wrapper>
  )
}
