import React from 'react'

export default function UserBadge({ userData, publishTime, views }: { userData: UserData, publishTime?: Date, views?: string[] }) {
  return (
    <div className='flex gap-2 items-center'>
      <div className='flex justify-center items-center text-xl h-12 aspect-square green-gradient text-customWhite-200 rounded-full flex-shrink-0 max-sm:h-10'>
        { userData && userData.username[0].toUpperCase() }
      </div>
      <p className='line-clamp-1 max-md:text-sm'>
        <span className='font-semibold'>{ userData && userData.username }&nbsp;&nbsp;∙&nbsp;&nbsp;</span>
        {
          publishTime ?
          publishTime.toDateString() :
          'Now'
        }
        {
          views &&
          <>
            <span className='font-semibold'>&nbsp;&nbsp;∙&nbsp;&nbsp;</span>
            {views.length + ' views'}
          </>
        }
      </p>
    </div>
  )
}
