'use client'

import Panel from '@/components/panels/Panel'
import { useUIStore } from '@/store/ui'
import { useCMS } from '@/store/cms'

export default function ContactsPanel() {
  useUIStore((s) => s.isOpen('contacts'))
  const contacts = useCMS((s) => s.settings.contacts)

  return (
    <Panel name="contacts" width={560} className="bg-neutral-900 text-white" lockScroll>
      <div className="flex flex-col max-h-[70vh] overflow-y-auto pr-2">
        <h2 className="text-2xl font-semibold mb-6">Контакты</h2>

        <div className="space-y-5 text-white/85">
          <div>
            <div className="text-sm text-white/60">Email</div>
            <div>{contacts.email}</div>
          </div>

          <div>
            <div className="text-sm text-white/60">Телефон</div>
            <div>{contacts.phone}</div>
          </div>

          <div>
            <div className="text-sm text-white/60">Адрес</div>
            <div>{contacts.address}</div>
          </div>

          <div>
            <div className="text-sm text-white/60 mb-1">Соцсети</div>
            <div className="flex gap-4">
              {contacts.socials.map((s: { label: string; url: string }, i: number) => (
                <a key={i} href={s.url} className="underline hover:no-underline">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  )
}
