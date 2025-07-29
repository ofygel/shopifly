'use client'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useUIStore } from '@/store/ui'
import { X } from 'lucide-react'

export default function ProfilePanel() {
  const open = useUIStore(s => s.openPanel === 'profile')
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
              <h2 className="text-2xl font-bold">SHOPFILY</h2>
              <button 
                onClick={() => setOpen(null)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-8">
                <h3 className="text-2xl font-bold">Goth Girl</h3>
                <p className="text-blue-600 font-medium mt-1">+7 777 7777</p>
                <p className="text-gray-500 mt-2">goth.girl@example.com</p>
              </div>
              
              <div className="space-y-4">
                <button className="w-full text-left py-3 border-b border-gray-200 text-lg">
                  История заказов
                </button>
                <button 
                  onClick={() => setOpen('favorites')}
                  className="w-full text-left py-3 border-b border-gray-200 text-lg"
                >
                  Избранное
                </button>
                <button className="w-full text-left py-3 text-lg">
                  Настройки аккаунта
                </button>
              </div>
            </div>
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  )
}