'use client'
import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import { handleKeyDown } from '@/lib/utils'
import { Button } from '../ui/button'
import Image from 'next/image'

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [disable, setDisable] = useState<boolean>(false);
  const handleEnter = () => {

  }

  const handleOnChange = () => {

  }

  const handleSearch = () => {

  }

  return (
    <div className='md:w-[50%] max-lg:flex-grow flex-shrink-0 relative'>
      <Input 
        ref={inputRef}
        type='search'
        className='border border-customBlack-100 bg-customWhite-100 placeholder:text-customBlack-100 h-[50px] max-md:h-10'
        placeholder={'Find existing trips...'}
        onKeyDown={(event) => handleKeyDown({ event, func: handleEnter })} 
        onChange={handleOnChange}
      />
      <Button
        onClick={handleSearch}
        disabled={disable}
        className='absolute right-0 top-0 p-[4px] flex justify-center items-center h-[50px] w-[50px] max-md:h-10 max-md:w-10'
      >
        <Image 
          src={'/root/search.png'}
          alt='search-btn'
          width={20} height={20}
          className='bg-customGreen-400 rounded-[4px] w-full h-full p-3 max-md:p-2'
        />
      </Button>
    </div>
  )
}
