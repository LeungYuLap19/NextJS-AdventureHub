import React, { useState } from 'react'
import Photo from './Photo'
import { Rating } from '@mui/material'
import PhotosSwiper from './PhotosSwiper';
import { PhotosCardProps } from '@/types/components';
import AddToPlanner from '../details/AddToPlanner';

export default function PhotosCard({ item, photos=[] }: PhotosCardProps) {
  const morePhotos = photos.length - 1;
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className='md:w-[60%] md:h-fit md:max-w-details-custom aspect-[7/10] flex flex-col rounded-lg overflow-hidden bg-customWhite-200 flex-shrink-0'>
      <div className='w-full bg-customBlack-100 relative flex-grow'>
        {
          item.photo &&
          <Photo 
            displayName={item.name} 
            imgUrl={item.photo} 
            morePhoto={false}     
          />
        }
        {
          morePhotos > 0 &&
          <div 
            onClick={() => setOpen(true)}
            className='absolute md:left-7 left-5 md:bottom-7 bottom-5 md:w-16 w-12 md:h-16 h-12 rounded-lg border-2 border-customWhite-200 overflow-hidden cursor-pointer'>
            <div className='relative w-full h-full'>
              <Photo 
                displayName={''}
                imgUrl={photos[1].prefix + 'original' + photos[1].suffix}
                morePhoto={true} />
              <p className='absolute top-0 left-0 w-full h-full flex justify-center items-center text-customWhite-200 text-lg'>{morePhotos + '+'}</p>
            </div>
          </div>
        }
      </div>

      <div className='flex w-full items-center justify-between pl-2 pr-4 h-[90px] px-5 pt-1 pb-2'>
        <div className='flex flex-col justify-between w-[80%]'>
          <p className='truncate text-lg'>{item.name}</p>
          <p className='text-sm text-customBlack-100 truncate'>
            {
              item.categories.map((category: Category, index: number) => (
                <React.Fragment key={category.id}>
                  {index > 0 && ', '}
                  {category.short_name}
                </React.Fragment>
              ))
            }
          </p>
          <Rating
            className='mt-2' 
            name="half-rating-read" 
            defaultValue={item.rating / 2}
            precision={0.1} 
            size="small" readOnly 
          />
        </div>

        <AddToPlanner resultsItem={item} />
      </div>

      {
        open && 
        <PhotosSwiper photos={photos} setOpen={setOpen} />
      }
    </div>
  )
}
