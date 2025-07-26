// src/lib/scroll.ts
export function scrollToId(id: string, opts: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }) {
  if (typeof window === 'undefined') return
  const el = document.getElementById(id)
  if (el) el.scrollIntoView(opts)
}

export function scrollToY(y: number, behavior: ScrollBehavior = 'smooth') {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: y, behavior })
}

export function scrollToTop(behavior: ScrollBehavior = 'smooth') {
  scrollToY(0, behavior)
}

/**
 * Если нужен сдвиг (например, фиксированный header 80px):
 */
export function scrollToIdWithOffset(id: string, offset = 80, behavior: ScrollBehavior = 'smooth') {
  if (typeof window === 'undefined') return
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset
  window.scrollTo({ top, behavior })
}
