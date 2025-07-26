'use client'
import { useEffect } from 'react'

export function usePrefetchImages(urls: string[]) {
  useEffect(() => {
    if (!urls?.length) return
    const imgs: HTMLImageElement[] = []
    urls.forEach((u) => {
      const img = new Image()
      img.src = u
      imgs.push(img)
    })
    return () => {
      imgs.forEach((img) => (img.onload = null))
    }
  }, [urls])
}
