'use client'

import React, { FC, ReactNode } from 'react'
import { Providers } from '@/app/providers'
import { SpaProvider } from '@/spa' // <-- ДОБАВЬ ЭТО!

interface Props { children: ReactNode }

const AppWrapper: FC<Props> = ({ children }) => (
  <Providers>
    <SpaProvider>
      {children}
    </SpaProvider>
  </Providers>
)

export default AppWrapper
