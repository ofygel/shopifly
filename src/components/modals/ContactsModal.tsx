// src/components/modals/ContactsModal.tsx
import { m } from 'framer-motion'

export default function ContactsModal({ onClose }: { onClose: () => void }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <m.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="relative max-w-md w-full bg-neutral-900 p-6 rounded-2xl shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Контакты</h2>
          <button 
            onClick={onClose} 
            className="text-neutral-500 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>
        
        <div className="space-y-4 text-neutral-300">
          <div className="flex items-start">
            <span className="font-medium w-24">Телефон:</span>
            <span>+1 (123) 456-7890</span>
          </div>
          
          <div className="flex items-start">
            <span className="font-medium w-24">Email:</span>
            <span>info@shopifly.com</span>
          </div>
          
          <div className="flex items-start">
            <span className="font-medium w-24">Адрес:</span>
            <span>
              123 Fashion Ave., Suite 100<br />
              New York, NY 10001
            </span>
          </div>
        </div>
        
        <button className="mt-8 w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg transition-colors">
          Отправить отзыв
        </button>
      </m.div>
    </m.div>
  )
}