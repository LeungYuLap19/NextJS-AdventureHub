'use client'
import React, { useEffect, useState } from 'react'
import { Rating } from '@mui/material'
import Photo from './Photo'
import { useRouter, useSearchParams } from 'next/navigation'
import { capitalizeWords, cn, formatDateRange, formUrlQuery } from '@/lib/utils'
import { ResultsItemProps } from '@/types/components'
import AddToPlanner from '../details/AddToPlanner'
import { useGetPlannerPlaces } from '@/lib/hooks/useGetPlannerPlaces'

export default function ResultsItem({ item, plannersItem }: ResultsItemProps) {
  const [plannerPhotos, setPlannerPhotos] = useState<string[]>([]);

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

  const plannerPlaces = plannersItem ? useGetPlannerPlaces(plannersItem).plannerPlaces : null;

  useEffect(() => {
    if (plannerPlaces) {
      const photos: string[] = [];
      plannerPlaces.places.map((place) => {
        place.place.photo &&
        photos.push(place.place.photo);
      });

      if (photos.length > 4) {
        const randomIndexes = new Set<number>();
        while (randomIndexes.size < 4) {
          randomIndexes.add(Math.floor(Math.random() * photos.length));
        }
        const randomArray = Array.from(randomIndexes);
        const randomPhotos: string[] = randomArray.map((index) => photos[index]);
        setPlannerPhotos(randomPhotos);
      }
      else {
        console.log(photos);
        setPlannerPhotos(photos);
      }
    }
  }, [plannerPlaces]);

  return (
    <div className='w-full bg-customWhite-200 rounded-lg overflow-hidden cursor-pointer'>
      <div 
        onClick={handleOnClick}
        className='w-full aspect-square bg-customBlack-100 relative'
      >
        {
          (item && item.photo) ?
          <Photo 
            displayName={item.name} 
            imgUrl={item.photo} 
            morePhoto={false}     
          /> :
          plannerPhotos ?
          <div className={cn('w-full h-full grid gap-0', {
            'grid-cols-1 grid-rows-1': plannerPhotos.length === 1,
            'grid-cols-2 grid-rows-1': plannerPhotos.length === 2,
            'grid-cols-2 grid-rows-2': plannerPhotos.length > 2,
          })}>
            {
              plannerPhotos.map((photo, index) => (
                <div key={index} className={`w-full h-full overflow-hidden relative ${plannerPhotos.length === 3 && index === 2 ? 'col-span-2': ''}`}>
                  <Photo 
                    displayName={'photo ' + index} 
                    imgUrl={photo} 
                    morePhoto={false}
                  />
                </div>
              ))
            }
          </div> 
          :
          <></>
        }
      </div>

      <div className='flex w-full items-center justify-between pl-2 pr-4 pt-1 pb-2'>
        <div 
          onClick={handleOnClick}
          className={`flex flex-col justify-between w-[80%] ${plannersItem && '!w-full'}`}
        >
          <p className='line-clamp-1'>
            {item ? item.name : plannersItem ? plannersItem.name : ''}
          </p>
          <p className='text-xs text-customBlack-100 line-clamp-1'>
            {
              item ?
              item.categories.map((category: Category, index: number) => (
                <React.Fragment key={category.id}>
                  {index > 0 && ', '}
                  {category.short_name}
                </React.Fragment>
              )) :
              plannersItem ? 
              capitalizeWords(plannersItem.country.text.primary) :
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
            <p className='text-xs text-customBlack-100 line-clamp-1'>
              <span className='max-md:hidden'>{formatDateRange(plannersItem).split(' ∙ ')[0] + ' ∙ '}</span>
              {formatDateRange(plannersItem).split(' ∙ ')[1]}
            </p> :
            ''
          }
        </div>

        {
          item &&
          <AddToPlanner resultsItem={item} />
        }
      </div>
    </div>
  )
}
