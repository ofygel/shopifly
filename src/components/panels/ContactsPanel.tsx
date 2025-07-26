"use client";

import Panel from "@/components/panels/Panel";
import { useUIStore } from "@/store/ui";
import { useCMS } from "@/store/cms";

export default function ContactsPanel() {
  const isOpen = useUIStore((s) => s.isOpen("contacts"));
  const contacts = useCMS((s) => s.settings.contacts);

  // Находим нужные контакты по типу
  const phoneContact = contacts.find((c) => c.type === "phone");
  const emailContact = contacts.find((c) => c.type === "email");
  const addressContact = contacts.find((c) => c.type === "address");

  return (
    <Panel name="contacts" width={560} className="bg-neutral-900 text-white" lockScroll>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Наши контакты</h2>
        <div className="space-y-4">
          {phoneContact && (
            <div>
              <div className="text-sm text-white/60">Телефон</div>
              <div className="text-lg">{phoneContact.value}</div>
            </div>
          )}
          {emailContact && (
            <div>
              <div className="text-sm text-white/60">Email</div>
              <div className="text-lg">{emailContact.value}</div>
            </div>
          )}
          {addressContact && (
            <div>
              <div className="text-sm text-white/60">Адрес</div>
              <div className="text-lg">{addressContact.value}</div>
            </div>
          )}
        </div>
        {/* При необходимости можно добавить форму обратной связи или карту */}
      </div>
    </Panel>
  );
}
