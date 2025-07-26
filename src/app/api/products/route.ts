// src/app/api/products/route.ts
import { products } from '@/data/products'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(products, { status: 200 })
}
