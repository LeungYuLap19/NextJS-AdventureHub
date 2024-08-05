'use client'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'

export default function CreateBlogBotton() {
  const router = useRouter();
  const pathname = usePathname();
  const handleOnClick = () => {
    router.push(`${pathname}/create`);
  }

  return (
    <Button 
      onClick={handleOnClick}
      className='max-2xl:text-sm bg-customGreen-400 text-customWhite-200 py-2 px-4 
        max-sm:p-0 h-[40px] max-sm:w-[40px] flex justify-center items-center
        rounded-md cursor-pointer flex-shrink-0'
    >
      <div className='max-sm:text-2xl flex gap-2 items-center'>
        <Image
          src={'/root/create.svg'}
          alt='add'
          width={14} height={14}
          className='invert'
        />
        <span className='max-sm:hidden'>Create Blog</span>
      </div>
    </Button>
  )
}
