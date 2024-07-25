import React from 'react'
import { PlannersItem } from '@/types/components'
import { useGetPlannerMap } from '@/lib/hooks/useGetPlannerMap';
import MapWithInfo from '../details/MapWithInfo';

export default function PlannerMap({ planner }: { planner: PlannersItem; }) {
  const { places } = useGetPlannerMap(planner);

  return (
    <div className='w-full h-full'>
      {
        places &&
        <MapWithInfo 
          type='planner'
          places={places}
        />
      }
    </div>
  )
}
