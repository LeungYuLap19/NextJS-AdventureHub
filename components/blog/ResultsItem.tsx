import { cn } from '@/lib/utils'
import React from 'react'
import Photo from '../discover/Photo'

export default function ResultsItem({ type }: { type: 'recommend' | 'popular' }) {
  return (
    <div className={cn('flex-shrink-0 relative bg-customWhite-200 rounded-lg overflow-hidden cursor-pointer', {
      'sm:w-full sm:pt-[56.8%] max-sm:h-full max-sm:pl-[70%]': type === 'recommend',
      'w-full pt-[40%]': type === 'popular'
    })}>
      <div className='absolute inset-0 text-white'>
        <div className='h-full w-full relative bg-customBlack-100 flex'>
          {/* photo */}
          {
            type === 'popular' ?
            <div className='h-full aspect-square relative'>
              <Photo 
                displayName='testing-img'
                imgUrl='/root/testing-img.jpg'
                morePhoto={false}
              />
            </div> :
            <Photo
              displayName='testing-img'
              imgUrl='/root/testing-img.jpg'
              morePhoto={true}
            />
          }
      
          {
            type === 'recommend' ?
            <div className='absolute left-0 bottom-0 w-full p-2 pl-3'>
              <p className='text-lg font-bold line-clamp-1'>Blog Title</p>
              <p className='text-sm line-clamp-1'>Username</p>
            </div> :
            <div className='h-full flex-1 bg-customWhite-200 text-customBlack-300 flex flex-col justify-between p-3'>
              <div className='flex flex-col gap-1'>
                <p className='font-bold line-clamp-1 max-md:text-lg'>Blog Title</p>
                <p className='text-xs 2xl:line-clamp-5 xl:line-clamp-3 lg:line-clamp-5 md:line-clamp-3 max-md:text-sm sm:line-clamp-5 max-sm:line-clamp-3 max-xsm:line-clamp-2 max-xsm:text-xs'>Lorem ipsum odor amet, consectetuer adipiscing elit. Donec metus pharetra proin pretium pharetra purus curabitur. Et turpis orci netus gravida libero. Adipiscing ante ac eu blandit sem, enim suscipit at. Nascetur nulla per magna pulvinar maximus. Aliquet viverra scelerisque est mattis luctus porta suscipit. Faucibus fringilla integer ridiculus, fusce proin cursus. Massa rutrum quis mattis justo mauris aptent justo cursus. Malesuada penatibus felis phasellus etiam dolor mi magna.</p>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='flex justify-center items-center w-fit aspect-square green-gradient text-customWhite-200 rounded-full flex-shrink-0 h-8'>
                  J
                </div>
                <p className='text-sm line-clamp-1 font-semibold'>Username</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
