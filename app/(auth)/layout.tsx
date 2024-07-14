import Image from 'next/image'
import React from 'react'

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <main className='root h-screen'>
        {children}
        <div className='relative h-full w-1/2 max-lg:hidden'>
          <Image
              src={'/auth/bg.jpg'}
              alt='auth-background'
              fill={true}
              style={{objectFit: 'cover', objectPosition: 'center'}}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
    </main>
  )
}
