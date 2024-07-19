import { Rating } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import PlannerSheet from './PlannerSheet'

export default function PlacesItem() {
  return (
    <div className='flex items-center w-full aspect-[3.5/1] bg-customWhite-200 rounded-lg overflow-hidden min-h-[140px] max-h-[220px]'>
      <div className='h-full aspect-square bg-customBlack-100 relative'>
        {/* photo */}
      </div>

      <div className='flex justify-between items-center w-full h-full px-4 py-3 relative'>
        <div className='flex flex-col w-[80%] h-full'>
          <p className='truncate'>
            place name
          </p>
          <p className='text-xs text-customBlack-100 truncate'>
            place types
          </p>
          <Rating
            className='mt-2' 
            name="half-rating-read" 
            defaultValue={0} 
            precision={0.1} 
            size="small" readOnly 
          />

          <PlannerSheet />
        </div>

        <Image 
          src={'/root/delete.svg'}
          alt='delete'
          height={20} width={20}
          className='cursor-pointer'
        />
      </div>
    </div>
  )
}
