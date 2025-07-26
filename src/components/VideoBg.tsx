'use client'

export default function VideoBg() {
  return (
    <>
      <video
        src="/videos/silk.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/silk-poster.jpg"
        className="fixed inset-0 w-[100vw] h-[100vh] object-cover pointer-events-none z-[-1]"
        onError={(e) => console.error('VIDEO ERROR', e.currentTarget.error)}
        onCanPlay={(e) => {
          // на всякий случай дожимаем play(), если браузер притормозил автоплей
          e.currentTarget.play().catch(() => {})
        }}
      />

      {/* Лёгкое затемнение, чтобы текст читался */}
      <div className="fixed inset-0 z-[-1] bg-black/35 pointer-events-none" />
    </>
  )
}
