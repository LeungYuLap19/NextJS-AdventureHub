import React from 'react'
import Header from '../discover/Header'
import Image from 'next/image'
import PlacesItem from './PlacesItem'

export default function PlannerPlaces({ planner }: { planner: PlannersItem }) {
  return (
    <div className='flex flex-col gap-7 md:pt-[20px]'>
      <div className='flex items-center gap-2 h-[30px] mb-[-25px] w-fit'>
        <Image 
          src={'/root/marker.svg'}
          alt='location'
          height={16} width={16}
        />
        <p className='max-md:text-sm text-customBlack-200 truncate'>
          {planner.country.text.primary || ''}
        </p>
      </div>
      <Header title={<>{planner.name || ''}</>} />

      <div className='flex flex-col w-full gap-4'>
        <PlacesItem />
        <PlacesItem />
        <PlacesItem />
        <PlacesItem />
        <PlacesItem />
      </div>
    </div>
  )
}
