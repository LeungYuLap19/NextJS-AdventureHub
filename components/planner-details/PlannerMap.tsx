import React, { useEffect, useState } from 'react'
import Map from '../details/Map'
import { PlannersItem } from '@/types/components'
import { useGetPlannerPlaces } from '@/lib/hooks/useGetPlannerPlaces'
import { placeDetails } from '@/lib/actions/fourSquareAPI';

export default function PlannerMap({ planner }: { planner: PlannersItem }) {
  const { plannerPlaces, getFsqIds } = useGetPlannerPlaces(planner);
  const [geoData, setGeoData] = useState<PlaceDetails[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [selected, setSelected] = useState<{ lat: number, lng: number } | null>(null);

  useEffect(() => {
    const fetchGeoData = async () => {
      if (plannerPlaces) {
        const fsqIds = getFsqIds(plannerPlaces);
        const fields = ['fsq_id', 'geocodes'];
        const geoDataPromises = fsqIds.map(fsq_id => placeDetails({ fsq_id, fields }));
        const geoDataResults = await Promise.all(geoDataPromises);
        setGeoData(geoDataResults.filter(data => data !== null));
      }
    };

    fetchGeoData();
  }, [plannerPlaces]);

  useEffect(() => {
    if (geoData.length > 0) {
      const positions = geoData.map(data => ({
        lat: data.geocodes.main.latitude,
        lng: data.geocodes.main.longitude
      }));
      setPositions(positions);
    }
  }, [geoData]);

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
