'use client'

import { useMemo } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useCMS } from '@/store/cms'
import ProductTile from '@/components/panels/ProductTile'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18, scale: 0.98, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.26 },
  },
}

export default function CatalogView() {
  const products = useCMS((s) => s.products)
  const ordered = useMemo(
    () => [...products].sort((a, b) => a.order - b.order),
    [products]
  )

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-[calc(100vh-64px)] pt-24 pb-20 container mx-auto px-4">
        {ordered.length === 0 && (
          <div className="text-center text-white/60 py-20">
            В каталоге пока нет товаров.
          </div>
        )}

        <m.div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {ordered.map((p) => (
            <m.div key={p.id} variants={item}>
              <ProductTile product={p} />
            </m.div>
          ))}
        </m.div>
      </div>
    </LazyMotion>
  )
}
