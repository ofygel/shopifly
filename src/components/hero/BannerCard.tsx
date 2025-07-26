'use client'

import Image from 'next/image'

type Props = {
  img: string
  title: string
  onClick?: () => void
}

export default function BannerCard({ img, title, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden shadow-xl text-left group transition"
    >
      <Image
        src={img}
        alt=""
        width={340}
        height={200}
        className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute bottom-3 left-3 text-white text-lg font-bold leading-5 drop-shadow">
        {title}
      </div>
    </button>
  )
}
