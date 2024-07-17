'use client'
import React from 'react'
import { Rating } from '@mui/material'
import Image from 'next/image'
import Photo from './Photo'
import { useRouter, useSearchParams } from 'next/navigation'
import { capitalizeWords, formatDateRange, formUrlQuery } from '@/lib/utils'

export default function ResultsItem({ item, plannersItem }: ResultsItemProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleOnClick = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      query: {
        id: item ? item.fsq_id : 
            plannersItem ? plannersItem.pid : 
            '',
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
          (item && item.photo) ?
          <Photo 
            displayName={item.name} 
            imgUrl={item.photo} 
            morePhoto={false}     
          /> :
          (plannersItem && plannersItem.photo) ?
          <Photo 
            displayName={plannersItem.name} 
            imgUrl={plannersItem.photo} 
            morePhoto={false}  
          /> :
          <></>
        }
      </div>

      <div className='flex w-full items-center justify-between pl-2 pr-4 pt-1 pb-2'>
        <div className={`flex flex-col justify-between w-[80%] ${plannersItem && '!w-full'}`}>
          <p className='truncate'>
            {item ? item.name : plannersItem ? plannersItem.name : ''}
          </p>
          <p className='text-xs text-customBlack-100 truncate'>
            {
              item ?
              item.categories.map((category: Category, index: number) => (
                <React.Fragment key={category.id}>
                  {index > 0 && ', '}
                  {category.short_name}
                </React.Fragment>
              )) :
              plannersItem ? 
              capitalizeWords(plannersItem.country) :
              ''
            }
          </p>
          {
            item ?
            <Rating
              className='mt-2' 
              name="half-rating-read" 
              defaultValue={item.rating / 2} 
              precision={0.1} 
              size="small" readOnly 
            /> :
            plannersItem ?
            <p className='text-xs text-customBlack-100 truncate'>
              <span className='max-md:hidden'>{formatDateRange(plannersItem).split(' ∙ ')[0] + ' ∙ '}</span>
              {formatDateRange(plannersItem).split(' ∙ ')[1]}
            </p> :
            ''
          }
        </div>

        {
          item &&
          <Image 
            className='cursor-pointer'
            src={'/root/add.svg'}
            alt='add-icon'
            width={20} height={20}
          />
        }
      </div>
    </div>
  )
}
