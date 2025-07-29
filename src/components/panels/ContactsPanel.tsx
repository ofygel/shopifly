'use client'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useUIStore } from '@/store/ui'
import { X } from 'lucide-react'

export default function ContactsPanel() {
  const open = useUIStore(s => s.openPanel === 'contacts')
  const setOpen = useUIStore(s => s.setOpenPanel)
  
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={open ? { opacity: 1 } : { opacity: 0 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 ${open ? 'block' : 'hidden'}`}
      >
        <m.div
          className="absolute inset-0 bg-black/60"
          onClick={() => setOpen(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        
        <m.div
          className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
          initial={{ x: '100%' }}
          animate={open ? { x: 0 } : { x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">Контакты</h2>
              <button 
                onClick={() => setOpen(null)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">SHOPIFLY</h1>
                <h2 className="text-xl font-semibold mb-6">Контакты</h2>
                <p className="text-gray-600 mb-2">Мы всегда рады помочь вам!</p>
                <div className="space-y-4">
                  <p>+7 777 7777</p>
                  <p>info@shopifly.com</p>
                  <p className="leading-relaxed">
                    проспект Шопифлая, 100<br />
                    Нью-Йорк, NY 10001
                  </p>
                </div>
              </div>
              
              <button className="w-full mt-8 py-3 bg-black text-white rounded-lg">
                Свяжитесь с нами
              </button>
            </div>
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  )
}