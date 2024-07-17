'use client'
import React from 'react'
import { Input } from '../ui/input'

export default function SearchInput() {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = new CustomEvent("plannersSearch", { detail: e.target.value.trim() });
    window.dispatchEvent(event);
  }

  return (
    <div className='md:w-[50%] max-lg:flex-grow flex-shrink-0 relative'>
      <Input 
        type='search'
        className='border border-customBlack-100 bg-customWhite-100 placeholder:text-customBlack-100 h-[50px] max-md:h-10'
        placeholder={'Find existing trips...'}
        onChange={handleOnChange}
      />
    </div>
  )
}
