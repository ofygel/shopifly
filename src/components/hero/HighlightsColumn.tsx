'use client'

import HighlightCard from './HighlightCard'
import { Highlight } from '@/store/cms'

export default function HighlightsColumn({ items }: { items: Highlight[] }) {
  const w = 180
  const h = 280

  const [top, bottom] = items

  return (
    <div className="hidden lg:flex flex-col gap-2 w-[180px]">
      {top && <HighlightCard item={top} startOffset={0} width={w} height={h} />}
      {bottom && <HighlightCard item={bottom} startOffset={1} width={w} height={h} />}
    </div>
  )
}
