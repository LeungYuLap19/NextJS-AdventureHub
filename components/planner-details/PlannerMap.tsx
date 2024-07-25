import React, { useEffect } from 'react'
import Map from '../details/Map'
import { PlannersItem } from '@/types/components'
import { useGetPlannerMap } from '@/lib/hooks/useGetPlannerMap';

export default function PlannerMap({ planner, setSelectedFsqId }: { planner: PlannersItem; setSelectedFsqId: (selectedFsqId: string) => void }) {
  const { geoData, positions, setSelected, selectedFsqId } = useGetPlannerMap(planner);

  useEffect(() => {
    selectedFsqId && setSelectedFsqId(selectedFsqId);
  }, [selectedFsqId]);

  return (
    <div className='w-full h-full'>
      {
        geoData.length > 0 && positions &&
        <Map 
          positions={positions}
          type='planner'
          setSelected={setSelected}
        />
      }
    </div>
  )
}
