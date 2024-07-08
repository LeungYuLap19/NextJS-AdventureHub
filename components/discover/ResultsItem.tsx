'use client'
import React from 'react'
import { Rating } from '@mui/material'
import Image from 'next/image'
import Photo from './Photo'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery } from '@/lib/utils'

export default function ResultsItem({ item }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleOnClick = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      query: {
        id: 'itemId',
      },
      extraRoute: '/details'
    });
    router.push(newUrl, { scroll: false });
  }

  return (
    <div 
      onClick={handleOnClick}
      className='w-full bg-customWhite-200 rounded-lg overflow-hidden cursor-pointer'
    >
      <div className='w-full aspect-square bg-customBlack-100 relative'>
        {
          item.imgUrl &&
          <Photo 
            displayName={item.displayName} 
            imgUrl={item.imgUrl} 
            morePhoto={false}     
          />
        }
      </div>

      <div className='flex w-full items-center justify-between pl-2 pr-4 pt-1 pb-2'>
        <div className='flex flex-col justify-between w-[80%]'>
          <p className='truncate'>{item.displayName}</p>
          <p className='text-xs text-customBlack-100 truncate'>
            {item.types}
          </p>
          <Rating
            className='mt-2' 
            name="half-rating-read" 
            defaultValue={item.rating} 
            precision={0.1} 
            size="small" readOnly 
          />
        </div>

        <Image 
          className='cursor-pointer'
          src={'/root/add.svg'}
          alt='add-icon'
          width={20} height={20}
        />
      </div>
    </div>
  )
}
