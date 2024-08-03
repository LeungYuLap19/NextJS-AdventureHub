import React, { useEffect } from 'react'
import { PlannersItem } from '@/types/components'
import { useGetPlannerMap } from '@/lib/hooks/useGetPlannerMap';
import MapWithInfo from '../details/MapWithInfo';

export default function PlannerMap({ planner }: { planner: PlannersItem; }) {
  const { places } = useGetPlannerMap(planner);

  useEffect(() => {
    console.log(places);
  }, [places]);

  return (
    <div className='w-full h-full'>
      {
        planner && (!places || places.length == 0) ?
        <MapWithInfo 
          type='planner'
          planner={planner}
        /> :
        places && places.length > 0 ?
        <MapWithInfo 
          type='planner'
          places={places}
        /> :
        <></>
      }
    </div>
  )
}
