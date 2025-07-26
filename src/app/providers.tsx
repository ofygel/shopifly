'use client'

import { ReactNode, useState } from 'react'
import { SpaProvider } from '@/spa'
import { CartProvider } from '@/context/cart'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <SpaProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>{children}</CartProvider>
      </QueryClientProvider>
    </SpaProvider>
  )
}

// ✅ Добавлен экспорт по умолчанию
export default Providers
