// src/components/modals/ProfileModal.tsx
import { m } from 'framer-motion'

interface ProfileModalProps {
  isAdmin: boolean
  onClose: () => void
}

export default function ProfileModal({ 
  isAdmin,
  onClose
}: ProfileModalProps) {
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
          <h2 className="text-xl font-bold">Профиль</h2>
          <button 
            onClick={onClose} 
            className="text-neutral-500 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-bold">Наталья Михайлова</h3>
          <p className="text-neutral-400">natalia@example.com</p>
          <p className="text-neutral-400 mt-1">123 Gothic Ave, Moscow</p>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button className="py-2 bg-neutral-800 hover:bg-neutral-750 rounded-lg transition-colors">
            Заказы
          </button>
          <button className="py-2 bg-neutral-800 hover:bg-neutral-750 rounded-lg transition-colors">
            Избранное
          </button>
          <button className="py-2 bg-neutral-800 hover:bg-neutral-750 rounded-lg transition-colors">
            Настройки
          </button>
        </div>
        
        {isAdmin && (
          <div>
            <h4 className="font-bold text-lg mb-3">Панель администратора</h4>
            <div className="space-y-2">
              {[
                { id: 1, label: 'Управление товарами', checked: false },
                { id: 2, label: 'Редактировать контент', checked: true },
                { id: 3, label: 'Аналитика пользователей', checked: false },
                { id: 4, label: 'Настройки сайта', checked: false },
              ].map(item => (
                <label 
                  key={item.id} 
                  className="flex items-center space-x-3 p-2 hover:bg-neutral-850 rounded cursor-pointer"
                >
                  <input 
                    type="checkbox" 
                    checked={item.checked}
                    onChange={() => console.log('Toggle:', item.id)}
                    className="h-4 w-4 accent-rose-600"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
              
              <button className="w-full mt-3 py-2 text-center text-rose-600 hover:bg-rose-900/30 rounded-lg transition-colors">
                Выйти
              </button>
            </div>
          </div>
        )}
      </m.div>
    </m.div>
  )
}