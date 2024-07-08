import BottomNavigation from '@/components/nav/BottomNavigation'
import Navigation from '@/components/nav/Navigation'
import React from 'react'

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <main className='root !justify-start py-7 px-[6%] flex-col min-h-screen'>
      <div className='w-full fixed top-0 left-0 pt-7 px-[6%] bg-customWhite-100 z-50'>
        <Navigation />
      </div>

      <div className='w-full mt-[60px]'>
        {children}
      </div>

      <div className='fixed bottom-7 left-[50%] -translate-x-1/2 lg:hidden z-50'>
        <BottomNavigation />
      </div>
    </main>
  )
}