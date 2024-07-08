'use client'
import React from 'react'
import { Input } from '../ui/input'
import { handleKeyDown } from '@/lib/utils'

export default function SearchInput() {

  const handleEvent = () => {

  }

  return (
    <Input 
      className='border border-customBlack-100 bg-customWhite-100 placeholder:text-customBlack-100 h-[50px] md:w-[60%] max-md:h-10 flex-shrink-0'
      placeholder={'Search for places...'}
      onKeyDown={(event) => handleKeyDown({event, func: handleEvent})}
    />
  )
}
