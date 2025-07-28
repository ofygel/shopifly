// src/app/catalog/error.tsx
'use client'

export default function CatalogError({ error }: { error: Error }) {
  return (
    <div className="p-10 text-center text-red-400">
      Ошибка при загрузке каталога:<br />
      {error.message}
    </div>
  )
}
