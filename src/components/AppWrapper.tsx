// src/components/AppWrapper.tsx
'use client'

import React, { FC, ReactNode } from 'react'
import { Providers } from '@/app/providers'  // ваш существующий

interface Props { children: ReactNode }

const AppWrapper: FC<Props> = ({ children }) => (
  <Providers>
    {children}
  </Providers>
)

export default AppWrapper
