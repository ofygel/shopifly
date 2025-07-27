'use client'
import React, { useRef } from 'react'
import { Product } from '@/types/product'
import ProductCard from './ProductCard'

interface Props { items: Product[] }
const Carousel: React.FC<Props> = ({ items }) => {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir:'left'|'right') => {
    if(!ref.current) return
    const w = ref.current.clientWidth
    ref.current.scrollBy({left: dir==='left'? -w : w, behavior:'smooth'})
  }
  return (
    <div className="relative w-full">
      <button onClick={()=>scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 rounded-full">‹</button>
      <div ref={ref} className="flex gap-6 overflow-x-auto scroll-snap-x snap-mandatory px-12 scrollbar-hide">
        {items.map(p=><div key={p.id} className="snap-start flex-shrink-0 w-72"><ProductCard product={p} /></div>)}
      </div>
      <button onClick={()=>scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/20 rounded-full">›</button>
    </div>
  )
}
export default Carousel