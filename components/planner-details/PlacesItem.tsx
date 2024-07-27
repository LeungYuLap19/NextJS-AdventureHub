import { Rating } from '@mui/material'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import PlannerSheet from './PlannerSheet'
import { cn } from '@/lib/utils'
import Photo from '../discover/Photo'
import { useRouter } from 'next/navigation'
import { removeFromPlanner } from '@/lib/actions/firebasePlanner'
import { PlacesItemProps } from '@/types/components'
import { toast } from '../ui/use-toast'
import { storeToLocalstorage } from '@/lib/actions/localStorage.actions'
import { placeDetails } from '@/lib/actions/fourSquareAPI'

export default function PlacesItem({ type = 'list', item, pid, planner }: PlacesItemProps) {
  const router = useRouter();
  const handleOnClick = () => {
    storeToLocalstorage<CategorizedResultsItem>('plannerPlace', [{label: '', results: [item]}]);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    router.push(`${baseUrl}discover/details?id=${item.fsq_id}`, { scroll: false });
  }

  const handleOnRemove = async () => {
    const done = pid && await removeFromPlanner(item.fsq_id, pid);
    if (done) {
      toast({
        title: `${item.name} removed.`
      });
    }
    else {
      toast({
        title: `Failed to Remove ${item.name}.`
      });
    }
  }

  const [extraData, setExtraData] = useState<PlaceDetails | null>(null);
  useEffect(() => {
    const getExtraData = async () => {
      if (type === 'sheet') {
        const fsq_id = item.fsq_id;
        const fields = ['fsq_id', 'location', 'hours'];
        const data = await placeDetails({ fsq_id, fields });
        if (data) {
          setExtraData(data);
        }
      }
    }
    getExtraData();
  }, [type]);

  return (
    <div className={`relative w-full bg-customWhite-200 rounded-lg overflow-hidden min-h-[140px] max-h-[220px] transition-all duration-300`}>
      <div className='absolute inset-0 flex items-center'>
        <div 
          onClick={handleOnClick}
          className='h-full aspect-square bg-customBlack-100 relative flex-shrink-0 cursor-pointer'
        >
          {
            item.photo &&
            <Photo 
              displayName={item.name} 
              imgUrl={item.photo} 
              morePhoto={false}     
            /> 
          }
        </div>
        <div className='flex justify-between items-center flex-grow h-full px-4 py-3 relative'>
          <div
            className={cn('flex flex-col w-[80%] h-full', {
              'w-full justify-between': type === 'sheet'
            })}
          >
            <p 
              onClick={handleOnClick}
              className='line-clamp-1 cursor-pointer'
            >
              {item && item.name}
            </p>
            <p
              className={cn('text-xs text-customBlack-100 line-clamp-1', {
                'text-sm': type === 'sheet'
              })}
            >
              {
                item &&
                item.categories.map((category: Category, index: number) => (
                  <React.Fragment key={category.id}>
                    {index > 0 && ', '}
                    {category.short_name}
                  </React.Fragment>
                )) 
              }
            </p>

            {type === 'sheet' && extraData && (
              <>
                <p className='text-sm text-customBlack-100 line-clamp-1'>
                  { extraData.hours.display }
                </p>
                <p className='text-sm text-customBlack-100 line-clamp-1'>
                  { extraData.location.address }
                </p>
              </>
            )}

            {
              item &&
              <Rating
                className='mt-2' 
                name="half-rating-read" 
                defaultValue={item.rating / 2} 
                precision={0.1} 
                size="small" readOnly 
              />
            }

            {type === 'list' && planner && <PlannerSheet planner={planner} item={item} />}
          </div>

          {type === 'list' && (
            <Image
              onClick={handleOnRemove}
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
