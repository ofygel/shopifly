// Полный файл src/components/BackButton.tsx
'use client'

import Link from 'next/link'

export default function BackButton() {
  return (
    <Link
      href="/"
      aria-label="Назад на главную"
      className="
        fixed top-20 left-6 z-30
        p-2 bg-white/20 backdrop-blur-sm
        rounded-full hover:bg-white/30
        transition
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </Link>
  )
}
