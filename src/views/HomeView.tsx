'use client'

import { scrollToId } from '@/lib/scroll' 
import { useSpa } from '@/spa'
import { useUIStore } from '@/store/ui'
import HeroSection from '@/components/hero/HeroSection'
import CatalogView from '@/views/CatalogView'

export default function HomeView() {
  const { setView } = useSpa()
  const open = useUIStore((s) => s.openPanel)

  return (
    <>
      <HeroSection />
      <div id="catalog-anchor" />
      <CatalogView />
    </>
  )
}
