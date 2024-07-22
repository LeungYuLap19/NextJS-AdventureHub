import React from 'react'
import Map from '../details/Map'
import { PlannersItem } from '@/types/components'

export default function PlannerMap({ planner }: { planner: PlannersItem }) {
  return (
    <div className='w-full h-full'>
      <Map latitude={planner.country.geo.center.latitude} longitude={planner.country.geo.center.longitude} type='planner' />
    </div>
  )
}
