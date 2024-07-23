import React, { useEffect, useState } from 'react'
import Header from '../discover/Header'
import PlacesItem from './PlacesItem'
import SectionWithIcon from './SectionWithIcon'
import { PlannersItem } from '@/types/components'
import { useGetPlannerPlaces } from '@/lib/hooks/useGetPlannerPlaces'

export default function PlannerPlaces({ planner }: { planner: PlannersItem }) {
  const { plannerPlaces, renderKey } = useGetPlannerPlaces(planner);

  return (
    <div className='flex flex-col gap-7'>
      <SectionWithIcon imgUrl='/root/marker.svg' text={planner.country.text.primary || ''} />
      <Header title={<>{planner.name || ''}</>} />

      <div key={renderKey} className='flex flex-col w-full gap-4'>
        {
          plannerPlaces ?
          plannerPlaces.places.map((plannerPlace: PlannerPlace) => (
            <PlacesItem key={plannerPlace.place.fsq_id} item={plannerPlace.place} />
          )) :
          'cannont display'
        }
      </div>
    </div>
  )
}
