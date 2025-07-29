'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/types/product';
import { useUIStore } from '@/store/ui';
import { Heart, ShoppingCart } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const setSelectedProduct = useUIStore((s) => s.setSelectedProduct);
  const [isFav, setFav] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  // Галерея: если несколько фото (imageUrl + imageUrl2), делаем смену при наведении
  const gallery: string[] = [product.imageUrl, ...(product.images?.slice(0, 1) ?? [])];

  // Бейджи
  const isSoldOut = product.isSoldOut;
  const isNew = product.isNew;
  const isExclusive = product.isExclusive;
  const discount = product.discount ?? 0;

  // Быстрое добавление в избранное (локально)
  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFav((x) => !x);
  };

  // Открытие детального модального окна (через zustand, глобально)
  const openDetails = () => setSelectedProduct(product);

  // Классы для grid/list
  const cardClass = viewMode === 'grid'
    ? 'group relative rounded-2xl overflow-hidden bg-black/10 border border-stone-700 hover:shadow-xl transition-shadow duration-300 flex flex-col min-h-[390px]'
    : 'group relative rounded-2xl overflow-hidden bg-black/10 border border-stone-700 hover:shadow-xl transition-shadow duration-300 flex items-center min-h-[170px]';

  return (
    <div
      className={cardClass}
      tabIndex={0}
      onClick={openDetails}
      onMouseEnter={() => setImgIndex(1)}
      onMouseLeave={() => setImgIndex(0)}
      style={{ cursor: 'pointer' }}
    >
      {/* Картинка */}
      <div className={viewMode === 'grid' ? "relative w-full aspect-square" : "relative w-44 min-w-44 h-44"}>
        <Image
          src={gallery[imgIndex] || gallery[0]}
          alt={product.name}
          width={480}
          height={480}
          priority={imgIndex === 0}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Бейджи */}
        <div className="absolute z-10 top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-white/80 text-black text-xs uppercase px-2 py-1 rounded-full font-semibold shadow">
              Новинка
            </span>
          )}
          {isExclusive && (
            <span className="bg-indigo-600 text-white text-xs uppercase px-2 py-1 rounded-full font-semibold shadow">
              Эксклюзив
            </span>
          )}
          {isSoldOut && (
            <span className="bg-gray-500 text-white text-xs uppercase px-2 py-1 rounded-full font-semibold shadow">
              Нет в наличии
            </span>
          )}
        </div>
        {/* Discount бейдж */}
        {discount > 0 && (
          <div className="absolute z-10 top-4 right-4 bg-red-600 text-white text-sm px-2 py-1 rounded shadow">
            -{discount}%
          </div>
        )}
        {/* Heart избранное */}
        <button
          className="absolute z-10 bottom-4 right-4 bg-white/80 hover:bg-rose-100 text-rose-600 p-2 rounded-full transition group-hover:scale-110"
          onClick={handleFav}
          aria-label="В избранное"
        >
          <Heart size={20} className={isFav ? "fill-rose-500 text-rose-500" : ""} />
        </button>
      </div>

      {/* Информация о товаре */}
      <div className={viewMode === 'grid'
        ? "flex-1 flex flex-col justify-end px-5 py-4 bg-gradient-to-t from-black/80 to-transparent"
        : "flex-1 flex flex-col justify-center px-7 py-5"}>
        <h3 className="text-white text-lg font-semibold line-clamp-2 mb-1">{product.name}</h3>
        {product.category && (
          <span className="text-xs text-stone-300 mb-2">{product.category}</span>
        )}
        <div className="flex items-end gap-2 mb-2">
          <span className="text-white text-xl font-bold">{product.price.toLocaleString()} ₸</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-stone-400 line-through text-base">
              {product.originalPrice.toLocaleString()} ₸
            </span>
          )}
        </div>
        {/* Быстрые кнопки — только для grid-режима */}
        {viewMode === 'grid' && (
          <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={e => {
                e.stopPropagation();
                openDetails();
              }}
              className="bg-white/90 hover:bg-rose-600 hover:text-white text-rose-600 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1 transition"
              tabIndex={-1}
            >
              <ShoppingCart size={18} />
              Купить
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
