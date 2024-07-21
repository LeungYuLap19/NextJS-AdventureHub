import { Rating } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import PlannerSheet from './PlannerSheet'
import { cn } from '@/lib/utils'

export default function PlacesItem({ type = 'list' }: { type?: 'list' | 'sheet' }) {
  return (
    <div className='relative w-full bg-customWhite-200 rounded-lg overflow-hidden min-h-[140px] max-h-[220px]'>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='h-full aspect-square bg-customBlack-100 relative flex-shrink-0'>
          {/* photo */}
        </div>
        <div className='flex justify-between items-center w-full h-full px-4 py-3 relative'>
          <div
            className={cn('flex flex-col w-[80%] h-full', {
              'w-full justify-between': type === 'sheet'
            })}
          >
            <p className='truncate'>
              place name
            </p>
            <p
              className={cn('text-xs text-customBlack-100 truncate', {
                'text-sm': type === 'sheet'
              })}
            >
              place types
            </p>

            {type === 'sheet' && (
              <>
                <p className='text-sm text-customBlack-100 truncate'>
                  open daily 7:00 - 17:00
                </p>
                <p className='text-sm text-customBlack-100 truncate'>
                  place address
                </p>
              </>
            )}

            <Rating
              className='mt-2'
              name="half-rating-read"
              defaultValue={0}
              precision={0.1}
              size="small"
              readOnly
            />

            {type === 'list' && <PlannerSheet />}
          </div>

          {type === 'list' && (
            <Image
              src={'/root/delete.svg'}
              alt='delete'
              height={20}
              width={20}
              className='cursor-pointer'
            />
          )}
        </div>
      </div>
      <div className='w-full' style={{ paddingBottom: '28.57%' }}></div>
    </div>
  )
}
