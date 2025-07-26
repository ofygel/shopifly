// Highlights.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { Highlight } from '@/store/cms'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { useMediaQuery } from 'usehooks-ts'

type Props = {
  items: Highlight[]
  interval?: number // мс
}

export default function Highlights({ items, interval = 4000 }: Props) {
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const [groupIdx, setGroupIdx] = useState(0)

  const visibleItems = useMemo(() => {
    return items.map((group) => {
      const imgs = group.images || []
      return imgs.map((img: string) => ({ ...group, image: img }))
    })
  }, [items])

  const pairs = useMemo(() => {
    if (!visibleItems.length) return []
    const flat = visibleItems.flat()
    const a = flat[groupIdx % flat.length]
    const b = flat[(groupIdx + 1) % flat.length]
    return [a, b]
  }, [groupIdx, visibleItems])

  useEffect(() => {
    const t = setInterval(() => setGroupIdx((i) => i + 1), interval)
    return () => clearInterval(t)
  }, [interval])

  if (!visibleItems.length) return null

  if (isMobile) {
    return (
      <LazyMotion features={domAnimation}>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {visibleItems.flat().map((card) => (
            <SlideCard key={card.id + card.image} item={card} active={true} />
          ))}
        </div>
      </LazyMotion>
    )
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col gap-4 w-[200px] md:w-[240px] xl:w-[260px]">
        {pairs.map((card, i) => (
          <SlideCard key={card.id + card.image} item={card} active={i === 0} />
        ))}
      </div>
    </LazyMotion>
  )
}

function SlideCard({ item, active }: { item: Highlight & { image: string }, active: boolean }) {
  const Comp: any = item.link ? Link : 'div'

  return (
    <m.div
      initial={{ opacity: 0, y: 16, scale: 0.98, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -16, scale: 0.98, filter: 'blur(6px)' }}
      transition={{ duration: 0.35 }}
      className={cn(
        'relative overflow-hidden rounded-2xl aspect-[9/16] bg-white/5 min-w-[160px] max-w-[200px]',
        active ? '' : 'opacity-90'
      )}
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {item.badge && (
        <div className="absolute left-2 top-2 rounded-full bg-black/60 text-white text-sm px-2 py-1">
          {item.badge}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="text-white text-lg font-semibold leading-tight drop-shadow-md">
          {item.title}
        </div>
      </div>

      {item.link && <Comp href={item.link} className="absolute inset-0" />}
    </m.div>
  )
}
