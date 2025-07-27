// src/components/SplashManager.tsx
'use client'

import { ReactNode, useState } from 'react'
import Splash from './Splash'

interface Props {
  children: ReactNode
}

export default function SplashManager({ children }: Props) {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      {!splashDone && (
        <Splash
          duration={4000}        // <-- было 6000, стало 4000
          onFinish={() => setSplashDone(true)}
        />
      )}
      <div
        className="transition-opacity duration-700"
        style={{
          opacity: splashDone ? 1 : 0,
          pointerEvents: splashDone ? 'auto' : 'none',
        }}
      >
        {children}
      </div>
    </>
  )
}
