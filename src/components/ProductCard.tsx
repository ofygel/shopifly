'use client'
import Image from 'next/image'
import { Product } from '@/types/product'
import { useUIStore } from '@/store/ui'

interface Props { product: Product }
const ProductCard: React.FC<Props> = ({ product }) => {
  const openQuickView = useUIStore(s=>s.openQuickView)
  return (
    <div className="relative group bg-gray-900 rounded-xl overflow-hidden shadow-lg h-full">
      <div className="relative w-full h-64 overflow-hidden">
        <Image src={product.imageUrl} alt={product.name} fill className="object-cover transition-transform group-hover:scale-105" />
        {product.isNew && <span className="absolute top-3 left-3 bg-white/80 text-black text-xs uppercase px-2 py-1 rounded">Новинка</span>}
        {(product.discount??0)>0 && <span className="absolute top-3 right-3 bg-red-600 text-white text-sm px-2 py-1 rounded">-{product.discount}%</span>}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white text-lg font-medium">{product.name}</h3>
        <span className="text-white mb-2">{product.price.toLocaleString()} ₸</span>
        <button onClick={()=>openQuickView(product)} className="mt-auto bg-white/20 text-white text-sm py-2 rounded transition-opacity opacity-0 group-hover:opacity-100">Быстрый просмотр</button>
      </div>
    </div>
  )
}
export default ProductCard