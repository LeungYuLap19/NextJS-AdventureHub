import { HeaderProps } from '@/types/components'
import React from 'react'

export default function Header({ title }: HeaderProps) {
  return (
    <p className='text-4xl font-bold text-customBlack-300 max-md:text-3xl'>
      {title}
    </p>
  )
}
