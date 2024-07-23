import React from 'react'
import Map from '../details/Map'
import { PlannersItem } from '@/types/components'
import { useGetPlannerPlaces } from '@/lib/hooks/useGetPlannerPlaces'

export default function PlannerMap({ planner }: { planner: PlannersItem }) {
  const { plannerPlaces } = useGetPlannerPlaces(planner);

  // fetch all geo data for map to display all places

  return (
    <div className='w-full h-full'>
      <Map latitude={planner.country.geo.center.latitude} longitude={planner.country.geo.center.longitude} type='planner' />
    </div>
  )
}
