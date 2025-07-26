'use client'

import { useUIStore, type PanelName } from '@/store/ui'
import { ReactNode, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'

type PanelProps = {
  name: PanelName
  children: ReactNode
  width?: number | string
  lockScroll?: boolean
  className?: string
  onClose?: () => void
}

export default function Panel({
  name,
  children,
  width = 'auto',
  lockScroll = false,
  className = '',
  onClose,
}: PanelProps) {
  const isOpen = useUIStore((s) => s.isOpen(name))
  const closePanel = useUIStore((s) => s.closePanel)

  // Блокируем скролл фона при открытой панели
  useEffect(() => {
    if (!lockScroll) return
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, lockScroll])

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      closePanel(name)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <m.div
            className={`relative bg-neutral-900 ${className}`}
            style={{ width }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white text-xl"
              aria-label="Close"
            >
              ×
            </button>
            <div className="p-6">{children}</div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
