import React from 'react'
import Header from '../discover/Header'
import PlacesItem from './PlacesItem'
import SectionWithIcon from './SectionWithIcon'
import { PlannersItem } from '@/types/components'

export default function PlannerPlaces({ planner }: { planner: PlannersItem }) {
  return (
    <div className='flex flex-col gap-7'>
      <SectionWithIcon imgUrl='/root/marker.svg' text={planner.country.text.primary || ''} />
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
