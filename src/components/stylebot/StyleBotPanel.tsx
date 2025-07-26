'use client'

import { useEffect, useRef, useState } from 'react'
import Panel from '@/components/panels/Panel'
import { useUIStore } from '@/store/ui'
import { useStyleBot } from '@/store/stylebot'

export default function StyleBotPanel() {
  const isOpen = useUIStore((s) => s.isOpen('stylebot'))
  const {
    messages,
    loading,
    result,
    send,
    resetStyle,
    saveCurrentStyle,
    chooseAnotherStyle,
    makeOrder,
  } = useStyleBot()

  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  // Когда панель закрыли — чистим состояние
  useEffect(() => {
    if (!isOpen) resetStyle()
  }, [isOpen, resetStyle])

  // Автоскролл вниз при появлении новых сообщений/результата
  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, result])

  const lastBotText =
    [...messages].reverse().find((m) => m.role === 'bot')?.text || ''

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const t = input.trim()
    if (!t) return
    send(t)
    setInput('')
  }

  return (
    <Panel
      name="stylebot"
      className="bg-[#3b2a1f] text-white"
      width={980}
      onClose={resetStyle}
    >
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        {/* Левая колонка */}
        <div className="flex-1 flex flex-col min-h-[60vh]">
          {/* Прокручиваемая область */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Приветственный блок */}
            {!messages.length && !result && (
              <div className="bg-[#5a4233] rounded-[32px] px-6 py-5 leading-relaxed">
                Напишите в поле данные о себе, ваш вес, рост. Наш ИИ помощник подберёт
                для вас рекомендации исходя из нашей коллекции.
              </div>
            )}

            {/* Summary */}
            {result?.summary && (
              <div className="bg-gray-100 text-black font-bold px-4 py-2 rounded-md">
                {result.summary}
              </div>
            )}

            {/* Итоговое описание образа */}
            {result && (
              <div className="bg-white/90 text-black px-6 py-5 rounded-[28px] leading-relaxed whitespace-pre-wrap">
                {lastBotText}
              </div>
            )}

            {/* Поток сообщений, если результата ещё нет */}
            {!result &&
              messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    (m.role === 'user'
                      ? 'ml-auto bg-white text-black'
                      : 'mr-auto bg-[#5a4233] text-white') +
                    ' max-w-[85%] px-4 py-2 rounded-2xl whitespace-pre-wrap leading-relaxed'
                  }
                >
                  {m.text}
                </div>
              ))}

            <div ref={bottomRef} />
          </div>

          {/* Нижняя зона (sticky), меняется в зависимости от result */}
          {result ? (
            <div className="sticky bottom-0 left-0 right-0 z-[1] bg-[#3b2a1f] pt-4">
              <div className="flex flex-wrap gap-4 items-center">
                <button
                  onClick={saveCurrentStyle}
                  className="flex items-center gap-2 bg-pink-500 text-white font-semibold rounded-full px-6 py-3 shadow-md hover:bg-pink-600"
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white">
                      <path
                        fill="currentColor"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                           2 6 3.99 4 6.5 4c1.74 0 3.41 1.01 4.13 2.57C11.09 5.01 12.76 4
                           14.5 4 17.01 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      />
                    </svg>
                  </span>
                  Сохранить образ
                </button>

                <button
                  onClick={chooseAnotherStyle}
                  className="flex items-center gap-2 bg-white text-pink-600 font-semibold rounded-full px-6 py-3 shadow-md hover:bg-gray-100"
                >
                  <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center">
                    ↺
                  </span>
                  Выбрать ещё
                </button>

                <button
                  onClick={makeOrder}
                  className="flex items-center gap-2 bg-pink-600 text-white font-semibold rounded-full px-6 py-3 shadow-md hover:bg-pink-700"
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    🛒
                  </span>
                  Оформить заказ
                </button>

                <button
                  onClick={resetStyle}
                  className="flex items-center gap-2 text-white/70 hover:text-white ml-auto"
                >
                  Сбросить
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="sticky bottom-0 left-0 right-0 z-[1] bg-[#3b2a1f] pt-4"
            >
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Опишите себя и предпочтения..."
                  className="w-full rounded-2xl py-3 pl-4 pr-14 bg-white text-black placeholder-gray-400 outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-pink-500 text-white disabled:opacity-50 flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                    <path fill="currentColor" d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Правая колонка (фото) */}
        {result?.image && (
          <div className="w-full lg:w-[320px] flex-shrink-0 flex items-center justify-center">
            <div className="bg-white rounded-[32px] p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result.image}
                alt="style"
                className="rounded-2xl w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </Panel>
  )
}
