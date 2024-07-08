import React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export default function Logo({ height, width, style }: LogoProps) {
  return (
    <div className='flex w-full items-center'>
       <Image
            src={'/icons/logo.png'}
            alt='logo'
            width={width} height={height}
        />  
        <p className={cn('font-bold green-gradient bg-clip-text text-transparent max-sm:text-2xl ', style)}>
            AdventureHub.
        </p>
    </div>
  )
}
