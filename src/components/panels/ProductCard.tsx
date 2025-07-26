'use client';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useUIStore } from '@/store/ui';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const openQuickView = useUIStore((s) => s.openQuickView);
  const discount = product.discount ?? 0;
  const isNew = product.isNew ?? false;

  return (
    <div className="relative group rounded-xl overflow-hidden border border-transparent hover:border-white transition">
      {/* Фон плитки */}
      <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />

      {/* Изображение */}
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={400}
        className="relative w-full h-full object-cover transition-transform group-hover:scale-105"
      />

      {/* Бейджи */}
      {isNew && (
        <div className="absolute top-3 left-3 bg-white/80 text-black text-xs uppercase px-2 py-1 rounded">
          Новинка
        </div>
      )}
      {discount > 0 && (
        <div className="absolute top-3 right-3 bg-red-600 text-white text-sm px-2 py-1 rounded">
          -{discount}%
        </div>
      )}

      {/* Информация */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 space-y-1">
        <h3 className="text-white text-lg font-medium">{product.name}</h3>
        <span className="text-white">{product.price.toLocaleString()} ₸</span>
        <button
          onClick={() => openQuickView(product)}
          className="mt-2 w-full bg-white/20 text-white text-sm py-1 rounded"
        >
          Быстрый просмотр
        </button>
      </div>
    </div>
  );
}