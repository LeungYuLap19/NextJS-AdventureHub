import React from 'react'
import Photo from './Photo'
import { Rating } from '@mui/material'
import Image from 'next/image'

export default function PhotosCard({ item }: any) {
  return (
    <div className='md:w-[60%] md:h-fit md:max-w-details-custom aspect-[7/10] flex flex-col rounded-lg overflow-hidden bg-customWhite-200 flex-shrink-0'>
      <div className='w-full bg-customBlack-100 relative flex-grow'>
        {
          item.imgUrl &&
          <Photo 
            displayName={item.displayName} 
            imgUrl={item.imgUrl} 
            morePhoto={false}     
          />
        }
      </div>

      <div className='flex w-full items-center justify-between pl-2 pr-4 h-[90px] px-5 pt-1 pb-2'>
        <div className='flex flex-col justify-between w-[80%]'>
          <p className='truncate text-lg'>{item.displayName}</p>
          <p className='text-sm text-customBlack-100 truncate'>
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
          width={25} height={25}
        />
      </div>
    </div>
  )
}
